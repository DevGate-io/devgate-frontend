# Codebase review: proposed tasks

1. **Typo fix task**
   - Rename `checkIsSafariAgent` to `checkIsSafariUserAgent` in `src/shared/lib/platform/index.ts` and all call sites.
   - Why: current name reads like it checks “Safari agent” instead of “user agent”, which is confusing and error-prone when searching for user-agent logic.

2. **Bug fix task**
   - Implement real authorization check in `src/proxy.ts` instead of hardcoded `const isAuthorized = false`.
   - Why: now every request to protected routes is always redirected to `/auth`, making authorized access impossible.

3. **Comment/docs mismatch task**
   - Update `README.md` to match actual project structure/scripts:
     - Replace default Next.js template text (`app/page.tsx`) with real entry points under `src/app/...`.
     - Document that package scripts are managed in `src/package.json` and include relevant commands for this repo.
   - Why: current README is generic template and does not describe this codebase.

4. **Test improvement task**
   - Add unit tests for Safari detection helpers from `src/shared/lib/platform/index.ts`.
   - Cover at least:
     - Safari UA returns `true`.
     - Chrome and Android UAs return `false`.
     - `checkIsSafari()` returns `false` in non-browser environment.
   - Why: utility affects platform-specific behavior but currently has no automated regression coverage.
