import type { ServiceType } from '@/entities/service';

export const countServicesPerTeam = (
	services: ServiceType[],
): Record<string, number> => {
	const counts: Record<string, number> = {};
	for (const service of services) {
		counts[service.ownerTeamId] = (counts[service.ownerTeamId] ?? 0) + 1;
	}
	return counts;
};
