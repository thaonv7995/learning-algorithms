#!/usr/bin/env bash
# Pack runtime www/ bundle (excludes dev-only content).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$ROOT/dist/www}"

echo "Packing www → $OUT"
rm -rf "$OUT"
mkdir -p "$OUT"

ROOT_FILES=(
  index.html
  algorithms.html
  style.css
  app.js
  problems-data.js
  problems-solutions.js
  problems-analysis.js
)

for f in "${ROOT_FILES[@]}"; do
  if [[ -f "$ROOT/$f" ]]; then
    cp "$ROOT/$f" "$OUT/"
  fi
done

for dir in problems visualizers data; do
  if [[ -d "$ROOT/$dir" ]]; then
    cp -R "$ROOT/$dir" "$OUT/"
  fi
done

# Drop dev-only problem sources if copied accidentally
rm -rf "$OUT/problems/.git" 2>/dev/null || true

BYTES=$(du -sk "$OUT" | awk '{print $1}')
echo "Done — ${BYTES} KB in $OUT"
