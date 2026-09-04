#!/usr/bin/env bash
# Regenerates src/assets/screens/*.png from the running World Builder app.
# Needs the app repo (default ../world-builder), Linux, xvfb-run, and the
# app's mise toolchain (tauri-driver comes from its mise.toml).
set -euo pipefail
site="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
app="${WORLD_BUILDER_REPO:-$site/../world-builder}"
out="$site/src/assets/screens"
mkdir -p "$out"
cd "$app"
mise run build:release
# GDK_SCALE=2 renders the 1280x800 window at 2560x1600 device pixels, so
# the Xvfb screen must be bigger than that. Mirrors mise-tasks/check/e2e/webdriver
# for the Wayland scrub and the libEGL silence. `mise exec` is what puts
# tauri-driver on PATH -- it comes from the app repo's mise.toml, not this one's.
env -u WAYLAND_DISPLAY -u WAYLAND_SOCKET GDK_BACKEND=x11 GDK_SCALE=2 EGL_LOG_LEVEL=fatal \
  WB_CAPTURE_DIR="$out" \
  xvfb-run -a -s "-screen 0 2880x1800x24" \
  mise exec -- pnpm exec wdio run e2e/wdio.conf.ts --spec e2e/specs/99-marketing-capture.e2e.ts
cd "$site"
node scripts/crop-rects.mjs "$out"
# ESM because the site's package.json is "type": "module", so `require` is not
# available to `node -e`.
node --input-type=module -e '
import sharp from "sharp"
import { readdir } from "node:fs/promises"
const dir = process.argv[1]
for (const f of (await readdir(dir)).filter((n) => n.endsWith(".png")).sort()) {
  const m = await sharp(`${dir}/${f}`).metadata()
  console.log(`${f}: ${m.width}x${m.height}`)
}
' "$out"
