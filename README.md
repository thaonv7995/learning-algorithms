# Algorithms Explorer

**Version 1.0** — Sách giáo khoa tương tác *Cấu trúc dữ liệu & Giải thuật* kèm thư viện LeetCode (~3.175 bài), visualizer sandbox và checklist QA nội bộ.

Tài liệu này mô tả **bản phát hành chạy được (runtime)** — một process nền phục vụ toàn bộ nội dung qua HTTP local, build tự động trên GitHub Actions cho **macOS**, **Linux** và **Windows**.

> **Trạng thái:** v1 runtime đã có — `algo-explorer` binary, installer, GitHub Actions release.

---

## Tại sao cần bản build, không mở file HTML trực tiếp?

Ứng dụng là static site (~100 MB) nhưng dùng `fetch()` (ví dụ `data/catalog.json`). Trình duyệt **không cho phép** các request đó qua giao thức `file://` — cần **HTTP server local**.

Bản build v1 gói:

| Thành phần | Vai trò |
|---|---|
| `algo-explorer` (binary) | HTTP server nhẹ, chạy nền |
| `www/` | Toàn bộ `index.html`, `algorithms.html`, `problems/`, `visualizers/`, `data/`, … |
| `install.sh` / `install.ps1` | Tải đúng bản OS/arch, cài vào thư mục người dùng, đăng ký chạy nền |

---

## Cài đặt nhanh (một lệnh)

Sau khi [Release](../../releases) v1 được publish, cài và chạy nền:

### macOS / Linux

```bash
curl -fsSL https://github.com/thaonv/Algorithms/releases/latest/download/install.sh | bash
```

Tuỳ chọn:

```bash
# Chỉ tải, không chạy nền
curl -fsSL .../install.sh | bash -s -- --no-start

# Port tùy chỉnh (mặc định 4173)
curl -fsSL .../install.sh | bash -s -- --port 9000

# Mở trình duyệt sau khi cài
curl -fsSL .../install.sh | bash -s -- --open
```

### Windows (PowerShell)

```powershell
irm https://github.com/thaonv/Algorithms/releases/latest/download/install.ps1 | iex
```

### Sau khi cài

| Lệnh | Mô tả |
|---|---|
| `algo-explorer status` | Trạng thái process / port |
| `algo-explorer open` | Mở `http://127.0.0.1:4173` |
| `algo-explorer stop` | Dừng server nền |
| `algo-explorer restart` | Khởi động lại |
| `algo-explorer logs` | Xem log gần nhất |

**URL mặc định**

| Trang | URL |
|---|---|
| Sách giáo khoa | http://127.0.0.1:4173/ |
| Thư viện LeetCode | http://127.0.0.1:4173/algorithms.html |
| Bài chi tiết | http://127.0.0.1:4173/problems/{id}-{slug}.html |

---

## Kiến trúc runtime v1

```
┌─────────────────────────────────────────────────────────┐
│  algo-explorer (single binary per OS/arch)              │
│  ├─ serve      → HTTP static file server                │
│  ├─ install    → copy www/ + register background job    │
│  ├─ start/stop → quản lý PID                            │
│  └─ open       → mở browser                             │
└─────────────────────────────────────────────────────────┘
         │ phục vụ
         ▼
┌─────────────────────────────────────────────────────────┐
│  www/  (bundle nội dung v1)                             │
│  index.html · algorithms.html · problems/ · data/ · …   │
└─────────────────────────────────────────────────────────┘
```

**Mặc định**

- Bind: `127.0.0.1` (chỉ máy local)
- Port: `4173` (override bằng `--port` hoặc `ALGO_EXPLORER_PORT`)
- Thư mục cài: `~/.local/share/algorithms-explorer/` (Linux/macOS) hoặc `%LOCALAPPDATA%\algorithms-explorer\` (Windows)
- PID / log: `~/.local/state/algorithms-explorer/` hoặc tương đương trên từng OS

**Chạy nền theo OS**

| OS | Cơ chế |
|---|---|
| macOS | `launchd` — `~/Library/LaunchAgents/com.algorithms-explorer.server.plist` |
| Linux | `systemd` user service — `~/.config/systemd/user/algorithms-explorer.service` |
| Windows | Scheduled Task / background process — `AlgorithmsExplorer` |

Binary **không** embed toàn bộ 100 MB vào một file duy nhất (artifact quá lớn, khó cache). Thay vào đó mỗi release gồm **binary nhỏ + tarball `www-v1.tar.zst`**, script install giải nén cạnh binary.

---

## GitHub Actions — build matrix

Workflow dự kiến: `.github/workflows/release.yml`

**Trigger:** tag `v*` (ví dụ `v1.0.0`) hoặc `workflow_dispatch`

**Matrix build**

| Target | GOOS | GOARCH | Artifact |
|---|---|---|---|
| macOS Apple Silicon | `darwin` | `arm64` | `algo-explorer-darwin-arm64.tar.gz` |
| macOS Intel | `darwin` | `amd64` | `algo-explorer-darwin-amd64.tar.gz` |
| Linux x64 | `linux` | `amd64` | `algo-explorer-linux-amd64.tar.gz` |
| Linux ARM64 | `linux` | `arm64` | `algo-explorer-linux-arm64.tar.gz` |
| Windows x64 | `windows` | `amd64` | `algo-explorer-windows-amd64.zip` |

**Các bước pipeline**

1. Checkout source (branch/tag v1)
2. `npm` / script đóng gói `www/` (copy file, loại `.git`, `checklist/` dev-only nếu cần)
3. `go build` (hoặc Rust) — binary `algo-explorer` từ `cmd/algo-explorer/`
4. Nén `www/` → `www-v1.tar.zst`
5. Upload artifact theo matrix
6. Tạo GitHub Release, đính kèm:
   - 5 bundle OS/arch
   - `install.sh`
   - `install.ps1`
   - `SHA256SUMS`
7. (Tuỳ chọn) Sign macOS binary + notarize

**Cấu trúc repo (runtime v1)**

```
Algorithms/
├── README.md
├── Makefile                  ← build / pack / serve local
├── go.mod
├── cmd/algo-explorer/        ← CLI + HTTP server
├── internal/
│   ├── server/               ← static file server
│   ├── daemon/               ← start/stop, launchd/systemd
│   ├── install/              ← cài bundle www/
│   ├── config/
│   └── paths/
├── scripts/
│   ├── pack-www.sh
│   ├── install.sh
│   └── install.ps1
├── .github/workflows/
│   ├── ci.yml
│   └── release.yml
├── index.html
├── algorithms.html
├── problems/
├── visualizers/
└── data/
```

### Build & chạy local (dev)

```bash
# Cần Go 1.22+
make pack          # dist/algo-explorer + dist/www/
make serve         # http://127.0.0.1:4173

# Cài vào ~/.local/share/algorithms-explorer
make install-local
make start
algo-explorer open
```

### Publish release

```bash
git tag v1.0.0
git push origin v1.0.0
# → GitHub Actions build 5 platform bundles + install scripts
```

---

## Phát triển nội dung (source hiện tại)

Repo hiện là **static site + toolchain Node** (không bắt buộc khi *chạy* bản build).

```bash
# Chạy local (không cần cài)
make serve

# Hoặc sau khi build
./dist/algo-explorer serve --root dist/www --port 4173

# Regenerate trang bài LeetCode
node generate_problems.js --id=42

# Sync catalog LeetCode (cần mạng)
node scripts/sync-leetcode-catalog.js

# Validate nội dung một bài
node scripts/validate-problem.js --id=42

# Rebuild toàn bộ
node scripts/rebuild-all.js
```

**Yêu cầu dev:** Node.js 18+ (chỉ cho authoring / QA, không cần trên máy end-user).

---

## Nội dung v1

| Module | Mô tả |
|---|---|
| **Sách giáo khoa** (`index.html`) | 16 chương A4, sandbox RAM/con trỏ, dark mode, in PDF |
| **Thư viện LC** (`algorithms.html`) | 3.175 bài, lọc/tìm kiếm, phân trang `?page=` |
| **Chi tiết bài** (`problems/*.html`) | Mô tả, code C/C++/Python, visualizer tương tác |
| **Visualizer** (`visualizers/`) | Step-by-step cho ~50 bài + fallback catalog |
| **Checklist QA** (`checklist/`) | Nội bộ — không ship trong bản runtime end-user |

---

## Cấu hình

| Biến môi trường | Mặc định | Ý nghĩa |
|---|---|---|
| `ALGO_EXPLORER_PORT` | `4173` | Port HTTP |
| `ALGO_EXPLORER_HOST` | `127.0.0.1` | Địa chỉ bind |
| `ALGO_EXPLORER_ROOT` | *(thư mục cài)* | Đường dẫn `www/` |
| `ALGO_EXPLORER_LOG_LEVEL` | `info` | `debug` \| `info` \| `warn` |

File cấu hình tuỳ chọn: `~/.config/algorithms-explorer/config.toml`

---

## Nâng cấp / gỡ cài đặt

```bash
# Nâng cấp lên release mới (giữ config + port)
curl -fsSL .../install.sh | bash -s -- --upgrade

# Gỡ hoàn toàn
algo-explorer uninstall
```

---

## Roadmap

| Phiên bản | Mục tiêu |
|---|---|
| **v1.0** ✅ | Nội dung web + binary `algo-explorer` + CI/release |
| **v1.1** 🔜 | Publish tag `v1.0.0` lên GitHub Releases |
| **v1.2** | Auto-update check; tray icon (tuỳ chọn) |
| **v2** | Electron/Tauri wrapper nếu cần offline 100% không cần browser |

---

## License

*(Chưa xác định — bổ sung trước khi public release.)*

LeetCode problem statements © LeetCode — nội dung sync chỉ dùng cho học tập cá nhân.

---

## Ghi chú triển khai cho maintainer

1. Repo GitHub: `thaonv/Algorithms` (đổi `ALGO_EXPLORER_REPO` nếu fork).
2. Tag `v1.0.0` → workflow `release.yml` tạo Release artifacts.
3. Kiểm thử matrix trên 3 OS trước khi đánh dấu release stable.
4. `checklist/` và `scripts/` dev có thể loại khỏi bundle `www/` để giảm kích thước tải.
