import {
	type AuditEventType,
	AuditTargetTypeEnum,
} from '@/entities/audit-event';
import { pageConfig } from '@/shared/config/page.config';

export const getTargetHref = (event: AuditEventType): string | null => {
	switch (event.targetType) {
		case AuditTargetTypeEnum.SERVICE:
			return `${pageConfig.catalog}/${event.targetId}`;
		case AuditTargetTypeEnum.TEMPLATE:
			return `${pageConfig.templates}/${event.targetId}`;
		case AuditTargetTypeEnum.TEAM:
			return `${pageConfig.teams}/${event.targetId}`;
		case AuditTargetTypeEnum.USER:
			return `${pageConfig.admin}/users`;
		case AuditTargetTypeEnum.INTEGRATION:
			return `${pageConfig.admin}/integrations`;
		default:
			return null;
	}
};
