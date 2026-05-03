import { ServiceHealthEnum, type ServiceHealthType } from '@/entities/service';

const HEALTH_VALUES: ServiceHealthType[] = Object.values(ServiceHealthEnum);

export const parseHealthFilter = (
	value: string | undefined,
): ServiceHealthType | undefined => {
	if (!value) {
		return undefined;
	}

	return HEALTH_VALUES.includes(value as ServiceHealthType)
		? (value as ServiceHealthType)
		: undefined;
};
