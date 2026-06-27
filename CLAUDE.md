# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working with me (workflow)

How I work in this repo. Details live in the imported rule files:

@.claude/rules/general.md
@.claude/rules/workflow.md
@.claude/rules/orchestration.md
@.claude/rules/checks.md
@.claude/rules/naming.md
@.claude/rules/code-generation.md

In short:
- **Language:** ответы — на русском; код, идентификаторы, комментарии и commit *types* — English (commit subjects — Russian, как в истории репо).
- **Plan first:** для нетривиальных задач сначала `EnterPlanMode` с планом, жду одобрения (тривиальные правки <10 строк/1 файл — сразу).
- **After code changes:** параллельно гоняю проверки фоновыми субагентами — `static-analysis` (`tsc --noEmit`) и `code-style` (Biome). Тест-раннера в проекте нет.
- **Commits:** Conventional Commits, типы только `feat|fix|docs|refactor|ci|build`, нижний регистр типа, без точки в конце, **без** `Co-Authored-By` и прочих footer'ов. Команда `/commit`.
- **Git push:** всегда спрашиваю перед пушем; не делаю force-push.
- **Logs:** после задачи — `.claude/logs/YYYY-MM-DD-<task>.md` с разделом `## Summary`. На «продолжаем» беру свежий лог и продолжаю без переспроса.
- **pnpm — из `src/`** (`cd src && pnpm …`); хуки в `.claude/hooks/` блокируют опасные команды и гоняют `tsc` перед коммитом.

## What this is

**DevGate** is the frontend for an Internal Developer Portal (IDP) — a single entry point for engineering teams to discover services, scaffold projects, and access docs/CI/observability. Reference implementations: Backstage, Port, Cortex, OpsLevel, Atlassian Compass.

**Source-of-truth docs (read before non-trivial work):**
- `docs/description/Описание проекта.md` — продуктовая спека (scope, entities, roadmap).
- `docs/description/Идеи.md` — бэклог идей.
- `docs/plans/frontend-plan.md` — фазовый план разработки и архитектурные решения.
- `docs/plans/agent-rules.md` — **обязательные правила для агентов** (naming, структура, семантика, CSS, API, auth). При любой правке свериться с ним.
- `docs/code-style.md` + `docs/api.md` + `docs/auth.md` + `docs/typography.md` + `docs/responsive.md` + `docs/image.md` + `docs/setup.md` + `docs/commitlint.md` — проектные стандарты.

Core domain entities (spec §5): **Organization → Team → Project → Service**, plus **User** and **Template**. Roles in the spec are draft-level (Admin / Member); the code in `src/entities/user.ts` already declares a wider enum (`MEMBER, ADMIN, MANAGER, DEVOPS, QA`) — prefer that enum and treat the spec as catching up to it.

MVP scope (spec §12) — **Service Catalog CRUD + search, Scaffolder with 1–2 templates, SCM read-only integration, SSO + RBAC, audit logging, public REST API, basic health dashboards**. Phase 1 adds CI/CD triggers, secrets references, notifications. Phase 2 adds dependency graph, multi-tenant isolation, plugin marketplace. Don't expand scope beyond the current phase without flagging it.

UX direction (spec §13): top-nav `Catalog / Templates / My Services / Teams / Metrics / Admin`; service page is one screen with owners, repo, pipeline, metrics, runbooks, tags; card-based catalog with quick actions. Visual reference for the dashboard look-and-feel lives in `docs/design/` (light + dark mockups) — pastel lavender/sky/mint accents, large card radii, Phosphor Thin icons, 3-zone shell (sidebar + main + activity panel). Both color schemes are first-class from Phase 1; see `docs/plans/frontend-plan.md` §7а for tokens and shell rules.

## Project rules (must-follow)

**Полная версия — `docs/plans/agent-rules.md`. Ниже — must-follow выжимка.**

- **Семантика > div.** Перед каждым `<div>` спросить: `<section>` / `<article>` / `<aside>` / `<header>` / `<nav>` / `<main>` / `<ul>`+`<li>` / `<dl>`+`<dt>`+`<dd>` / `<form>` / `<button>` / `<a>` / `<time>`?
- **Декомпозиция.** Компонент >80 строк JSX или с 3+ блоками → разбить на под-компоненты (`<parent>/ui/<child>/index.tsx`). Логика → в `use-<feature>.ts`. Mock-данные и UI-тексты → в `constants.ts`.
- **Naming строго:** папки lower-kebab-case; компоненты PascalCase; props `<Component>Props`; типы данных `<Name>Type`; enums — PascalCase без суффикса (как `Role`, `ServiceHealth`); константы UPPER_SNAKE_CASE; CSS-классы lowerCamelCase; CSS-переменные kebab-case; обработчики `handle*`; файлы хуков/утилит kebab-case (`use-foo.ts`, `do-bar.ts`).
- **API:** каждый запрос — отдельный файл в `shared/api/<domain>/<verb-resource>.ts` (`login.ts`, `get-services.ts`). React Query keys в `query-keys.ts` как UPPER_SNAKE_CASE. `useQuery`/`useMutation` — в хуках фичи.
- **Auth:** access+refresh — HttpOnly cookie. Refresh-interceptor: 401 → `/auth/refresh` → retry с `_retry`; на повторный fail — `clearAuthCookie` + redirect + `queryClient.invalidateQueries`. `useSession()` через react-query с `AUTH_QUERY_KEYS.CURRENT_USER`.
- **CSS:** только модули, **только логические свойства** (`margin-block-*`, `padding-inline-*`), цвета через `light-dark()` + `--mantine-color-*` токены. Адаптив — `@mixin responsive prop, mobile, tablet, desktop` (см. `docs/responsive.md`).
- **React Compiler включён** — НЕ использовать `useMemo`/`useCallback` без явной причины.
- **State:** серверный — `react-query`; UI-глобальный (collapsed sidebar, recently-viewed, workspace) — `zustand` в `shared/stores/use-<topic>-store.ts` с `persist`+`partialize`. Не дублируем react-query/Mantine context. Persisted-зависимый рендер — через `useHydrated()`. Селекторы точечные: `useStore((s) => s.field)`.
- **Текст** — в `constants.ts` модуля, не inline в JSX.
- **Изображения** — `<Picture>` из `shared/ui/picture`, **не** `next/image`. SVG-иконки: декоративные → `aria-hidden`; информативные → `<title>`+`role="img"` или `aria-label` на кнопке-родителе.
- **Запреты:** `<div onClick>`, inline-стили (кроме динамических), хардкод цветов, физические свойства отступов, магические строки в JSX.

## Repository layout

The actual Next.js project lives in `src/`, **not** at the repo root. Run all `pnpm` commands from `src/`. The git hooks in `.githooks/` `cd src` before invoking pnpm — keep this in mind when scripting from the repo root.

The TypeScript path alias `@/*` resolves to `src/*` (relative to the project root in `src/`), so imports like `@/shared/api` and `@/public/images/...` work.

## Commands

All commands run from `src/` with pnpm (Node version pinned via `.nvmrc` to 22.16.0):

- `pnpm dev` — Next.js dev server (Turbopack, with SVGR rule for `*.svg`)
- `pnpm build` — production build (also gated by the pre-push hook)
- `pnpm start` / `pnpm start:standalone` — run built app
- `pnpm lint` — Biome check (lint + format check + import sort, configured in `src/biome.json`)
- `pnpm format` — Biome write-mode formatter
- `pnpm prepare` — sets `core.hooksPath` to `.githooks`; runs automatically on install

There is no test runner configured.

## Git hooks (active by default)

`.githooks/` is wired via `pnpm prepare` → `git config core.hooksPath .githooks`.

- **commit-msg**: runs commitlint with `@commitlint/config-conventional`. Allowed types are limited to `feat`, `fix`, `docs`, `refactor`, `ci`, `build` (see `src/commitlint.config.js`). Subjects must not end with a period; type must be lower-case.
- **pre-push**: `cd src && pnpm audit --audit-level=low && pnpm build`. A failing audit or build aborts the push. Vulnerability overrides for transitive deps live in `src/pnpm-workspace.yaml` under `overrides:` — bump the constraints there when audit flags a new advisory.

## Architecture

The codebase follows a Feature-Sliced-Design–style layering inside `src/`:

```
app/       → Next.js App Router entrypoints (route groups + layouts only)
views/     → Page-level compositions consumed by app/*/page.tsx
widgets/   → Cross-feature UI blocks (e.g. header)
features/  → User-facing behaviors (e.g. auth-form) — own hooks/, models/, types
entities/  → Domain types & DTOs (User, UserDto, ...)
shared/    → api/, config/, hooks/, lib/, ui/, styles/, types/, models/
```

Higher layers may import from lower layers, never the reverse. `app/` files should stay thin — delegate rendering to `views/`.

### Routing & auth gate

`src/app/` uses two route groups: `(authorized)` and `(unauthorized)`, each with its own `layout.tsx`. The auth gate is implemented in `src/proxy.ts` (Next.js middleware): it reads the `jwtToken` cookie and redirects between `pageConfig.base` (`/`) and `pageConfig.auth` (`/auth`). The matcher is currently `['/', '/auth']` — add new protected paths to both `protectedRoutes` and `config.matcher` when introducing them.

### API layer

- `shared/api/client.ts` exports an `axios` instance with `baseURL = process.env.NEXT_PUBLIC_API_URL` and `withCredentials: true`.
- `shared/api/interceptors/server.ts` is a `'use server'` request interceptor that reads the `jwtToken` cookie via `next/headers` and sets `Authorization` via `shared/lib/generateAuthorizationHeader`. Because it uses server-only `cookies()`, the client is intended to be called from server components / server actions.
- Endpoint paths are centralized in `shared/config/api-urls.ts`. Per `docs/plans/agent-rules.md`, target shape is **one file per request** in `shared/api/<domain>/<verb-resource>.ts` (kebab-case). The current `AuthService`-as-object in `shared/api/auth/index.ts` is legacy — split into separate files when touching that area.
- `ACCESS_TOKEN_KEY` and `COLOR_SCHEME_COOKIE` live in `shared/constants.ts` (single-file legacy — should migrate to `shared/constants/<topic>.ts` when next touched). `proxy.ts` reads the same constant.

### Stack notes

- **Next.js 16** with React 19 and the React Compiler (`reactCompiler: true` in `next.config.ts`).
- **Mantine v8** is the component library. Theme lives in `shared/config/theme/`; the root `MantineProvider` is in `shared/config/app-providers/`. `app/layout.tsx` imports `@mantine/core/styles.css` plus `shared/styles/global.css`, and uses `ColorSchemeScript` + `mantineHtmlProps`.
- **Forms**: `@mantine/form` (uncontrolled mode, `validateInputOnBlur`); see `features/auth-form/hooks/use-auth-form.ts` for the canonical pattern.
- **Server state**: `react-query` (хук `useSession` + сервисы каталога). **Client UI-state**: `zustand` в `shared/stores/use-<topic>-store.ts` с `persist` middleware. Сейчас живут `useRecentlyViewedStore` (последние просмотренные сервисы) и `useSidebarStore` (collapsed flag). Гидрация через `useHydrated()` в `shared/hooks`. Полные конвенции — `docs/plans/agent-rules.md` §10а.
- **SVGs**: imported as React components via `@svgr/webpack` (Turbopack rule in `next.config.ts`, types in `src/svgr.d.ts`).
- **CSS**: PostCSS with `postcss-preset-mantine`, mixins, nested, simple-vars. Component styles use CSS Modules (`*.module.css`); shared mixins under `shared/styles/mixins` are excluded from Biome.

### Code style (Biome)

Tabs (width 2), single quotes (incl. JSX), trailing commas, semicolons. Import sorting and CSS property sorting are enabled as assist actions — `pnpm format` applies them. Next.js and React lint domains are on; `noVoidTypeReturn` and `noUnreachable` are escalated to errors.