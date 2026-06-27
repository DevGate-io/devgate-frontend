'use server';

import { revalidatePath } from 'next/cache';
import type { Role } from '@/entities/user';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { MOCK_API } from '@/shared/config/mock-api';
import { pageConfig } from '@/shared/config/page.config';
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
	if (MOCK_API.users) {
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
