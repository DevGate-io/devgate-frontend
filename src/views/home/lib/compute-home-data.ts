import {
	AuditActionEnum,
	type AuditEventType,
	AuditTargetTypeEnum,
} from '@/entities/audit-event';
import {
	ServiceEnvironmentNameEnum,
	type ServiceEnvironmentNameType,
	ServiceHealthEnum,
	type ServiceType,
} from '@/entities/service';
import type { TeamType } from '@/entities/team';
import type {
	EnvironmentSummaryType,
	HomeKpiType,
	TopServiceType,
} from '@/views/home/types';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const ENV_DISPLAY_NAMES: Record<ServiceEnvironmentNameType, string> = {
	[ServiceEnvironmentNameEnum.PROD]: 'production',
	[ServiceEnvironmentNameEnum.STAGE]: 'stage',
	[ServiceEnvironmentNameEnum.DEV]: 'dev',
};

const ENV_ORDER: ServiceEnvironmentNameType[] = [
	ServiceEnvironmentNameEnum.PROD,
	ServiceEnvironmentNameEnum.STAGE,
	ServiceEnvironmentNameEnum.DEV,
];

const formatDelta = (value: number, suffix = ''): string => {
	if (value === 0) return `±0${suffix}`;
	const sign = value > 0 ? '+' : '−';
	return `${sign}${Math.abs(value)}${suffix}`;
};

export type HomeDataType = {
	kpis: HomeKpiType[];
	topServices: TopServiceType[];
	environments: EnvironmentSummaryType[];
};

export const computeHomeData = (
	services: ServiceType[],
	events: AuditEventType[],
	teams: TeamType[],
): HomeDataType => {
	const teamById = new Map(teams.map((team) => [team.id, team]));

	const now = Date.now();
	const sevenDaysAgo = now - SEVEN_DAYS_MS;
	const thirtyDaysAgo = now - THIRTY_DAYS_MS;

	const recent7d = events.filter(
		(event) => new Date(event.createdAt).getTime() >= sevenDaysAgo,
	);
	const recent30d = events.filter(
		(event) => new Date(event.createdAt).getTime() >= thirtyDaysAgo,
	);

	const created7d = recent7d.filter(
		(event) => event.action === AuditActionEnum.SERVICE_CREATED,
	).length;
	const deleted7d = recent7d.filter(
		(event) => event.action === AuditActionEnum.SERVICE_DELETED,
	).length;
	const templates7d = recent7d.filter(
		(event) => event.action === AuditActionEnum.TEMPLATE_USED,
	).length;
	const incidents = services.filter(
		(service) =>
			service.health === ServiceHealthEnum.DEGRADED ||
			service.health === ServiceHealthEnum.DOWN,
	).length;
	const withPipeline = services.filter(
		(service) => !!service.pipelineUrl,
	).length;

	const kpis: HomeKpiType[] = [
		{
			id: 'services',
			label: 'Сервисы',
			value: String(services.length),
			delta: formatDelta(created7d - deleted7d),
			positive: created7d - deleted7d >= 0,
			tone: 'lavender',
		},
		{
			id: 'pipelines',
			label: 'С активным CI',
			value: String(withPipeline),
			delta: `${Math.round((withPipeline / Math.max(services.length, 1)) * 100)}%`,
			positive: withPipeline >= services.length / 2,
			tone: 'sky',
		},
		{
			id: 'incidents',
			label: 'Сервисов в риске',
			value: String(incidents),
			delta: incidents === 0 ? 'нет инцидентов' : 'требуют внимания',
			positive: incidents === 0,
			tone: 'mint',
		},
		{
			id: 'templates',
			label: 'Запусков шаблонов (7 д)',
			value: String(templates7d),
			delta: `команд: ${teams.length}`,
			positive: true,
			tone: 'peach',
		},
	];

	const eventsByService = new Map<string, number>();
	for (const event of recent30d) {
		if (event.targetType === AuditTargetTypeEnum.SERVICE) {
			eventsByService.set(
				event.targetId,
				(eventsByService.get(event.targetId) ?? 0) + 1,
			);
		}
	}

	const maxActivity = Math.max(...eventsByService.values(), 1);

	const topServices: TopServiceType[] = services
		.map((service) => ({
			id: service.id,
			name: service.name,
			ownerTeamId: service.ownerTeamId,
			ownerTeamName:
				teamById.get(service.ownerTeamId)?.name ?? service.ownerTeamId,
			health: service.health,
			activity: eventsByService.get(service.id) ?? 0,
		}))
		.sort((a, b) => b.activity - a.activity)
		.slice(0, 5)
		.map((entry) => ({
			...entry,
			usagePercent: Math.round((entry.activity / maxActivity) * 100),
		}));

	const environments: EnvironmentSummaryType[] = ENV_ORDER.map((envName) => {
		const matching = services.filter((service) =>
			service.environments.some((env) => env.name === envName),
		);
		const healthy = matching.filter(
			(service) => service.health === ServiceHealthEnum.HEALTHY,
		).length;
		const ratio = matching.length === 0 ? 0 : healthy / matching.length;
		return {
			id: envName,
			name: ENV_DISPLAY_NAMES[envName],
			servicesCount: matching.length,
			healthyCount: healthy,
			ratio,
		};
	});

	return { kpis, topServices, environments };
};
