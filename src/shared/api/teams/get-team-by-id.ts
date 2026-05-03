'use server';

import { cookies } from 'next/headers';
import type { TeamType } from '@/entities/team';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { isTestAccessToken } from '@/shared/lib/test-auth';
import { MOCK_TEAMS } from '@/shared/lib/test-teams';

export const getTeamById = async (id: string): Promise<TeamType | null> => {
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value;

	if (token && isTestAccessToken(token)) {
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
