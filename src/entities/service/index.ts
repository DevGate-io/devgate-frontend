export enum ServiceHealth {
	HEALTHY = 'healthy',
	DEGRADED = 'degraded',
	DOWN = 'down',
	UNKNOWN = 'unknown',
}

export enum ServiceEnvironmentName {
	DEV = 'dev',
	STAGE = 'stage',
	PROD = 'prod',
}

export type ServiceEnvironmentType = {
	name: ServiceEnvironmentName;
	url?: string;
};

export type ServiceSloType = {
	availability: number;
	latencyP95Ms?: number;
};

export type ServiceType = {
	id: string;
	projectId: string;
	ownerTeamId: string;
	name: string;
	slug: string;
	description?: string;
	tags: string[];
	language?: string;
	repoUrl?: string;
	pipelineUrl?: string;
	docsUrl?: string;
	environments: ServiceEnvironmentType[];
	slo?: ServiceSloType;
	health: ServiceHealth;
	dependencies: string[];
	createdAt: string;
	updatedAt: string;
};
