# Chuẩn QA — Algorithms Explorer

Mỗi bài **LC #N** chỉ được coi là hoàn thành khi **tất cả** hạng mục dưới đây pass.  
Chạy kiểm tra tự động: `node scripts/validate-problem.js --id=N`

---

## A. Nội dung đề bài (`content/problems/N.json`)

| # | Tiêu chí | Pass |
|---|----------|------|
| A1 | `description` tiếng Việt, ≥50 ký tự, không chỉ tên bài | ☐ |
| A2 | Không chứa "Xem đề", "…" làm output, stub editorial | ☐ |
| A3 | ≥2 `examples` với input/output cụ thể | ☐ |
| A4 | `approach` mô tả thuật toán thật (không câu stub chung) | ☐ |
| A5 | `memoryTip` gợi nhớ pattern/invariant | ☐ |
| A6 | Python + C++ solution hoạt động (không `pass`) | ☐ |
| A7 | `analysis`: correctness, edgeCases, pitfalls **theo bài** | ☐ |
| A8 | `tier: "done"` chỉ khi A1–A7 pass | ☐ |

---

## B. Sandbox / mô phỏng

| # | Tiêu chí | Pass |
|---|----------|------|
| B1 | Visualizer riêng (không catalog-fallback / STUBS generic) | ☐ |
| B2 | Log `[Khởi tạo]` với input mẫu | ☐ |
| B3 | Mỗi step log biến/trạng thái rõ ràng | ☐ |
| B4 | Step cuối: log `[KẾT QUẢ]` kèm giá trị | ☐ |
| B5 | Controls đổi input + nút Áp dụng hoạt động | ☐ |
| B6 | Input sai → thông báo lỗi (log hoặc `vizError`), không im lặng | ☐ |

---

## C. Output panel

| # | Tiêu chí | Pass |
|---|----------|------|
| C1 | `R[N]` trong `lc-outputs.js` hoặc `state.vizOutput` | ☐ |
| C2 | Sau khi chạy hết: hiện **giá trị/ danh sách** kết quả | ☐ |
| C3 | Không chỉ hiện "xem log bên dưới" khi đã có kết quả trong state | ☐ |
| C4 | Trước khi xong: "Chưa có kết quả — tiếp tục Step…" | ☐ |
| C5 | Bài không có output scalar → ghi rõ trong review (vd. chỉ liệt kê paths) | ☐ |

---

## D. Trang HTML

| # | Tiêu chí | Pass |
|---|----------|------|
| D1 | `node generate_problems.js --id=N` đã chạy | ☐ |
| D2 | Tab Bài toán hiển thị description + examples từ content JSON | ☐ |
| D3 | Tab Giải pháp có code Py/C++/C | ☐ |
| D4 | Tab Phân tích có nội dung cụ thể | ☐ |
| D5 | iframe sandbox load visualizer đúng | ☐ |

---

## E. Review file

| # | Tiêu chí | Pass |
|---|----------|------|
| E1 | File `checklist/reviews/NNNN-slug.md` tồn tại | ☐ |
| E2 | Tick đủ A–D; ghi ngày + người review | ☐ |
| E3 | Ghi chú nếu có ngoại lệ (vd. không có output panel) | ☐ |

---

## Trạng thái checklist (`checklist/index.json`)

- `tier: "catalog"` — stub, chưa QA
- `tier: "done"` + `status: "done"` — chỉ sau khi E pass
- `status: "pending"` — đang chờ hoặc fail validate

Audit toàn bộ: `node scripts/audit-content.js`  
Audit một bài: `node scripts/validate-problem.js --id=N`  
**Theo dõi 3175 bài:** [MASTER-QA.md](./MASTER-QA.md) — tick A–E + QA PASS từng bài
