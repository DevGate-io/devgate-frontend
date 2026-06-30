import { MOCK_API } from '@/shared/config/mock-api';
import { deleteMockUser } from '@/shared/lib/test-users';

export const deleteUser = async (id: string): Promise<void> => {
	if (MOCK_API.users) {
		deleteMockUser(id);
		return;
	}

	const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });

	if (!response.ok) {
		const error = await response.json().catch(() => null);
		throw new Error(error?.detail ?? 'Не удалось удалить пользователя');
	}
};
