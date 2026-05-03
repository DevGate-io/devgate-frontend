'use server';

import { cookies } from 'next/headers';
import type { TemplateType } from '@/entities/template';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { isTestAccessToken } from '@/shared/lib/test-auth';
import { MOCK_TEMPLATES } from '@/shared/lib/test-templates';

export const getTemplates = async (): Promise<TemplateType[]> => {
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value;

	if (token && isTestAccessToken(token)) {
		return MOCK_TEMPLATES;
	}

	const response = await apiClient.get<TemplateType[]>(API_URLS.templates);
	return response.data;
};
