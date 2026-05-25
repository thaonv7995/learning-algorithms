# Checklist hoàn thiện 3,175 bài LeetCode

Quy trình **thủ công từng bài** — không batch-refactor hàng loạt.

## Trạng thái

| Status | Ý nghĩa |
|--------|---------|
| `pending` | Chưa review |
| `in-progress` | Đang làm |
| `done` | Đã hoàn thiện đủ tiêu chí |

## Tiêu chí `done` (tick hết mới đánh dấu xong)

- [ ] **Mô tả** — tiếng Việt rõ ràng, ví dụ đầy đủ
- [ ] **Giải pháp** — ý tưởng chi tiết + code C / Python / C++ (lời giải, không chỉ template)
- [ ] **Phân tích** — steps, complexity, edge cases, pitfalls, RAM
- [ ] **Sandbox** — mô phỏng chạy được, input áp dụng được
- [ ] **UI** — layout/detail.css nhất quán với bài premium

## Cấu trúc thư mục

```
checklist/
  index.json          ← danh sách 3,175 bài + status
  reviews/NNNN-slug.md ← ghi chú review từng bài
content/problems/NN.json ← nội dung tay (override generator)
visualizers/lcN.js    ← sandbox riêng (nếu cần)
```

## Quy trình mỗi bài

1. Mở `checklist/index.json` → đổi bài đó thành `in-progress`
2. Mở trang detail + sandbox, ghi nhận thiếu gì vào `checklist/reviews/`
3. Sửa: `content/problems/{id}.json`, visualizer, `problems-solutions.js`, `problems-analysis.js`
4. Sinh lại **một** trang: `node generate_problems.js --id=2`
5. Test thủ công → tick tiêu chí trong file review
6. Cập nhật `index.json` → `done`

## Xem tiến độ

Mở `checklist/checklist.html` trong browser (cần local server).

## Lệnh hữu ích (từng bài)

```bash
node generate_problems.js --id=2    # sinh lại 1 trang detail
```
