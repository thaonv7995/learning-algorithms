#!/usr/bin/env node
/**
 * Scan content/problems/*.json for QA failures.
 * Usage: node scripts/audit-content.js [--limit=50] [--fail-only]
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONTENT = path.join(__dirname, '..', 'content', 'problems');
const limitArg = process.argv.find(a => a.startsWith('--limit='));
const failOnly = process.argv.includes('--fail-only');
const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : Infinity;

const files = fs.readdirSync(CONTENT).filter(f => /^\d+\.json$/.test(f)).sort((a, b) => {
    return parseInt(a, 10) - parseInt(b, 10);
});

let checked = 0;
let failed = 0;
const failures = [];

for (const f of files) {
    if (checked >= limit) break;
    const id = parseInt(f.replace('.json', ''), 10);
    checked++;
    try {
        execSync(`node scripts/validate-problem.js --id=${id}`, { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
    } catch (e) {
        failed++;
        let errs = [];
        try {
            const out = JSON.parse(e.stdout?.toString() || e.stderr?.toString() || '{}');
            errs = out.errors || [];
        } catch { errs = ['validate error']; }
        failures.push({ id, errors: errs });
        if (!failOnly) console.log(`#${id} FAIL: ${errs[0]}`);
    }
}

console.log('\n--- Audit summary ---');
console.log(`Checked: ${checked} | Failed: ${failed} | Pass: ${checked - failed}`);
if (failures.length && failures.length <= 30) {
    failures.forEach(({ id, errors }) => console.log(`  #${id}: ${errors.slice(0, 2).join('; ')}`));
} else if (failures.length > 30) {
    console.log(`  (first 10 failures)`);
    failures.slice(0, 10).forEach(({ id, errors }) => console.log(`  #${id}: ${errors[0]}`));
}
