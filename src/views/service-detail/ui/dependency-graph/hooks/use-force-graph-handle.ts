import { useCallback, useRef } from 'react';
import {
	GRAPH_CHARGE_STRENGTH,
	GRAPH_LINK_DISTANCE,
	GRAPH_LINK_STRENGTH,
	GRAPH_ZOOM_DURATION_MS,
	GRAPH_ZOOM_PADDING,
} from '@/views/service-detail/ui/dependency-graph/constants';
import type { ForceGraphHandleType } from '@/views/service-detail/ui/dependency-graph/types';

type ForceGraphHandleBundle = {
	setForceGraphRef: (handle: ForceGraphHandleType | null) => void;
	handleEngineStop: () => void;
};

export const useForceGraphHandle = (): ForceGraphHandleBundle => {
	const handleRef = useRef<ForceGraphHandleType | null>(null);

	const setForceGraphRef = useCallback(
		(handle: ForceGraphHandleType | null) => {
			handleRef.current = handle;
			if (!handle) return;
			handle.d3Force('charge')?.strength?.(GRAPH_CHARGE_STRENGTH);
			handle.d3Force('link')?.distance?.(GRAPH_LINK_DISTANCE);
			handle.d3Force('link')?.strength?.(GRAPH_LINK_STRENGTH);
		},
		[],
	);

	const handleEngineStop = useCallback(() => {
		handleRef.current?.zoomToFit(GRAPH_ZOOM_DURATION_MS, GRAPH_ZOOM_PADDING);
	}, []);

	return { setForceGraphRef, handleEngineStop };
};
