---
description: Create a git commit following this repo's Conventional Commits rules.
argument-hint: "[optional commit description]"
model: sonnet
allowed-tools: Bash(git*), Bash(cd src*), Bash(pnpm*), Read, Grep
---

# Create commit

## Arguments (optional)
$ARGUMENTS
- empty → infer type and subject from the diff;
- text → use it as the commit subject.

## Steps
1. `git status`, `git diff --staged`, `git diff` — see what changed. If nothing is staged, group related changes and `git add` them in logical sets (consider splitting into several commits).
2. Pick the type — **only** these are allowed (commitlint enforces it): `feat`, `fix`, `docs`, `refactor`, `ci`, `build`.
3. Run checks before committing:
   - `cd src && pnpm exec tsc --noEmit`
   - `cd src && pnpm lint`
   (A pre-commit hook also runs `tsc` and blocks on errors.)
4. Build the message `<type>: <subject>`:
   - type is **lower-case** English; **subject is Russian** (match repo history);
   - no trailing period; header ≤ 200 chars (commitlint), aim for ≤ 72;
   - add a body (bullet list) when the change isn't a one-liner.
5. Commit. Re-read the request/diff and confirm the message matches.

## Examples
```
feat: refresh-token flow в авторизации
fix: корректная загрузка файлов больше 10 МБ
refactor: вынос валидации в отдельный сервис
```

## Rules
- **Do NOT add `Co-Authored-By`, `Signed-off-by`, or any footer.**
- Do NOT `git push` unless the user explicitly asks (push is gated by `ask` + the pre-push hook).
- Never split one logical change across commits just to inflate count; never bundle unrelated changes into one.
