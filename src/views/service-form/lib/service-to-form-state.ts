import type { ServiceType } from '@/entities/service';
import type { ServiceFormStateType } from '@/views/service-form/types';

export const serviceToFormState = (
	service: ServiceType,
): ServiceFormStateType => {
	return {
		name: service.name,
		slug: service.slug,
		description: service.description ?? '',
		language: service.language ?? '',
		ownerTeamId: service.ownerTeamId,
		projectId: service.projectId,
		repoUrl: service.repoUrl ?? '',
		pipelineUrl: service.pipelineUrl ?? '',
		docsUrl: service.docsUrl ?? '',
		tags: [...service.tags],
		environmentNames: service.environments.map((env) => env.name),
	};
};
