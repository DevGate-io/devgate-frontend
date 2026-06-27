import type { ServiceHealth } from '@/entities/service';

export type ServicesFiltersType = {
	search?: string;
	tags?: string[];
	health?: ServiceHealth;
	ownerTeamId?: string;
};
