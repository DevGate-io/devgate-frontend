import { Role, type User } from '@/entities/user';

export const TEST_AUTH_EMAIL = 'demo@devgate.local';
export const TEST_AUTH_PASSWORD = 'demo12345';
export const TEST_ACCESS_TOKEN = 'devgate-test-access-token';
export const TEST_REFRESH_TOKEN = 'devgate-test-refresh-token';

export const TEST_USER: User = {
	id: 'usr-alexey-zaytsev',
	email: TEST_AUTH_EMAIL,
	role: Role.ADMIN,
	fullName: 'Алексей Зайцев',
	lastLogin: '2026-05-03T10:01:00.000Z',
};

export const isTestCredentials = (email: string, password: string): boolean =>
	email === TEST_AUTH_EMAIL && password === TEST_AUTH_PASSWORD;

export const isTestAccessToken = (token: string): boolean =>
	token === TEST_ACCESS_TOKEN;
