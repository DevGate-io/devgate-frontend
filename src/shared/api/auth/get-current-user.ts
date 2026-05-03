'use server';

import { cookies } from 'next/headers';
import type { User } from '@/entities/user';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { isTestAccessToken, TEST_USER } from '@/shared/lib/test-auth';

export const getCurrentUser = async (): Promise<User> => {
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value;

	if (token && isTestAccessToken(token)) {
		return TEST_USER;
	}

	const response = await apiClient.get<User>(API_URLS.currentUser);
	return response.data;
};
