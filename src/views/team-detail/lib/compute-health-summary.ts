import { ServiceHealth, type ServiceType } from '@/entities/service';

export type HealthSummaryType = {
	total: number;
	counts: Record<ServiceHealth, number>;
};

export const computeHealthSummary = (
	services: ServiceType[],
): HealthSummaryType => {
	const counts: Record<ServiceHealth, number> = {
		[ServiceHealth.HEALTHY]: 0,
		[ServiceHealth.DEGRADED]: 0,
		[ServiceHealth.DOWN]: 0,
		[ServiceHealth.UNKNOWN]: 0,
	};

	for (const service of services) {
		counts[service.health] += 1;
	}

	return {
		total: services.length,
		counts,
	};
};
