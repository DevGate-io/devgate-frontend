export type HealthToneType = 'mint' | 'sky' | 'peach' | 'danger';

export type KpiType = {
	id: string;
	label: string;
	value: string;
	delta: string;
	positive: boolean;
};

export type ServiceUsageType = {
	id: string;
	name: string;
	owner: string;
	health: HealthToneType;
	usage: number;
};

export type EnvironmentHealthType = {
	id: string;
	name: string;
	slo: string;
	tone: HealthToneType;
};
