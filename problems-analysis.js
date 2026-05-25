/* ==========================================================================
   PROBLEMS ANALYSIS (problems-analysis.js)
   Sinh nội dung tab Phân tích cho trang chi tiết bài toán
   ========================================================================== */

const PATTERN_DESC = {
    "Array": "Quét mảng một hoặc nhiều lượt, cập nhật trạng thái cục bộ mà không cần cấu trúc phức tạp.",
    "Two Pointers": "Hai chỉ số di chuyển trên mảng/chuỗi để thu hẹp không gian tìm kiếm từ O(N²) xuống O(N).",
    "Sliding Window": "Cửa sổ [left, right] trượt trên dữ liệu tuần tự, mở rộng/thu hẹp theo điều kiện.",
    "Stack": "Ngăn xếp LIFO theo dõi phần tử “gần nhất chưa xử lý xong”.",
    "Linked List": "Con trỏ duyệt hoặc đảo liên kết tại chỗ trên các nút đã cấp phát.",
    "Tree": "Duyệt cây nhị phân theo chiều cao (DFS) hoặc theo tầng (BFS).",
    "Graph": "Duyệt đồ thị/lưới bằng DFS, BFS, topo sort hoặc Union-Find.",
    "Dynamic Programming": "Ghi nhớ kết quả bài toán con; mỗi trạng thái chỉ tính một lần.",
    "Heap": "Heap ưu tiên giữ phần tử cực trị (min/max) với push/pop O(log N).",
    "Binary Search": "Chia đôi phạm vi trên dữ liệu đã có thứ tự hoặc đáp án đơn điệu.",
    "String": "Quét, đếm hoặc hash trên chuỗi ký tự.",
    "Backtracking": "Thử từng lựa chọn, quay lui khi vi phạm ràng buộc.",
    "Design": "Cài đặt cấu trúc dữ liệu với các thao tác được yêu cầu.",
    "Sorting": "Sắp xếp hoặc khai thác thứ tự để giảm số lần so sánh."
};

const CORRECTNESS = {
    "1": "Hash map đảm bảo mỗi cặp (value → index) được tra cứu O(1); duyệt một lượt nên không bỏ sót cặp hợp lệ.",
    "3": "Cửa sổ luôn không chứa ký tự trùng; mỗi ký tự vào/ra cửa sổ tối đa một lần → O(N).",
    "4": "Chia đôi + merge O(log(m+n)) tìm median mà không merge toàn bộ.",
    "11": "Di chuyển con trỏ ở cột thấp hơn không loại bỏ cặp tối ưu tiềm năng vì chiều rộng giảm nhưng chỉ cột thấp mới có thể tăng min(h[L],h[R]).",
    "15": "Sort + anchor i + two-pointer đảm bảo mọi bộ ba được xét; skip duplicate tránh trùng kết quả.",
    "20": "Stack khớp chính xác thứ tự LIFO của ngoặc; stack rỗng cuối cùng ⟺ mọi ngoặc đã đóng đúng.",
    "21": "Dummy node giữ đầu kết quả; mỗi bước nối nút nhỏ hơn nên danh sách kết quả luôn tăng dần.",
    "42": "Prefix max trái/phải xác định mực nước tại mỗi cột; tổng = Σ min(leftMax,rightMax)-height.",
    "51": "Mỗi hàng đặt đúng một queen; hash set cột/chéo kiểm tra va chạm O(1).",
    "76": "Expand right đến khi đủ ký tự; shrink left để tối thiểu window vẫn hợp lệ.",
    "121": "minPrice là giá mua thấp nhất trước ngày i; lợi nhuận tại i là prices[i]-minPrice — duyệt một lượt đủ.",
    "136": "XOR triệt tiêu cặp giống nhau (A^A=0), số lẻ còn lại là đáp án.",
    "141": "Fast gấp đôi slow → nếu có cycle thì fast đuổi kịp slow trong vòng lặp hữu hạn.",
    "198": "dp[i] = max(rob i, skip i); quyết định tại i chỉ phụ thuộc i-1 và i-2.",
    "200": "DFS/BFS đánh dấu visited → mỗi ô land được đếm đúng một lần vào một đảo.",
    "206": "Mỗi liên kết đảo đúng một lần; prev/curr/next không làm mất phần còn lại của list.",
    "322": "dp[a] = min coins để tạo amount a; cập nhật từ coin nhỏ đến lớn tránh dùng lại cùng coin vòng hiện tại.",
    "704": "Mảng đã sort → nghiệm nằm trong [low,high]; mỗi bước loại một nửa không gian."
};

const PITFALLS = {
    "1": [
        "Dùng cùng phần tử hai lần",
        "Quên lưu index trước khi ghi đè key trùng giá trị"
    ],
    "3": [
        "Dùng set thay map index → left nhảy chậm",
        "Quên cập nhật maxLength mỗi bước"
    ],
    "11": [
        "Brute force O(N²) khi two-pointer đủ",
        "Di chuyển nhầm con trỏ ở cột cao hơn"
    ],
    "15": [
        "Quên skip duplicate ở vòng ngoài và trong",
        "Không sort trước khi two-pointer"
    ],
    "20": [
        "Quên kiểm tra stack empty khi gặp ngoặc đóng",
        "Không kiểm tra stack rỗng cuối cùng"
    ],
    "51": [
        "Duyệt cột không check diagonal",
        "Quên backtrack xóa queen khỏi set"
    ],
    "141": [
        "Fast không tăng 2 bước",
        "Nhầm với tìm điểm bắt đầu cycle (Floyd phase 2)"
    ],
    "200": [
        "Sửa grid gốc mà không clone khi cần",
        "Quên đánh dấu visited → đếm trùng đảo"
    ],
    "322": [
        "Khởi tạo dp[0]=0 nhưng các amount khác infinity",
        "Dùng greedy thay DP (sai với coin system)"
    ],
    "704": [
        "Tràn số khi tính mid = (low+high)/2",
        "Vòng while dùng <= thay vì <"
    ],
    "76": [
        "Shrink left quá sớm",
        "Đếm tần suất sai khi ký tự lặp trong t"
    ]
};

const EDGE = {
    "1": [
        "Mảng 2 phần tử",
        "target = tổng hai phần tử cuối",
        "Số âm và dương hỗn hợp"
    ],
    "3": [
        "Chuỗi rỗng → 0",
        "Tất cả ký tự giống nhau → 1",
        "Chuỗi không lặp → len(s)"
    ],
    "11": [
        "Hai cột cùng chiều cao",
        "Mảng 2 phần tử",
        "Tất cả cột tăng dần"
    ],
    "15": [
        "Không có bộ ba → []",
        "Toàn số 0",
        "Nhiều bộ ba trùng giá trị"
    ],
    "20": [
        "Chuỗi rỗng → true",
        "Chỉ một ngoặc mở",
        "Ngoặc đóng đứng trước mở"
    ],
    "42": [
        "Mảng tăng dần → 0 nước",
        "Mảng giảm dần → 0",
        "Đỉnh ở giữa"
    ],
    "121": [
        "Giá chỉ giảm → lợi nhuận 0",
        "Một ngày duy nhất",
        "Giá bằng nhau mọi ngày"
    ],
    "136": [
        "Mảng 1 phần tử",
        "Mảng 3 phần tử (1 lẻ + 1 cặp)"
    ],
    "200": [
        "Không có đảo (toàn 0)",
        "Toàn 1",
        "Lưới 1×N"
    ],
    "704": [
        "Target không tồn tại → -1",
        "Mảng 1 phần tử",
        "Target ở đầu/cuối mảng"
    ],
    "76": [
        "t rỗng → \"\"",
        "Không có window hợp lệ → \"\"",
        "t trùng ký tự (aab vs aa)"
    ]
};

function esc(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

const STEP_TITLES = ['Khởi tạo', 'Duyệt chính', 'Cập nhật', 'Kết luận'];

function compactText(text, max) {
    max = max || 58;
    let s = text
        .replace(/^(Sử dụng|Áp dụng|Ta |Khi |Để |Việc |Bằng cách |Mỗi bước |Đối với )/i, '')
        .replace(/\([^)]*\)/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    if (s.length <= max) return s;
    const cut = s.lastIndexOf(' ', max - 1);
    return s.slice(0, cut > 28 ? cut : max - 1) + '…';
}

function splitSteps(approach) {
    const parts = approach.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.length > 12);
    if (parts.length <= 1) {
        return [{ title: 'Giải thuật', body: compactText(approach, 72) }];
    }
    const merged = parts.length > 4
        ? [...parts.slice(0, 3), parts.slice(3).join(' ')]
        : parts;
    return merged.slice(0, 4).map((body, i) => ({
        title: STEP_TITLES[i] || ('Bước ' + (i + 1)),
        body: compactText(body)
    }));
}

function shortComplexity(raw) {
    const m = raw.match(/O\([^)]+\)/);
    return m ? m[0] : raw.split(' ')[0];
}

function defaultEdge(p) {
    if (EDGE[p.id]) return EDGE[p.id].slice(0, 3);
    if (p.category.includes('Tree')) return ['Cây rỗng', 'Một nút'];
    if (p.category.includes('Linked')) return ['List rỗng', 'Một nút'];
    if (p.category.includes('Graph')) return ['Lưới 1×1', 'Không có đảo'];
    if (p.category.includes('String')) return ['Chuỗi rỗng', 'Một ký tự'];
    return [];
}

function defaultPitfalls(p) {
    return PITFALLS[p.id] ? PITFALLS[p.id].slice(0, 2) : [];
}

function buildAnalysis(p) {
    return {
        pattern: p.category,
        steps: splitSteps(p.approach),
        edgeCases: defaultEdge(p),
        correctness: CORRECTNESS[p.id] || '',
        pitfalls: defaultPitfalls(p),
    };
}

function renderAnalysisHtml(p) {
    const a = buildAnalysis(p);
    const timeCx = shortComplexity(p.timeComplexity);
    const spaceCx = shortComplexity(p.spaceComplexity);

    const stepsHtml = a.steps.map((s, i) =>
        '<li class="analysis-step-compact">' +
        '<span class="step-num">' + (i + 1) + '</span>' +
        '<span class="step-text"><strong>' + esc(s.title) + '</strong> — ' + esc(s.body) + '</span>' +
        '</li>'
    ).join('');

    const edgeTags = a.edgeCases.map(e =>
        '<span class="analysis-tag edge">' + esc(e) + '</span>'
    ).join('');

    const pitTags = a.pitfalls.map(e =>
        '<span class="analysis-tag pit">' + esc(e) + '</span>'
    ).join('');

    const tagsBlock = (edgeTags || pitTags)
        ? '<div class="analysis-tags">' + edgeTags + pitTags + '</div>'
        : '';

    const insightLine = a.correctness
        ? '<p class="analysis-insight-line"><i class="fa-solid fa-check"></i>' + esc(a.correctness) + '</p>'
        : '';

    const memoryShort = compactText(p.memoryTip, 110);

    return `
                <div class="block analysis-compact">
                    <div class="analysis-meta">
                        <span class="pattern-chip">${esc(a.pattern)}</span>
                        <span class="meta-cx"><i class="fa-regular fa-clock"></i>${esc(timeCx)}</span>
                        <span class="meta-cx"><i class="fa-solid fa-memory"></i>${esc(spaceCx)}</span>
                    </div>

                    <ol class="analysis-steps-compact">${stepsHtml}</ol>

                    ${insightLine}
                    ${tagsBlock}

                    <details class="analysis-more">
                        <summary><i class="fa-solid fa-microchip"></i> Bộ nhớ &amp; chi tiết thêm</summary>
                        <p>${esc(memoryShort)}</p>
                    </details>
                </div>`;
}

module.exports = { buildAnalysis, renderAnalysisHtml };
