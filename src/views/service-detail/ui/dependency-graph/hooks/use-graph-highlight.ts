import { useCallback, useState } from 'react';
import type {
	GraphLinkRuntimeType,
	GraphNodeRuntimeType,
} from '@/views/service-detail/ui/dependency-graph/types';

const getNodeId = (endpoint: string | GraphNodeRuntimeType): string =>
	typeof endpoint === 'string' ? endpoint : endpoint.id;

type GraphHighlightBundle = {
	hoveredId: string | null;
	handleHover: (node: GraphNodeRuntimeType | null) => void;
	isNodeHighlighted: (nodeId: string) => boolean;
	isLinkHighlighted: (link: GraphLinkRuntimeType) => boolean;
};

export const useGraphHighlight = (
	adjacency: Map<string, Set<string>>,
): GraphHighlightBundle => {
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const handleHover = useCallback((node: GraphNodeRuntimeType | null) => {
		setHoveredId(node?.id ?? null);
	}, []);

	const isNodeHighlighted = useCallback(
		(nodeId: string): boolean => {
			if (!hoveredId) return true;
			if (hoveredId === nodeId) return true;
			return adjacency.get(hoveredId)?.has(nodeId) ?? false;
		},
		[hoveredId, adjacency],
	);

	const isLinkHighlighted = useCallback(
		(link: GraphLinkRuntimeType): boolean => {
			if (!hoveredId) return true;
			return (
				getNodeId(link.source) === hoveredId ||
				getNodeId(link.target) === hoveredId
			);
		},
		[hoveredId],
	);

	return { hoveredId, handleHover, isNodeHighlighted, isLinkHighlighted };
};
