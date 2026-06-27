---
description: Security audit of the codebase and dependencies.
model: sonnet
allowed-tools: Agent, Read, Grep, Glob, Bash(cd src*), Bash(pnpm*), Bash(git*)
---

Run a security audit:

1. For the pending diff, prefer the built-in **`/security-review`** skill.
2. For a full sweep, dispatch `general-purpose` agents to check: auth/cookie handling (HttpOnly, refresh flow, the server interceptor), secrets in source or `.env*`, XSS via `dangerouslySetInnerHTML`/unescaped content, SSR data exposure, open redirects in `proxy.ts`, and unsafe external calls.
3. Dependency vulnerabilities: `cd src && pnpm audit --audit-level=low` (also enforced by the pre-push hook; overrides live in `src/pnpm-workspace.yaml`).
4. Write `.claude/reports/security-scan-report.md`, grouped by severity (Critical / High / Medium / Low) with file:line.
5. Show critical findings, then ask: «Исправить?» → fix following `.claude/rules/orchestration.md`.
