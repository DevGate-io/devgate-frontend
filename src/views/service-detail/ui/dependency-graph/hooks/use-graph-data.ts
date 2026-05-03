import { useMemo } from 'react';
import type { ServiceGraphType } from '@/views/service-detail/lib/compute-service-graph';
import type {
	GraphLinkRuntimeType,
	GraphNodeRuntimeType,
} from '@/views/service-detail/ui/dependency-graph/types';

type GraphDataBundle = {
	data: { nodes: GraphNodeRuntimeType[]; links: GraphLinkRuntimeType[] };
	adjacency: Map<string, Set<string>>;
};

export const useGraphData = (graph: ServiceGraphType): GraphDataBundle => {
	const data = useMemo(
		() => ({
			nodes: graph.nodes.map((node) => ({ ...node })) as GraphNodeRuntimeType[],
			links: graph.links.map((link) => ({ ...link }) as GraphLinkRuntimeType),
		}),
		[graph],
	);

	const adjacency = useMemo(() => {
		const map = new Map<string, Set<string>>();
		for (const link of graph.links) {
			if (!map.has(link.source)) map.set(link.source, new Set());
			if (!map.has(link.target)) map.set(link.target, new Set());
			map.get(link.source)?.add(link.target);
			map.get(link.target)?.add(link.source);
		}
		return map;
	}, [graph]);

	return { data, adjacency };
};
