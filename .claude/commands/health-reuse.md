---
description: Find code duplication and consolidation opportunities.
model: sonnet
allowed-tools: Agent, Read, Grep, Glob, Bash(cd src*)
---

Find duplication in `src/`:

1. Dispatch `general-purpose` agents to find: repeated logic across `views/`/`widgets/`/`features/`, copy-pasted components or hooks, duplicated CSS patterns, repeated constants/labels, and helpers that should live in `shared/`.
2. For each cluster, propose the consolidation target respecting FSD layering (shared logic moves *down* to a lower layer, never up) — see `.claude/rules/code-generation.md`.
3. Write `.claude/reports/reuse-hunting-report.md`: each duplication cluster with all file:line sites and a concrete consolidation plan.
4. Show the clusters, then ask: «Консолидировать?» → if yes, refactor following `.claude/rules/orchestration.md` (delegate + `/code-review`), then run `tsc` + Biome + build.
