import type { CreateServiceDtoType } from '@/shared/api/services/create-service';
import type { ServiceFormStateType } from '@/views/service-form/types';

const trimOrUndefined = (value: string): string | undefined => {
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : undefined;
};

export const buildCreateServiceDto = (
	state: ServiceFormStateType,
): CreateServiceDtoType => {
	return {
		name: state.name.trim(),
		slug: state.slug.trim(),
		description: trimOrUndefined(state.description),
		language: trimOrUndefined(state.language),
		ownerTeamId: state.ownerTeamId.trim(),
		projectId: state.projectId.trim(),
		repoUrl: trimOrUndefined(state.repoUrl),
		pipelineUrl: trimOrUndefined(state.pipelineUrl),
		docsUrl: trimOrUndefined(state.docsUrl),
		tags: state.tags.map((tag) => tag.trim()).filter(Boolean),
		environments: state.environmentNames.map((name) => ({ name })),
	};
};
