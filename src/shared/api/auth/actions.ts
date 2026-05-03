'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { pageConfig } from '@/shared/config/page.config';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';

export const setAuthCookie = async (token: string) => {
	const store = await cookies();
	store.set(ACCESS_TOKEN_KEY, token, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		path: '/',
	});
};

export const clearAuthCookie = async () => {
	const store = await cookies();
	store.delete(ACCESS_TOKEN_KEY);
};

export const logout = async () => {
	await clearAuthCookie();
	redirect(pageConfig.auth);
};
