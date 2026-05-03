export const IntegrationKindEnum = {
	SCM: 'scm',
	CI: 'ci',
	MONITORING: 'monitoring',
	CHAT: 'chat',
	QUALITY: 'quality',
} as const;

export type IntegrationKindType =
	(typeof IntegrationKindEnum)[keyof typeof IntegrationKindEnum];

export const IntegrationStatusEnum = {
	CONNECTED: 'connected',
	ERROR: 'error',
	DISABLED: 'disabled',
} as const;

export type IntegrationStatusType =
	(typeof IntegrationStatusEnum)[keyof typeof IntegrationStatusEnum];

export type IntegrationType = {
	id: string;
	name: string;
	provider: string;
	kind: IntegrationKindType;
	status: IntegrationStatusType;
	description: string;
	configUrl?: string;
	docsUrl?: string;
	lastSyncedAt?: string;
	statusMessage?: string;
};
