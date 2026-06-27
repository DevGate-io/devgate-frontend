# Orchestration pattern

## Core rule: orchestrate, don't grind

**STOP-RULE — before every Edit/Write of *code* (not config):**
- 1 file **and** < 10 changed lines → do it directly.
- Anything larger → **delegate** to a subagent. No exceptions.

## Pipeline for delegated work

GATHER CONTEXT → DELEGATE → VERIFY → CODE REVIEW → ACCEPT / REJECT

1. **Gather** — read the files, search patterns, check memory and the relevant `docs/` conventions.
2. **Delegate** — spawn an `Agent` (`general-purpose`, or `fork` to share this context) with the *full* brief: file paths, snippets, the conventions to follow (`docs/plans/agent-rules.md`, `code-generation.md`). For parallel independent edits use `isolation: "worktree"`.
3. **Verify** — read the modified files; run `tsc` + Biome (see checks.md).
4. **Code review** — run the `/code-review` skill (or a review agent) on every delegated change.
5. **Accept / reject** — if review found problems, re-delegate with the feedback (max 2 rounds), then escalate to the user.

## Do directly (no delegation)
- 1 file and < 10 lines.
- Config edits: `next.config.ts`, `tsconfig.json`, `biome.json`, `package.json`, `pnpm-workspace.yaml`, `.env*`.
- Dependency install / lockfile work.
- One-line fixes, imports/exports, renames.
- Markdown / docs / `.claude/` setup.

## Skip code review only when ALL hold
- ≤ 3 changed lines, strictly 1 file, and it's a typo / import-export / config change (no logic).

## Pre-commit checklist
1. `tsc --noEmit` — no errors? (the pre-commit hook also enforces this).
2. `pnpm lint` (Biome) — clean?
3. Code review — ran and passed?
4. `git diff --stat` — only the expected files changed?
