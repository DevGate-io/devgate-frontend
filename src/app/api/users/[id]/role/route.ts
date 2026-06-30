import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { API_URLS } from '@/shared/config/api-urls';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/constants';
import { generateAuthorizationHeader } from '@/shared/lib/generateAuthorizationHeader';

export const PATCH = async (
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) => {
	const { id } = await params;
	const body = await request.json();
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value?.replaceAll('"', '');
	const refreshToken = store.get(REFRESH_TOKEN_KEY)?.value;

	if (!token) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const url = `${process.env.NEXT_PUBLIC_API_URL}${API_URLS.users}/${id}/role`;
	const headers: Record<string, string> = {
		Authorization: generateAuthorizationHeader(token),
		'Content-Type': 'application/json',
	};

	if (refreshToken) {
		headers.Cookie = `jwt-refresh-cookie=${refreshToken}`;
	}

	try {
		const response = await fetch(url, {
			method: 'PATCH',
			headers,
			body: JSON.stringify(body),
		});

		const data = response.headers
			.get('content-type')
			?.includes('application/json')
			? await response.json()
			: null;

		if (!response.ok) {
			return NextResponse.json(data ?? { error: 'Backend error' }, {
				status: response.status,
			});
		}

		return NextResponse.json(data);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
};
