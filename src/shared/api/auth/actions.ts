'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { pageConfig } from '@/shared/config/page.config';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/constants';

const cookieOptions = {
	httpOnly: true,
	sameSite: 'lax' as const,
	secure: process.env.NODE_ENV === 'production',
	path: '/',
};

export const setAuthCookies = async (
	accessToken: string,
	refreshToken: string,
) => {
	const store = await cookies();
	store.set(ACCESS_TOKEN_KEY, accessToken, cookieOptions);
	store.set(REFRESH_TOKEN_KEY, refreshToken, cookieOptions);
};

export const clearAuthCookies = async () => {
	try {
		const store = await cookies();
		store.delete(ACCESS_TOKEN_KEY);
		store.delete(REFRESH_TOKEN_KEY);
	} catch (error) {
		console.error(error);
	}
};

export const logout = async () => {
	try {
		await apiClient.post(API_URLS.logout);
	} catch (error) {
		console.error(error);
	}

	await clearAuthCookies();
	redirect(pageConfig.auth);
};
