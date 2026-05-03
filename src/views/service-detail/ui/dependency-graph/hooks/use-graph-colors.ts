import { useMantineColorScheme } from '@mantine/core';
import { useMemo } from 'react';
import {
	GRAPH_PALETTE,
	HEALTH_COLOR_DARK,
	HEALTH_COLOR_LIGHT,
} from '@/views/service-detail/ui/dependency-graph/constants';
import type { GraphColorsType } from '@/views/service-detail/ui/dependency-graph/types';

type GraphColorsBundle = {
	colors: GraphColorsType;
	isDark: boolean;
};

export const useGraphColors = (): GraphColorsBundle => {
	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === 'dark';

	const colors = useMemo<GraphColorsType>(
		() => ({
			health: isDark ? HEALTH_COLOR_DARK : HEALTH_COLOR_LIGHT,
			current: isDark ? GRAPH_PALETTE.currentDark : GRAPH_PALETTE.currentLight,
			label: isDark ? GRAPH_PALETTE.labelDark : GRAPH_PALETTE.labelLight,
			link: isDark ? GRAPH_PALETTE.linkDark : GRAPH_PALETTE.linkLight,
			linkFaded: isDark
				? GRAPH_PALETTE.linkFadedDark
				: GRAPH_PALETTE.linkFadedLight,
			stroke: isDark ? GRAPH_PALETTE.strokeDark : GRAPH_PALETTE.strokeLight,
		}),
		[isDark],
	);

	return { colors, isDark };
};
