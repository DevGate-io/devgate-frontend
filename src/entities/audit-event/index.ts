export enum AuditAction {
	SERVICE_CREATED = 'service.created',
	SERVICE_UPDATED = 'service.updated',
	SERVICE_DELETED = 'service.deleted',
	TEMPLATE_USED = 'template.used',
	ROLE_CHANGED = 'user.role_changed',
	TEAM_MEMBER_ADDED = 'team.member_added',
	TEAM_MEMBER_REMOVED = 'team.member_removed',
	INTEGRATION_CONNECTED = 'integration.connected',
	INTEGRATION_DISCONNECTED = 'integration.disconnected',
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
