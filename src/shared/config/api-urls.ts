export const API_URLS = {
	login: '/auth/login',
	register: '/auth/register',
	refresh: '/auth/refresh',
	logout: '/auth/logout',
	currentUser: '/auth/me',
	services: '/services',
	templates: '/templates',
	teams: '/teams',
	users: '/users',
	integrations: '/integrations',
	auditEvents: '/audit',
} as const;
