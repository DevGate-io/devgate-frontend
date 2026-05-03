'use client';

import { useMantineColorScheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import {
	type FC,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { ServiceHealthEnum, type ServiceHealthType } from '@/entities/service';
import { pageConfig } from '@/shared/config/page.config';
import { SERVICE_DETAIL_LABELS } from '@/views/service-detail/constants';
import type {
	GraphNodeType,
	ServiceGraphType,
} from '@/views/service-detail/lib/compute-service-graph';
import css from './index.module.css';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
	ssr: false,
});

const HEIGHT = 480;
const COOLDOWN_MS = 4000;

const HEALTH_COLOR_LIGHT: Record<ServiceHealthType, string> = {
	[ServiceHealthEnum.HEALTHY]: '#26be6d',
	[ServiceHealthEnum.DEGRADED]: '#f57b0d',
	[ServiceHealthEnum.DOWN]: '#d72440',
	[ServiceHealthEnum.UNKNOWN]: '#b2b2bb',
};

const HEALTH_COLOR_DARK: Record<ServiceHealthType, string> = {
	[ServiceHealthEnum.HEALTHY]: '#46cd84',
	[ServiceHealthEnum.DEGRADED]: '#ff9128',
	[ServiceHealthEnum.DOWN]: '#e0445f',
	[ServiceHealthEnum.UNKNOWN]: '#7a7d85',
};

const CURRENT_COLOR_LIGHT = '#9075ff';
const CURRENT_COLOR_DARK = '#a890ff';
const LABEL_COLOR_LIGHT = '#3c3c44';
const LABEL_COLOR_DARK = '#cbcdd2';
const LINK_COLOR_LIGHT = 'rgba(110, 110, 130, 0.35)';
const LINK_COLOR_DARK = 'rgba(170, 170, 195, 0.35)';
const FADED_OPACITY = 0.18;

type DependencyGraphCanvasProps = {
	graph: ServiceGraphType;
};

type GraphNodeRuntime = GraphNodeType & {
	x?: number;
	y?: number;
};

type GraphLinkRuntime = {
	source: string | GraphNodeRuntime;
	target: string | GraphNodeRuntime;
};

const getNodeId = (
	endpoint: string | GraphNodeRuntime,
): string => (typeof endpoint === 'string' ? endpoint : endpoint.id);

type ForceFn = {
	strength?: (n: number) => unknown;
	distance?: (n: number) => unknown;
	radius?: (n: number) => unknown;
	iterations?: (n: number) => unknown;
};

type ForceGraphHandle = {
	d3Force: (name: string, fn?: unknown) => ForceFn | null;
	d3ReheatSimulation: () => void;
	zoomToFit: (ms: number, padding: number) => void;
};

export const DependencyGraphCanvas: FC<DependencyGraphCanvasProps> = ({
	graph,
}) => {
	const router = useRouter();
	const containerRef = useRef<HTMLDivElement>(null);
	const fgRef = useRef<ForceGraphHandle | null>(null);
	const [width, setWidth] = useState(0);
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === 'dark';

	const setForceGraphRef = useCallback((node: ForceGraphHandle | null) => {
		fgRef.current = node;
		if (!node) return;
		node.d3Force('charge')?.strength?.(-450);
		node.d3Force('link')?.distance?.(130);
		node.d3Force('link')?.strength?.(0.4);
	}, []);

	const handleEngineStop = useCallback(() => {
		fgRef.current?.zoomToFit(500, 60);
	}, []);

	useEffect(() => {
		const node = containerRef.current;
		if (!node) return;
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setWidth(Math.round(entry.contentRect.width));
			}
		});
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	const data = useMemo(
		() => ({
			nodes: graph.nodes.map((node) => ({ ...node })) as GraphNodeRuntime[],
			links: graph.links.map((link) => ({ ...link })) as GraphLinkRuntime[],
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

	const colors = useMemo(
		() => ({
			health: isDark ? HEALTH_COLOR_DARK : HEALTH_COLOR_LIGHT,
			current: isDark ? CURRENT_COLOR_DARK : CURRENT_COLOR_LIGHT,
			label: isDark ? LABEL_COLOR_DARK : LABEL_COLOR_LIGHT,
			link: isDark ? LINK_COLOR_DARK : LINK_COLOR_LIGHT,
		}),
		[isDark],
	);

	const isHighlighted = useCallback(
		(nodeId: string): boolean => {
			if (!hoveredId) return true;
			if (hoveredId === nodeId) return true;
			return adjacency.get(hoveredId)?.has(nodeId) ?? false;
		},
		[hoveredId, adjacency],
	);

	const isLinkHighlighted = useCallback(
		(link: GraphLinkRuntime): boolean => {
			if (!hoveredId) return true;
			return (
				getNodeId(link.source) === hoveredId ||
				getNodeId(link.target) === hoveredId
			);
		},
		[hoveredId],
	);

	const handleNodeClick = useCallback(
		(node: GraphNodeRuntime) => {
			router.push(`${pageConfig.catalog}/${node.id}`);
		},
		[router],
	);

	const drawNode = useCallback(
		(
			rawNode: object,
			ctx: CanvasRenderingContext2D,
			globalScale: number,
		) => {
			const node = rawNode as GraphNodeRuntime;
			if (node.x === undefined || node.y === undefined) return;
			const baseRadius = node.isCurrent ? 9 : node.isNeighbor ? 6.5 : 5;
			const highlight = isHighlighted(node.id);
			const fillColor = node.isCurrent
				? colors.current
				: colors.health[node.health];

			ctx.globalAlpha = highlight ? 1 : FADED_OPACITY;

			if (node.isCurrent) {
				ctx.beginPath();
				ctx.arc(node.x, node.y, baseRadius + 4, 0, 2 * Math.PI);
				ctx.fillStyle = colors.current;
				ctx.globalAlpha = highlight ? 0.18 : FADED_OPACITY * 0.5;
				ctx.fill();
				ctx.globalAlpha = highlight ? 1 : FADED_OPACITY;
			}

			ctx.beginPath();
			ctx.arc(node.x, node.y, baseRadius, 0, 2 * Math.PI);
			ctx.fillStyle = fillColor;
			ctx.fill();
			ctx.lineWidth = node.isCurrent ? 1.5 : 1;
			ctx.strokeStyle = isDark
				? 'rgba(15, 16, 18, 0.6)'
				: 'rgba(255, 255, 255, 0.85)';
			ctx.stroke();

			const fontSize = Math.max(11, 12 / globalScale);
			ctx.font = `${node.isCurrent ? 600 : 500} ${fontSize}px sans-serif`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'top';
			ctx.fillStyle = colors.label;
			ctx.fillText(node.name, node.x, node.y + baseRadius + 3);

			ctx.globalAlpha = 1;
		},
		[isDark, colors, isHighlighted],
	);

	const drawNodePointerArea = useCallback(
		(rawNode: object, color: string, ctx: CanvasRenderingContext2D) => {
			const node = rawNode as GraphNodeRuntime;
			if (node.x === undefined || node.y === undefined) return;
			const radius = node.isCurrent ? 14 : 10;
			ctx.beginPath();
			ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
			ctx.fillStyle = color;
			ctx.fill();
		},
		[],
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
						height={HEIGHT}
						cooldownTime={COOLDOWN_MS}
						onEngineStop={handleEngineStop}
						backgroundColor='transparent'
						nodeRelSize={14}
						nodeVal={(rawNode) => {
							const n = rawNode as GraphNodeRuntime;
							return n.isCurrent ? 3 : n.isNeighbor ? 2 : 1.5;
						}}
						nodeLabel='name'
						nodeCanvasObject={drawNode}
						nodePointerAreaPaint={drawNodePointerArea}
						linkColor={(link) =>
							isLinkHighlighted(link as GraphLinkRuntime)
								? colors.link
								: isDark
									? `rgba(170, 170, 195, ${FADED_OPACITY * 0.6})`
									: `rgba(110, 110, 130, ${FADED_OPACITY * 0.6})`
						}
						linkWidth={(link) =>
							isLinkHighlighted(link as GraphLinkRuntime) ? 1.4 : 0.8
						}
						linkDirectionalArrowLength={5}
						linkDirectionalArrowRelPos={0.92}
						linkDirectionalArrowColor={() => colors.link}
						onNodeClick={(node) => handleNodeClick(node as GraphNodeRuntime)}
						onNodeHover={(node) =>
							setHoveredId((node as GraphNodeRuntime | null)?.id ?? null)
						}
					/>
				)}
			</div>
		</section>
	);
};
