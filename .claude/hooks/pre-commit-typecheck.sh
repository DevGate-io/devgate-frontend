#!/usr/bin/env bash
# PreToolUse (Bash): run `tsc --noEmit` before a `git commit` and block on type
# errors. Non-commit Bash calls exit immediately, so the overhead only hits
# actual commits. To make this advisory instead of blocking, or to disable it,
# remove this hook block from .claude/settings.json.
set -uo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
input="$(cat)"
command="$(printf '%s' "$input" | jq -r '.tool_input.command // empty')"

# Only act on a real `git commit` (with optional global flags before "commit").
printf '%s' "$command" |
	grep -Eq '(^|[;&|[:space:]])git[[:space:]]+(-[^[:space:]]+[[:space:]]+)*commit([[:space:]]|$)' || exit 0

cd "$ROOT/src" || exit 0

if out="$(pnpm exec tsc --noEmit 2>&1)"; then
	exit 0
fi

reason="$(printf 'tsc --noEmit нашёл ошибки типов — коммит заблокирован. Исправь и повтори.\n\n%s' \
	"$(printf '%s' "$out" | tail -n 30)")"

REASON="$reason" python3 -c '
import json, os, sys
print(json.dumps({"hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": os.environ["REASON"],
}}))
'
exit 0
