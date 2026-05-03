'use server';

import { cookies } from 'next/headers';
import type { IntegrationType } from '@/entities/integration';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { isTestAccessToken } from '@/shared/lib/test-auth';
import { MOCK_INTEGRATIONS } from '@/shared/lib/test-integrations';

export const getIntegrations = async (): Promise<IntegrationType[]> => {
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value;

	if (token && isTestAccessToken(token)) {
		return MOCK_INTEGRATIONS;
	}

	const response = await apiClient.get<IntegrationType[]>(
		API_URLS.integrations,
	);
	return response.data;
};
