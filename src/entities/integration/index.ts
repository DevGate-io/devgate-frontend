export enum IntegrationKind {
	SCM = 'scm',
	CI = 'ci',
	MONITORING = 'monitoring',
	CHAT = 'chat',
	QUALITY = 'quality',
}

export enum IntegrationStatus {
	CONNECTED = 'connected',
	ERROR = 'error',
	DISABLED = 'disabled',
}

export type IntegrationType = {
	id: string;
	name: string;
	provider: string;
	kind: IntegrationKind;
	status: IntegrationStatus;
	description: string;
	configUrl?: string;
	docsUrl?: string;
	lastSyncedAt?: string;
	statusMessage?: string;
};
