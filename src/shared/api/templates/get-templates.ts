'use server';

import type { TemplateType } from '@/entities/template';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { MOCK_API } from '@/shared/config/mock-api';
import { MOCK_TEMPLATES } from '@/shared/lib/test-templates';

export const getTemplates = async (): Promise<TemplateType[]> => {
	if (MOCK_API.templates) {
		return MOCK_TEMPLATES;
	}

	const response = await apiClient.get<TemplateType[]>(API_URLS.templates);
	return response.data;
};
