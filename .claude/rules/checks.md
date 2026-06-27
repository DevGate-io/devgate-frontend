# Code checks after changes

## Critical rule
After writing or modifying code, run the check agents **in parallel** as background tasks. This project has **no test runner**, so the active checks are two:

1. **static-analysis** — `tsc --noEmit` (type errors).
2. **code-style** — `pnpm lint` (Biome: lint + format + import sort).

(`run-tests` exists but will report SKIPPED until a test runner is added — don't wait on it.)

Run both, or neither — never just one.

## When
- After creating new files.
- After editing existing files.
- Before reporting completion.
- Before committing.

## How
Single message, parallel `Agent` calls with `run_in_background: true` (subagents `static-analysis` and `code-style`). Keep working while they run; review results when notified.

All pnpm commands run from `src/`:
- `cd src && pnpm exec tsc --noEmit`
- `cd src && pnpm lint`
- `cd src && pnpm format` (apply formatting)

## If a check fails
Fix it, then re-run **only** the failed check to confirm. A clean `tsc` is also enforced by the pre-commit hook, and `pnpm build` (which type-checks) is enforced by the pre-push git hook.
