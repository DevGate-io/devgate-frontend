'use server';

import type { ServiceType } from '@/entities/service';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { MOCK_API } from '@/shared/config/mock-api';
import { MOCK_SERVICES } from '@/shared/lib/test-services';

export const getServiceById = async (
	id: string,
): Promise<ServiceType | null> => {
	if (MOCK_API.services) {
		const found = MOCK_SERVICES.find(
			(service) => service.id === id || service.slug === id,
		);
		return found ?? null;
	}

	try {
		const response = await apiClient.get<ServiceType>(
			`${API_URLS.services}/${id}`,
		);
		return response.data;
	} catch {
		return null;
	}
};
