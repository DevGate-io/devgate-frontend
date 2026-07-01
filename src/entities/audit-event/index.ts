export enum AuditAction {
	SERVICE_CREATED = 'service.created',
	SERVICE_UPDATED = 'service.updated',
	SERVICE_DELETED = 'service.deleted',

	TEMPLATE_USED = 'template.used',

	TEAM_MEMBER_ADDED = 'team.member.added',
	TEAM_MEMBER_REMOVED = 'team.member.removed',
	TEAM_MEMBER_UPDATED = 'team.member.updated',

	TEAM_CREATED = 'team.created',
	TEAM_UPDATED = 'team.updated',
	TEAM_DELETED = 'team.deleted',

	INTEGRATION_CONNECTED = 'integration.connected',
	INTEGRATION_DISCONNECTED = 'integration.disconnected',

	USER_DELETED = 'user.deleted',
	USER_CREATED = 'user.created',
	USER_UPDATED = 'user.updated',
	ROLE_CHANGED = 'user.role_changed',
}

export enum AuditTargetType {
	SERVICE = 'service',
	TEMPLATE = 'template',
	TEAM = 'team',
	USER = 'user',
	INTEGRATION = 'integration',
}

export type AuditEventType = {
	id: number;
	action: AuditAction;
	actorId: string;
	createdAt: string;
	payload: Record<string, string | number | boolean> | null;
	target: {
		id: string;
		label: string;
		type: AuditTargetType;
	};
};
