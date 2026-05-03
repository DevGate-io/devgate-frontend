'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { clearAuthCookies, setAuthCookies } from '@/shared/api/auth/actions';
import type { AccessTokenResponse } from '@/shared/api/auth/types';
import { API_URLS } from '@/shared/config/api-urls';
import {
	BACKEND_REFRESH_COOKIE_NAME,
	REFRESH_TOKEN_KEY,
} from '@/shared/constants';

export const refreshSession = async (): Promise<string> => {
	const store = await cookies();
	const refreshToken = store.get(REFRESH_TOKEN_KEY)?.value;

	if (!refreshToken) {
		throw new Error('Refresh token is missing');
	}

	try {
		const response = await axios.post<AccessTokenResponse>(
			`${process.env.NEXT_PUBLIC_API_URL}${API_URLS.refresh}`,
			null,
			{
				headers: {
					Cookie: `${BACKEND_REFRESH_COOKIE_NAME}=${refreshToken}`,
				},
			},
		);

		await setAuthCookies(response.data.accessToken, response.data.refreshToken);

		return response.data.accessToken;
	} catch (error) {
		await clearAuthCookies();
		throw error;
	}
};
