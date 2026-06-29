import { type AuditEventType, AuditTargetType } from '@/entities/audit-event';
import { pageConfig } from '@/shared/config/page.config';

export const getTargetHref = (event: AuditEventType): string | null => {
	switch (event.target.type) {
		case AuditTargetType.SERVICE:
			return `${pageConfig.catalog}/${event.target.id}`;
		case AuditTargetType.TEMPLATE:
			return `${pageConfig.templates}/${event.target.id}`;
		case AuditTargetType.TEAM:
			return `${pageConfig.teams}/${event.target.id}`;
		case AuditTargetType.USER:
			return `${pageConfig.admin}/users`;
		case AuditTargetType.INTEGRATION:
			return `${pageConfig.admin}/integrations`;
		default:
			return null;
	}
};
