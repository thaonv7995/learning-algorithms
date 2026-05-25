/**
 * Gộp catalog + premium (problems-data) + detail JSON (LeetCode) → record thống nhất cho generator.
 */

const COMPLEXITY = {
    'Binary Search': { time: 'O(log N)', space: 'O(1)' },
    'Dynamic Programming': { time: 'O(N²)', space: 'O(N)' },
    'Graph': { time: 'O(V + E)', space: 'O(V)' },
    'Tree': { time: 'O(N)', space: 'O(H)' },
    'Heap (Priority Queue)': { time: 'O(N log N)', space: 'O(N)' },
    'Hash Table': { time: 'O(N)', space: 'O(N)' },
    'Sorting': { time: 'O(N log N)', space: 'O(1)' },
    'Stack': { time: 'O(N)', space: 'O(N)' },
    'Queue': { time: 'O(N)', space: 'O(N)' },
    'Linked List': { time: 'O(N)', space: 'O(1)' },
    'Two Pointers': { time: 'O(N)', space: 'O(1)' },
    'Sliding Window': { time: 'O(N)', space: 'O(1)' },
    'Backtracking': { time: 'O(2^N)', space: 'O(N)' },
    'Greedy': { time: 'O(N log N)', space: 'O(1)' },
    'Divide and Conquer': { time: 'O(N log N)', space: 'O(log N)' },
    'Union Find': { time: 'O(N α(N))', space: 'O(N)' },
    'Trie': { time: 'O(N)', space: 'O(N)' },
    'Array': { time: 'O(N)', space: 'O(1)' },
    'String': { time: 'O(N)', space: 'O(1)' },
    'Math': { time: 'O(1)', space: 'O(1)' },
    'Bit Manipulation': { time: 'O(1)', space: 'O(1)' },
};

const MEMORY = {
    'Hash Table': 'Bảng băm lưu trên Heap — tra cứu O(1) trung bình, tốn O(N) bộ nhớ phụ.',
    'Dynamic Programming': 'Mảng/ bảng DP trên Heap hoặc Stack — O(N) hoặc O(N²) tùy bài.',
    'Tree': 'Đệ quy dùng Call Stack O(H); BFS dùng queue O(W) tầng rộng nhất.',
    'Graph': 'Visited set hoặc mảng đánh dấu — O(V) bộ nhớ phụ.',
    'Linked List': 'Chỉ con trỏ duyệt tại chỗ — O(1) nếu không tạo nút mới.',
    'Stack': 'Stack frame hoặc mảng stack — O(N) worst case.',
    'Two Pointers': 'Hai chỉ số trên mảng gốc — O(1) bộ nhớ phụ.',
    'Sliding Window': 'Cửa sổ + mảng đếm cố định — thường O(1) hoặc O(Σ alphabet).',
    'Binary Search': 'Biến low/high/mid trên Stack — O(1) bộ nhớ phụ.',
    'Heap (Priority Queue)': 'Heap array trên Heap — O(N) cho N phần tử.',
};

function stripHtml(html) {
    return (html || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function parseExamples(raw) {
    if (!raw) return [];
    const chunks = raw.split('\n').map(s => s.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i < chunks.length - 1; i += 2) {
        out.push({ input: chunks[i], output: chunks[i + 1] });
    }
    if (!out.length && chunks.length) {
        out.push({ input: chunks[0], output: '(xem LeetCode)' });
    }
    return out;
}

function pickSnippet(snippets, langSlug) {
    if (!snippets?.length) return '';
    const exact = snippets.find(s => s.langSlug === langSlug);
    if (exact) return exact.code;
    if (langSlug === 'python') {
        return snippets.find(s => s.langSlug === 'python3')?.code || '';
    }
    return '';
}

function inferComplexity(tags, category) {
    for (const t of [...(tags || []), category]) {
        if (COMPLEXITY[t]) return COMPLEXITY[t];
    }
    return { time: 'O(N)', space: 'O(1)' };
}

function inferMemory(tags, category) {
    for (const t of [...(tags || []), category]) {
        if (MEMORY[t]) return MEMORY[t];
    }
    return 'Thuật toán chạy in-place hoặc dùng cấu trúc phụ tỉ lệ với input — xem phân tích độ phức tạp.';
}

function buildApproach(premium, detail) {
    if (premium?.approach) return premium.approach;
    const hints = (detail?.hints || []).filter(Boolean);
    if (hints.length) return hints.join(' ');
    const tags = detail?.tags || [];
    const main = tags[0] || 'thuật toán phù hợp';
    return `Áp dụng kỹ thuật ${main}${tags[1] ? ' kết hợp ' + tags[1] : ''}. `
        + 'Xác định trạng thái cần duy trì, duyệt input theo một hướng rõ ràng, '
        + 'cập nhật đáp án tại mỗi bước và trả kết quả khi xong. '
        + 'Xem editorial trên LeetCode để biết lời giải tối ưu.';
}

function mergeProblem(catalogEntry, premium, detail) {
    const tags = catalogEntry.tags || detail?.tags || [];
    const category = premium?.category || catalogEntry.category || tags[0] || 'General';
    const cx = premium
        ? { time: premium.timeComplexity, space: premium.spaceComplexity }
        : inferComplexity(tags, category);

    const examples = premium?.examples?.length
        ? premium.examples
        : parseExamples(detail?.exampleTestcases);

    const descriptionHtml = premium
        ? null
        : (detail?.contentHtml || '<p>Mô tả chưa đồng bộ — chạy <code>node scripts/sync-leetcode-details.js</code>.</p>');

    const descriptionText = premium
        ? premium.description
        : stripHtml(detail?.contentHtml);

    const snippets = detail?.codeSnippets || [];
    const cppRaw = premium?.code
        ? null
        : (pickSnippet(snippets, 'cpp') || pickSnippet(snippets, 'c++') || '');

    return {
        id: catalogEntry.id,
        title: premium?.title || catalogEntry.title,
        slug: catalogEntry.slug,
        difficulty: premium?.difficulty || catalogEntry.difficulty,
        category,
        tags,
        tier: premium ? 'premium' : (catalogEntry.tier || 'catalog'),
        timeComplexity: cx.time,
        spaceComplexity: cx.space,
        description: descriptionText,
        descriptionHtml,
        examples,
        approach: buildApproach(premium, detail),
        memoryTip: premium?.memoryTip || inferMemory(tags, category),
        codeHtml: premium?.code || null,
        codeCpp: cppRaw,
        codePython: pickSnippet(snippets, 'python') || pickSnippet(snippets, 'python3'),
        codeC: pickSnippet(snippets, 'c'),
        acRate: catalogEntry.acRate,
    };
}

module.exports = {
    mergeProblem,
    stripHtml,
    parseExamples,
    pickSnippet,
};
