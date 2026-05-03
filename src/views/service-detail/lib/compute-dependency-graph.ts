import type { ServiceType } from '@/entities/service';

export type DependencyGraphType = {
	upstream: ServiceType[];
	downstream: ServiceType[];
};

export const computeDependencyGraph = (
	service: ServiceType,
	allServices: ServiceType[],
): DependencyGraphType => {
	const upstream = service.dependencies
		.map((id) => allServices.find((candidate) => candidate.id === id))
		.filter((candidate): candidate is ServiceType => candidate !== undefined);

	const downstream = allServices.filter((candidate) =>
		candidate.dependencies.includes(service.id),
	);

	return { upstream, downstream };
};
