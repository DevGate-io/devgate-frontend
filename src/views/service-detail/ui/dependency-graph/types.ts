import type { GraphNodeType } from '@/views/service-detail/lib/compute-service-graph';

export type GraphNodeRuntimeType = GraphNodeType & {
	x?: number;
	y?: number;
};

export type GraphLinkRuntimeType = {
	source: string | GraphNodeRuntimeType;
	target: string | GraphNodeRuntimeType;
};

export type GraphColorsType = {
	health: Record<string, string>;
	current: string;
	label: string;
	link: string;
	linkFaded: string;
	stroke: string;
};

export type ForceFnType = {
	strength?: (n: number) => unknown;
	distance?: (n: number) => unknown;
};

export type ForceGraphHandleType = {
	d3Force: (name: string) => ForceFnType | null;
	zoomToFit: (ms: number, padding: number) => void;
};
