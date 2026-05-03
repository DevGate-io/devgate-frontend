import type { ServiceType } from '@/entities/service';
import type { ServicesFiltersType } from '@/shared/api/services/types';

const matchesSearch = (service: ServiceType, search: string): boolean => {
	const haystack = [service.name, service.description ?? '']
		.join(' ')
		.toLowerCase();
	return haystack.includes(search.toLowerCase());
};

const matchesTags = (service: ServiceType, tags: string[]): boolean =>
	tags.every((tag) => service.tags.includes(tag));

export const filterServices = (
	services: ServiceType[],
	filters: ServicesFiltersType,
): ServiceType[] => {
	return services.filter((service) => {
		if (filters.search && !matchesSearch(service, filters.search)) {
			return false;
		}

		if (
			filters.tags &&
			filters.tags.length > 0 &&
			!matchesTags(service, filters.tags)
		) {
			return false;
		}

		if (filters.health && service.health !== filters.health) {
			return false;
		}

		if (filters.ownerTeamId && service.ownerTeamId !== filters.ownerTeamId) {
			return false;
		}

		return true;
	});
};
