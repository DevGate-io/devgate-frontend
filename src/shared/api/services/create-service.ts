'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import {
	type ServiceEnvironmentType,
	ServiceHealthEnum,
	type ServiceType,
} from '@/entities/service';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { pageConfig } from '@/shared/config/page.config';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { isTestAccessToken } from '@/shared/lib/test-auth';
import { addMockService } from '@/shared/lib/test-services';

export type CreateServiceDtoType = {
	name: string;
	slug: string;
	description?: string;
	language?: string;
	ownerTeamId: string;
	projectId: string;
	repoUrl?: string;
	pipelineUrl?: string;
	docsUrl?: string;
	tags: string[];
	environments: ServiceEnvironmentType[];
};

const buildMockService = (dto: CreateServiceDtoType): ServiceType => {
	const now = new Date().toISOString();

	return {
		id: `svc-${dto.slug}-${Date.now().toString(36)}`,
		projectId: dto.projectId,
		ownerTeamId: dto.ownerTeamId,
		name: dto.name,
		slug: dto.slug,
		description: dto.description,
		tags: dto.tags,
		language: dto.language,
		repoUrl: dto.repoUrl,
		pipelineUrl: dto.pipelineUrl,
		docsUrl: dto.docsUrl,
		environments: dto.environments,
		health: ServiceHealthEnum.UNKNOWN,
		dependencies: [],
		createdAt: now,
		updatedAt: now,
	};
};

export const createService = async (
	dto: CreateServiceDtoType,
): Promise<ServiceType> => {
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value;

	if (token && isTestAccessToken(token)) {
		const created = buildMockService(dto);
		addMockService(created);
		revalidatePath(pageConfig.catalog);
		return created;
	}

	const response = await apiClient.post<ServiceType>(API_URLS.services, dto);
	revalidatePath(pageConfig.catalog);
	return response.data;
};
