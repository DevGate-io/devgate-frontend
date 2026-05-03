import { ServiceHealthEnum, type ServiceHealthType } from '@/entities/service';
import { SERVICE_DETAIL_LABELS } from '@/views/service-detail/constants';

const HEALTH_TEXT: Record<ServiceHealthType, string> = {
	[ServiceHealthEnum.HEALTHY]: SERVICE_DETAIL_LABELS.healthyText,
	[ServiceHealthEnum.DEGRADED]: SERVICE_DETAIL_LABELS.degradedText,
	[ServiceHealthEnum.DOWN]: SERVICE_DETAIL_LABELS.downText,
	[ServiceHealthEnum.UNKNOWN]: SERVICE_DETAIL_LABELS.unknownText,
};

export const getHealthText = (health: ServiceHealthType): string =>
	HEALTH_TEXT[health];
