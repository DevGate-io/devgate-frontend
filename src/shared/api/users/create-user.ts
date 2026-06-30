import type { Role } from '@/entities/user';
import { MOCK_API } from '@/shared/config/mock-api';
import {
	createMockUser,
	type TeamMemberUserType,
} from '@/shared/lib/test-users';

export type CreateUserDtoType = {
	fullName: string;
	email: string;
	password: string;
	role?: Role;
};

export const createUser = async (
	dto: CreateUserDtoType,
): Promise<TeamMemberUserType> => {
	if (MOCK_API.users) {
		return createMockUser(dto);
	}

	const response = await fetch('/api/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(dto),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => null);
		throw new Error(error?.detail ?? 'Не удалось создать пользователя');
	}

	return response.json();
};
