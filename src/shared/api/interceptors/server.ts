import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { refreshSession } from '@/shared/api/auth/refresh-session';
import { API_URLS } from '@/shared/config/api-urls';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { generateAuthorizationHeader } from '@/shared/lib/generateAuthorizationHeader';

const SKIP_REFRESH_PATHS = [API_URLS.login, API_URLS.refresh, API_URLS.logout];

export const onRequestSuccess = async (request: InternalAxiosRequestConfig) => {
	const cookieStore = await cookies();
	const token = cookieStore.get(ACCESS_TOKEN_KEY)?.value?.replaceAll('"', '');

	if (token) {
		request.headers.Authorization = generateAuthorizationHeader(token);
	}

	return request;
};

export const onResponseError = async (error: AxiosError) => {
	const originalRequest = error.config as
		| (InternalAxiosRequestConfig & { _retry?: boolean })
		| undefined;

	const status = error.response?.status;
	const url = originalRequest?.url ?? '';
	const isAuthEndpoint = SKIP_REFRESH_PATHS.some((path) => url.includes(path));

	if (
		status === 401 &&
		originalRequest &&
		!originalRequest._retry &&
		!isAuthEndpoint
	) {
		originalRequest._retry = true;

		try {
			const accessToken = await refreshSession();
			originalRequest.headers.Authorization =
				generateAuthorizationHeader(accessToken);

			return axios.request(originalRequest);
		} catch (error) {
			console.error(error);
		}
	}

	return Promise.reject(error);
};
