#!/usr/bin/env node
/**
 * Validate one problem content file against QA standards.
 * Usage: node scripts/validate-problem.js --id=96
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT = path.join(ROOT, 'content', 'problems');

const STUB_DESC = /^.+\(LC #\d+\)\.\s*$/;
const STUB_APPROACH = 'Thuật toán chuẩn — xem tab Giải pháp và sandbox mô phỏng.';
const STUB_APPROACH2 = 'Giải pháp chuẩn — dùng sandbox mô phỏng và bổ sung code chi tiết dần.';
const BAD_INPUT = /xem đề|leetcode\.com/i;
const BAD_OUTPUT = /^…$|^\.\.\.$|^\.{1,3}$/i;

function parseArgs() {
    const idArg = process.argv.find(a => a.startsWith('--id='));
    if (!idArg) {
        console.error('Usage: node scripts/validate-problem.js --id=N');
        process.exit(2);
    }
    return parseInt(idArg.split('=')[1], 10);
}

function fail(errors, code) {
    console.log(JSON.stringify({ pass: false, errors }, null, 2));
    process.exit(code || 1);
}

function pass(data) {
    console.log(JSON.stringify({ pass: true, ...data }, null, 2));
    process.exit(0);
}

const id = parseArgs();
const fp = path.join(CONTENT, `${id}.json`);
if (!fs.existsSync(fp)) fail([`Missing ${fp}`]);

let p;
try {
    p = JSON.parse(fs.readFileSync(fp, 'utf8'));
} catch (e) {
    fail([`Invalid JSON: ${e.message}`]);
}

const errors = [];

if (!p.description || p.description.length < 50) {
    errors.push('A1: description quá ngắn hoặc thiếu (< 50 ký tự)');
}
if (STUB_DESC.test(p.description || '')) {
    errors.push('A1: description chỉ là tên bài (LC #N)');
}
if (BAD_INPUT.test(p.description || '')) {
    errors.push('A2: description chứa placeholder LeetCode');
}

const examples = p.examples || [];
if (examples.length < 2) {
    errors.push('A3: cần ≥2 examples');
}
examples.forEach((ex, i) => {
    if (!ex.input || BAD_INPUT.test(ex.input)) errors.push(`A3: examples[${i}].input placeholder`);
    if (!ex.output || BAD_OUTPUT.test(String(ex.output).trim())) errors.push(`A3: examples[${i}].output placeholder`);
});

if (!p.approach || p.approach === STUB_APPROACH || p.approach === STUB_APPROACH2) {
    errors.push('A4: approach stub');
}
if (!p.memoryTip || p.memoryTip === 'Ghi nhớ pattern và invariant chính.' || p.memoryTip === 'Nắm pattern chính của bài trước khi phỏng vấn.') {
    errors.push('A5: memoryTip generic');
}

const py = p.solutions?.python || '';
const cpp = p.solutions?.cpp || '';
if (/\bpass\b/.test(py) || py.trim().length < 40) errors.push('A6: python stub');
if (!cpp.includes('return') && !cpp.includes('bool ') && cpp.length < 60) errors.push('A6: cpp stub');
if (/Bổ sung theo editorial/i.test(py + cpp)) errors.push('A6: editorial placeholder');

const an = p.analysis || {};
if (!an.correctness || an.correctness === 'Đúng theo logic chuẩn của bài toán.') {
    errors.push('A7: analysis.correctness generic');
}
if (!Array.isArray(an.edgeCases) || an.edgeCases.length < 2) errors.push('A7: edgeCases thiếu');
if (!Array.isArray(an.pitfalls) || an.pitfalls.length < 2) errors.push('A7: pitfalls thiếu');

if (p.tier === 'done' && errors.length) {
    errors.push('A8: tier "done" nhưng content chưa đạt chuẩn');
}

// Optional: check output resolver exists for tier done
if (p.tier === 'done') {
    const outputsPath = path.join(ROOT, 'visualizers', 'lc-outputs.js');
    const src = fs.readFileSync(outputsPath, 'utf8');
    const hasExplicit = new RegExp(`R\\[${id}\\]\\s*=`).test(src);
    const hasRangeLoop = id >= 201 && id <= 400 && /for \(let id = 201; id <= 400/.test(src);
    const hasResolver = hasExplicit || hasRangeLoop;
    if (!hasResolver) errors.push(`C1: thiếu R[${id}] trong lc-outputs.js`);
}

if (errors.length) fail(errors);
pass({ id, title: p.title, tier: p.tier });
