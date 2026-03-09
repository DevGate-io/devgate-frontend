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
		return apiClient.post(API_URLS.login, data);
	},
	logout: async () => {},
	register: async (data: UserDto): Promise<AuthenticatedResponse> => {
		return apiClient.post(API_URLS.register, data);
	},
	refresh: async (): Promise<AccessTokenResponse> => {
		return apiClient.post(API_URLS.refresh);
	},
};
