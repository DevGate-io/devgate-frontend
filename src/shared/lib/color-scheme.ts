'use server';

import { cookies } from 'next/headers';
import { COLOR_SCHEME_COOKIE } from '@/shared/constants';

export type AppColorScheme = 'light' | 'dark';

const ONE_YEAR = 60 * 60 * 24 * 365;

export const readColorScheme = async (): Promise<AppColorScheme> => {
	const store = await cookies();
	const value = store.get(COLOR_SCHEME_COOKIE)?.value;
	return value === 'dark' ? 'dark' : 'light';
};

export const setColorScheme = async (scheme: AppColorScheme): Promise<void> => {
	const store = await cookies();
	store.set(COLOR_SCHEME_COOKIE, scheme, {
		path: '/',
		sameSite: 'lax',
		maxAge: ONE_YEAR,
	});
};
