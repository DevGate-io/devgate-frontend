'use server';

import type { IntegrationType } from '@/entities/integration';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { MOCK_API } from '@/shared/config/mock-api';
import { MOCK_INTEGRATIONS } from '@/shared/lib/test-integrations';

export const getIntegrations = async (): Promise<IntegrationType[]> => {
	if (MOCK_API.integrations) {
		return MOCK_INTEGRATIONS;
	}

	const response = await apiClient.get<IntegrationType[]>(
		API_URLS.integrations,
	);
	return response.data;
};
