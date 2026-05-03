'use server';

import { cookies } from 'next/headers';
import type { ServiceType } from '@/entities/service';
import { apiClient } from '@/shared/api/client';
import { filterServices } from '@/shared/api/services/lib/filter-services';
import type { ServicesFiltersType } from '@/shared/api/services/types';
import { API_URLS } from '@/shared/config/api-urls';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { isTestAccessToken } from '@/shared/lib/test-auth';
import { MOCK_SERVICES } from '@/shared/lib/test-services';

export const getServices = async (
	filters: ServicesFiltersType = {},
): Promise<ServiceType[]> => {
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value;

	if (token && isTestAccessToken(token)) {
		return filterServices(MOCK_SERVICES, filters);
	}

	const response = await apiClient.get<ServiceType[]>(API_URLS.services, {
		params: filters,
	});
	return response.data;
};
