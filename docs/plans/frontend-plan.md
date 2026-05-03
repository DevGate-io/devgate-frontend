# План разработки фронтенда DevGate

Документ дополняет [Описание проекта.md](./Описание%20проекта.md) (продуктовая спека) и [Идеи.md](./Идеи.md) (бэклог идей). Назначение: единый источник правды по архитектуре фронта, конвенциям и плану работ. Обновляется по мере роста системы.

## 0. Контекст и цели

DevGate — Internal Developer Portal по образцу Backstage / Port / Cortex. Фронт — клиентская часть, потребляющая REST API бэкенда (`NEXT_PUBLIC_API_URL`, локально `http://api.devgate.users.local`).

**Цели MVP** (см. §12 спеки):
1. Service Catalog: CRUD + поиск + карточка сервиса.
2. Scaffolder: 1–2 шаблона, форма параметров, превью PR.
3. SCM read-only: статусы pipeline и ссылки на репозитории.
4. SSO + RBAC (UI-часть), audit-лог viewer.
5. Базовые дашборды: health, активность.

**Не-цели MVP:** автогенерация инфры, биллинг, auto-remediation, граф зависимостей с автодискавери, плагин-система. Эти темы — Phase 1/2 в спеке.

**Гайдинг-принципы:**
- Идём по фазам; не расширяем scope, пока текущая фаза не закрыта.
- Каждая фича должна иметь list/detail/create/edit, ясные empty/loading/error состояния и быть навигируема через top-nav.
- Server Components — по умолчанию для серверных страниц с данными; Client Components — для интерактива и `react-query`-хуков.
- Стейт хранится там, где он живёт: серверный — в `react-query`, клиентский UI — в `zustand`/`useState`, URL-state — в `searchParams`.
- Никакой преждевременной абстракции. Три похожие страницы лучше преждевременного `<EntityListPage />`.

## 1. Технологический стек и решения

| Слой | Решение | Причина / альтернатива |
|---|---|---|
| Framework | Next.js 16 App Router, React 19, React Compiler | задано проектом |
| UI kit | `@mantine/core` v8 + `@mantine/form` + `@mantine/notifications` + `@mantine/hooks` | задано; покрывает 90% потребностей |
| Стили | CSS Modules + PostCSS (`postcss-preset-mantine`, mixins, nested, simple-vars) | задано |
| Серверный стейт | `react-query` v3 | задано; миграцию на `@tanstack/react-query` v5 — отдельной задачей после MVP |
| Клиентский стейт | `zustand` v5 | задано; используем точечно |
| HTTP | `axios` + интерсепторы | задано |
| Иконки | SVG как React-компоненты через `@svgr/webpack` (Turbopack rule) | задано |
| Линт/формат | Biome 2 | задано |
| Коммиты | commitlint conventional, типы `feat\|fix\|docs\|refactor\|ci\|build` | задано |
| Хуки git | `.githooks/` через `pnpm prepare`; pre-push: `pnpm audit --audit-level=low` + `pnpm build` | задано |
| i18n | RU-only до конца MVP; готовность к ICU/`next-intl` после | избегаем оверинженеринга |
| Тесты | unit/component — позже (предложение: `vitest` + `@testing-library/react`); e2e — позже (`playwright`). На MVP опираемся на TS + biome + ручную проверку | минимизируем зависимости в стартовой фазе |

## 2. Архитектурные принципы

### 2.1 FSD-слои (внутри `src/`)
```
app/        — Next.js App Router (route groups, layouts, page.tsx — тонкие)
views/      — экраны, собранные из widgets/features/entities (то, что рендерит page.tsx)
widgets/    — независимые блоки между фичами (Header, Sidebar, ServiceCard и т.п.)
features/   — пользовательские сценарии (auth-form, service-create-form, scaffolder-run)
entities/   — типы домена и узкие UI-представления (User, Service, Team, Template)
shared/     — api/, config/, hooks/, lib/, ui/, styles/, types/, models/
```
Правило импортов: верхний слой может импортировать из любых нижних; обратно — нет. Между однослойными модулями — только через `shared/` или явные зависимости (избегаем).

### 2.2 Server vs Client
- `'use client'` ставим как можно ниже по дереву; страницы и layouts по умолчанию серверные.
- Серверная страница = `async` функция, делает выборку данных через `apiClient` (server-side) или прямой fetch, отдаёт результат серверному View, тот по необходимости рендерит client-only фрагменты.
- Серверные действия (`'use server'`) — для записей, требующих доступ к cookies/headers (логин, логаут, мутации сервисов с привязкой к текущему пользователю). Хранить в `*/actions.ts`.
- Хуки `react-query` живут только в client-компонентах. На сервере используем прямой `await` от сервиса.

### 2.3 Барьеры
- `apiClient` (axios) **server-only**, потому что request-интерсептор использует `next/headers.cookies()`. Из браузера к API ходим **только** через server actions или RSC fetch. См. §5.
- Любая страница, которой нужен пользователь, получает его через серверный fetch `/auth/me` в layout-е и пробрасывает через context (или просто prop в client-компоненты).

## 3. Маршрутизация и навигация

### 3.1 Карта роутов (целевая, после MVP)
```
(unauthorized)
  /auth                       — экран входа
  /auth/register              — экран регистрации (если backend поддержит)

(authorized)
  /                           — лендинг/дашборд (My Services, последние события)
  /catalog                    — список сервисов (search/filter)
  /catalog/new                — создание сервиса
  /catalog/[id]               — карточка сервиса (tabs: overview/repo/pipeline/docs/dependencies)
  /catalog/[id]/edit          — редактирование

  /templates                  — список шаблонов
  /templates/[id]             — карточка шаблона
  /templates/[id]/run         — форма запуска scaffolder

  /teams                      — список команд
  /teams/[id]                 — карточка команды (members, services)

  /projects                   — список проектов (опционально, если в модели)
  /projects/[id]              — карточка проекта

  /admin                      — раздел админа (RBAC, интеграции, шаблоны)
  /admin/users
  /admin/integrations
  /admin/audit                — viewer audit-лога

  /profile                    — настройки текущего пользователя
```

### 3.2 Route groups
- `(authorized)` / `(unauthorized)` — для разных layout-ов и для семантического разделения.
- Защита через `src/proxy.ts` (Next.js proxy/middleware): обновлять `protectedRoutes` и `config.matcher` синхронно при добавлении приватных страниц.

### 3.3 Layouts
- `app/layout.tsx` — html, провайдеры, шрифты, фавиконы.
- `(authorized)/layout.tsx` — top-nav, sidebar (если будет), breadcrumbs, контейнер контента.
- `(unauthorized)/layout.tsx` — минимальный (логотип + слот).
- Внутри `(authorized)` пер-разделом могут жить sub-layouts (например, `/catalog/[id]/layout.tsx` с табами).

## 4. Доменная модель

Базируется на §5 спеки (Organization → Team → Project → Service + User + Template). На фронте держим типы рядом с сущностями.

### 4.1 Целевые TS-типы (закладка под бэкенд; согласовать)
```ts
// entities/organization.ts
export type Organization = { id: string; name: string; slug: string };

// entities/team.ts
export type Team = {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  members: TeamMember[];
};
export type TeamMember = { userId: string; role: TeamRole };
export enum TeamRole { OWNER='owner', MAINTAINER='maintainer', MEMBER='member' }

// entities/project.ts
export type Project = {
  id: string;
  organizationId: string;
  teamId: string;
  name: string;
  description?: string;
};

// entities/service.ts
export type Service = {
  id: string;
  projectId: string;
  ownerTeamId: string;
  name: string;
  description?: string;
  tags: string[];
  language?: string;
  repoUrl?: string;
  pipelineUrl?: string;
  docsUrl?: string;
  environments: ServiceEnvironment[];
  slo?: ServiceSLO;
  health: ServiceHealth;
  dependencies: string[]; // service ids
  createdAt: string;
  updatedAt: string;
};
export type ServiceEnvironment = { name: 'dev'|'stage'|'prod'; url?: string };
export type ServiceSLO = { availability: number; latencyP95Ms?: number };
export enum ServiceHealth { HEALTHY='healthy', DEGRADED='degraded', DOWN='down', UNKNOWN='unknown' }

// entities/template.ts
export type Template = {
  id: string;
  name: string;
  description: string;
  parameters: TemplateParameter[];
  outputs: { repoUrl?: string };
};
export type TemplateParameter =
  | { kind:'string'; name:string; label:string; required?:boolean; default?:string; pattern?:string }
  | { kind:'enum';   name:string; label:string; options:Array<{value:string;label:string}>; default?:string }
  | { kind:'boolean';name:string; label:string; default?:boolean };
```
DTO-формы (то, что улетает на бэкенд) держим в `entities/dto/`. Различие DTO ↔ доменный тип: DTO без `id`/`createdAt` и т.п.

### 4.2 User & роли
Существующий `entities/user.ts` оставляем как есть (`Role` enum уже шире, чем спека). Согласовать со спекой при появлении бэкенда — отметка в §15.

## 5. Слой API

### 5.1 `apiClient` — серверный клиент
- `axios.create({ baseURL: NEXT_PUBLIC_API_URL, withCredentials: true })`.
- Request-интерсептор `'use server'`: подмешивает `Authorization: Bearer <token>` из cookies.
- Response-интерсептор: распаковка `{data}` либо явное `.data` в сервисах (сейчас второй вариант — простой и явный).

### 5.2 Структура сервисов
```
shared/api/
  client.ts                  # axios instance
  interceptors/
    server.ts                # request: Authorization из cookies (server action)
    refresh.ts               # response: 401 → /auth/refresh → retry (Phase 1)
  auth/
    index.ts                 # AuthService (login/logout/register/refresh)
    actions.ts               # 'use server': setAuthCookie / clearAuthCookie
    types.ts                 # DTO + ответы
  services/
    index.ts                 # ServiceCatalogService (CRUD)
    types.ts
  teams/
  templates/
  ...
```

### 5.3 Конвенции `react-query`
- `queryKey` — массив `[domain, ...id, ...filters]`. Пример: `['service','list', { search, tags }]`, `['service','one', id]`.
- На каждый домен — `query-keys.ts` рядом, чтобы централизованно инвалидировать.
- Хуки в `features/<feature>/hooks/use-*.ts`. Сервисы агностичны к react-query.
- Префиксная инвалидация после мутаций: `queryClient.invalidateQueries(['service'])`.

### 5.4 Обработка ошибок
- Унифицированный `extractApiError(err): { message, code, fieldErrors? }` в `shared/lib/api-error.ts`.
- 401 → refresh flow → если падает refresh → `clearAuthCookie()` + redirect на `/auth`.
- 403 → toast + `<EmptyState>` на странице.
- 5xx → toast «Сервер недоступен», попытка retry на следующем queryKey-инвалидации.

## 6. Аутентификация и авторизация

### 6.1 Login flow (целевой)
1. Пользователь сабмитит форму → `useMutation` → `AuthService.login` (через серверное действие, чтобы избежать прямого браузер→бэкенд для будущей поддержки HttpOnly-cookie).
2. На успех: server action `setAuthCookie(accessToken)` (HttpOnly, SameSite=Lax, secure-в-prod).
3. `router.replace('/')` + `router.refresh()`.
4. На ошибку: `notifications.show` с текстом из `extractApiError`.

### 6.2 Logout
- Server action `clearAuthCookie()` + опциональный `AuthService.logout()` (best-effort).
- `router.replace('/auth')` + `router.refresh()`.

### 6.3 Refresh
- Response-интерсептор `refresh.ts`: на 401 (один раз на запрос) дёргает `/auth/refresh`, обновляет cookie через server action, ретраит исходный запрос. Используем in-flight Map чтобы не было гонок.
- Если refresh упал → `clearAuthCookie()` + `redirect('/auth')`.

### 6.4 Текущий пользователь
- `(authorized)/layout.tsx` асинхронно делает `await UserService.me()`; результат пробрасывается в client-компоненты через context (`CurrentUserProvider` в `shared/config/app-providers`) либо как prop.
- Пока `/auth/me` не реализован на бэке — заглушка с кешем cookie-данных или mock.

### 6.5 RBAC на UI
- Хелпер `can(user, action, resource)` в `shared/lib/rbac.ts`. Тонкий слой; сервер всегда последнее слово.
- Компонент `<Authorized action="service.create">{children}</Authorized>` — рендерит/скрывает.

## 7. Управление состоянием

| Где | Чем | Пример |
|---|---|---|
| Серверные данные | `react-query` | список сервисов, карточка, `useSession` |
| URL state (фильтры/пагинация) | `useSearchParams` + `useRouter` | `/catalog?q=&health=&tags=` |
| Глобальный UI-state | `zustand` | `useSidebarStore`, `useRecentlyViewedStore` |
| Цветовая схема | Mantine `useMantineColorScheme` + cookie | переключатель в Header |
| Текущий пользователь | `useSession` (react-query) + `AuthProvider` | `useCurrentUser()` в client-компонентах |
| Формы | `@mantine/form` | uncontrolled mode + `validateInputOnBlur` |
| Локальный UI-флаг | `useState` / `@mantine/hooks::useDisclosure` | модалки, expand/collapse |

**Zustand-конвенция:**
- `shared/stores/use-<topic>-store.ts` (`'use client'` сверху).
- `create()` + `persist` middleware с `partialize` для отсечения actions от localStorage.
- Префикс ключа `devgate-<topic>`.
- Селекторы точечные: `useStore((s) => s.field)`.
- Actions без подписки — `useStore.getState().action(...)` (например, в `useEffect`).
- SSR: persisted поля недоступны на сервере → use `useHydrated()` хук из `shared/hooks` если рендер зависит от persisted-данных. Атрибуты для CSS (`data-collapsed`) не требуют guard.

**Запреты:**
- ❌ `zustand` для серверных данных (дубль кэша react-query).
- ❌ `zustand` для цветовой схемы (Mantine context уже справляется).
- ❌ `useStore()` без селектора, если не нужны все поля.
- ❌ Persist с initial state, который зависит от `Date.now()` или другого SSR-несериализуемого — будет hydration mismatch.

**Текущие сторы:**
- `useRecentlyViewedStore` — последние ≤6 просмотренных сервисов с `viewedAt`. Заполняется в `ServiceDetailView` через `markViewed`. Отображается секцией «Недавние» в Sidebar.
- `useSidebarStore` — `isCollapsed` сворачивает sidebar в rail-режим (72px); используется в `(authorized)/layout.tsx` (ширина navbar) и каждым подкомпонентом sidebar (`Brand`, `NavItem`, `RecentlyViewedSection`) для рендера компактной формы. Toggle — `SidebarToggle` в Header.

Полные конвенции — `agent-rules.md` §10а.

## 7а. Дизайн-направление

Референсы — `docs/design/img.png` (light) и `docs/design/img_1.png` (dark). Это тот визуальный язык, в котором надо выпускать DevGate.

**Шелл `(authorized)`:**
- 3-zone layout: **Sidebar** (узкий, ~240–260px) | **Main** (фокус контента) | **Activity Panel** (~320px, скрывается на md и ниже).
- Top-bar: workspace/org switcher, breadcrumbs/раздел, глобальный поиск, иконки настроек/уведомлений/профиля.
- Sidebar — двухуровневая навигация по категориям: **Favorites**, **Catalog** (Services / Templates / Teams), **Workspace** (Projects / Members), **Admin** (Users / Integrations / Audit), **Profile**. Категории сворачиваемые, активный пункт с маркером слева.
- Activity Panel — контекстная: на главной = «Notifications + Recent activity (audit-feed) + Online members»; на странице сервиса = «Pipeline events + Owners + Quick links».

**Auth-страница** — без шела, центральная карточка на нейтральном фоне (как сейчас).

**Палитра (целевая, в Mantine theme):**
- Accent: `lavender` (primary, ~#B5A8FF), `sky` (~#A0D8FF), `mint` (~#A8E6C9), `peach` (~#FFD7A8 — для warning/highlight).
- Neutral light: бг карточек белый, фон страницы кремовый/almost-white (#FAFAF9 / #F5F4F1).
- Neutral dark: бг карточек ~#1B1C1F, фон страницы ~#0F1012, текст ~#E6E7EA.
- Семантика: success=mint-deep, warning=peach-deep, danger=#E04F5F, info=sky-deep.

**Поверхности и формы:**
- Радиусы карточек крупные: `xl=16px`, `2xl=20–24px`. Кнопки/инпуты — `lg=12px`.
- Тени мягкие, многослойные: `shadow-card` (низкая y-offset, большой blur, низкая opacity).
- Сетка: 4/8/16/24 базовый spacing (Mantine `xs/sm/md/lg`).

**Иконки:** **Phosphor Thin** — единый стиль, тонкие контуры. SVG-файлы в `public/images/icons/` (уже используется паттерн с svgr).

**Типографика:** Inter (уже подключён). KPI-числа — display-размер с tabular-nums и плотным letter-spacing (-0.02em). Подписи под цифрами — uppercase, letter-spacing +0.06em, gray-600.

**Реализационные следствия:**
- Тёмная тема — **обязательна с Phase 1** (раньше была отложена). Переключатель в Top-bar, persist в cookie (через server action), `defaultColorScheme` берётся из cookie на сервере.
- Расширить Mantine theme: добавить кастомные шкалы `lavender / sky / mint / peach`, обновить `radius.xl=16px`, добавить `radius` token `2xl=20px`, прописать shadow-токены.
- `ColorSchemeScript` с `defaultColorScheme={cookieScheme}` — чтобы избежать FOUC.
- Mantine `AppShell` — кандидат на основу 3-zone layout, но кастомизация sidebar-навигации возможно потребует своего компонента.



### 8.1 Mantine theme
- Палитру и primary color держим в `shared/config/theme/colors.ts`. Для брендового primary — кастомная шкала из 10 оттенков.
- Кастомизация компонентов в `theme/components/` (по одному файлу на компонент по мере появления).
- Радиусы и spacing через `radius.ts` / `mantine` defaults.

### 8.2 Цветовая схема
- `defaultColorScheme='light'` уже стоит. Тёмная тема — Phase 1 (toggle в Header → `useMantineColorScheme`).

### 8.3 Лейаут и адаптивность
- Целевые брейкпоинты Mantine: `xs<sm<md<lg<xl`. Десктоп-first для админских страниц, мобильная пригодность для catalog/profile.
- Сайдбар (если будет) — collapsible на md, drawer на sm.

### 8.4 Состояния списков
Каждый список обязан рендерить:
- `loading` — skeletons (Mantine `Skeleton`).
- `error` — `<ErrorState onRetry/>` (общий компонент в `shared/ui/error-state`).
- `empty` — `<EmptyState title cta />` с иллюстрацией и CTA на «создать первый ...».
- `loaded` — данные.

### 8.5 Error boundaries
- `app/error.tsx` уже есть (использовать) + `app/(authorized)/error.tsx` per-section. Не глотаем ошибки молча.

## 9. Формы

- `@mantine/form`, `mode='uncontrolled'`, `validateInputOnBlur: true`.
- Валидаторы в `features/<feature>/models/<feature>.constants.ts` как объекты `{ check }` (как в `auth-form`). Это позволяет реиспользовать валидатор без дублирования.
- Для длинных форм (создание сервиса) — секционный layout `<FormSection title>` с подсказками.
- Async-валидация (например, уникальность slug сервиса) — через `form.setFieldError` после debounce-fetch.

## 10. Уведомления и подтверждения

- Тосты — `@mantine/notifications` (`Notifications` уже подключён в provider). Цвета: `red` для ошибок, `green` для успеха, `blue` для info.
- Деструктивные действия (delete, transfer ownership) — через `modals.openConfirmModal` (`@mantine/modals` потребуется добавить позже) или собственный `<ConfirmDialog>`.

## 11. Доступность и i18n

- Все интерактивные элементы — клавиатурно доступны (Mantine это обеспечивает по умолчанию).
- `aria-label` для иконок-кнопок.
- Контраст: следим за `colors.ts` — passing AA на основные пары.
- i18n: сейчас RU-only, литералы прямо в JSX. После MVP — `next-intl` или `lingui`, с миграцией текстов в каталоги. Не заводим i18n-инфраструктуру преждевременно.

## 12. Производительность

- React Compiler уже включён (`reactCompiler: true`) — не пишем мемо/коллбэки руками без причины.
- RSC-стриминг: разбивать тяжёлые серверные страницы на `<Suspense>`-границы, чтобы каталог не ждал второстепенных блоков.
- Bundle: следим за `next build` summary, тяжёлые модули (charts, editor) — динамические импорты.
- Изображения через `next/image`; SVG — через svgr.
- Шрифты — через `next/font` (Inter уже подключён).

## 13. Тестирование (после MVP)

Минимально жизнеспособная пирамида:
1. **Type-checking** — первый барьер (Biome + tsc через `next build`).
2. **Component tests** для критичных фич (auth-form, service-create-form): vitest + RTL.
3. **e2e** для голден-флоу (login → catalog → создание сервиса → logout): Playwright.

Покрытие — не самоцель; в MVP это инвестиция, которая окупается на Phase 2.

## 14. Дорожная карта по фазам

### Phase 0 — Auth foundation (в процессе)
**Цель:** довести логин до состояния, в котором можно работать дальше.
- [x] Подключить `QueryClientProvider` + `<Notifications />` в `AppProviders`.
- [x] `setAuthCookie` / `clearAuthCookie` server actions.
- [x] `useAuthForm` на `useMutation`: cookie → redirect → toast → loading.
- [x] Распаковка `.data` в `AuthService`.
- [ ] Чистка `proxy.ts` (использовать `ACCESS_TOKEN_KEY` константу) и интерсептора (убрать `console.log`).
- [ ] `pnpm lint` + `pnpm build` зелёные.
- [ ] Logout-кнопка в Header (server action `clearAuthCookie` + redirect).

### Phase 1 — Каркас приложения
**Цель:** скелет защищённого раздела, на котором висят последующие фичи.
- `/auth/me` сервис + Context `CurrentUserProvider`.
- Refresh-token интерсептор (response 401 → refresh → retry).
- Header: top-nav (Catalog / Templates / Teams / Admin), profile-меню (avatar, имя, logout).
- Доменные TS-типы `Service`, `Team`, `Project`, `Template`, `Organization` (заглушки полей по §6 спеки).
- Общие UI-кирпичики: `<EmptyState>`, `<ErrorState>`, `<PageHeader>` (title + breadcrumbs + actions), `<DataTable>` (тонкая обёртка над Mantine `Table`).
- `app/(authorized)/error.tsx` + `not-found.tsx`.
- RBAC-хелпер `can()` + компонент `<Authorized>`.

### Phase 2 — Service Catalog (ядро MVP)
**Цель:** §6.1 спеки.
- `/catalog` — список с серверной пагинацией, поиск (debounced) и фильтры (теги, owner-team, env, status). URL-state для всех фильтров.
- Карточка сервиса в списке: имя, описание, owner, теги, health-индикатор, quick actions (open repo / open pipeline).
- `/catalog/[id]` — табы:
  - **Overview** — карточка с метаданными, owners, ссылки.
  - **Repository / Pipeline** — статусы (read-only), последние коммиты/билды.
  - **Docs / Runbooks** — ссылки + (после MVP) inline-просмотр markdown.
  - **Dependencies** — список (граф — Phase 6+).
- `/catalog/new`, `/catalog/[id]/edit` — секционная форма.
- Bulk import/export — CSV/JSON, кнопка в header страницы каталога (если бэк поддержит).
- Сервис `ServiceCatalogService`, `query-keys`, оптимистичные апдейты на edit.
- Тесты: компонент-тесты на форму создания и фильтры списка.

### Phase 3 — Templates / Scaffolder
**Цель:** §6.5 спеки.
- `/templates` — список доступных по ролям/командам.
- `/templates/[id]` — карточка с описанием параметров.
- `/templates/[id]/run` — динамическая форма по `parameters[]`. Превью diff-а (если бэк отдаст), submit → создание PR в выбранном репо.
- `TemplateService.run(...)` → возвращает ссылку на созданный PR.

### Phase 4 — Teams / Projects / Admin
- `/teams`, `/teams/[id]` — список команд, members management (если RBAC позволяет).
- `/projects`, `/projects/[id]` — связки проект↔команды↔сервисы.
- `/admin/users` — список пользователей, смена ролей.
- `/admin/integrations` — список интеграций (SCM, CI/CD, monitoring) — read-only, конфиг через бэк.
- `/admin/audit` — viewer лога с фильтрами по дате/действию/актору, экспорт CSV.

### Phase 5 — Метрики, дашборды, нотификации
- `/` — дашборд: «My services», «Recent events», «Health summary».
- Виджеты health/SLO на странице сервиса.
- Подключение notifications (Slack/Teams/Email) — раздел в `/profile/notifications`.
- AI-саммари дня (см. бэклог Идей §1) — после появления API.

### Phase 6+ — продвинутые возможности
- CI/CD triggers из UI (запуск пайплайна).
- Secrets references (без значений).
- Граф зависимостей сервисов (`react-flow` или `cytoscape`).
- Multi-tenant (organization switcher).
- Plugin system / расширения (см. Идеи §4).
- Тёмная тема, мобильная адаптация админских разделов.
- Миграция `react-query` v3 → `@tanstack/react-query` v5.
- i18n (`next-intl`).

## 15. Открытые вопросы (синхронизировать с бэкендом)

1. **Ответ на login:** `Set-Cookie` HttpOnly или JSON `{ accessToken }`? Сейчас фронт сам кладёт в HttpOnly cookie из JS-ответа.
2. **`/auth/me`** — есть ли, какой shape?
3. **Refresh-token:** в HttpOnly cookie или через body?
4. **Формат ошибок:** `{ message, code, fields? }` или другой?
5. **Пагинация:** offset/limit или cursor?
6. **Список endpoint-ов** по сущностям (Service, Team, Project, Template) — нужен OpenAPI/Swagger.
7. **Realtime статусы pipeline** — WebSocket / SSE / polling?
8. **Уникальные ограничения** (slug сервиса в рамках команды) — где валидируется?
9. **RBAC модель:** какие действия / какие роли / scope (org/team/service)?
10. **Audit-log shape** — поля события, фильтры.

Ответы фиксируем в этом разделе по мере уточнения.

## 16. Конвенции коммитов и PR

- Коммиты: `feat|fix|docs|refactor|ci|build`, lower-case type, без точки в конце subject (commitlint жёстко это проверяет в `commit-msg` хуке).
- Один коммит = одно логическое изменение. Не смешиваем рефакторинги и фичи.
- Перед push: убедиться, что `pnpm audit --audit-level=low` и `pnpm build` зелёные (этого требует pre-push хук). Уязвимости транзитивных зависимостей закрываем через `overrides:` в `pnpm-workspace.yaml`.
