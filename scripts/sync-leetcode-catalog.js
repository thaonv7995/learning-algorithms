#!/usr/bin/env node
/**
 * Đồng bộ catalog LeetCode qua GraphQL API (miễn phí + metadata + tags).
 * Chạy: node scripts/sync-leetcode-catalog.js [--include-paid]
 * Output: data/catalog.json
 */

const fs = require('fs');
const path = require('path');

const PREMIUM = require('../problems-data.js');
const PREMIUM_BY_ID = new Map(PREMIUM.map(p => [p.id, p]));

const OUT_DIR = path.join(__dirname, '..', 'data');
const OUT_FILE = path.join(OUT_DIR, 'catalog.json');

const QUERY = `
query problemList($skip: Int!, $limit: Int!) {
  problemsetQuestionListV2(
    categorySlug: ""
    limit: $limit
    skip: $skip
    filters: {
      filterCombineType: ALL
      statusFilter: { questionStatuses: [] }
      difficultyFilter: { difficulties: [] }
      topicFilter: { topicSlugs: [] }
    }
  ) {
    totalLength
    questions {
      questionFrontendId
      title
      titleSlug
      difficulty
      paidOnly
      acRate
      topicTags { name slug }
    }
  }
}`;

const DIFF = { EASY: 'Easy', MEDIUM: 'Medium', HARD: 'Hard' };
const BATCH = 100;
const DELAY_MS = 250;

const includePaid = process.argv.includes('--include-paid');

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function slugify(title) {
    return title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
}

async function fetchBatch(skip, limit) {
    const res = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: QUERY, variables: { skip, limit } }),
    });
    if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}`);
    const json = await res.json();
    if (json.errors?.length) throw new Error(json.errors[0].message);
    return json.data.problemsetQuestionListV2;
}

function buildEntry(q) {
    const id = parseInt(q.questionFrontendId, 10);
    const tags = (q.topicTags || []).map(t => t.name);
    const premium = PREMIUM_BY_ID.get(id);

    const entry = {
        id,
        title: premium?.title || q.title,
        slug: q.titleSlug || slugify(q.title),
        difficulty: premium?.difficulty || DIFF[q.difficulty] || 'Medium',
        category: premium?.category || tags[0] || 'General',
        tags,
        tier: premium ? 'premium' : 'catalog',
        paid: !!q.paidOnly,
        acRate: q.acRate != null ? Math.round(q.acRate * 1000) / 10 : null,
    };

    if (premium?.description) {
        entry.teaser = premium.description.replace(/\s+/g, ' ').slice(0, 120);
    }

    return entry;
}

async function main() {
    console.log('Fetching LeetCode problem list…');
    const first = await fetchBatch(0, BATCH);
    const total = first.totalLength;
    const all = [...first.questions];

    for (let skip = BATCH; skip < total; skip += BATCH) {
        process.stdout.write(`\r  ${Math.min(skip + BATCH, total)} / ${total}`);
        await sleep(DELAY_MS);
        const batch = await fetchBatch(skip, BATCH);
        all.push(...batch.questions);
    }
    console.log(`\nFetched ${all.length} problems.`);

    let entries = all.map(buildEntry);

    if (!includePaid) {
        const before = entries.length;
        entries = entries.filter(e => !e.paid);
        console.log(`Filtered paid-only: ${before - entries.length} removed → ${entries.length} free problems.`);
    }

    entries.sort((a, b) => a.id - b.id);

    const stats = {
        total: entries.length,
        premium: entries.filter(e => e.tier === 'premium').length,
        catalog: entries.filter(e => e.tier === 'catalog').length,
        easy: entries.filter(e => e.difficulty === 'Easy').length,
        medium: entries.filter(e => e.difficulty === 'Medium').length,
        hard: entries.filter(e => e.difficulty === 'Hard').length,
        paid: entries.filter(e => e.paid).length,
        syncedAt: new Date().toISOString(),
    };

    const tagCounts = {};
    entries.forEach(e => {
        (e.tags.length ? e.tags : [e.category]).forEach(t => {
            tagCounts[t] = (tagCounts[t] || 0) + 1;
        });
    });
    const topTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 30)
        .map(([name, count]) => ({ name, count }));

    const payload = { stats, topTags, problems: entries };

    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
    fs.writeFileSync(OUT_FILE, JSON.stringify(payload), 'utf8');

    console.log('\nCatalog written:', OUT_FILE);
    console.log('Stats:', stats);
    console.log('Top tags:', topTags.slice(0, 8).map(t => t.name).join(', '));
}

main().catch(err => {
    console.error('Sync failed:', err.message);
    process.exit(1);
});
