import { ServiceHealth } from '@/entities/service';
import { SERVICE_DETAIL_LABELS } from '@/views/service-detail/constants';

const HEALTH_TEXT: Record<ServiceHealth, string> = {
	[ServiceHealth.HEALTHY]: SERVICE_DETAIL_LABELS.healthyText,
	[ServiceHealth.DEGRADED]: SERVICE_DETAIL_LABELS.degradedText,
	[ServiceHealth.DOWN]: SERVICE_DETAIL_LABELS.downText,
	[ServiceHealth.UNKNOWN]: SERVICE_DETAIL_LABELS.unknownText,
};

export const getHealthText = (health: ServiceHealth): string =>
	HEALTH_TEXT[health];
