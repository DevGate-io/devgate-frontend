import { useCallback } from 'react';
import {
	GRAPH_FADED_OPACITY,
	GRAPH_HALO_EXTRA_RADIUS,
	GRAPH_NODE_RADIUS_CURRENT,
	GRAPH_NODE_RADIUS_NEIGHBOR,
	GRAPH_NODE_RADIUS_OTHER,
	GRAPH_POINTER_RADIUS_CURRENT,
	GRAPH_POINTER_RADIUS_OTHER,
} from '@/views/service-detail/ui/dependency-graph/constants';
import type {
	GraphColorsType,
	GraphNodeRuntimeType,
} from '@/views/service-detail/ui/dependency-graph/types';

const getNodeRadius = (node: GraphNodeRuntimeType): number => {
	if (node.isCurrent) return GRAPH_NODE_RADIUS_CURRENT;
	if (node.isNeighbor) return GRAPH_NODE_RADIUS_NEIGHBOR;
	return GRAPH_NODE_RADIUS_OTHER;
};

type GraphRenderersDeps = {
	colors: GraphColorsType;
	isNodeHighlighted: (nodeId: string) => boolean;
};

type GraphRenderers = {
	drawNode: (
		rawNode: object,
		ctx: CanvasRenderingContext2D,
		globalScale: number,
	) => void;
	drawNodePointerArea: (
		rawNode: object,
		color: string,
		ctx: CanvasRenderingContext2D,
	) => void;
};

export const useGraphRenderers = ({
	colors,
	isNodeHighlighted,
}: GraphRenderersDeps): GraphRenderers => {
	const drawNode = useCallback(
		(rawNode: object, ctx: CanvasRenderingContext2D, globalScale: number) => {
			const node = rawNode as GraphNodeRuntimeType;
			if (node.x === undefined || node.y === undefined) return;

			const radius = getNodeRadius(node);
			const highlighted = isNodeHighlighted(node.id);
			const fillColor = node.isCurrent
				? colors.current
				: colors.health[node.health];

			if (node.isCurrent) {
				ctx.beginPath();
				ctx.arc(
					node.x,
					node.y,
					radius + GRAPH_HALO_EXTRA_RADIUS,
					0,
					2 * Math.PI,
				);
				ctx.fillStyle = colors.current;
				ctx.globalAlpha = highlighted ? 0.18 : GRAPH_FADED_OPACITY * 0.5;
				ctx.fill();
			}

			ctx.globalAlpha = highlighted ? 1 : GRAPH_FADED_OPACITY;

			ctx.beginPath();
			ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
			ctx.fillStyle = fillColor;
			ctx.fill();
			ctx.lineWidth = node.isCurrent ? 1.5 : 1;
			ctx.strokeStyle = colors.stroke;
			ctx.stroke();

			const fontSize = Math.max(11, 12 / globalScale);
			ctx.font = `${node.isCurrent ? 600 : 500} ${fontSize}px sans-serif`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.fillStyle = colors.label;
			ctx.fillText(node.name, node.x, node.y + radius + 3);

			ctx.globalAlpha = 1;
		},
		[colors, isNodeHighlighted],
	);

	const drawNodePointerArea = useCallback(
		(rawNode: object, color: string, ctx: CanvasRenderingContext2D) => {
			const node = rawNode as GraphNodeRuntimeType;
			if (node.x === undefined || node.y === undefined) return;
			const radius = node.isCurrent
				? GRAPH_POINTER_RADIUS_CURRENT
				: GRAPH_POINTER_RADIUS_OTHER;
			ctx.beginPath();
			ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
			ctx.fillStyle = color;
			ctx.fill();
		},
		[],
	);

	return { drawNode, drawNodePointerArea };
};
