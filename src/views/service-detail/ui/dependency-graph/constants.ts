import { ServiceHealth } from '@/entities/service';

export const GRAPH_HEIGHT = 480;
export const GRAPH_COOLDOWN_MS = 4000;
export const GRAPH_FADED_OPACITY = 0.18;
export const GRAPH_NODE_REL_SIZE = 14;
export const GRAPH_LINK_DISTANCE = 130;
export const GRAPH_LINK_STRENGTH = 0.4;
export const GRAPH_CHARGE_STRENGTH = -450;
export const GRAPH_ZOOM_DURATION_MS = 500;
export const GRAPH_ZOOM_PADDING = 60;
export const GRAPH_ARROW_LENGTH = 5;
export const GRAPH_ARROW_REL_POS = 0.92;

export const GRAPH_NODE_VAL_CURRENT = 3;
export const GRAPH_NODE_VAL_NEIGHBOR = 2;
export const GRAPH_NODE_VAL_OTHER = 1.5;

export const GRAPH_NODE_RADIUS_CURRENT = 9;
export const GRAPH_NODE_RADIUS_NEIGHBOR = 6.5;
export const GRAPH_NODE_RADIUS_OTHER = 5;
export const GRAPH_HALO_EXTRA_RADIUS = 4;

export const GRAPH_POINTER_RADIUS_CURRENT = 14;
export const GRAPH_POINTER_RADIUS_OTHER = 10;

export const HEALTH_COLOR_LIGHT: Record<ServiceHealth, string> = {
	[ServiceHealth.HEALTHY]: '#26be6d',
	[ServiceHealth.DEGRADED]: '#f57b0d',
	[ServiceHealth.DOWN]: '#d72440',
	[ServiceHealth.UNKNOWN]: '#b2b2bb',
};

export const HEALTH_COLOR_DARK: Record<ServiceHealth, string> = {
	[ServiceHealth.HEALTHY]: '#46cd84',
	[ServiceHealth.DEGRADED]: '#ff9128',
	[ServiceHealth.DOWN]: '#e0445f',
	[ServiceHealth.UNKNOWN]: '#7a7d85',
};

export const GRAPH_PALETTE = {
	currentLight: '#9075ff',
	currentDark: '#a890ff',
	labelLight: '#3c3c44',
	labelDark: '#cbcdd2',
	linkLight: 'rgba(110, 110, 130, 0.35)',
	linkDark: 'rgba(170, 170, 195, 0.35)',
	linkFadedLight: `rgba(110, 110, 130, ${GRAPH_FADED_OPACITY * 0.6})`,
	linkFadedDark: `rgba(170, 170, 195, ${GRAPH_FADED_OPACITY * 0.6})`,
	strokeLight: 'rgba(255, 255, 255, 0.85)',
	strokeDark: 'rgba(15, 16, 18, 0.6)',
} as const;
