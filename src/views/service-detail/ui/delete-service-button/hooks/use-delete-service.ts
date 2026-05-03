'use client';

import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import { deleteService } from '@/shared/api/services/delete-service';
import { SERVICE_QUERY_KEYS } from '@/shared/api/services/query-keys';
import { pageConfig } from '@/shared/config/page.config';
import { DELETE_SERVICE_LABELS } from '@/views/service-detail/ui/delete-service-button/constants';

export const useDeleteService = (serviceId: string) => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const mutation = useMutation(() => deleteService(serviceId), {
		onSuccess: async () => {
			notifications.show({
				color: 'green',
				title: DELETE_SERVICE_LABELS.successTitle,
				message: DELETE_SERVICE_LABELS.successMessage,
			});
			await queryClient.invalidateQueries([SERVICE_QUERY_KEYS.LIST]);
			router.push(pageConfig.catalog);
			router.refresh();
		},
		onError: (error) => {
			notifications.show({
				color: 'red',
				title: DELETE_SERVICE_LABELS.errorTitle,
				message:
					error instanceof Error
						? error.message
						: DELETE_SERVICE_LABELS.errorMessage,
			});
		},
	});

	return {
		isLoading: mutation.isLoading,
		handleDelete: () => mutation.mutate(),
	};
};
