'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { type FC, useCallback, useRef } from 'react';
import { pageConfig } from '@/shared/config/page.config';
import { SERVICE_DETAIL_LABELS } from '@/views/service-detail/constants';
import type { ServiceGraphType } from '@/views/service-detail/lib/compute-service-graph';
import {
	GRAPH_ARROW_LENGTH,
	GRAPH_ARROW_REL_POS,
	GRAPH_COOLDOWN_MS,
	GRAPH_HEIGHT,
	GRAPH_NODE_REL_SIZE,
	GRAPH_NODE_VAL_CURRENT,
	GRAPH_NODE_VAL_NEIGHBOR,
	GRAPH_NODE_VAL_OTHER,
} from '@/views/service-detail/ui/dependency-graph/constants';
import { useContainerWidth } from '@/views/service-detail/ui/dependency-graph/hooks/use-container-width';
import { useForceGraphHandle } from '@/views/service-detail/ui/dependency-graph/hooks/use-force-graph-handle';
import { useGraphColors } from '@/views/service-detail/ui/dependency-graph/hooks/use-graph-colors';
import { useGraphData } from '@/views/service-detail/ui/dependency-graph/hooks/use-graph-data';
import { useGraphHighlight } from '@/views/service-detail/ui/dependency-graph/hooks/use-graph-highlight';
import { useGraphRenderers } from '@/views/service-detail/ui/dependency-graph/hooks/use-graph-renderers';
import type {
	GraphLinkRuntimeType,
	GraphNodeRuntimeType,
} from '@/views/service-detail/ui/dependency-graph/types';
import css from './index.module.css';

// force-graph под капотом обращается к window/document на module-load,
// поэтому нужен ssr:false — компонент рендерится только на клиенте.
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
	ssr: false,
});

type DependencyGraphCanvasProps = {
	graph: ServiceGraphType;
};

export const DependencyGraphCanvas: FC<DependencyGraphCanvasProps> = ({
	graph,
}) => {
	const router = useRouter();
	const containerRef = useRef<HTMLDivElement>(null);
	const width = useContainerWidth(containerRef);
	const { colors } = useGraphColors();
	const { data, adjacency } = useGraphData(graph);
	const { handleHover, isNodeHighlighted, isLinkHighlighted } =
		useGraphHighlight(adjacency);
	const { drawNode, drawNodePointerArea } = useGraphRenderers({
		colors,
		isNodeHighlighted,
	});
	const { setForceGraphRef, handleEngineStop } = useForceGraphHandle();

	const getNodeVal = useCallback((rawNode: object): number => {
		const node = rawNode as GraphNodeRuntimeType;
		if (node.isCurrent) return GRAPH_NODE_VAL_CURRENT;
		if (node.isNeighbor) return GRAPH_NODE_VAL_NEIGHBOR;
		return GRAPH_NODE_VAL_OTHER;
	}, []);

	const getLinkColor = useCallback(
		(link: object): string =>
			isLinkHighlighted(link as GraphLinkRuntimeType)
				? colors.link
				: colors.linkFaded,
		[colors, isLinkHighlighted],
	);

	const getLinkWidth = useCallback(
		(link: object): number =>
			isLinkHighlighted(link as GraphLinkRuntimeType) ? 1.4 : 0.8,
		[isLinkHighlighted],
	);

	const handleNodeClick = useCallback(
		(rawNode: object) => {
			const node = rawNode as GraphNodeRuntimeType;
			router.push(`${pageConfig.catalog}/${node.id}`);
		},
		[router],
	);

	const handleNodeHover = useCallback(
		(rawNode: object | null) => {
			handleHover((rawNode as GraphNodeRuntimeType | null) ?? null);
		},
		[handleHover],
	);

	if (graph.nodes.length === 0) {
		return (
			<section className={css.root}>
				<header className={css.head}>
					<h2 className={css.title}>
						{SERVICE_DETAIL_LABELS.dependenciesTitle}
					</h2>
				</header>
				<p className={css.empty}>{SERVICE_DETAIL_LABELS.dependenciesEmpty}</p>
			</section>
		);
	}

	return (
		<section className={css.root}>
			<header className={css.head}>
				<h2 className={css.title}>{SERVICE_DETAIL_LABELS.dependenciesTitle}</h2>
				<span className={css.legend}>
					{SERVICE_DETAIL_LABELS.dependencyGraphLegend}
				</span>
			</header>

			<div ref={containerRef} className={css.canvas}>
				{width > 0 && (
					<ForceGraph2D
						ref={setForceGraphRef as never}
						graphData={data}
						width={width}
						height={GRAPH_HEIGHT}
						cooldownTime={GRAPH_COOLDOWN_MS}
						onEngineStop={handleEngineStop}
						backgroundColor='transparent'
						nodeRelSize={GRAPH_NODE_REL_SIZE}
						nodeVal={getNodeVal}
						nodeLabel='name'
						nodeCanvasObject={drawNode}
						nodePointerAreaPaint={drawNodePointerArea}
						linkColor={getLinkColor}
						linkWidth={getLinkWidth}
						linkDirectionalArrowLength={GRAPH_ARROW_LENGTH}
						linkDirectionalArrowRelPos={GRAPH_ARROW_REL_POS}
						linkDirectionalArrowColor={() => colors.link}
						onNodeClick={handleNodeClick}
						onNodeHover={handleNodeHover}
					/>
				)}
			</div>
		</section>
	);
};
