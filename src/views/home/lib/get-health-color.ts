import { ServiceHealthEnum, type ServiceHealthType } from '@/entities/service';
import type { HealthToneType } from '@/views/home/types';

const TONE_COLOR_VAR: Record<HealthToneType, string> = {
	mint: 'var(--mantine-color-mint-5)',
	sky: 'var(--mantine-color-sky-5)',
	peach: 'var(--mantine-color-peach-5)',
	danger: 'var(--mantine-color-danger-5)',
};

const HEALTH_TO_TONE: Record<ServiceHealthType, HealthToneType> = {
	[ServiceHealthEnum.HEALTHY]: 'mint',
	[ServiceHealthEnum.DEGRADED]: 'peach',
	[ServiceHealthEnum.DOWN]: 'danger',
	[ServiceHealthEnum.UNKNOWN]: 'sky',
};

export const getToneColor = (tone: HealthToneType): string =>
	TONE_COLOR_VAR[tone];

export const healthToTone = (health: ServiceHealthType): HealthToneType =>
	HEALTH_TO_TONE[health];

export const getHealthColor = (health: ServiceHealthType): string =>
	getToneColor(healthToTone(health));
