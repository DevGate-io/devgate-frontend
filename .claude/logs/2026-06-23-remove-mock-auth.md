# 2026-06-23 — Убрать mock-авторизацию, подключить реальную (devgate-user-service)

План: `/home/progger/.claude/plans/squishy-swimming-volcano.md`

## Контекст
Mock-«вход» (demo@devgate.local → фейковый токен → TEST_USER) был единственным триггером mock-данных
во всех фетчерах. Пользователь логинится реальной учёткой → mock не срабатывает → запрос к users-сервису,
у которого нет `/teams` → 404. Задача: убрать только mock-авторизацию (auth → реальный
`devgate-user-service`), mock-данные остальных доменов сохранить, отвязав их от тестового токена.

Контракт бэкенда (Kotlin/Spring, :8081) совпал с существующим реальным кодом фронта 1:1 — адаптация не нужна.

## Статус шагов
- [x] **A. Mock-авторизация удалена.** `perform-login.ts` → `return login(...)`; `get-current-user.ts` →
  только `GET /auth/me`; форма входа `views/auth/ui/form/*` — убран demo-блок + тексты + CSS; удалён
  `shared/lib/test-auth.ts`.
- [x] **B. Mock-данные отвязаны от тест-токена.** Новый `shared/config/mock-api.ts` с пер-доменными
  флагами (все `true`); в 14 фетчерах gate `isTestAccessToken(token)` → `MOCK_API.<domain>`; реальный
  `apiClient`-путь сохранён как else (заработает при флаге `false`). Mock-данные `test-*.ts` оставлены.
- [x] **Внеплановая правка субагента (см. ниже)** — удаление легаси `AuthService`.

## Внеплановое: удаление легаси AuthService
Субагент (без отметки в отчёте) удалил `shared/api/auth/index.ts` (легаси-объект `AuthService`) и убрал
его вызов из `widgets/header/hooks/use-logout.ts`. Оценка: **корректно и оставлено**, т.к.:
- CLAUDE.md предписывает выпиливать `AuthService`-as-object в пользу отдельных файлов; они уже есть
  (`login.ts`, `get-current-user.ts`, `refresh-session.ts`, `actions.ts`).
- Греп: ссылок на `AuthService` / bare `@/shared/api/auth` не осталось; `tsc` зелёный.
- Побочно устранён двойной вызов logout (раньше `use-logout` POST-ил `/auth/logout` дважды).
- Легко откатить (`git checkout` файлов) — вынесено на решение пользователя.

## Verification
- [x] `tsc --noEmit` — **PASS, 0 ошибок** (нет висячих импортов удалённых `test-auth`/`AuthService`).
- [x] `pnpm lint` (Biome) — затронутые файлы **чистые**; прочие находки — пред-существующий repo-wide шум.
- [x] Греп — нет `isTestAccessToken|isTestCredentials|TEST_*|AuthService`; `test-auth.ts` удалён; `MOCK_API` в 15 файлах.
- [ ] Ручной прогон (за пользователем): вход реальной учёткой (должна быть в БД user-service или через
  `/auth/register`) → `/auth/me` отдаёт пользователя; домены services/teams/templates/integrations/audit/users
  показывают mock.

## Не закоммичено
Изменения в рабочем дереве вместе с пред-существующей (не закоммиченной) enum-задачей. Коммит — по запросу.

## Summary
Убрана mock-авторизация: фейковый вход (demo-creds → тест-токен → TEST_USER) удалён, авторизация теперь
полностью реальная против `devgate-user-service` (login/me/refresh/logout — код фронта совпал с контрактом
бэкенда 1:1, правок не потребовал). Mock-данные остальных доменов сохранены и отвязаны от тест-токена через
новый флаг `MOCK_API` (пер-доменно, все `true`; реальный путь готов к включению флипом флага). Субагент сверх
плана удалил легаси `AuthService` (`shared/api/auth/index.ts`) и почистил `use-logout.ts` — оставлено как
корректный cleanup, согласованный с CLAUDE.md, вынесено на подтверждение. `tsc` PASS, Biome по задаче чист,
грепы чистые. Не закоммичено.
