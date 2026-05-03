'use server';

import { cookies } from 'next/headers';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { isTestAccessToken } from '@/shared/lib/test-auth';
import { MOCK_SERVICES } from '@/shared/lib/test-services';

export const getServiceTags = async (): Promise<string[]> => {
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value;

	if (token && isTestAccessToken(token)) {
		const tags = new Set<string>();
		for (const service of MOCK_SERVICES) {
			for (const tag of service.tags) {
				tags.add(tag);
			}
		}
		return Array.from(tags).sort();
	}

	const response = await apiClient.get<string[]>(`${API_URLS.services}/tags`);
	return response.data;
};
