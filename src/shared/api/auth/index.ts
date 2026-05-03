import type { UserDto } from '@/entities/dto/user-dto';
import type {
	AccessTokenResponse,
	AuthDto,
	AuthenticatedResponse,
} from '@/shared/api/auth/types';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';

export const AuthService = {
	login: async (data: AuthDto): Promise<AuthenticatedResponse> => {
		const response = await apiClient.post<AuthenticatedResponse>(
			API_URLS.login,
			data,
		);
		return response.data;
	},
	logout: async (): Promise<void> => {
		await apiClient.post(API_URLS.logout);
	},
	register: async (data: UserDto): Promise<AuthenticatedResponse> => {
		const response = await apiClient.post<AuthenticatedResponse>(
			API_URLS.register,
			data,
		);
		return response.data;
	},
	refresh: async (): Promise<AccessTokenResponse> => {
		const response = await apiClient.post<AccessTokenResponse>(
			API_URLS.refresh,
		);
		return response.data;
	},
};
