# Naming & language conventions

## Language
- Code is English: names, variables, constants, types.
- Text in code is English: comments, error/log messages, JSDoc.
- **Commit subjects are Russian** (matches this repo's history), but the commit **type** is an English lower-case keyword (`feat`, `fix`, …) — see `commands/commit.md`.

## Project naming (enforced — full version in `docs/plans/agent-rules.md`)
- Folders: `lower-kebab-case`.
- Components: `PascalCase`; props type `<Component>Props`.
- Data types: `<Name>Type`; enums: `PascalCase`, no suffix (e.g. `Role`, `ServiceHealth`); constants: `UPPER_SNAKE_CASE`.
- CSS classes: `lowerCamelCase`; CSS variables: `kebab-case`.
- Event handlers: `handle*`. Hook/util files: `kebab-case` (`use-foo.ts`, `do-bar.ts`).

## Comments
- Code should be self-documenting; skip obvious comments (`// get user`, `// return result`).
- Comment only: non-trivial business logic, non-obvious decisions (explain *why*), and `TODO`/`FIXME` with a reference.
