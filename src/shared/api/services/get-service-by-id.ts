'use server';

import { cookies } from 'next/headers';
import type { ServiceType } from '@/entities/service';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { isTestAccessToken } from '@/shared/lib/test-auth';
import { MOCK_SERVICES } from '@/shared/lib/test-services';

export const getServiceById = async (
	id: string,
): Promise<ServiceType | null> => {
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value;

	if (token && isTestAccessToken(token)) {
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
