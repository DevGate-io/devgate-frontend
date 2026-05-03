# Agent Rules — DevGate Frontend

Это обязательная памятка для Claude (и любых других агентов), работающих в репозитории. Опирается на проектные документы:

- `docs/code-style.md` — code style проекта (источник правды по naming, структуре, JSX/CSS)
- `docs/api.md` — стандарты HTTP-запросов, fetch / axios / react-query
- `docs/auth.md` — реализация авторизации (JWT, interceptors, middleware, useSession)
- `docs/typography.md` — типографическая система (rem, переменные, брейкпоинты)
- `docs/responsive.md` — адаптивные миксины (`@mixin responsive`)
- `docs/image.md` — работа с изображениями (Picture, SVG)
- `docs/setup.md` — окружение и React Compiler (без useMemo/useCallback)
- `docs/commitlint.md` — формат коммитов
- `docs/description/Описание проекта.md` — продуктовая спека
- `docs/plans/frontend-plan.md` — фазовый план разработки

При расхождении правил с документами проекта — **документы важнее**, эти rules обновлять.

---

## 1. Naming (жёстко)

| Сущность | Стиль | Пример |
|---|---|---|
| Папки | lower-kebab-case | `auth-form/`, `activity-panel/` |
| Файлы компонентов | `index.tsx` | `widgets/header/index.tsx` |
| Файлы стилей | `index.module.css` | `widgets/header/index.module.css` |
| Файлы хуков | `use-<feature>.ts` (kebab-case) | `use-auth-form.ts` |
| Файлы утилит | kebab-case | `check-is-safari.ts`, `add-utm-to-url.ts` |
| Файлы запросов API | `<verb-resource>.ts` (kebab-case) | `login.ts`, `get-services.ts`, `update-service.ts` |
| Файлы типов | `types.ts` | рядом с компонентом |
| Файлы констант | `constants.ts` (или `<name>.constants.ts` в models/) | рядом с компонентом |
| Компоненты | PascalCase | `AuthForm`, `ActivityPanel` |
| Тип props компонента | `<Component>Props` | `AuthFormProps` |
| Тип данных API/моделей | `<Name>Type` | `ServiceType`, `AuthDtoType` |
| Enum | `<Name>Enum` | `UserRoleEnum`, `ServiceHealthEnum` |
| Функции/хуки/утилиты | lowerCamelCase | `getSitemapObject`, `useSession` |
| Константы | UPPER_SNAKE_CASE | `ACCESS_TOKEN_KEY`, `AUTH_QUERY_KEYS` |
| Свойства объектов | lowerCamelCase | `isPolicy`, `accessToken` |
| Обработчики событий | префикс `handle` | `handleClick`, `handleSubmit`, `handleToggleScheme` |
| CSS-классы | lowerCamelCase | `.root`, `.kpiCard` |
| CSS-переменные | kebab-case | `--width-video`, `--color-blue` |
| Картинки/статика | kebab-case | `team-icon.png` |

**Критично:** старый код может использовать `Role` (без `Enum`-суффикса), `User` (без `Type`-суффикса). Это легаси, но новые сущности именуем по правилам и при правках поблизости — приводим к гайду.

---

## 2. Структура папок

```
src/
  app/                Next.js App Router (page.tsx, layout.tsx — тонкие)
  views/              Крупные экраны, рендерятся из page.tsx
  widgets/            Виджеты между фичами (Header, Sidebar)
  features/           Пользовательские сценарии (auth-form, service-create-form)
  entities/           Бизнес-сущности (Service, Team, User) + DTO
  shared/
    api/<domain>/     Запросы (по файлу на запрос)
    config/           Конфиги, theme, page.config
    constants/        Глобальные константы (по файлу на тему)
    hooks/            Кастомные хуки
    lib/              Утилиты и хелперы
    models/           Общие модели
    styles/           Глобальные стили, mixins, variables
    types/            Глобальные типы
    ui/               Атомарные/молекулярные UI-кирпичи (Picture, Tooltip)
```

Каждая фича/виджет/энтити/вью — отдельная папка. Из неё экспортируется только основной публичный компонент.

Внутреннее устройство сложного компонента:
```
widgets/header/
  index.tsx              # сам компонент
  index.module.css
  constants.ts           # тексты UI, данные
  types.ts               # внутренние типы
  use-header.ts          # логика (если есть)
  ui/                    # подкомпоненты
    search-field/
      index.tsx
      index.module.css
    profile-menu/
      ...
  icons/                 # SVG-компоненты иконок (если их > 1)
    bell.tsx
    sun.tsx
```

---

## 3. Семантическая верстка (приоритет)

**НЕ использовать `<div>`, если есть подходящий тег.** Перед каждым `<div>` спросить «не лучше ли `<section>` / `<article>` / `<aside>` / `<header>` / `<nav>` / `<main>` / `<ul>` / `<dl>` / `<form>`?».

| Случай | Тег |
|---|---|
| Шапка страницы / секции | `<header>` |
| Главный контент страницы (один на страницу) | `<main>` |
| Боковое содержимое (sidebar, activity-feed, related) | `<aside>` |
| Самостоятельная секция с заголовком (KPI-блок, виджет) | `<section>` + `<h2>` или `aria-labelledby` |
| Самодостаточная единица (карточка сервиса, нотификация) | `<article>` |
| Навигация | `<nav aria-label="...">` |
| Любой повторяющийся набор однотипных элементов | `<ul>` / `<ol>` + `<li>` |
| Описание данных (KPI, key-value пары) | `<dl>` + `<dt>` (label) + `<dd>` (value) |
| Дата/время | `<time datetime="ISO-8601">` |
| Форма | `<form>`; группы полей — `<fieldset>` + `<legend>` |
| Поиск | `<form role="search">` с `<label>` для поля |
| Кнопка-действие | `<button type="button">` или `type="submit"` |
| Внутренняя ссылка | `<Link>` (Next.js) |
| Внешняя ссылка | `<a>` |

**Запреты:**
- ❌ `<div onClick>` — только `<button>`
- ❌ `<div role="button">` — только `<button>`
- ❌ Списки карточек/уведомлений/контактов как `<div>` — это `<ul>`/`<li>`
- ❌ Нескольких `<h1>` на странице
- ❌ Перепрыгивание уровней (h1 → h3 без h2)

**SVG:**
- Декоративная иконка (рядом текст с тем же смыслом): `aria-hidden="true"`, без `<title>`
- Информативная иконка-кнопка: `<button aria-label="...">` снаружи; внутри SVG — `aria-hidden`
- Standalone-иконка как картинка: `<svg role="img"><title>...</title>...</svg>`

---

## 4. Доступность

- Иконки-кнопки → `aria-label` обязателен.
- Активный пункт навигации → `aria-current="page"`.
- Скрытые подписи → визуально-скрытые `<label>`/`<span>` (CSS-класс `sr-only`/`visually-hidden`), не `aria-label` если есть нативный label.
- Фокус — видимый. Не убираем `outline` без замены.
- `tabindex` ставим только когда явно нужно (обычно — не нужно, нативные элементы сами).

---

## 5. React / TypeScript

- Strict TypeScript. `any` запрещён. `unknown` + сужение типа — допустимо.
- Props деструктурируем в сигнатуре функции: `({ a, b }: ComponentProps) => ...`.
- Тип props живёт **рядом** с компонентом: либо в самом файле перед компонентом, либо в `types.ts`.
- Экспорт компонентов / функций — **только** `export const Name = ...`. Для типов — `export type ...`.
- Async-страницы Next.js — серверные: `async function Page()`.
- **React Compiler** включён (`reactCompiler: true`). НЕ использовать `useMemo` / `useCallback` без явной причины (например, ссылочное равенство для зависимостей сторонней библиотеки).
- JSX: явный `return (...)`, классы через `clsx`, проверка пустоты — на уровне компонента (не пускать пустые теги в DOM).
- Порядок функций в файле: **сначала helpers, потом основной компонент**.
- Обработчики событий → префикс `handle`: `handleClick`, `handleSubmit`, `handleToggleScheme`.

---

## 6. Декомпозиция

- Компонент длиннее ~80–100 строк JSX или содержащий 3+ разнотипных блока — разбиваем на под-компоненты.
- Под-компоненты, использующиеся только внутри родителя, лежат в его папке (`<parent>/ui/<child>/index.tsx`) и наружу не экспортируются.
- Логика (стейт, эффекты, react-query/zustand, форматирование) → **в хук** `use-<feature>.ts`. Компонент — только верстка + биндинги.
- Чистые helper-функции → отдельный файл `<name>.ts` рядом или в `shared/lib/`.
- Mock/справочные данные, тексты UI → `constants.ts` рядом с компонентом.

---

## 7. CSS Modules

- Файл стилей — `index.module.css` рядом с компонентом.
- Импорт: `import css from './index.module.css';`.
- Только CSS Modules. Глобальные стили — в `shared/styles/`.
- Inline-стили допустимы **только** для динамических значений (например, `style={{ width: \`${pct}%\` }}`).
- **Логические свойства обязательны:**
  - `margin-top` → `margin-block-start`
  - `margin-bottom` → `margin-block-end`
  - `margin-left/right` → `margin-inline-start/end` или `margin-inline`
  - `padding-top/bottom` → `padding-block-start/end` или `padding-block`
  - `padding-left/right` → `padding-inline-start/end` или `padding-inline`
  - `text-align: left` → `text-align: start`
  - `width` (если важна логическая ось) → `inline-size`
- Темизация — через `light-dark()` + `--mantine-color-*` токены. **НЕ** хардкодим цвета.
- Радиусы/тени/отступы — через токены: `var(--mantine-radius-md)`, `var(--mantine-shadow-sm)`.
- Адаптивность — через `@mixin responsive <prop>, <mobile>, <tablet>, <desktop>` (см. `docs/responsive.md`); собственные `@media` — только когда миксин неуместен.
- Медиа-запросы внутри файла компонента, не в глобальных стилях.

---

## 8. Текст

- **Все** строки UI выносим в `constants.ts` модуля (по странице/секции).
- Никаких inline-литералов в JSX (исключения: динамические значения, временные debug-строки).
- Длинные тексты — прогон через типограф (https://www.artlebedev.ru/typograf/), включая союзы.
- Тон — деловой, по-русски, без жаргона. Названия разделов/действий — короткие.

---

## 9. Формы

- `@mantine/form`, `mode: 'uncontrolled'`, `validateInputOnBlur: true`.
- Валидаторы — в `models/<form>.constants.ts` как объекты с методом `check`.
- Submit-handler в хуке `use-<form>.ts`, не в компоненте.
- `useMutation` для запросов; loading/error состояния прокидываем в кнопку через `state`.
- Async-валидация (уникальность slug и т.п.) — `form.setFieldError` после debounce-fetch.

---

## 10. API

- **Каждый запрос — отдельный файл** в `shared/api/<domain>/<verb-resource>.ts` (kebab-case).
  - `shared/api/auth/login.ts`, `logout.ts`, `refresh.ts`
  - `shared/api/services/get-services.ts`, `get-service-by-id.ts`, `create-service.ts`, `update-service.ts`, `delete-service.ts`
- Внутри файла: функция запроса + типы ответа/тела + локальные константы.
- Импорт через единый `apiClient` из `shared/api/client.ts`.
- React Query keys — в `shared/api/<domain>/query-keys.ts` как UPPER_SNAKE_CASE-объект:
  ```ts
  export const SERVICE_QUERY_KEYS = {
    LIST: 'services.list',
    DETAIL: 'services.detail',
  } as const;
  ```
- Inversely использовать `queryKey: [SERVICE_QUERY_KEYS.LIST, filters]`.
- `useQuery` / `useMutation` — в **хуках фичи**, не прямо в компоненте.
- Custom поля axios (`withToken`, `_retry`) — через `declare module 'axios'` в `shared/api/types.d.ts`.
- Server Components используют сервисы напрямую (`await getServices()`). Client Components — через хуки react-query.

---

## 10а. Zustand (клиентский UI-state)

Глобальный клиентский state, который не привязан к серверным данным, живёт в **Zustand**.

**Где жить:** `shared/stores/use-<topic>-store.ts` (kebab-case файл, camelCase хук).

**Naming:**
- Хук — `use<Topic>Store` (`useSidebarStore`, `useRecentlyViewedStore`).
- Тип состояния — `<Topic>StateType` внутри файла (не экспортируем — только через хук).
- Файл `'use client'` сверху.

**Структура:**
```ts
'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const STORAGE_KEY = 'devgate-<topic>';

type TopicStateType = {
  field: T;
  action: () => void;
};

export const useTopicStore = create<TopicStateType>()(
  persist(
    (set) => ({
      field: defaultValue,
      action: () => set({...}),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ field: state.field }),
    },
  ),
);
```

**Когда использовать:**
- Глобальный UI-state, который должен пережить ре-рендер: collapsed sidebar, выбранный workspace, недавно просмотренные сервисы, избранное.
- State, который нужен в нескольких разрозненных частях дерева, и тащить через context-провайдер избыточно.

**Когда НЕ использовать:**
- Серверные данные → `react-query`. Не дублируем кэш.
- Цветовая схема → Mantine `useMantineColorScheme` + cookie. Не дублируем.
- Локальный UI-state одного компонента → `useState` / `@mantine/hooks::useDisclosure`.
- Состояние формы → `@mantine/form`.
- Текущий пользователь → `useSession` (react-query) + `AuthProvider` контекст.

**Persist middleware:**
- `localStorage` для того, что нужно между сессиями.
- `partialize` — не персистим actions/computed.
- Префикс ключа `devgate-` чтобы не было коллизий на домене.

**Гидрация (SSR):**
- Persist не доступен на сервере → начальный SSR-рендер использует initial state.
- Если отображение зависит от persisted-данных (как «Недавние»), использовать `useHydrated()` из `shared/hooks/use-hydrated.ts` и не рендерить контент до окончания гидрации.
- Атрибуты вроде `data-collapsed`, влияющие только на CSS, можно применять без guard'а — React reconciliation сгладит без визуального flicker.

**Селекторы:**
- Подписка точечная: `useSomeStore((s) => s.field)` — не пишем `useSomeStore()`, иначе ре-рендер на любое изменение.
- Actions без подписки на состояние — `useSomeStore.getState().action(...)` (например, в `useEffect`).

**Текущие сторы:**
- `use-recently-viewed-store.ts` — последние N (≤6) просмотренных сервисов с `viewedAt`. `ServiceDetailView` дёргает `markViewed` на mount.
- `use-sidebar-store.ts` — `isCollapsed` для свёрнутого режима sidebar. Toggle в Header через `SidebarToggle`.

---

## 11. Auth

**Тестовый вход без бэкенда.** Пока бэк недоступен, в системе живёт демо-пользователь:
- `shared/lib/test-auth.ts` хранит `TEST_USER`, `TEST_AUTH_EMAIL`, `TEST_AUTH_PASSWORD`, sentinel-токен `TEST_ACCESS_TOKEN` и хелперы `isTestCredentials` / `isTestAccessToken`.
- В `features/auth-form/lib/perform-login.ts` тест-креды короткозамыкают вызов `AuthService.login` — возвращают `{ accessToken: TEST_ACCESS_TOKEN, user: TEST_USER }` напрямую.
- В `shared/api/auth/get-current-user.ts` server action проверяет cookie: при sentinel-токене возвращает `TEST_USER`, минуя axios.
- Подсказка с демо-кредами выводится в `views/auth/ui/form` под формой.

После появления реального `/auth/login` и `/auth/me` тестовый bypass можно оставить (удобно для локального разработчика и для UI-тестов) или убрать одной правкой `perform-login` + `get-current-user`.



- **Access токен** — в HttpOnly cookie (через server actions). Браузеру он недоступен.
- **Refresh токен** — также HttpOnly cookie, выставляется бэком.
- **Request interceptor** (server-only) — подмешивает `Authorization: Bearer <token>` из cookie. Уже реализовано в `shared/api/interceptors/server.ts`.
- **Response interceptor** (refresh): на 401, при `!_retry` → `/auth/refresh` → обновить cookie → ретрай оригинального запроса с `_retry = true`. Если refresh упал — `clearAuthCookie()` + redirect на `pageConfig.auth` + `queryClient.invalidateQueries`.
- **`useSession()`** — `useQuery` с keys `[AUTH_QUERY_KEYS.CURRENT_USER]`, `queryFn` дёргает `/auth/me` (или decode JWT при отсутствии endpoint).
- **`AuthProvider`** в `(authorized)/layout.tsx` оборачивает контент, читает сессию.
- **Logout** — server action `logout()`: `clearAuthCookie()` → `redirect(pageConfig.auth)`. На клиенте дополнительно `queryClient.clear()` если действие вызвано из клиента.
- Middleware (`proxy.ts`) — первый уровень защиты, **не единственный**: проверки прав делает бэкенд.

---

## 12. Изображения и иконки

- Статические картинки — компонент `<Picture>` из `shared/ui/picture` с responsive-наборами (см. `docs/image.md`).
- **НЕ** использовать `next/image` (нагрузка на сервер; готовим контент заранее).
- SVG-иконки:
  - **Декоративные** — inline `<svg aria-hidden="true">` или `import` с `aria-hidden`.
  - **Информативные** — `<svg role="img"><title>...</title>...</svg>` или `<button aria-label>` с aria-hidden иконкой внутри.
- Все пути в `public` — со слешем (`/images/...`).
- `useImageReady` (есть в `shared/hooks/`) — когда нужно отслеживать готовность картинки (учитывает кеш).

---

## 13. Аналитика и UTM (когда понадобится)

- Метрики (Yandex.Metrika/Adriver) — константы в `shared/config/metrics/`, скрипты в layout (см. `docs/analytics.md`).
- Утилита `sendYandexMetricaEvent(target, params?)` — в `shared/lib/analytics.ts`. Перед `window.ym` всегда `typeof window !== 'undefined' && window.ym`.
- UTM — хук `useUtmUrl` в `shared/ui/action`, прокидывает только во внешние ссылки (см. `docs/utm.md`).

---

## 14. Коммиты

- Формат: `<type>: <subject>`, type lower-case, subject с маленькой буквы, без точки в конце.
- Типы: `feat`, `fix`, `docs`, `refactor`, `ci`, `build`. Этого достаточно — никаких `chore`/`perf` (commitlint их отвергнет).
- Один коммит = одно логическое изменение. Не смешиваем рефакторинг и фичу.
- Длина subject 50–72 символа (соблюдаем по возможности).

---

## 15. Что должно лежать в каких слоях

- **`features/<feature>`**: пользовательский сценарий с UI и логикой. Внутри — `index.tsx`, `hooks/use-*.ts`, `models/*.constants.ts`, `types.ts`, `ui/<part>/`.
- **`widgets/<widget>`**: виджет, переиспользуемый между фичами. То же устройство, но без сценарной логики.
- **`entities/<entity>`**: тип сущности + DTO. Может содержать минимальный UI-компонент сущности (карточка превью), не больше.
- **`views/<view>`**: страничный экран, собранный из widgets/features. Минимум собственного состояния — оно в фичах.
- **`shared/`**: всё переиспользуемое, не привязанное к домену.

---

## 16. Чек-лист перед завершением задачи

- [ ] Семантика: проверил каждый `<div>` — точно ли он не `<section>` / `<article>` / `<aside>` / `<header>` / `<nav>` / `<main>` / `<ul>` / `<li>` / `<dl>` / `<dt>` / `<dd>` / `<form>` / `<button>` / `<a>` / `<time>`?
- [ ] Иконки-кнопки имеют `aria-label`. Активный пункт навигации — `aria-current="page"`.
- [ ] Все строки UI вынесены в `constants.ts` (исключение — динамические значения).
- [ ] Mock/справочные данные — в `constants.ts`, не в JSX.
- [ ] Логика вынесена в хук `use-<feature>.ts`, helpers — в отдельные файлы.
- [ ] Под-компоненты (sub-components) разнесены по `ui/<sub>/` если их > 1 или они длиннее 30 строк.
- [ ] CSS использует логические свойства (`margin-block`, `padding-inline`).
- [ ] Цвета через токены (`var(--mantine-color-*)`, `light-dark()`), не хардкод.
- [ ] Хендлеры событий с префиксом `handle`.
- [ ] Файлы хуков/утилит — kebab-case (`use-foo.ts`, `do-bar.ts`).
- [ ] `pnpm lint` зелёный по моим файлам.
- [ ] `pnpm build` зелёный.

---

## 17. Запреты (короткий список)

- ❌ `<div onClick>` / `<div role="button">` — только `<button>`.
- ❌ `useMemo` / `useCallback` без причины (React Compiler).
- ❌ Inline-стили, кроме динамических значений.
- ❌ `next/image`.
- ❌ Хардкод цветов в CSS.
- ❌ Физические свойства отступов (`margin-left`, `padding-top` и т.п.).
- ❌ Inline-строки UI в JSX.
- ❌ Логика в JSX (вынести в хук/helper).
- ❌ Бизнес-сущности и API-вызовы в `shared/` (для них есть `entities/`, `features/`, `shared/api/<domain>`).
- ❌ Магические числа в коде — выносим в `constants.ts`.
- ❌ Один файл с десятком inline-объявленных под-компонентов — декомпозируй.
- ❌ Zustand для серверных данных или для дублирования Mantine/react-query кэша. Используем только для собственного UI-state.
- ❌ `useSomeStore()` без селектора, если не нужны все поля — точечно подписываемся `useSomeStore((s) => s.field)`.

---

## 18. Несоответствия в существующем коде (рефакторить по мере правок)

- `entities/user.ts`: `enum Role` → `UserRoleEnum` (с обновлением потребителей).
- `entities/user.ts`: `type User` → `type UserType`. Аналогично для DTO.
- `shared/constants.ts` → разнести по `shared/constants/<topic>.ts`.
- `shared/api/auth/index.ts`: `AuthService`-объект → отдельные файлы `login.ts`, `logout.ts`, `refresh.ts`, `register.ts`.
- Refresh-token интерсептор отсутствует — добавить при появлении бэка `/auth/refresh`.
- `widgets/header` — иконки inline в файле компонента → вынести в `widgets/header/icons/<name>.tsx`. Тексты UI → `constants.ts`.
- Mock-данные `views/home`, `widgets/activity-panel` — вынести в `constants.ts` соответствующих модулей.
- CSS моих модулей использует физические свойства (`padding`, `margin-bottom`) → перевести на логические.
- `widgets/header`: search-поле обернуть в `<form role="search">` с `<label>`.

При любой правке в этих местах — приводим к правилам, не оставляем «как было».
