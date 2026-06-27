'use server';

import type { TeamType } from '@/entities/team';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { MOCK_API } from '@/shared/config/mock-api';
import { MOCK_TEAMS } from '@/shared/lib/test-teams';

export const getTeamById = async (id: string): Promise<TeamType | null> => {
	if (MOCK_API.teams) {
		const found = MOCK_TEAMS.find((team) => team.id === id || team.slug === id);
		return found ?? null;
	}

	try {
		const response = await apiClient.get<TeamType>(`${API_URLS.teams}/${id}`);
		return response.data;
	} catch {
		return null;
	}
};
