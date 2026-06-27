'use server';

import { revalidatePath } from 'next/cache';
import type { ServiceType } from '@/entities/service';
import { apiClient } from '@/shared/api/client';
import type { CreateServiceDtoType } from '@/shared/api/services/create-service';
import { API_URLS } from '@/shared/config/api-urls';
import { MOCK_API } from '@/shared/config/mock-api';
import { pageConfig } from '@/shared/config/page.config';
import { replaceMockService } from '@/shared/lib/test-services';

export type UpdateServiceDtoType = CreateServiceDtoType;

export const updateService = async (
	id: string,
	dto: UpdateServiceDtoType,
): Promise<ServiceType> => {
	if (MOCK_API.services) {
		const updated = replaceMockService(id, (current) => ({
			...current,
			name: dto.name,
			slug: dto.slug,
			description: dto.description,
			language: dto.language,
			ownerTeamId: dto.ownerTeamId,
			projectId: dto.projectId,
			repoUrl: dto.repoUrl,
			pipelineUrl: dto.pipelineUrl,
			docsUrl: dto.docsUrl,
			tags: dto.tags,
			environments: dto.environments,
			updatedAt: new Date().toISOString(),
		}));

		if (!updated) {
			throw new Error('Сервис не найден');
		}

		revalidatePath(pageConfig.catalog);
		revalidatePath(`${pageConfig.catalog}/${id}`);
		return updated;
	}

	const response = await apiClient.patch<ServiceType>(
		`${API_URLS.services}/${id}`,
		dto,
	);
	revalidatePath(pageConfig.catalog);
	revalidatePath(`${pageConfig.catalog}/${id}`);
	return response.data;
};
