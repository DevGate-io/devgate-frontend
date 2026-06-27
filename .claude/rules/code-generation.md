# Code generation rules (Next.js / TS / Mantine / FSD)

Authoritative source: **`docs/plans/agent-rules.md`** + `docs/code-style.md`, `docs/api.md`, `docs/auth.md`, `docs/responsive.md`, `docs/typography.md`, `docs/image.md`. Check them before non-trivial work. Below is the must-follow gist.

## Architecture (Feature-Sliced Design, all under `src/`)
`app/` (thin route entrypoints) → `views/` → `widgets/` → `features/` → `entities/` → `shared/`.
Higher layers import from lower, never the reverse. `app/*` stays thin and delegates to `views/`. The `@/*` alias resolves to `src/*`.

## Semantics > div
Before each `<div>` ask: `<section>` / `<article>` / `<aside>` / `<header>` / `<nav>` / `<main>` / `<ul>+<li>` / `<dl>+<dt>+<dd>` / `<form>` / `<button>` / `<a>` / `<time>`? Never `<div onClick>`.

## Decomposition
A component > 80 lines of JSX, or with 3+ blocks → split into `<parent>/ui/<child>/index.tsx`. Logic → `use-<feature>.ts`. Mock data and UI strings → `constants.ts` (no magic strings inline in JSX).

## CSS
CSS Modules only. **Logical properties only** (`margin-block-*`, `padding-inline-*`). Colors via `light-dark()` + `--mantine-color-*` tokens — no hardcoded colors, no physical spacing. Responsive via the `@mixin responsive` (see `docs/responsive.md`). No inline styles except genuinely dynamic values (use CSS custom props, e.g. `style={{ '--dot-color': … }}`).

## API
One request per file: `shared/api/<domain>/<verb-resource>.ts` (kebab-case). React Query keys in `query-keys.ts` as `UPPER_SNAKE_CASE`. `useQuery`/`useMutation` live in feature hooks.

## Auth
access + refresh in HttpOnly cookies. 401 → `/auth/refresh` → retry with `_retry`; on repeat failure clear cookies + redirect + invalidate queries. `useSession()` via react-query with `AUTH_QUERY_KEYS.CURRENT_USER`.

## State
Server state → react-query. Global UI state → zustand in `shared/stores/use-<topic>-store.ts` with `persist` + `partialize`; point selectors `useStore((s) => s.field)`; persisted-dependent render via `useHydrated()`. Don't duplicate react-query / Mantine context.

## Misc
- **React Compiler is on** — do not add `useMemo`/`useCallback` without a concrete reason.
- Images: `<Picture>` from `shared/ui/picture`, not `next/image`. Decorative SVG → `aria-hidden`; informative → `<title>` + `role="img"` or an `aria-label` on the parent button.
- Stay within the current MVP/phase scope (CLAUDE.md §MVP); flag scope expansion.
