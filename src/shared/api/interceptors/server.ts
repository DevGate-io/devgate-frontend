'use server';

import type { InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { generateAuthorizationHeader } from '@/shared/lib/generateAuthorizationHeader';

const onSuccess = async (request: InternalAxiosRequestConfig) => {
	const cookieStore = await cookies();
	const token = cookieStore.get(ACCESS_TOKEN_KEY)?.value?.replaceAll('"', '');

	console.log(token);

	if (token) {
		request.headers.Authorization = generateAuthorizationHeader(token);
	}

	return request;
};

export default onSuccess;
