const fs = require('fs');
const path = require('path');

const PREMIUM = require('./problems-data.js');
const SOLUTIONS = require('./problems-solutions.js');
const { renderAnalysisHtml } = require('./problems-analysis.js');
const { mergeProblem } = require('./scripts/lib/problem-merge.js');

const CATALOG_PATH = path.join(__dirname, 'data', 'catalog.json');
const DETAIL_DIR = path.join(__dirname, 'data', 'details');
const CONTENT_DIR = path.join(__dirname, 'content', 'problems');
const problemsDir = path.join(__dirname, 'problems');

if (!fs.existsSync(problemsDir)) fs.mkdirSync(problemsDir, { recursive: true });

const PREMIUM_BY_ID = new Map(PREMIUM.map(p => [p.id, p]));

function getSlug(title) {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

function escHtml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function getChapterForProblem(p) {
    const titleLower = p.title.toLowerCase();
    const catLower = (p.category || '').toLowerCase();
    const tags = (p.tags || []).join(' ').toLowerCase();

    if (p.id === 1 || titleLower.includes('two sum') || tags.includes('hash table')) return 7;
    if (tags.includes('trie')) return 13;
    if (tags.includes('binary search')) return 2;
    if (tags.includes('sorting')) return 11;
    if (tags.includes('tree') || catLower.includes('tree')) return 9;
    if (tags.includes('graph') || catLower.includes('graph')) return 10;
    if (tags.includes('heap')) return 8;
    if (tags.includes('dynamic programming') || catLower.includes('dynamic')) return 12;
    if (tags.includes('stack') || tags.includes('queue')) return 5;
    if (tags.includes('linked list')) return 3;
    if (tags.includes('array') || tags.includes('two pointers') || tags.includes('sliding window')) return 2;
    return 2;
}

function highlightCode(code, lang) {
    let escaped = escHtml(code || '');

    if (lang === 'c' || lang === 'cpp') {
        escaped = escaped
            .replace(/\b(int|char|double|float|void|struct|bool|unsigned|long|const|vector|string|class|public|private|returnSize)\b/g, '<span class="ty">$1</span>')
            .replace(/\b(if|else|for|while|return|malloc|calloc|free|sizeof|nullptr|new|delete|using|namespace)\b/g, '<span class="kw">$1</span>')
            .replace(/(\/\/.*)/g, '<span class="cm">$1</span>');
    } else if (lang === 'python') {
        escaped = escaped
            .replace(/\b(def|class|if|else|elif|for|in|return|while|and|or|not|import|from|pass|None|True|False)\b/g, '<span class="kw">$1</span>')
            .replace(/\b(self|List|Optional|ListNode|TreeNode|int|str|dict|set|list|len|min|max|range)\b/g, '<span class="ty">$1</span>')
            .replace(/(#.*)/g, '<span class="cm">$1</span>');
    }
    return escaped;
}

function loadContentOverride(id) {
    const fp = path.join(CONTENT_DIR, `${id}.json`);
    if (!fs.existsSync(fp)) return null;
    try {
        return JSON.parse(fs.readFileSync(fp, 'utf8'));
    } catch {
        return null;
    }
}

function applyContentOverride(p, ov) {
    if (!ov) return p;
    const out = {
        ...p,
        title: ov.title || p.title,
        difficulty: ov.difficulty || p.difficulty,
        category: ov.category || p.category,
        timeComplexity: ov.timeComplexity || p.timeComplexity,
        spaceComplexity: ov.spaceComplexity || p.spaceComplexity,
        description: ov.description || p.description,
        descriptionHtml: ov.description ? null : p.descriptionHtml,
        examples: ov.examples || p.examples,
        approach: ov.approach || p.approach,
        memoryTip: ov.memoryTip || p.memoryTip,
        codeC: ov.solutions?.c || p.codeC,
        codePython: ov.solutions?.python || p.codePython,
        codeCpp: ov.solutions?.cpp || p.codeCpp,
        codeHtml: null,
        tier: ov.tier === 'done' ? 'premium' : p.tier,
        _analysisOverride: ov.analysis || null,
    };
    if (ov.solutions?.cpp && !ov.solutions.cpp.includes('<span')) {
        out.codeHtml = null;
    }
    return out;
}

function loadDetail(id) {
    const fp = path.join(DETAIL_DIR, `${id}.json`);
    if (!fs.existsSync(fp)) return null;
    try {
        return JSON.parse(fs.readFileSync(fp, 'utf8'));
    } catch {
        return null;
    }
}

function buildCodeBlocks(p) {
    const sol = SOLUTIONS[p.id] || {};
    const rawC = p.codeC || sol.c || '// Chưa có lời giải C\n';
    const rawPy = p.codePython || sol.python || '# Chưa có lời giải Python\n';
    const rawCppPlain = p.codeCpp || '';
    return {
        c: highlightCode(rawC, 'c'),
        python: highlightCode(rawPy, 'python'),
        cpp: p.codeHtml ? null : highlightCode(rawCppPlain || '// Template C++', 'cpp'),
    };
}

function renderDescription(p) {
    if (p.descriptionHtml) {
        return `<div class="lc-content">${p.descriptionHtml}</div>`;
    }
    return `<div class="block-text">${escHtml(p.description).replace(/\n/g, '<br>')}</div>`;
}

function renderExamples(examples) {
    if (!examples?.length) {
        return '<p class="block-text muted">Chưa có ví dụ — xem trên LeetCode.</p>';
    }
    return examples.map((ex, idx) => `
            <div class="example-block">
                <div class="ex-label">Ví dụ ${idx + 1}</div>
                <div class="ex-line"><span>In</span><code>${escHtml(ex.input)}</code></div>
                <div class="ex-line"><span>Out</span><code>${escHtml(ex.output)}</code></div>
            </div>`).join('');
}

function tierBadge(p) {
    if (p.tier === 'premium') {
        return '<span class="tier-badge premium"><i class="fa-solid fa-star"></i> Premium</span>';
    }
    return '<span class="tier-badge catalog"><i class="fa-brands fa-leetcode"></i> Catalog</span>';
}

function renderPage(p, prevP, nextP) {
    const slug = p.slug || getSlug(p.title);
    const chapNum = getChapterForProblem(p);
    const dc = p.difficulty.toLowerCase();
    const codes = buildCodeBlocks(p);
    const examplesHtml = renderExamples(p.examples);
    const descHtml = renderDescription(p);

    const prevHref = prevP ? `${prevP.id}-${prevP.slug || getSlug(prevP.title)}.html` : '';
    const nextHref = nextP ? `${nextP.id}-${nextP.slug || getSlug(nextP.title)}.html` : '';

    const prevNav = prevHref
        ? `<a href="${prevHref}" class="problem-nav-btn"><i class="fa-solid fa-chevron-left"></i><span class="nav-label"><small>Trước</small><strong>${escHtml(prevP.title)}</strong></span></a>`
        : `<span class="problem-nav-btn disabled"><i class="fa-solid fa-chevron-left"></i><span class="nav-label"><small>Trước</small><strong>—</strong></span></span>`;

    const nextNav = nextHref
        ? `<a href="${nextHref}" class="problem-nav-btn next"><span class="nav-label"><small>Sau</small><strong>${escHtml(nextP.title)}</strong></span><i class="fa-solid fa-chevron-right"></i></a>`
        : `<span class="problem-nav-btn disabled next"><span class="nav-label"><small>Sau</small><strong>—</strong></span><i class="fa-solid fa-chevron-right"></i></span>`;

    const lcLink = `https://leetcode.com/problems/${slug}/`;
    const acChip = p.acRate != null ? `<span class="stat-chip"><i class="fa-solid fa-chart-simple"></i>${p.acRate}% AC</span>` : '';

    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LC #${p.id} · ${escHtml(p.title)} — Algorithms Explorer</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;600&family=Sora:wght@600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="detail.css">
</head>
<body>

    <header class="top-navbar">
        <div class="nav-left">
            <a href="../index.html" class="logo">
                <span class="logo-mark"><i class="fa-solid fa-laptop-code"></i></span>
                <span class="logo-text">Algorithms Explorer</span>
            </a>
            <nav class="breadcrumb">
                <a href="../algorithms.html">Thư viện</a>
                <i class="fa-solid fa-chevron-right sep"></i>
                <span class="current">#${p.id} ${escHtml(p.title)}</span>
            </nav>
        </div>
        <div class="nav-actions">
            <a href="${lcLink}" class="nav-link" target="_blank" rel="noopener"><i class="fa-brands fa-leetcode"></i><span class="lbl">LC</span></a>
            <a href="../algorithms.html" class="nav-link"><i class="fa-solid fa-grid-2"></i><span class="lbl">Thư viện</span></a>
        </div>
    </header>

    <div class="layout">

        <aside class="info-pane" id="info-pane">
            <div class="pane-sticky">
                <div class="problem-head ${dc}">
                    <div class="head-meta">
                        <span class="lc-num">LC #${p.id}</span>
                        <span class="diff-badge ${dc}">${p.difficulty}</span>
                        <span class="cat-chip">${escHtml(p.category)}</span>
                        ${tierBadge(p)}
                    </div>
                    <h1 class="problem-title">${escHtml(p.title)}</h1>
                    <div class="head-stats">
                        <span class="stat-chip"><i class="fa-regular fa-clock"></i>${escHtml(p.timeComplexity)}</span>
                        <span class="stat-chip"><i class="fa-solid fa-memory"></i>${escHtml(p.spaceComplexity)}</span>
                        ${acChip}
                    </div>
                </div>
                <nav class="pane-tabs" role="tablist">
                    <button class="tab-btn active" data-tab="overview"><i class="fa-solid fa-file-lines"></i> Bài toán</button>
                    <button class="tab-btn" data-tab="solution"><i class="fa-solid fa-code"></i> Giải pháp <span class="tab-badge">3</span></button>
                    <button class="tab-btn" data-tab="analysis"><i class="fa-solid fa-chart-line"></i> Phân tích</button>
                </nav>
            </div>

            <div class="pane-body">
                <div class="tab-panel active" id="panel-overview">
                    <div class="block">
                        <div class="block-label"><i class="fa-solid fa-circle-question"></i> Mô tả</div>
                        ${descHtml}
                    </div>
                    <div class="block">
                        <div class="block-label"><i class="fa-solid fa-flask"></i> Ví dụ</div>
                        <div class="drawer-example">${examplesHtml}</div>
                    </div>
                </div>

                <div class="tab-panel" id="panel-solution">
                    <div class="block">
                        <div class="block-label"><i class="fa-solid fa-lightbulb"></i> Ý tưởng</div>
                        <div class="block-text">${escHtml(p.approach).replace(/\n/g, '<br>')}</div>
                    </div>
                    <div class="block">
                        <div class="block-label"><i class="fa-solid fa-terminal"></i> Mã nguồn</div>
                        <div class="code-toolbar">
                            <div class="lang-tabs" role="tablist">
                                <button class="code-tab-btn active" data-lang="c"><i class="fa-solid fa-c"></i> C</button>
                                <button class="code-tab-btn" data-lang="python"><i class="fa-brands fa-python"></i> Py</button>
                                <button class="code-tab-btn" data-lang="cpp"><i class="fa-solid fa-microchip"></i> C++</button>
                            </div>
                            <button class="btn-copy" id="btn-copy-code"><i class="fa-regular fa-copy"></i> Sao chép</button>
                        </div>
                        <div class="code-container">
                            <div class="code-header" id="code-lang-label">
                                <span class="fname">solution.c</span>
                                <span class="ftype">C99</span>
                            </div>
                            <pre class="code-block" id="code-block-c">${codes.c}</pre>
                            <pre class="code-block" id="code-block-python" style="display:none">${codes.python}</pre>
                            <pre class="code-block" id="code-block-cpp" style="display:none">${p.codeHtml || codes.cpp}</pre>
                        </div>
                    </div>
                </div>

                <div class="tab-panel" id="panel-analysis">${renderAnalysisHtml(p)}
                </div>
            </div>

            <footer class="problem-nav">
                ${prevNav}
                ${nextNav}
            </footer>
        </aside>

        <div class="resize-divider" id="resize-divider" title="Kéo để đổi kích thước"></div>

        <section class="sandbox-pane">
            <div class="sandbox-bar">
                <span class="live-badge"><span class="live-dot"></span> Live Sandbox</span>
                <span class="sandbox-hint">${p.tier === 'premium' ? 'Sandbox đầy đủ' : 'Mô phỏng cơ bản — đang mở rộng dần'}</span>
            </div>
            <div class="sandbox-frame-wrap">
                <iframe class="sandbox-iframe" src="../index.html?chapter=${chapNum}&problem=${encodeURIComponent(p.title)}&lc_id=${p.id}&embed=true"></iframe>
            </div>
        </section>

    </div>

    <script src="detail.js"></script>
</body>
</html>`;
}

function main() {
    if (!fs.existsSync(CATALOG_PATH)) {
        console.error('Missing data/catalog.json');
        process.exit(1);
    }

    const idArg = process.argv.find(a => a.startsWith('--id='));
    const onlyId = idArg ? parseInt(idArg.split('=')[1], 10) : 0;

    const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));

    const allMerged = (catalog.problems || []).map(c => {
        let p = mergeProblem(c, PREMIUM_BY_ID.get(c.id), loadDetail(c.id));
        return applyContentOverride(p, loadContentOverride(c.id));
    });

    const merged = onlyId ? allMerged.filter(p => p.id === onlyId) : allMerged;

    let written = 0;
    merged.forEach(p => {
        const idx = allMerged.findIndex(x => x.id === p.id);
        const prevP = idx > 0 ? allMerged[idx - 1] : null;
        const nextP = idx < allMerged.length - 1 ? allMerged[idx + 1] : null;
        const slug = p.slug || getSlug(p.title);
        fs.writeFileSync(path.join(problemsDir, `${p.id}-${slug}.html`), renderPage(p, prevP, nextP), 'utf8');
        written++;
    });

    console.log(`Generated ${written} detail page(s) in problems/`);
    if (!onlyId) {
        console.log(`  Premium/hand-crafted: ${allMerged.filter(p => p.tier === 'premium').length}`);
        console.log(`  With content override: ${allMerged.filter(p => loadContentOverride(p.id)).length}`);
    }
}

main();
