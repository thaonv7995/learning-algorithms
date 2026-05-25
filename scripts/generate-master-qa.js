#!/usr/bin/env node
/**
 * Generate checklist/MASTER-QA.md — 3175 bài + checklist QA từng bài.
 * Usage: node scripts/generate-master-qa.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CHECKLIST = path.join(ROOT, 'checklist', 'index.json');
const CONTENT_DIR = path.join(ROOT, 'content', 'problems');
const REVIEWS_DIR = path.join(ROOT, 'checklist', 'reviews');
const OUT = path.join(ROOT, 'checklist', 'MASTER-QA.md');
const OUTPUTS_SRC = fs.readFileSync(path.join(ROOT, 'visualizers', 'lc-outputs.js'), 'utf8');

const STUB_DESC = /^.+\(LC #\d+\)\.\s*$/;
const STUB_APPROACH = 'Thuật toán chuẩn — xem tab Giải pháp và sandbox mô phỏng.';
const STUB_APPROACH2 = 'Giải pháp chuẩn — dùng sandbox mô phỏng và bổ sung code chi tiết dần.';
const BAD_INPUT = /xem đề|leetcode\.com/i;
const BAD_OUTPUT = /^…$|^\.\.\.$|^\.{1,3}$/i;

function pad4(n) {
    return String(n).padStart(4, '0');
}

function loadContent(id) {
    const fp = path.join(CONTENT_DIR, `${id}.json`);
    if (!fs.existsSync(fp)) return null;
    try {
        return JSON.parse(fs.readFileSync(fp, 'utf8'));
    } catch {
        return null;
    }
}

function validateContent(p) {
    const errors = [];
    if (!p) return { pass: false, errors: ['Thiếu content/problems/{id}.json'] };

    if (!p.description || p.description.length < 50) errors.push('A1');
    if (STUB_DESC.test(p.description || '')) errors.push('A1-stub');
    if (BAD_INPUT.test(p.description || '')) errors.push('A2');

    const examples = p.examples || [];
    if (examples.length < 2) errors.push('A3');
    examples.forEach(ex => {
        if (!ex.input || BAD_INPUT.test(ex.input)) errors.push('A3-in');
        if (!ex.output || BAD_OUTPUT.test(String(ex.output).trim())) errors.push('A3-out');
    });

    if (!p.approach || p.approach === STUB_APPROACH || p.approach === STUB_APPROACH2) errors.push('A4');
    if (!p.memoryTip || p.memoryTip === 'Ghi nhớ pattern và invariant chính.' || p.memoryTip === 'Nắm pattern chính của bài trước khi phỏng vấn.') errors.push('A5');

    const py = p.solutions?.python || '';
    const cpp = p.solutions?.cpp || '';
    if (/\bpass\b/.test(py) || py.trim().length < 40) errors.push('A6-py');
    if (!cpp.includes('return') && !cpp.includes('bool ') && cpp.length < 60) errors.push('A6-cpp');

    const an = p.analysis || {};
    if (!an.correctness || an.correctness === 'Đúng theo logic chuẩn của bài toán.') errors.push('A7');

    return { pass: errors.length === 0, errors };
}

function hasOutputResolver(id) {
    return new RegExp(`R\\[${id}\\]\\s*=`).test(OUTPUTS_SRC);
}

function reviewPath(slug, id) {
    return path.join(REVIEWS_DIR, `${pad4(id)}-${slug}.md`);
}

function reviewStatus(id, slug) {
    const fp = reviewPath(slug, id);
    if (!fs.existsSync(fp)) return { exists: false, pass: false };
    const text = fs.readFileSync(fp, 'utf8');
    const pass = /PASS|☑\s*PASS|\[x\].*QA PASS/i.test(text);
    return { exists: true, pass, path: `reviews/${pad4(id)}-${slug}.md` };
}

function box(checked) {
    return checked ? 'x' : ' ';
}

function statusIcon(pass) {
    return pass ? '✅' : '⬜';
}

function parseExistingChecks(text) {
    const map = new Map();
    if (!text) return map;
    const blocks = text.split(/^### #(\d+) · /m);
    for (let i = 1; i < blocks.length; i += 2) {
        const id = parseInt(blocks[i], 10);
        const body = blocks[i + 1] || '';
        const pick = label => {
            const m = body.match(new RegExp(`- \\[([ xX])\\] \\*\\*${label}\\*\\*`));
            return m ? /x/i.test(m[1]) : false;
        };
        map.set(id, {
            A: pick('A'),
            B: pick('B'),
            C: pick('C'),
            D: pick('D'),
            E: pick('E'),
            QA: /- \[x\] \*\*QA PASS\*\*/i.test(body)
        });
    }
    return map;
}

function chk(saved, key, autoHint) {
    const on = saved && saved[key];
    return `- [${on ? 'x' : ' '}] **${key === 'QA' ? 'QA PASS' : key}**${key === 'QA' ? ' — toàn bộ A–E đạt chuẩn' : key === 'A' ? ' Content — đề VI, examples, solution, analysis' : key === 'B' ? ' Sandbox — visualizer riêng, log [KẾT QUẢ]' : key === 'C' ? ' Output — panel hiện kết quả' : key === 'D' ? ' HTML — regenerate, tab OK' : ' Review file — tick đủ mục'}${autoHint && !on ? '' : ''}`;
}

const existingText = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
const savedChecks = parseExistingChecks(existingText);
const cl = JSON.parse(fs.readFileSync(CHECKLIST, 'utf8'));
const problems = cl.problems.slice().sort((a, b) => a.id - b.id);

let qaPass = 0;
let hasReview = 0;
let contentPass = 0;
let hasResolver = 0;

const lines = [];
lines.push('# Master QA Checklist — 3175 LeetCode Problems');
lines.push('');
lines.push('> Tự sinh bởi `node scripts/generate-master-qa.js` — **đánh dấu `[x]` trực tiếp trong file này** khi review xong từng bài.');
lines.push('> Chuẩn chi tiết: [QA-STANDARD.md](./QA-STANDARD.md) · Template review: [reviews/_TEMPLATE.md](./reviews/_TEMPLATE.md)');
lines.push('');
lines.push('## Cách dùng');
lines.push('');
lines.push('1. Chọn bài → mở `content/problems/{id}.json`, visualizer, trang HTML');
lines.push('2. Tick **A–E** khi đạt từng hạng mục (xem [QA-STANDARD.md](./QA-STANDARD.md))');
lines.push('3. Khi A–E đủ → tick **QA PASS**');
lines.push('4. (Tuỳ chọn) Tạo `checklist/reviews/NNNN-slug.md` từ template');
lines.push('5. Chạy lại `node scripts/generate-master-qa.js` để cập nhật cột trạng thái tự động');
lines.push('');
lines.push('### Ký hiệu cột tự động');
lines.push('');
lines.push('| Ký hiệu | Ý nghĩa |');
lines.push('|---------|---------|');
lines.push('| `content` | Validate nội dung JSON (A1–A7) |');
lines.push('| `output` | Có `R[id]` trong lc-outputs.js |');
lines.push('| `review` | File review tồn tại |');
lines.push('');
lines.push('---');
lines.push('');

// Table of contents by hundreds
const ranges = [];
for (let start = 1; start <= 3175; start += 100) {
    const end = Math.min(start + 99, 3175);
    ranges.push({ start, end, count: end - start + 1 });
}

lines.push('## Mục lục theo dải ID');
lines.push('');
ranges.forEach(r => {
    lines.push(`- [#${r.start}–#${r.end}](#lc-${r.start}${r.start !== r.end ? `–${r.end}` : ''}) (${r.count} bài)`);
});
lines.push('');
lines.push('---');
lines.push('');

let rangeStart = 1;
problems.forEach((p, idx) => {
    if (p.id === rangeStart || (p.id > rangeStart && p.id % 100 === 1 && p.id > 1)) {
        if (p.id % 100 === 1 && p.id > 1) rangeStart = p.id;
        const end = Math.min(rangeStart + 99, 3175);
        lines.push(`## LC #${rangeStart}${rangeStart !== end ? `–${end}` : ''}`);
        lines.push('');
    }

    const content = loadContent(p.id);
    const cv = validateContent(content);
    const resolver = hasOutputResolver(p.id);
    const rev = reviewStatus(p.id, p.slug);

    if (cv.pass) contentPass++;
    if (resolver) hasResolver++;
    if (rev.exists) hasReview++;
    const saved = savedChecks.get(p.id);
    if (saved?.QA) qaPass++;

    const tier = content?.tier || p.tier || '—';
    const auto = `content:${statusIcon(cv.pass)} output:${statusIcon(resolver)} review:${statusIcon(rev.exists)}`;

    lines.push(`### #${p.id} · ${p.title}`);
    lines.push('');
    lines.push(`**${p.difficulty}** · ${p.category} · tier \`${tier}\` · ${auto}`);
    if (rev.path) {
        lines.push(`Review file: [${rev.path}](./${rev.path})`);
    } else {
        lines.push(`Review file: \`reviews/${pad4(p.id)}-${p.slug}.md\` _(chưa tạo)_`);
    }
    lines.push(`Trang: [problems/${p.id}-${p.slug}.html](../problems/${p.id}-${p.slug}.html)`);
    lines.push('');
    lines.push(chk(saved, 'A'));
    lines.push(chk(saved, 'B'));
    lines.push(chk(saved, 'C'));
    lines.push(chk(saved, 'D'));
    lines.push(chk(saved, 'E'));
    lines.push(chk(saved, 'QA'));
    if (!cv.pass && cv.errors.length) {
        lines.push(`  - _Auto: content thiếu — ${cv.errors.slice(0, 4).join(', ')}_`);
    }
    lines.push('');
});

lines.push('---');
lines.push('');
lines.push('## Thống kê (tự động khi generate)');
lines.push('');
lines.push(`| Chỉ số | Số lượng |`);
lines.push(`|--------|----------|`);
lines.push(`| Tổng bài | ${problems.length} |`);
lines.push(`| Content validate pass | ${contentPass} |`);
lines.push(`| Có output resolver | ${hasResolver} |`);
lines.push(`| Có file review | ${hasReview} |`);
lines.push(`| Review ghi PASS (file riêng) | ${problems.filter(p => reviewStatus(p.id, p.slug).pass).length} |`);
lines.push(`| **QA PASS tick trong MASTER-QA** | **${qaPass}** |`);
lines.push(`| **Chưa QA PASS** | **${problems.length - qaPass}** |`);
lines.push('');
lines.push(`_Cập nhật: ${new Date().toISOString().slice(0, 10)}_`);

fs.writeFileSync(OUT, lines.join('\n'), 'utf8');
console.log(`Wrote ${OUT} (${lines.length} lines)`);
console.log(`Stats: content=${contentPass} resolver=${hasResolver} reviews=${hasReview} qaPass=${qaPass}`);
