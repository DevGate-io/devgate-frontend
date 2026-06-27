'use server';

import type { TemplateType } from '@/entities/template';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { MOCK_API } from '@/shared/config/mock-api';
import { MOCK_TEMPLATES } from '@/shared/lib/test-templates';

export const getTemplateById = async (
	id: string,
): Promise<TemplateType | null> => {
	if (MOCK_API.templates) {
		const found = MOCK_TEMPLATES.find(
			(template) => template.id === id || template.slug === id,
		);
		return found ?? null;
	}

	try {
		const response = await apiClient.get<TemplateType>(
			`${API_URLS.templates}/${id}`,
		);
		return response.data;
	} catch {
		return null;
	}
};
