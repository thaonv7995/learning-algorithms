#!/usr/bin/env bash
# Install Algorithms Explorer from GitHub Release (one-liner entrypoint).
set -euo pipefail

REPO="${ALGO_EXPLORER_REPO:-thaonv7995/learning-algorithms}"
VERSION="${ALGO_EXPLORER_VERSION:-latest}"
PORT="${ALGO_EXPLORER_PORT:-27909}"
HOST="${ALGO_EXPLORER_HOST:-127.0.0.1}"
NO_START=0
DO_OPEN=0
UPGRADE=0

usage() {
  cat <<EOF
Usage: install.sh [options]

  --port N       HTTP port (default 27909)
  --host H       Bind host (default 127.0.0.1)
  --no-start     Install only, do not start background server
  --open         Open browser after install
  --upgrade      Re-download and reinstall
  --repo O/R     GitHub repo (default: $REPO)
  --version V    Release tag or "latest"
  -h, --help     Show help
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --port) PORT="$2"; shift 2 ;;
    --host) HOST="$2"; shift 2 ;;
    --no-start) NO_START=1; shift ;;
    --open) DO_OPEN=1; shift ;;
    --upgrade) UPGRADE=1; shift ;;
    --repo) REPO="$2"; shift 2 ;;
    --version) VERSION="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
ARCH="$(uname -m)"
case "$OS" in
  darwin) GOOS=darwin ;;
  linux) GOOS=linux ;;
  *) echo "Unsupported OS: $OS (use install.ps1 on Windows)" >&2; exit 1 ;;
esac
case "$ARCH" in
  x86_64|amd64) GOARCH=amd64 ;;
  arm64|aarch64) GOARCH=arm64 ;;
  *) echo "Unsupported arch: $ARCH" >&2; exit 1 ;;
esac

ASSET="algo-explorer-${GOOS}-${GOARCH}.tar.gz"
BASE="https://github.com/${REPO}/releases"
if [[ "$VERSION" == "latest" ]]; then
  URL="${BASE}/latest/download/${ASSET}"
else
  URL="${BASE}/download/${VERSION}/${ASSET}"
fi

TMP="$(mktemp -d)"
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

echo "→ Downloading ${ASSET} (${VERSION})"
if command -v curl >/dev/null 2>&1; then
  curl -fsSL "$URL" -o "$TMP/bundle.tar.gz"
else
  wget -q "$URL" -O "$TMP/bundle.tar.gz"
fi

tar -xzf "$TMP/bundle.tar.gz" -C "$TMP"
BIN="$TMP/algo-explorer"
chmod +x "$BIN"

export ALGO_EXPLORER_PORT="$PORT"
export ALGO_EXPLORER_HOST="$HOST"

BIN_DIR="${HOME}/.local/bin"
CLI="${BIN_DIR}/algo-explorer"

if [[ "$UPGRADE" -eq 1 ]] && command -v "$CLI" >/dev/null 2>&1; then
  echo "→ Stopping existing instance (--upgrade)"
  "$CLI" stop 2>/dev/null || true
fi

echo "→ Installing to ~/.local/share/algorithms-explorer"
"$BIN" install --bundle "$TMP" --port "$PORT" --host "$HOST"

BIN_DIR="${HOME}/.local/bin"
mkdir -p "$BIN_DIR"
if [[ -f "${HOME}/.local/share/algorithms-explorer/algo-explorer" ]]; then
  ln -sf "${HOME}/.local/share/algorithms-explorer/algo-explorer" "${BIN_DIR}/algo-explorer"
fi

if [[ "$NO_START" -eq 0 ]]; then
  echo "→ Starting background server"
  "${BIN_DIR}/algo-explorer" start || "$BIN" start
fi

echo ""
echo "Algorithms Explorer installed."
echo "  URL:  http://${HOST}:${PORT}/"
echo "  CLI:  algo-explorer status | open | stop | restart | logs | uninstall"
if [[ ":$PATH:" != *":${BIN_DIR}:"* ]]; then
  echo "  Add to PATH:  export PATH=\"${BIN_DIR}:\$PATH\""
fi

if [[ "$DO_OPEN" -eq 1 ]]; then
  "${BIN_DIR}/algo-explorer" open 2>/dev/null || "$BIN" open || true
fi
