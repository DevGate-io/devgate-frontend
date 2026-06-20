'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
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
	const store = await cookies();
	store.delete(ACCESS_TOKEN_KEY);
	store.delete(REFRESH_TOKEN_KEY);
};

export const logout = async () => {
	await clearAuthCookies();
	redirect(pageConfig.auth);
};
