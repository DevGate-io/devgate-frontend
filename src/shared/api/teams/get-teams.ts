'use server';

import { cookies } from 'next/headers';
import type { TeamType } from '@/entities/team';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { isTestAccessToken } from '@/shared/lib/test-auth';
import { MOCK_TEAMS } from '@/shared/lib/test-teams';

export type TeamsFiltersType = {
	search?: string;
};

const matchesSearch = (team: TeamType, query: string): boolean => {
	const text = query.trim().toLowerCase();
	if (text.length === 0) return true;
	return (
		team.name.toLowerCase().includes(text) ||
		team.slug.toLowerCase().includes(text) ||
		(team.description?.toLowerCase().includes(text) ?? false)
	);
};

export const getTeams = async (
	filters: TeamsFiltersType = {},
): Promise<TeamType[]> => {
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value;

	if (token && isTestAccessToken(token)) {
		return MOCK_TEAMS.filter((team) =>
			matchesSearch(team, filters.search ?? ''),
		);
	}

	const response = await apiClient.get<TeamType[]>(API_URLS.teams, {
		params: filters,
	});
	return response.data;
};
