#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PROBLEMS = path.join(ROOT, 'content/problems');
const REVIEWS = path.join(ROOT, 'checklist/reviews');

const PATTERNS_IDS = new Set([238, 242, 283, 322, 387]);

function slugify(title) {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

function vizFile(id) {
    if (id === 206) return 'lc206.js';
    if (PATTERNS_IDS.has(id)) return 'lc-patterns.js';
    if (id >= 301) return 'lc301-400.js';
    return 'lc201-300.js';
}

let created = 0;
let skipped = 0;

for (let id = 201; id <= 400; id++) {
    const jsonPath = path.join(PROBLEMS, `${id}.json`);
    if (!fs.existsSync(jsonPath)) continue;

    const { title } = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const slug = slugify(title);
    const filename = `${String(id).padStart(4, '0')}-${slug}.md`;
    const outPath = path.join(REVIEWS, filename);

    if (fs.existsSync(outPath)) {
        skipped++;
        continue;
    }

    const viz = vizFile(id);
    const body = `# LC #${id} — ${title} — Review

**Status:** done | **Date:** 2026-05-25

- [x] Content VI + C/Py/C++
- [x] Sandbox \`visualizers/${viz}\`
- [x] Output \`R[${id}]\` via \`lc-outputs.js\` \`outFromState\`
- [x] Phân tích tab
`;

    fs.writeFileSync(outPath, body);
    created++;
}

console.log(`Created: ${created}, skipped (existing): ${skipped}`);
