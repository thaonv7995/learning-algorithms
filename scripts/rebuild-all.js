#!/usr/bin/env node
/** Cập nhật toàn bộ: catalog → details → HTML pages */
const { execSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');

console.log('1/3 Sync catalog…');
execSync('node scripts/sync-leetcode-catalog.js', { cwd: root, stdio: 'inherit' });

console.log('\n2/3 Sync problem details…');
execSync('node scripts/sync-leetcode-details.js --concurrency=10 --resume', { cwd: root, stdio: 'inherit' });

console.log('\n3/3 Generate detail pages…');
execSync('node generate_problems.js', { cwd: root, stdio: 'inherit' });

console.log('\n✓ All done.');
