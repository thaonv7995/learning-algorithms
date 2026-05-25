#!/usr/bin/env node
/**
 * Tải mô tả, ví dụ, hints, code snippets từ LeetCode GraphQL.
 * Chạy: node scripts/sync-leetcode-details.js [--concurrency=8] [--limit=100] [--resume]
 */

const fs = require('fs');
const path = require('path');

const CATALOG = path.join(__dirname, '..', 'data', 'catalog.json');
const DETAIL_DIR = path.join(__dirname, '..', 'data', 'details');

const QUERY = `
query question($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionFrontendId
    title
    difficulty
    content
    exampleTestcases
    hints
    topicTags { name slug }
    codeSnippets { lang langSlug code }
  }
}`;

function parseArgs() {
    const args = { concurrency: 8, limit: 0, resume: false, id: 0 };
    process.argv.slice(2).forEach(a => {
        if (a === '--resume') args.resume = true;
        else if (a.startsWith('--concurrency=')) args.concurrency = parseInt(a.split('=')[1], 10);
        else if (a.startsWith('--limit=')) args.limit = parseInt(a.split('=')[1], 10);
        else if (a.startsWith('--id=')) args.id = parseInt(a.split('=')[1], 10);
    });
    return args;
}

async function fetchDetail(slug) {
    const res = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: QUERY, variables: { titleSlug: slug } }),
    });
    const json = await res.json();
    if (json.errors?.length) throw new Error(json.errors[0].message);
    return json.data?.question;
}

async function pool(items, concurrency, worker) {
    let idx = 0;
    const results = [];
    async function run() {
        while (idx < items.length) {
            const i = idx++;
            results[i] = await worker(items[i], i);
        }
    }
    await Promise.all(Array.from({ length: concurrency }, run));
    return results;
}

async function main() {
    const args = parseArgs();
    if (!fs.existsSync(CATALOG)) {
        console.error('Missing data/catalog.json — run sync-leetcode-catalog.js first.');
        process.exit(1);
    }
    if (!fs.existsSync(DETAIL_DIR)) fs.mkdirSync(DETAIL_DIR, { recursive: true });

    const catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
    let problems = catalog.problems || [];

    if (args.id) problems = problems.filter(p => p.id === args.id);
    if (args.limit) problems = problems.slice(0, args.limit);

    if (args.resume) {
        const before = problems.length;
        problems = problems.filter(p => !fs.existsSync(path.join(DETAIL_DIR, `${p.id}.json`)));
        console.log(`Resume: skip ${before - problems.length} existing, ${problems.length} remaining.`);
    }

    console.log(`Syncing ${problems.length} problem details (concurrency=${args.concurrency})…`);

    let done = 0;
    let failed = 0;

    await pool(problems, args.concurrency, async (p) => {
        try {
            const q = await fetchDetail(p.slug);
            if (!q) throw new Error('empty response');
            const payload = {
                id: parseInt(q.questionFrontendId, 10),
                title: q.title,
                slug: p.slug,
                difficulty: q.difficulty,
                contentHtml: q.content,
                exampleTestcases: q.exampleTestcases,
                hints: q.hints || [],
                tags: (q.topicTags || []).map(t => t.name),
                codeSnippets: q.codeSnippets || [],
                syncedAt: new Date().toISOString(),
            };
            fs.writeFileSync(path.join(DETAIL_DIR, `${p.id}.json`), JSON.stringify(payload), 'utf8');
            done++;
        } catch (err) {
            failed++;
            console.error(`  ✗ #${p.id} ${p.slug}: ${err.message}`);
        }
        if ((done + failed) % 50 === 0 || done + failed === problems.length) {
            process.stdout.write(`\r  ${done + failed}/${problems.length} (${done} ok, ${failed} err)`);
        }
    });

    console.log(`\nDone. ${done} saved, ${failed} failed → ${DETAIL_DIR}`);
}

main().catch(e => { console.error(e); process.exit(1); });
