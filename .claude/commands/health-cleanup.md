---
description: Find and remove dead code.
model: sonnet
allowed-tools: Agent, Read, Grep, Glob, Bash(cd src*), Bash(pnpm*), Bash(git*)
---

Find dead code in `src/`:

1. Dispatch `general-purpose` agents to find: unused exports/components/hooks/types, unreachable code, unused CSS-module classes, dead constants, orphaned files not imported anywhere, commented-out blocks.
2. For each candidate, verify it's truly unused (grep for the symbol across `src/`, account for the `@/*` alias and dynamic imports) before flagging — be conservative.
3. Write `.claude/reports/dead-code-report.md` with file:line and a confidence level.
4. Show the findings, then ask: «Удалить?» → if yes, remove in small batches and run `cd src && pnpm exec tsc --noEmit` + `cd src && pnpm lint` + `cd src && pnpm build` after each batch to confirm nothing broke.
