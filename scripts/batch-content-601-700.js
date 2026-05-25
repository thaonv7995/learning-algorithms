#!/usr/bin/env node
/** One-shot batch writer for content/problems/601-700.json */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'content', 'problems');
const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'catalog.json'), 'utf8'));
const meta = Object.fromEntries(
  catalog.problems.filter(p => p.id >= 601 && p.id <= 700).map(p => [p.id, p])
);

const CONTENT = require('./data/problems-601-700-content.js');

let written = [];
for (const [idStr, body] of Object.entries(CONTENT)) {
  const id = parseInt(idStr, 10);
  const m = meta[id];
  if (!m) continue;
  const obj = {
    id,
    title: m.title,
    difficulty: m.difficulty,
    category: body.category || (m.tags && m.tags[0]) || 'Array',
    timeComplexity: body.timeComplexity,
    spaceComplexity: body.spaceComplexity,
    description: body.description,
    examples: body.examples,
    approach: body.approach,
    memoryTip: body.memoryTip,
    solutions: body.solutions,
    analysis: body.analysis,
    tier: 'done',
  };
  fs.writeFileSync(path.join(OUT, `${id}.json`), JSON.stringify(obj, null, 2) + '\n');
  written.push(id);
}
written.sort((a, b) => a - b);
console.log('written:', written.length);
console.log('ids:', written.join(', '));
