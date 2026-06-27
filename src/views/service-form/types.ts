import type { ServiceEnvironmentName } from '@/entities/service';

export type ServiceFormStateType = {
	name: string;
	slug: string;
	description: string;
	language: string;
	ownerTeamId: string;
	projectId: string;
	repoUrl: string;
	pipelineUrl: string;
	docsUrl: string;
	tags: string[];
	environmentNames: ServiceEnvironmentName[];
};
