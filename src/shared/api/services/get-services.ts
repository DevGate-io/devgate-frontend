'use server';

import type { ServiceType } from '@/entities/service';
import { apiClient } from '@/shared/api/client';
import { filterServices } from '@/shared/api/services/lib/filter-services';
import type { ServicesFiltersType } from '@/shared/api/services/types';
import { API_URLS } from '@/shared/config/api-urls';
import { MOCK_API } from '@/shared/config/mock-api';
import { MOCK_SERVICES } from '@/shared/lib/test-services';

export const getServices = async (
	filters: ServicesFiltersType = {},
): Promise<ServiceType[]> => {
	if (MOCK_API.services) {
		return filterServices(MOCK_SERVICES, filters);
	}

	const response = await apiClient.get<ServiceType[]>(API_URLS.services, {
		params: filters,
	});
	return response.data;
};
