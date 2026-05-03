'use client';

import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import type { Role } from '@/entities/user';
import { updateUserRole } from '@/shared/api/users/update-user-role';
import { USER_QUERY_KEYS } from '@/shared/api/users/query-keys';
import { ADMIN_USERS_LABELS } from '@/views/admin-users/constants';

type UpdateRoleArgs = {
	userId: string;
	role: Role;
	userLabel: string;
};

export const useUpdateUserRole = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation(
		({ userId, role }: UpdateRoleArgs) => updateUserRole(userId, { role }),
		{
			onSuccess: async (updated, vars) => {
				notifications.show({
					color: 'green',
					title: ADMIN_USERS_LABELS.updateSuccessTitle,
					message: `${vars.userLabel} → ${updated.role}`,
				});
				await queryClient.invalidateQueries([USER_QUERY_KEYS.LIST]);
				router.refresh();
			},
			onError: (error) => {
				notifications.show({
					color: 'red',
					title: ADMIN_USERS_LABELS.updateErrorTitle,
					message:
						error instanceof Error
							? error.message
							: ADMIN_USERS_LABELS.updateErrorMessage,
				});
			},
		},
	);
};
