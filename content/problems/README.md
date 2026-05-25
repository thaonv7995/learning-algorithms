# Nội dung tay cho từng bài (manual override)

Khi hoàn thiện một bài trong checklist, tạo file `{id}.json` ở đây.

Generator ưu tiên file này hơn dữ liệu auto từ LeetCode.

Sau khi sửa:

```bash
node generate_problems.js --id=2
```

Cập nhật `checklist/index.json` → `"status": "done"`.
