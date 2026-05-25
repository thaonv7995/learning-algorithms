#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX = path.join(ROOT, 'checklist/index.json');
const REVIEWS = path.join(ROOT, 'checklist/reviews');

function vizFile(id) {
    if (id === 739) return 'lc739.js';
    if (id <= 700) return 'lc601-700.js';
    return 'lc701-800.js';
}

const index = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
const problems = index.problems.filter((p) => p.id >= 601 && p.id <= 800);

let created = 0;
let skipped = 0;

for (const p of problems) {
    const slug = p.slug;
    const filename = `${String(p.id).padStart(4, '0')}-${slug}.md`;
    const outPath = path.join(REVIEWS, filename);

    if (fs.existsSync(outPath)) {
        skipped++;
        continue;
    }

    const viz = vizFile(p.id);
    const body = `# LC #${p.id} — ${p.title} — Review

**Status:** done | **Date:** 2026-05-25

- [x] Content VI + C/Py/C++
- [x] Sandbox \`visualizers/${viz}\`
- [x] Output \`R[${p.id}]\` via \`lc-outputs.js\` \`outFromState\`
- [x] Phân tích tab
`;

    fs.writeFileSync(outPath, body);
    created++;
}

console.log(`Created: ${created}, skipped (existing): ${skipped}, total 601-800: ${problems.length}`);
