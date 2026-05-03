import type { ServiceEnvironmentType, ServiceType } from '@/entities/service';
import type { UpdateServiceDtoType } from '@/shared/api/services/update-service';
import { buildCreateServiceDto } from '@/views/service-form/lib/build-create-service-dto';
import type { ServiceFormStateType } from '@/views/service-form/types';

const mergeEnvironments = (
	formEnvironments: ServiceEnvironmentType[],
	sourceEnvironments: ServiceEnvironmentType[],
): ServiceEnvironmentType[] => {
	const sourceByName = new Map(
		sourceEnvironments.map((env) => [env.name, env]),
	);

	return formEnvironments.map((env) => {
		const source = sourceByName.get(env.name);
		return source ? { ...env, url: source.url } : env;
	});
};

export const buildUpdateServiceDto = (
	state: ServiceFormStateType,
	source: ServiceType,
): UpdateServiceDtoType => {
	const base = buildCreateServiceDto(state);

	return {
		...base,
		environments: mergeEnvironments(base.environments, source.environments),
	};
};
