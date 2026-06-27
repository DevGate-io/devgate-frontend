---
description: Audit the codebase for bugs and write a prioritized report.
model: sonnet
allowed-tools: Agent, Read, Grep, Glob, Bash(cd src*), Bash(pnpm*)
---

Run a bug audit of `src/`:

1. Dispatch one or more `general-purpose` agents (fan out by layer — `views/`, `widgets/`, `features/`, `shared/`, `entities/`) to hunt for correctness bugs: bad state/effects, async/await mistakes, missing error/null handling, broken auth/interceptor logic, incorrect React-Query usage. Each agent returns findings as `{file, line, severity (P1/P2/P3), description, fix}`.
2. Adversarially verify each P1/P2 (a second agent tries to refute it) to drop false positives.
3. Write `.claude/reports/bug-hunting-report.md` — findings grouped by severity, with file:line and a suggested fix.
4. Show the user a summary (counts per priority).
5. Ask: «Исправить сейчас?» → if yes, fix by priority following `.claude/rules/orchestration.md` (delegate, then `/code-review`), and re-run `tsc` + Biome after.

Prefer the built-in `/code-review` skill for a focused review of the current diff; use this command for a whole-codebase sweep.
