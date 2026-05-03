export const ServiceHealthEnum = {
	HEALTHY: 'healthy',
	DEGRADED: 'degraded',
	DOWN: 'down',
	UNKNOWN: 'unknown',
} as const;

export type ServiceHealthType =
	(typeof ServiceHealthEnum)[keyof typeof ServiceHealthEnum];

export const ServiceEnvironmentNameEnum = {
	DEV: 'dev',
	STAGE: 'stage',
	PROD: 'prod',
} as const;

export type ServiceEnvironmentNameType =
	(typeof ServiceEnvironmentNameEnum)[keyof typeof ServiceEnvironmentNameEnum];

export type ServiceEnvironmentType = {
	name: ServiceEnvironmentNameType;
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
	health: ServiceHealthType;
	dependencies: string[];
	createdAt: string;
	updatedAt: string;
};
