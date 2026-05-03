import { ServiceHealthEnum, type ServiceHealthType } from '@/entities/service';

const HEALTH_COLOR: Record<ServiceHealthType, string> = {
	[ServiceHealthEnum.HEALTHY]: 'var(--mantine-color-mint-5)',
	[ServiceHealthEnum.DEGRADED]: 'var(--mantine-color-peach-5)',
	[ServiceHealthEnum.DOWN]: 'var(--mantine-color-danger-5)',
	[ServiceHealthEnum.UNKNOWN]: 'var(--mantine-color-gray-4)',
};

export const getHealthColor = (health: ServiceHealthType): string =>
	HEALTH_COLOR[health];
