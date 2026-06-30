'use client';

import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import { USER_QUERY_KEYS } from '@/shared/api/users/query-keys';
import {
	type UpdateUserDtoType,
	updateUser,
} from '@/shared/api/users/update-user';
import { ADMIN_USERS_MODAL_LABELS } from '@/views/admin-users/constants';

export const useUpdateUser = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation((dto: UpdateUserDtoType) => updateUser(dto), {
		onSuccess: async () => {
			notifications.show({
				color: 'green',
				title: ADMIN_USERS_MODAL_LABELS.updateSuccessTitle,
				message: ADMIN_USERS_MODAL_LABELS.updateSuccessMessage,
			});
			await queryClient.invalidateQueries([USER_QUERY_KEYS.LIST]);
			router.refresh();
		},
		onError: (error) => {
			notifications.show({
				color: 'red',
				title: ADMIN_USERS_MODAL_LABELS.errorTitle,
				message:
					error instanceof Error
						? error.message
						: ADMIN_USERS_MODAL_LABELS.errorMessage,
			});
		},
	});
};
