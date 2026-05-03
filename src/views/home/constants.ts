import type {
	EnvironmentHealthType,
	KpiType,
	ServiceUsageType,
} from '@/views/home/types';

export const HOME_LABELS = {
	title: 'Обзор',
	subtitle: 'Состояние платформы за последние 7 дней',
	kpiSectionLabel: 'Ключевые метрики',
	topServicesTitle: 'Самые активные сервисы',
	environmentsTitle: 'Здоровье по окружениям',
} as const;

export const KPIS: KpiType[] = [
	{
		id: 'services',
		label: 'Сервисы',
		value: '142',
		delta: '+6.2%',
		positive: true,
	},
	{
		id: 'pipelines',
		label: 'Активные пайплайны',
		value: '38',
		delta: '+12.1%',
		positive: true,
	},
	{
		id: 'incidents',
		label: 'Инциденты (7 д)',
		value: '4',
		delta: '−25%',
		positive: true,
	},
	{
		id: 'onboarding',
		label: 'Onboarding (avg)',
		value: '2.4 д',
		delta: '−0.6 д',
		positive: true,
	},
];

export const TOP_SERVICES: ServiceUsageType[] = [
	{
		id: 'payments-api',
		name: 'payments-api',
		owner: 'Platform',
		health: 'mint',
		usage: 92,
	},
	{
		id: 'orders-worker',
		name: 'orders-worker',
		owner: 'Commerce',
		health: 'mint',
		usage: 80,
	},
	{
		id: 'billing-gateway',
		name: 'billing-gateway',
		owner: 'Billing',
		health: 'peach',
		usage: 65,
	},
	{
		id: 'auth-service',
		name: 'auth-service',
		owner: 'Platform',
		health: 'sky',
		usage: 58,
	},
	{
		id: 'notifications',
		name: 'notifications',
		owner: 'Growth',
		health: 'mint',
		usage: 41,
	},
];

export const ENVIRONMENTS: EnvironmentHealthType[] = [
	{ id: 'prod', name: 'production', slo: 'SLO 99.94%', tone: 'mint' },
	{ id: 'stage', name: 'stage', slo: 'SLO 98.20%', tone: 'peach' },
	{ id: 'dev', name: 'dev', slo: 'SLO 97.10%', tone: 'sky' },
];
