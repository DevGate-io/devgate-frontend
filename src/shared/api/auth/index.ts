import type { AuthDto } from '@/shared/api/auth/types';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';

export const AuthService = {
	login: async (data: AuthDto) => {
		return await apiClient.post(API_URLS.login, data);
	},
	logout: async () => {},
	register: async () => {},
	refresh: async () => {},
};
