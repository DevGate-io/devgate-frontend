import type { HealthToneType } from '@/views/home/types';

const HEALTH_COLOR_VAR: Record<HealthToneType, string> = {
	mint: 'var(--mantine-color-mint-5)',
	sky: 'var(--mantine-color-sky-5)',
	peach: 'var(--mantine-color-peach-5)',
	danger: 'var(--mantine-color-danger-5)',
};

export const getHealthColor = (tone: HealthToneType): string =>
	HEALTH_COLOR_VAR[tone];
