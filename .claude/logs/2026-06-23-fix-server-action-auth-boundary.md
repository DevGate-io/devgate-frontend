# 2026-06-23 — Fix server/client boundary in auth API layer

## Context
Build/runtime errors after touching the axios interceptors:
1. `Only plain objects can be passed to Server Functions... Error objects are not supported` — at `onResponseError(error: AxiosError)`.
2. After fix #1: `You're importing a module that depends on "next/headers"... using it in the Pages Router` — `interceptors/server.ts` leaking into the client bundle.

## Root cause
- `'use server'` on `interceptors/server.ts` made axios interceptors into Server Actions; React tried to serialize the non-plain `AxiosError` arg → error #1.
- Removing `'use server'` exposed the real issue: legacy `shared/api/auth/index.ts` (`AuthService` object, a plain module) was imported directly by client hooks (`use-logout.ts`, and via `perform-login.ts` → `use-auth-form.ts`). It pulls the server-only `apiClient` → `next/headers` into the client bundle → error #2.

## Steps
1. `interceptors/server.ts` — removed `'use server'` (interceptors run inside server actions, don't need it). ✅
2. Created `shared/api/auth/login.ts` (`'use server'`) — login request. ✅
3. `shared/api/auth/actions.ts` — folded backend logout POST (`/auth/logout`) into the existing server action `logout` (server-only module → safe to import `apiClient`). ✅
4. `features/auth-form/lib/perform-login.ts` — import `login` from `auth/login` instead of `AuthService`. ✅
5. `widgets/header/hooks/use-logout.ts` — single `logout()` server-action call. ✅
6. Deleted legacy `shared/api/auth/index.ts` (`register`/`refresh` from it were dead code). ✅

## Verification
- `tsc --noEmit` → EXIT 0 ✅
- `biome check` (4 touched files) → clean ✅
- `pnpm build` → success, all 17 routes compiled, no `next/headers` boundary error ✅
- grep `AuthService` / `from '@/shared/api/auth'` → none remaining ✅

## Summary
The auth API layer mixed server-only code (`apiClient` with `next/headers`-based cookie interceptors) into modules imported by client components, which only "worked" because a misplaced `'use server'` on the interceptors masked the leak by turning them into RPC stubs. Replaced that anti-pattern with the project's prescribed structure: per-request server actions (`login.ts`), the logout request folded into the existing `logout` server action, and removal of the legacy `AuthService` barrel. Client hooks now call server actions (RPC stubs) so the server-only axios/cookie code never enters the client bundle. tsc, Biome, and a full production build all pass.