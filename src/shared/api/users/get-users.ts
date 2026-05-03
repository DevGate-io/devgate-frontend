'use server';

import { cookies } from 'next/headers';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { isTestAccessToken } from '@/shared/lib/test-auth';
import {
	MOCK_TEAM_MEMBER_USERS,
	type TeamMemberUserType,
} from '@/shared/lib/test-users';

export type UsersFiltersType = {
	search?: string;
};

const matchesSearch = (user: TeamMemberUserType, query: string): boolean => {
	const text = query.trim().toLowerCase();
	if (text.length === 0) return true;
	return (
		user.fullName.toLowerCase().includes(text) ||
		user.email.toLowerCase().includes(text)
	);
};

export const getUsers = async (
	filters: UsersFiltersType = {},
): Promise<TeamMemberUserType[]> => {
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value;

	if (token && isTestAccessToken(token)) {
		return MOCK_TEAM_MEMBER_USERS.filter((user) =>
			matchesSearch(user, filters.search ?? ''),
		);
	}

	const response = await apiClient.get<TeamMemberUserType[]>(API_URLS.users, {
		params: filters,
	});
	return response.data;
};
