#!/usr/bin/env node
/**
 * Inject s.outputText on every [KẾT QUẢ] log where missing,
 * so VizCore Output panel resolves via extractOutput / LC_OUTPUT_FALLBACK.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const VIZ = path.join(ROOT, 'visualizers');

const TARGETS = fs.readdirSync(VIZ)
    .filter(f => f.startsWith('lc') && f.endsWith('.js') && f !== 'lc-outputs.js' && f !== 'lc-patterns.js');

const LOG_RE = /log\(\s*`\[KẾT QUẢ\]\s*([\s\S]*?)`\s*,\s*("[^"]*"|'[^']*'|\([^)]*\)|[^,)]+)\s*\)/;

function hasOutputText(line) {
    return /s\.outputText\s*=/.test(line);
}

function patchLine(line) {
    if (!line.includes('[KẾT QUẢ]')) return { line, changed: false };
    if (hasOutputText(line)) return { line, changed: false };

    const m = line.match(LOG_RE);
    if (!m) return { line, changed: false };

    const body = m[1];
    const insert = `s.outputText = String(\`${body}\`); `;

    // Insert after s.done = true if present on same line
    if (/s\.done\s*=\s*true/.test(line)) {
        const patched = line.replace(/s\.done\s*=\s*true\s*;\s*/, 's.done = true; ' + insert);
        return { line: patched, changed: patched !== line };
    }

    // Insert before log(
    const patched = line.replace(LOG_RE, insert + m[0]);
    return { line: patched, changed: patched !== line };
}

function patchFile(rel) {
    const fp = path.join(VIZ, rel);
    if (!fs.existsSync(fp)) {
        console.warn('skip (missing):', rel);
        return 0;
    }
    const src = fs.readFileSync(fp, 'utf8');
    const lines = src.split('\n');
    let changes = 0;
    let pendingDone = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/s\.done\s*=\s*true/.test(line) && !hasOutputText(line)) {
            pendingDone = true;
        }
        if (line.includes('[KẾT QUẢ]')) {
            const { line: patched, changed } = patchLine(line);
            if (changed) {
                lines[i] = patched;
                changes++;
            } else if (pendingDone && !hasOutputText(line)) {
                // s.done on previous line(s), log on this line
                const m = line.match(LOG_RE);
                if (m) {
                    const body = m[1];
                    const insert = `s.outputText = String(\`${body}\`); `;
                    lines[i] = line.replace(LOG_RE, insert + m[0]);
                    changes++;
                }
            }
            pendingDone = false;
        } else if (line.trim() && !line.trim().startsWith('//') && !/^\s*$/.test(line)) {
            if (!/s\.done\s*=\s*true/.test(line)) pendingDone = false;
        }
    }

    if (changes) fs.writeFileSync(fp, lines.join('\n'));
    return changes;
}

let total = 0;
for (const f of TARGETS) {
    const n = patchFile(f);
    if (n) console.log(`${f}: +${n} outputText`);
    total += n;
}
console.log(`Done. ${total} lines patched.`);
