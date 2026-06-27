// TODO: Домены без реального бэкенда — отдаются из mock-данных.
// Когда домен появится на бэкенде — переключить флаг в false.
export const MOCK_API = {
	services: true,
	teams: true,
	templates: true,
	integrations: true,
	audit: true,
	users: false,
} as const;
