import type { ServiceHealth } from '@/entities/service';

export type HealthToneType = 'mint' | 'sky' | 'peach' | 'danger';

export type KpiToneType = 'lavender' | 'sky' | 'mint' | 'peach';

export type HomeKpiType = {
	id: string;
	label: string;
	value: string;
	delta: string;
	positive: boolean;
	tone: KpiToneType;
};

export type TopServiceType = {
	id: string;
	name: string;
	ownerTeamId: string;
	ownerTeamName: string;
	health: ServiceHealth;
	activity: number;
	usagePercent: number;
};

export type EnvironmentSummaryType = {
	id: string;
	name: string;
	servicesCount: number;
	healthyCount: number;
	ratio: number;
};
