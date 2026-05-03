'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import type { Role } from '@/entities/user';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { pageConfig } from '@/shared/config/page.config';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';
import { isTestAccessToken } from '@/shared/lib/test-auth';
import {
	type TeamMemberUserType,
	updateMockUserRole,
} from '@/shared/lib/test-users';

export type UpdateUserRoleDtoType = {
	role: Role;
};

export const updateUserRole = async (
	id: string,
	dto: UpdateUserRoleDtoType,
): Promise<TeamMemberUserType> => {
	const store = await cookies();
	const token = store.get(ACCESS_TOKEN_KEY)?.value;

	if (token && isTestAccessToken(token)) {
		const updated = updateMockUserRole(id, dto.role);
		if (!updated) {
			throw new Error('Пользователь не найден');
		}
		revalidatePath(`${pageConfig.admin}/users`);
		return updated;
	}

	const response = await apiClient.patch<TeamMemberUserType>(
		`${API_URLS.users}/${id}/role`,
		dto,
	);
	revalidatePath(`${pageConfig.admin}/users`);
	return response.data;
};
