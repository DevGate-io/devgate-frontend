import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { API_URLS } from '@/shared/config/api-urls';
import {
	ACCESS_TOKEN_KEY,
	BACKEND_REFRESH_COOKIE_NAME,
	REFRESH_TOKEN_KEY,
} from '@/shared/constants';

export const POST = async (_request: NextRequest) => {
	const store = await cookies();
	const refreshToken = store.get(REFRESH_TOKEN_KEY)?.value;

	if (!refreshToken) {
		return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
	}

	const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}${API_URLS.refresh}`;

	try {
		const response = await fetch(backendUrl, {
			method: 'POST',
			headers: {
				Cookie: `${BACKEND_REFRESH_COOKIE_NAME}=${refreshToken}`,
			},
		});

		if (!response.ok) {
			store.delete(ACCESS_TOKEN_KEY);
			store.delete(REFRESH_TOKEN_KEY);
			return NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
		}

		const data = (await response.json()) as {
			accessToken: string;
			refreshToken: string;
		};

		store.set(ACCESS_TOKEN_KEY, data.accessToken, {
			httpOnly: false,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			path: '/',
		});

		store.set(REFRESH_TOKEN_KEY, data.refreshToken, {
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			path: '/',
		});

		return NextResponse.json({
			accessToken: data.accessToken,
			refreshToken: data.refreshToken,
		});
	} catch {
		return NextResponse.json({ error: 'Refresh failed' }, { status: 500 });
	}
};
