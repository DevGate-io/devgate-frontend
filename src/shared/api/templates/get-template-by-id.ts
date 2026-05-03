'use server';

import { cookies } from 'next/headers';
import type { TemplateType } from '@/entities/template';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { isTestAccessToken } from '@/shared/lib/test-auth';
import { MOCK_TEMPLATES } from '@/shared/lib/test-templates';

export const getTemplateById = async (
	id: string,
): Promise<TemplateType | null> => {
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value;

	if (token && isTestAccessToken(token)) {
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
