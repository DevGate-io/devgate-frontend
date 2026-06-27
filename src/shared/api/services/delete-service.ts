'use server';

import { revalidatePath } from 'next/cache';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { MOCK_API } from '@/shared/config/mock-api';
import { pageConfig } from '@/shared/config/page.config';
import { removeMockService } from '@/shared/lib/test-services';

export const deleteService = async (id: string): Promise<void> => {
	if (MOCK_API.services) {
		const removed = removeMockService(id);
		if (!removed) {
			throw new Error('Сервис не найден');
		}
		revalidatePath(pageConfig.catalog);
		return;
	}

	await apiClient.delete(`${API_URLS.services}/${id}`);
	revalidatePath(pageConfig.catalog);
};
