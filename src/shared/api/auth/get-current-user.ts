'use server';

import type { User } from '@/entities/user';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';

export const getCurrentUser = async (): Promise<User> => {
	const response = await apiClient.get<User>(API_URLS.currentUser);
	return response.data;
};
