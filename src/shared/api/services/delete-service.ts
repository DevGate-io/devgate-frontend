'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { pageConfig } from '@/shared/config/page.config';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { isTestAccessToken } from '@/shared/lib/test-auth';
import { removeMockService } from '@/shared/lib/test-services';

export const deleteService = async (id: string): Promise<void> => {
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value;

	if (token && isTestAccessToken(token)) {
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
