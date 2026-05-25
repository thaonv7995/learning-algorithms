const fs = require('fs');
const path = require('path');

const PROBLEMS = require('./problems-data.js');
const SOLUTIONS = require('./problems-solutions.js');
const { renderAnalysisHtml } = require('./problems-analysis.js');

const problemsDir = path.join(__dirname, 'problems');
if (!fs.existsSync(problemsDir)) {
    fs.mkdirSync(problemsDir);
}

function getSlug(title) {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

function getChapterForProblem(p) {
    const titleLower = p.title.toLowerCase();
    const catLower = p.category.toLowerCase();

    if (p.id === 1 || titleLower.includes("two sum") || titleLower.includes("anagram") || titleLower.includes("consecutive") || titleLower.includes("frequent")) return 7;
    if (titleLower.includes("trie")) return 13;
    if (titleLower.includes("binary search") || titleLower.includes("search in rotated") || titleLower.includes("koko eating")) return 2;
    if (catLower.includes("sort")) return 11;
    if (catLower.includes("tree")) return 9;
    if (catLower.includes("graph")) return 10;
    if (catLower.includes("heap")) return 8;
    if (catLower.includes("dynamic programming") || titleLower.includes("climbing stairs") || titleLower.includes("house robber") || titleLower.includes("word break") || titleLower.includes("unique paths") || titleLower.includes("decode ways")) return 12;
    if (titleLower.includes("valid parentheses") || titleLower.includes("min stack") || titleLower.includes("daily temperatures") || titleLower.includes("sliding window maximum") || titleLower.includes("largest rectangle")) return 5;
    if (catLower.includes("linked list")) return (titleLower.includes("doubly") || p.id === 146) ? 4 : 3;
    if (catLower.includes("array") || catLower.includes("two pointers") || catLower.includes("sliding window")) return 2;
    if (catLower.includes("stack") || catLower.includes("queue")) return 5;
    if (catLower.includes("dynamic")) return 12;
    return 2;
}

function highlightCode(code, lang) {
    let escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    if (lang === 'c') {
        escaped = escaped
            .replace(/\b(int|char|double|float|void|struct|bool|unsigned|long|const)\b/g, '<span class="ty">$1</span>')
            .replace(/\b(if|else|for|while|return|malloc|calloc|free|qsort|sizeof|strdup|strlen|strcmp|strncpy|abs)\b/g, '<span class="kw">$1</span>')
            .replace(/(\/\/.*)/g, '<span class="cm">$1</span>');
    } else if (lang === 'python') {
        escaped = escaped
            .replace(/\b(def|class|if|else|elif|for|in|return|while|and|or|not|import|nonlocal|from)\b/g, '<span class="kw">$1</span>')
            .replace(/\b(self|List|Optional|ListNode|TreeNode|int|str|float|double|dict|set|list|len|min|max|math|heapq|collections|Counter|deque)\b/g, '<span class="ty">$1</span>')
            .replace(/(#.*)/g, '<span class="cm">$1</span>');
    }
    return escaped;
}

PROBLEMS.forEach(p => {
    const slug = getSlug(p.title);
    const fileName = `${p.id}-${slug}.html`;
    const filePath = path.join(problemsDir, fileName);
    const chapNum = getChapterForProblem(p);

    const pSolutions = SOLUTIONS[p.id] || {};
    const rawC = pSolutions.c || `// Solution in C not available\n${p.code.replace(/<[^>]*>/g, '')}`;
    const rawPy = pSolutions.python || `# Solution in Python not available\n${p.code.replace(/<[^>]*>/g, '')}`;

    const highlightedC = highlightCode(rawC, 'c');
    const highlightedPython = highlightCode(rawPy, 'python');
    const cppCode = p.code;

    let examplesHtml = '';
    p.examples.forEach((ex, idx) => {
        examplesHtml += `
            <div class="example-block">
                <div class="ex-label">Ví dụ ${idx + 1}</div>
                <div class="ex-line"><span>In</span><code>${ex.input}</code></div>
                <div class="ex-line"><span>Out</span><code>${ex.output}</code></div>
            </div>`;
    });

    const pIdx = PROBLEMS.findIndex(x => x.id === p.id);
    const prevP = pIdx > 0 ? PROBLEMS[pIdx - 1] : null;
    const nextP = pIdx < PROBLEMS.length - 1 ? PROBLEMS[pIdx + 1] : null;
    const prevHref = prevP ? `${prevP.id}-${getSlug(prevP.title)}.html` : '';
    const nextHref = nextP ? `${nextP.id}-${getSlug(nextP.title)}.html` : '';
    const dc = p.difficulty.toLowerCase();

    const prevNav = prevHref
        ? `<a href="${prevHref}" class="problem-nav-btn"><i class="fa-solid fa-chevron-left"></i><span class="nav-label"><small>Trước</small><strong>${prevP.title}</strong></span></a>`
        : `<span class="problem-nav-btn disabled"><i class="fa-solid fa-chevron-left"></i><span class="nav-label"><small>Trước</small><strong>—</strong></span></span>`;

    const nextNav = nextHref
        ? `<a href="${nextHref}" class="problem-nav-btn next"><span class="nav-label"><small>Sau</small><strong>${nextP.title}</strong></span><i class="fa-solid fa-chevron-right"></i></a>`
        : `<span class="problem-nav-btn disabled next"><span class="nav-label"><small>Sau</small><strong>—</strong></span><i class="fa-solid fa-chevron-right"></i></span>`;

    const pageContent = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LC #${p.id} · ${p.title} — Algorithms Explorer</title>
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
                <span class="current">#${p.id} ${p.title}</span>
            </nav>
        </div>
        <div class="nav-actions">
            <a href="../algorithms.html" class="nav-link"><i class="fa-solid fa-grid-2"></i><span class="lbl">Thư viện</span></a>
            <a href="../index.html" class="nav-link"><i class="fa-solid fa-book-open"></i><span class="lbl">Sách</span></a>
        </div>
    </header>

    <div class="layout">

        <aside class="info-pane" id="info-pane">
            <div class="pane-sticky">
                <div class="problem-head ${dc}">
                    <div class="head-meta">
                        <span class="lc-num">LC #${p.id}</span>
                        <span class="diff-badge ${dc}">${p.difficulty}</span>
                        <span class="cat-chip">${p.category}</span>
                    </div>
                    <h1 class="problem-title">${p.title}</h1>
                    <div class="head-stats">
                        <span class="stat-chip"><i class="fa-regular fa-clock"></i>${p.timeComplexity}</span>
                        <span class="stat-chip"><i class="fa-solid fa-memory"></i>${p.spaceComplexity}</span>
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
                        <div class="block-text">${p.description}</div>
                    </div>
                    <div class="block">
                        <div class="block-label"><i class="fa-solid fa-flask"></i> Ví dụ</div>
                        <div class="drawer-example">${examplesHtml}</div>
                    </div>
                </div>

                <div class="tab-panel" id="panel-solution">
                    <div class="block">
                        <div class="block-label"><i class="fa-solid fa-lightbulb"></i> Ý tưởng</div>
                        <div class="block-text">${p.approach}</div>
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
                            <pre class="code-block" id="code-block-c">${highlightedC}</pre>
                            <pre class="code-block" id="code-block-python" style="display:none">${highlightedPython}</pre>
                            <pre class="code-block" id="code-block-cpp" style="display:none">${cppCode}</pre>
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
                <span class="sandbox-hint">Console log thu gọn — bấm để mở</span>
            </div>
            <div class="sandbox-frame-wrap">
                <iframe class="sandbox-iframe" src="../index.html?chapter=${chapNum}&problem=${encodeURIComponent(p.title)}&lc_id=${p.id}&embed=true"></iframe>
            </div>
        </section>

    </div>

    <script src="detail.js"></script>
</body>
</html>`;

    fs.writeFileSync(filePath, pageContent, 'utf8');
});

console.log(`Successfully generated ${PROBLEMS.length} standalone premium problem detail pages inside the 'problems' directory!`);
