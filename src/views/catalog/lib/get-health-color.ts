import { ServiceHealth } from '@/entities/service';

const HEALTH_COLOR: Record<ServiceHealth, string> = {
	[ServiceHealth.HEALTHY]: 'var(--mantine-color-mint-5)',
	[ServiceHealth.DEGRADED]: 'var(--mantine-color-peach-5)',
	[ServiceHealth.DOWN]: 'var(--mantine-color-danger-5)',
	[ServiceHealth.UNKNOWN]: 'var(--mantine-color-gray-4)',
};

const HEALTH_BADGE_COLOR: Record<ServiceHealth, string> = {
	[ServiceHealth.HEALTHY]: 'mint',
	[ServiceHealth.DEGRADED]: 'peach',
	[ServiceHealth.DOWN]: 'danger',
	[ServiceHealth.UNKNOWN]: 'gray',
};

export const getHealthColor = (health: ServiceHealth): string =>
	HEALTH_COLOR[health];

export const getHealthBadgeColor = (health: ServiceHealth): string =>
	HEALTH_BADGE_COLOR[health];
