# Workflow: plan → execute → report

## Critical rules

- **No code without an approved plan** for non-trivial tasks — even when it looks obvious.
- **Never ignore a question mid-task.** If the user asks something — stop, answer, then continue.
- **Never skip the report.** Every completed task gets a log file.
- Use **`EnterPlanMode`** to propose the plan; do not paste plans as plain chat text.
- Execute the **entire** approved plan, including the report.
- Before reporting "done", re-read the original request and confirm the result matches it.

## Action cycle

### 1. Plan (`EnterPlanMode`)
- **Goal** — what we are doing.
- **Steps** — atomic list of actions.
- **Verification checklist** — concrete checks to run afterwards (Biome, `tsc`, build, manual).

Wait for explicit approval before touching code.

### 2. Execute & report
- If the user sends a message — stop and respond first.
- If you deviate from the plan — say why before continuing.
- After finishing, create `.claude/logs/YYYY-MM-DD-<task-name>.md`:
  - status of each step;
  - verification checklist results;
  - issues encountered;
  - a mandatory `## Summary` (3–5 sentences) for context restoration.

### 3. "Продолжаем" protocol
When the user writes "продолжаем" / "continue":
1. Find the most recent file in `.claude/logs/`.
2. Read its `## Summary` and last verification checklist.
3. Resume without asking for context.
4. Open with: "Вижу отчёт `<filename>`. Последний шаг: `<step>`, статус: `<status>`. Продолжаю с `<next step>`."

## Trivial-task exception
Single-file, < 10 lines, or a pure config/typo/import fix → just do it (no plan, no log). Everything else follows the full cycle.

## Security when editing text/prompts/user-facing strings
- Review for prompt-injection risks.
- Ensure no system instructions leak into user-visible content.
- Validate that dynamic content in templates is properly escaped.
