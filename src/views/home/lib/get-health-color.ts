import { ServiceHealth } from '@/entities/service';
import type { HealthToneType } from '@/views/home/types';

const TONE_COLOR_VAR: Record<HealthToneType, string> = {
	mint: 'var(--mantine-color-mint-5)',
	sky: 'var(--mantine-color-sky-5)',
	peach: 'var(--mantine-color-peach-5)',
	danger: 'var(--mantine-color-danger-5)',
};

const HEALTH_TO_TONE: Record<ServiceHealth, HealthToneType> = {
	[ServiceHealth.HEALTHY]: 'mint',
	[ServiceHealth.DEGRADED]: 'peach',
	[ServiceHealth.DOWN]: 'danger',
	[ServiceHealth.UNKNOWN]: 'sky',
};

export const getToneColor = (tone: HealthToneType): string =>
	TONE_COLOR_VAR[tone];

export const healthToTone = (health: ServiceHealth): HealthToneType =>
	HEALTH_TO_TONE[health];

export const getHealthColor = (health: ServiceHealth): string =>
	getToneColor(healthToTone(health));
