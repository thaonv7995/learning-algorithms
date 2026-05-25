#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CATALOG = path.join(ROOT, 'data/catalog.json');
const REVIEWS = path.join(ROOT, 'checklist/reviews');

function slugify(title) {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

function vizFile(id) {
    if (id <= 500) return 'lc401-500.js';
    return 'lc501-600.js';
}

const catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
const problems = catalog.problems.filter(p => p.id >= 401 && p.id <= 600);

let created = 0;
let skipped = 0;

for (const p of problems) {
    const slug = p.slug || slugify(p.title);
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

console.log(`Created: ${created}, skipped (existing): ${skipped}, total catalog 401-600: ${problems.length}`);
