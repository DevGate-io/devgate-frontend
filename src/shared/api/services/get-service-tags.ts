'use server';

import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { MOCK_API } from '@/shared/config/mock-api';
import { MOCK_SERVICES } from '@/shared/lib/test-services';

export const getServiceTags = async (): Promise<string[]> => {
	if (MOCK_API.services) {
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
