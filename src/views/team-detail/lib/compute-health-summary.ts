import {
	ServiceHealthEnum,
	type ServiceHealthType,
	type ServiceType,
} from '@/entities/service';

export type HealthSummaryType = {
	total: number;
	counts: Record<ServiceHealthType, number>;
};

export const computeHealthSummary = (
	services: ServiceType[],
): HealthSummaryType => {
	const counts: Record<ServiceHealthType, number> = {
		[ServiceHealthEnum.HEALTHY]: 0,
		[ServiceHealthEnum.DEGRADED]: 0,
		[ServiceHealthEnum.DOWN]: 0,
		[ServiceHealthEnum.UNKNOWN]: 0,
	};

	for (const service of services) {
		counts[service.health] += 1;
	}

	return {
		total: services.length,
		counts,
	};
};
