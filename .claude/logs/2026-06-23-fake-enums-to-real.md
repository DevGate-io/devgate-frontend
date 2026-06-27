# 2026-06-23 — Фейковые enum → реальные TS enum

План: `/home/progger/.claude/plans/squishy-swimming-volcano.md`

## Что сделано
Восемь «фейковых» enum (const-объекты `as const` + парный `*Type`-алиас) в `src/entities/`
переведены в реальные `enum`. Избыточные `*Type`-алиасы удалены, использования заменены на сам
enum напрямую (единообразно с эталонным `enum Role` в `entities/user.ts`). Решение по алиасам —
выбор пользователя (убрать, а не оставлять `= XEnum`).

Конвертированные enum: `ServiceHealthEnum`, `ServiceEnvironmentNameEnum`, `TeamRoleEnum`,
`TemplateParameterKindEnum`, `AuditActionEnum`, `AuditTargetTypeEnum`, `IntegrationKindEnum`,
`IntegrationStatusEnum`.

## Статус шагов
- [x] Шаг 1 — 6 entity-файлов: `as const` → `export enum`, удалены 8 `*Type`-алиасов,
  локальные поля переведены на enum; в `template` убран `typeof` в дискриминантах `kind`.
- [x] Шаг 2 — 20 файлов-потребителей: `*Type` → `*Enum` в импортах и аннотациях
  (`Record<…>`, `…[]`, поля, type-guards). Использования членов (`XEnum.K`) не тронуты.
- [x] Faithfulness-фикс: в `app/(authorized)/admin/audit/page.tsx` субагент сверх брифа поменял
  стиль сигнатуры type-guard'а — возвращено к `value: string | undefined` (минимальный дифф,
  файл имел пред-существующие правки).

## Verification checklist
- [x] `pnpm exec tsc --noEmit` — **PASS, 0 ошибок** (включая `Object.values(Enum)` assignability
  и дискриминированные объединения).
- [x] `pnpm lint` (Biome) — связанные с задачей нюансы импортов в 3 файлах авто-исправлены
  точечным `biome check --write` (только эти файлы, без repo-wide шума). Остальные ~40 находок
  Biome — пред-существующие и не относятся к задаче (CSS property-sort, `svgr.d.ts`, a11y,
  hooks-deps).
- [x] Code review — багов не найдено. Refactor type-safe и behavior-preserving: у реального
  string-enum нет reverse-mapping, строковые значения сохранены 1:1, runtime-сравнения и
  сериализация не меняются.
- [x] `git diff --stat` — изменены только ожидаемые файлы (6 entity + 20 потребителей).
  `CLAUDE.md` и `views/admin-users/index.tsx` в стате — пред-существующие правки, не из задачи.
- [x] Греп — ноль остатков восьми `*Type`-алиасов, ноль `Enum = {`, ноль `typeof TemplateParameterKindEnum`.

## Проблемы
Не было. Дополнительных приведений `as` не потребовалось — `tsc` чист.

## Фаза 2 — снятие суффикса `Enum` (по запросу пользователя)
- [x] Решение пользователя: убрать суффикс `Enum` **и** обновить документированное правило.
- [x] 8 enum переименованы (без суффикса): `ServiceHealth`, `ServiceEnvironmentName`, `TeamRole`,
  `TemplateParameterKind`, `AuditAction`, `AuditTargetType`, `IntegrationKind`, `IntegrationStatus`
  (единообразно с `Role`). Ссылки обновлены по всему `src/`.
- [x] Доки приведены к no-suffix конвенции: `CLAUDE.md`, `.claude/rules/naming.md`,
  `docs/plans/agent-rules.md` (таблица именования + блок «Критично»).
- [x] `tsc --noEmit` — **PASS**. Старых `*Enum`-токенов в `src/` не осталось.
- [x] Biome safe-fixes (import-sort) применены точечно к затронутым файлам.

### Инцидент: внешний каскадный rename
После моего `sed` (8 уникальных `*Enum`-токенов, ни один не трогает `ServiceEnvironment*`)
пара символов в домене service оказалась сдвинута: enum DEV/STAGE/PROD стал `ServiceEnvironmentType`,
а тип-объект `{name,url}` — `ServiceEnvironment`. Сдвиг был **консистентен по всем файлам** (признак
project-wide rename-symbol), чего мой sed произвести не мог → почти наверняка вмешался TS-сервер
открытой IDE (ранее уже было авто-изменение `audit/page.tsx`). Исправлено двумя упорядоченными
заменами с границами слова: enum → `ServiceEnvironmentName`, тип → `ServiceEnvironmentType`.
`tsc` подтвердил консистентность. **Если IDE продолжит авто-рефакторить файлы — возможны новые гонки.**

## Не закоммичено
Изменения в рабочем дереве (44 файла: код + 3 дока), **не закоммичены** (коммит/пуш только по запросу).

## Summary
Двухфазная задача. Фаза 1: 8 фейковых enum (`as const`-объекты) в `src/entities/` → реальные TS
`enum`, удалены избыточные `*Type`-алиасы, заменены на сам enum во всех потребителях; `tsc` зелёный,
code-review чист. Фаза 2 (по запросу): снят суффикс `Enum` со всех 8 enum (теперь как `Role`), и
обновлено документированное правило именования в трёх доках. В процессе фазы 2 внешний процесс (TS-сервер
IDE) каскадно переименовал пару service-environment символов мимо моих правок — обнаружено грепом,
исправлено упорядоченным rename, подтверждено `tsc`. Итог: `tsc --noEmit` PASS, 0 остатков старого
паттерна, имена консистентны. Не закоммичено — жду решения по коммиту. ⚠️ Открытая IDE может
авто-рефакторить файлы и создавать гонки.
