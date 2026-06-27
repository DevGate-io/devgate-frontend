import { ServiceHealth } from '@/entities/service';

const HEALTH_VALUES: ServiceHealth[] = Object.values(ServiceHealth);

export const parseHealthFilter = (
	value: string | undefined,
): ServiceHealth | undefined => {
	if (!value) {
		return undefined;
	}

	return HEALTH_VALUES.includes(value as ServiceHealth)
		? (value as ServiceHealth)
		: undefined;
};
