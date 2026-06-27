#!/usr/bin/env bash
# PostToolUse (Edit|Write): lint just the changed file with Biome.
# Advisory: the edit already applied, so on findings we feed them back to Claude
# (exit 2 + stderr) without rolling anything back. Clean files exit silently.
set -uo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
input="$(cat)"
file="$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty')"
[ -n "$file" ] || exit 0

case "$file" in
	*.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs) ;;
	*) exit 0 ;;
esac

# Biome config lives in src/; only lint files under src/.
case "$file" in
	"$ROOT"/src/* | src/*) ;;
	*) exit 0 ;;
esac

cd "$ROOT/src" || exit 0

if out="$(pnpm exec biome lint "$file" 2>&1)"; then
	exit 0
fi

{
	echo "Biome lint нашёл замечания в ${file}:"
	printf '%s\n' "$out" | tail -n 40
} >&2
exit 2
