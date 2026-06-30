import type { Role } from '@/entities/user';
import { MOCK_API } from '@/shared/config/mock-api';
import {
	type TeamMemberUserType,
	updateMockUser,
} from '@/shared/lib/test-users';

export type UpdateUserDtoType = {
	fullName: string;
	email: string;
	password: string;
	role?: Role;
};

export const updateUser = async (
	dto: UpdateUserDtoType,
): Promise<TeamMemberUserType> => {
	if (MOCK_API.users) {
		const updated = updateMockUser(dto);
		if (!updated) {
			throw new Error('Пользователь не найден');
		}
		return updated;
	}

	const response = await fetch('/api/users', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(dto),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => null);
		throw new Error(error?.detail ?? 'Не удалось обновить пользователя');
	}

	return response.json();
};
