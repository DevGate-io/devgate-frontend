export const AuditActionEnum = {
	SERVICE_CREATED: 'service.created',
	SERVICE_UPDATED: 'service.updated',
	SERVICE_DELETED: 'service.deleted',
	TEMPLATE_USED: 'template.used',
	ROLE_CHANGED: 'user.role_changed',
	TEAM_MEMBER_ADDED: 'team.member_added',
	TEAM_MEMBER_REMOVED: 'team.member_removed',
	INTEGRATION_CONNECTED: 'integration.connected',
	INTEGRATION_DISCONNECTED: 'integration.disconnected',
} as const;

export type AuditActionType =
	(typeof AuditActionEnum)[keyof typeof AuditActionEnum];

export const AuditTargetTypeEnum = {
	SERVICE: 'service',
	TEMPLATE: 'template',
	TEAM: 'team',
	USER: 'user',
	INTEGRATION: 'integration',
} as const;

export type AuditTargetTypeType =
	(typeof AuditTargetTypeEnum)[keyof typeof AuditTargetTypeEnum];

export type AuditEventType = {
	id: string;
	action: AuditActionType;
	actorId: string;
	targetType: AuditTargetTypeType;
	targetId: string;
	targetLabel: string;
	createdAt: string;
	payload?: Record<string, string | number | boolean>;
};
