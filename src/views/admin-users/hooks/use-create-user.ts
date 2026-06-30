'use client';

import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import {
	type CreateUserDtoType,
	createUser,
} from '@/shared/api/users/create-user';
import { USER_QUERY_KEYS } from '@/shared/api/users/query-keys';
import { ADMIN_USERS_MODAL_LABELS } from '@/views/admin-users/constants';

export const useCreateUser = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation((dto: CreateUserDtoType) => createUser(dto), {
		onSuccess: async () => {
			notifications.show({
				color: 'green',
				title: ADMIN_USERS_MODAL_LABELS.createSuccessTitle,
				message: ADMIN_USERS_MODAL_LABELS.createSuccessMessage,
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
