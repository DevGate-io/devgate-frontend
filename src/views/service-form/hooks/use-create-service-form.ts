'use client';

import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import {
	type CreateServiceDtoType,
	createService,
} from '@/shared/api/services/create-service';
import { SERVICE_QUERY_KEYS } from '@/shared/api/services/query-keys';
import { pageConfig } from '@/shared/config/page.config';
import { SERVICE_FORM_LABELS } from '@/views/service-form/constants';
import { buildCreateServiceDto } from '@/views/service-form/lib/build-create-service-dto';
import {
	SERVICE_FORM_DEFAULT_STATE,
	SERVICE_FORM_VALIDATORS,
} from '@/views/service-form/models/service-form.constants';
import type { ServiceFormStateType } from '@/views/service-form/types';

export const useCreateServiceForm = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const form = useForm<ServiceFormStateType>({
		mode: 'uncontrolled',
		validateInputOnBlur: true,
		validate: {
			name: SERVICE_FORM_VALIDATORS.name.check,
			slug: SERVICE_FORM_VALIDATORS.slug.check,
			ownerTeamId: SERVICE_FORM_VALIDATORS.ownerTeamId.check,
			projectId: SERVICE_FORM_VALIDATORS.projectId.check,
			repoUrl: SERVICE_FORM_VALIDATORS.repoUrl.check,
			pipelineUrl: SERVICE_FORM_VALIDATORS.pipelineUrl.check,
			docsUrl: SERVICE_FORM_VALIDATORS.docsUrl.check,
		},
		initialValues: SERVICE_FORM_DEFAULT_STATE,
	});

	const mutation = useMutation(
		(state: ServiceFormStateType) =>
			createService(
				buildCreateServiceDto(state) satisfies CreateServiceDtoType,
			),
		{
			onSuccess: async (created) => {
				notifications.show({
					color: 'green',
					title: SERVICE_FORM_LABELS.successTitle,
					message: SERVICE_FORM_LABELS.successMessage,
				});
				await queryClient.invalidateQueries([SERVICE_QUERY_KEYS.LIST]);
				router.push(`${pageConfig.catalog}/${created.id}`);
				router.refresh();
			},
			onError: (error) => {
				notifications.show({
					color: 'red',
					title: SERVICE_FORM_LABELS.errorTitle,
					message:
						error instanceof Error
							? error.message
							: SERVICE_FORM_LABELS.errorMessage,
				});
			},
		},
	);

	return {
		form,
		handlers: {
			handleSubmit: (state: ServiceFormStateType) => mutation.mutate(state),
			handleCancel: () => router.push(pageConfig.catalog),
		},
		state: {
			isLoading: mutation.isLoading,
		},
	};
};
