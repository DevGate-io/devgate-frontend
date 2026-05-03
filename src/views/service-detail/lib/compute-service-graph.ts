import type { ServiceHealthType, ServiceType } from '@/entities/service';

export type GraphNodeType = {
	id: string;
	name: string;
	health: ServiceHealthType;
	isCurrent: boolean;
	isNeighbor: boolean;
};

export type GraphLinkType = {
	source: string;
	target: string;
};

export type ServiceGraphType = {
	nodes: GraphNodeType[];
	links: GraphLinkType[];
};

export const computeServiceGraph = (
	currentServiceId: string,
	allServices: ServiceType[],
): ServiceGraphType => {
	const idSet = new Set(allServices.map((service) => service.id));
	const neighborIds = new Set<string>();

	const current = allServices.find(
		(service) => service.id === currentServiceId,
	);
	if (current) {
		for (const dep of current.dependencies) {
			if (idSet.has(dep)) neighborIds.add(dep);
		}
		for (const candidate of allServices) {
			if (candidate.dependencies.includes(currentServiceId)) {
				neighborIds.add(candidate.id);
			}
		}
	}

	const nodes: GraphNodeType[] = allServices.map((service) => ({
		id: service.id,
		name: service.name,
		health: service.health,
		isCurrent: service.id === currentServiceId,
		isNeighbor: neighborIds.has(service.id),
	}));

	const links: GraphLinkType[] = [];
	for (const service of allServices) {
		for (const dep of service.dependencies) {
			if (idSet.has(dep)) {
				links.push({ source: service.id, target: dep });
			}
		}
	}

	return { nodes, links };
};
