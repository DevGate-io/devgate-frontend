import type { ServiceHealthType } from '@/entities/service';

export type ServicesFiltersType = {
	search?: string;
	tags?: string[];
	health?: ServiceHealthType;
	ownerTeamId?: string;
};
