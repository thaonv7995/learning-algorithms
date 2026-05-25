# Algorithms Explorer

**Interactive document & LeetCode library — Version 1.0**

Tài liệu tương tác *Cấu trúc dữ liệu & Giải thuật*, kèm thư viện ~3.175 bài LeetCode, visualizer step-by-step và sandbox C. Phát hành dưới dạng **local server** chạy nền — một lệnh cài đặt, mở trình duyệt và học offline trên máy.

| | |
|---|---|
| **Runtime** | `algo-explorer` — Go binary, không cần Node.js khi dùng |
| **Default URL** | http://127.0.0.1:27909 |
| **Platforms** | macOS (Intel / Apple Silicon) · Linux (x64 / ARM64) · Windows x64 |
| **Repo** | [thaonv7995/learning-algorithms](https://github.com/thaonv7995/learning-algorithms) |

---

## Mục lục

- [Tổng quan](#tổng-quan)
- [Cài đặt](#cài-đặt)
- [Sử dụng hàng ngày](#sử-dụng-hàng-ngày)
- [Nội dung](#nội-dung)
- [Kiến trúc](#kiến-trúc)
- [Cấu hình](#cấu-hình)
- [Phát triển](#phát-triển)
- [Release & CI](#release--ci)
- [Roadmap](#roadmap)
- [License](#license)

---

## Tổng quan

Algorithms Explorer gồm hai phần chính:

1. **Tài liệu** — 16 chương in A4, diagram tương tác, sandbox bộ nhớ/con trỏ, dark mode.
2. **Thư viện LeetCode** — catalog đầy đủ, lọc theo độ khó/chủ đề, trang chi tiết kèm code và visualizer.

Ứng dụng là static site (~100 MB) nhưng phụ thuộc `fetch()` (ví dụ `data/catalog.json`). Trình duyệt **chặn** các request đó qua `file://`, nên cần **HTTP server local**. Binary `algo-explorer` đảm nhiệm việc đó: cài một lần, chạy nền, quên đi.

```
  Browser                    algo-explorer (background)
  ───────                    ──────────────────────────
  localhost:27909  ◄──────►  static server → www/
       │                              │
       ├─ /  (document)               ├─ index.html
       ├─ /algorithms.html           ├─ problems/
       └─ /problems/…                └─ visualizers/ · data/
```

---

## Cài đặt

### Yêu cầu

- macOS 11+ · Linux (glibc) · Windows 10+
- Trình duyệt hiện đại (Chrome, Firefox, Safari, Edge)
- **Không** cần Node.js, Python hay Docker

### Một lệnh (khuyến nghị)

**macOS / Linux**

```bash
curl -fsSL https://github.com/thaonv7995/learning-algorithms/releases/latest/download/install.sh | bash
```

**Windows (PowerShell)**

```powershell
irm https://github.com/thaonv7995/learning-algorithms/releases/latest/download/install.ps1 | iex
```

Script sẽ: tải đúng bản OS/CPU → giải nén vào thư mục người dùng → đăng ký service nền → khởi động server.

### Tuỳ chọn khi cài

```bash
curl -fsSL https://github.com/thaonv7995/learning-algorithms/releases/latest/download/install.sh | bash -s -- \
  --port 27909 \
  --open          # mở browser sau cài
  --no-start      # chỉ cài, không chạy nền
  --upgrade       # ghi đè bản cũ
```

Fork repo khác: `ALGO_EXPLORER_REPO=owner/repo bash install.sh`

### Cài thủ công (từ source)

```bash
git clone https://github.com/thaonv7995/learning-algorithms.git
cd Algorithms
make install-local   # cần Go 1.22+
make start
```

Đảm bảo `~/.local/bin` có trong `PATH`:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

---

## Sử dụng hàng ngày

### CLI

| Lệnh | Mô tả |
|---|---|
| `algo-explorer status` | Kiểm tra process và URL |
| `algo-explorer open` | Mở trình duyệt tại URL mặc định |
| `algo-explorer stop` | Dừng server |
| `algo-explorer restart` | Khởi động lại |
| `algo-explorer logs` | In ~40 dòng log gần nhất |
| `algo-explorer uninstall` | Gỡ cài đặt và xoá dữ liệu local |

### Trang chính

| Trang | URL |
|---|---|
| Tài liệu | http://127.0.0.1:27909/ |
| Thư viện LeetCode | http://127.0.0.1:27909/algorithms.html |
| Chi tiết bài | http://127.0.0.1:27909/problems/{id}-{slug}.html |

Thư viện hỗ trợ phân trang qua query string: `algorithms.html?page=12` — reload vẫn giữ trang hiện tại.

### Gỡ cài đặt

```bash
algo-explorer uninstall
```

---

## Nội dung

| Module | Path | Mô tả |
|---|---|---|
| Tài liệu | `index.html` | 16 chương A4, TOC, sandbox RAM, in PDF |
| Library | `algorithms.html` | 3.175 bài, search, filter, pagination |
| Problems | `problems/*.html` | Statement, ví dụ, code C/C++/Python |
| Visualizers | `visualizers/` | Animation step-by-step + catalog fallback |
| Catalog data | `data/catalog.json` | Metadata LeetCode (sync từ API) |

> `checklist/` và `content/` dùng cho QA/authoring nội bộ — **không** đóng gói trong bản runtime end-user.

---

## Kiến trúc

### Thành phần release

| Artifact | Vai trò |
|---|---|
| `algo-explorer` | CLI + HTTP static server (~10 MB) |
| `www/` | Bundle nội dung web (~66 MB nén) |
| `install.sh` / `install.ps1` | Installer một lệnh |

Mỗi platform release là archive (`tar.gz` / `zip`) chứa binary + thư mục `www/`.

### Service nền

| OS | Cơ chế |
|---|---|
| macOS | `launchd` → `~/Library/LaunchAgents/com.algorithms-explorer.server.plist` |
| Linux | `systemd` user → `~/.config/systemd/user/algorithms-explorer.service` |
| Windows | Background process (detached) |

Nếu service manager không khả dụng, fallback sang process detached + PID file.

### Thư mục trên máy người dùng

| Path | Nội dung |
|---|---|
| `~/.local/share/algorithms-explorer/` | Binary + `www/` (Linux/macOS) |
| `%LOCALAPPDATA%\algorithms-explorer\` | Tương đương Windows |
| `~/.local/state/algorithms-explorer/` | PID, log |
| `~/.config/algorithms-explorer/config.env` | Host, port, root |
| `~/.local/bin/algo-explorer` | Symlink CLI |

### Cấu trúc repository

```
Algorithms/
├── cmd/algo-explorer/       # CLI entrypoint
├── internal/
│   ├── server/              # Static HTTP handler
│   ├── daemon/              # start/stop, launchd/systemd
│   ├── install/             # Bundle installer
│   ├── config/
│   └── paths/
├── scripts/
│   ├── pack-www.sh          # Đóng gói runtime bundle
│   ├── install.sh
│   └── install.ps1
├── .github/workflows/
│   ├── ci.yml               # Build + smoke test
│   └── release.yml          # Multi-platform release
├── index.html · algorithms.html
├── problems/ · visualizers/ · data/
├── Makefile
└── go.mod
```

---

## Cấu hình

### Biến môi trường

| Biến | Mặc định | Mô tả |
|---|---|---|
| `ALGO_EXPLORER_HOST` | `127.0.0.1` | Địa chỉ bind (chỉ local) |
| `ALGO_EXPLORER_PORT` | `27909` | Port HTTP |
| `ALGO_EXPLORER_ROOT` | *(auto)* | Đường dẫn thư mục `www/` |

### File cấu hình

`~/.config/algorithms-explorer/config.env`:

```env
ALGO_EXPLORER_HOST=127.0.0.1
ALGO_EXPLORER_PORT=27909
ALGO_EXPLORER_ROOT=/Users/you/.local/share/algorithms-explorer/www
```

Sau khi sửa: `algo-explorer restart`.

---

## Phát triển

### Yêu cầu

| Tool | Dùng cho |
|---|---|
| Go 1.22+ | Build `algo-explorer` |
| Node.js 18+ | Authoring nội dung, sync catalog, QA |

### Chạy local

```bash
make pack      # → dist/algo-explorer + dist/www/
make serve     # foreground tại http://127.0.0.1:27909
```

Hoặc:

```bash
./dist/algo-explorer serve --root dist/www --port 27909
```

### Toolchain nội dung

```bash
node generate_problems.js --id=42          # Regenerate một trang bài
node scripts/sync-leetcode-catalog.js      # Sync catalog (cần mạng)
node scripts/validate-problem.js --id=42   # Validate nội dung
node scripts/rebuild-all.js                # Rebuild toàn bộ
bash scripts/pack-www.sh dist/www          # Đóng gói runtime bundle
```

### Makefile targets

| Target | Mô tả |
|---|---|
| `make build` | Compile binary → `dist/algo-explorer` |
| `make pack` | Build + đóng gói `www/` |
| `make serve` | Chạy server foreground |
| `make install-local` | Cài vào `~/.local/share/…` |
| `make start` / `stop` / `status` | Quản lý instance đã cài |
| `make cross` | Cross-compile 3 platform (dev) |
| `make clean` | Xoá `dist/` |

---

## Release & CI

### CI (mỗi push `main`)

Workflow `.github/workflows/ci.yml`: pack `www/` → build Go → smoke test HTTP.

### Release (tag `v*`)

```bash
git tag v1.0.0
git push origin v1.0.0
```

Workflow `.github/workflows/release.yml` build matrix:

| Target | Artifact |
|---|---|
| macOS Apple Silicon | `algo-explorer-darwin-arm64.tar.gz` |
| macOS Intel | `algo-explorer-darwin-amd64.tar.gz` |
| Linux x64 | `algo-explorer-linux-amd64.tar.gz` |
| Linux ARM64 | `algo-explorer-linux-arm64.tar.gz` |
| Windows x64 | `algo-explorer-windows-amd64.zip` |

Kèm theo: `install.sh`, `install.ps1`, `SHA256SUMS`.

---

## Roadmap

| Version | Trạng thái | Nội dung |
|---|---|---|
| **v1.0** | Done | Tài liệu + library + visualizer + runtime binary |
| **v1.1** | Planned | GitHub Release public, tag `v1.0.0` |
| **v1.2** | Planned | Auto-update, system tray (tuỳ chọn) |
| **v2** | Ideas | Desktop shell (Tauri) nếu cần UX native hơn |

---

## License

License dự án: *TBD* — sẽ bổ sung trước public release.

Nội dung đề bài LeetCode thuộc bản quyền [LeetCode](https://leetcode.com). Dữ liệu sync trong repo chỉ nhằm mục đích **học tập cá nhân**.

---

<p align="center">
  <sub>Algorithms Explorer v1.0 · Built with Go + static web · Made for learning DSA</sub>
</p>
