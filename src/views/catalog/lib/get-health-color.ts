import { ServiceHealthEnum, type ServiceHealthType } from '@/entities/service';

const HEALTH_COLOR: Record<ServiceHealthType, string> = {
	[ServiceHealthEnum.HEALTHY]: 'var(--mantine-color-mint-5)',
	[ServiceHealthEnum.DEGRADED]: 'var(--mantine-color-peach-5)',
	[ServiceHealthEnum.DOWN]: 'var(--mantine-color-danger-5)',
	[ServiceHealthEnum.UNKNOWN]: 'var(--mantine-color-gray-4)',
};

const HEALTH_BADGE_COLOR: Record<ServiceHealthType, string> = {
	[ServiceHealthEnum.HEALTHY]: 'mint',
	[ServiceHealthEnum.DEGRADED]: 'peach',
	[ServiceHealthEnum.DOWN]: 'danger',
	[ServiceHealthEnum.UNKNOWN]: 'gray',
};

export const getHealthColor = (health: ServiceHealthType): string =>
	HEALTH_COLOR[health];

export const getHealthBadgeColor = (health: ServiceHealthType): string =>
	HEALTH_BADGE_COLOR[health];
