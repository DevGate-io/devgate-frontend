'use server';

import type { AuthDto, AuthenticatedResponse } from '@/shared/api/auth/types';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';

export const login = async (data: AuthDto): Promise<AuthenticatedResponse> => {
	const response = await apiClient.post<AuthenticatedResponse>(
		API_URLS.login,
		data,
	);

	return response.data;
};
