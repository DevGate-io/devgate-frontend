---
description: Audit dependencies for outdated or vulnerable packages.
model: sonnet
allowed-tools: Read, Grep, Glob, Bash(cd src*), Bash(pnpm*)
---

Audit dependencies (all commands from `src/`):

1. Vulnerabilities: `cd src && pnpm audit --audit-level=low`.
2. Outdated: `cd src && pnpm outdated`.
3. Cross-check against the `overrides:` block in `src/pnpm-workspace.yaml` (transitive-dep pins) — note any override that has become redundant or that masks a fixable direct dependency.
4. Write `.claude/reports/dependency-report.md`: vulnerable (with advisory + fix version), outdated (current → wanted → latest, flag majors), and override notes.
5. Show the summary, then ask: «Обновить?» → if yes:
   - update conservatively (patch/minor first; majors only with explicit OK);
   - keep the `overrides:` constraints valid (cap ranges to avoid unwanted majors — e.g. the `@babel/core <8` cap);
   - run `cd src && pnpm install` then `cd src && pnpm build` after changes, since the pre-push hook gates on both audit and build.
