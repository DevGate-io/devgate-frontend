import { type AuditEventType, AuditTargetType } from '@/entities/audit-event';
import { pageConfig } from '@/shared/config/page.config';

export const getTargetHref = (event: AuditEventType): string | null => {
	switch (event.targetType) {
		case AuditTargetType.SERVICE:
			return `${pageConfig.catalog}/${event.targetId}`;
		case AuditTargetType.TEMPLATE:
			return `${pageConfig.templates}/${event.targetId}`;
		case AuditTargetType.TEAM:
			return `${pageConfig.teams}/${event.targetId}`;
		case AuditTargetType.USER:
			return `${pageConfig.admin}/users`;
		case AuditTargetType.INTEGRATION:
			return `${pageConfig.admin}/integrations`;
		default:
			return null;
	}
};
