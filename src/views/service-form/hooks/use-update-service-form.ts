'use client';

import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import type { ServiceType } from '@/entities/service';
import { SERVICE_QUERY_KEYS } from '@/shared/api/services/query-keys';
import { updateService } from '@/shared/api/services/update-service';
import { pageConfig } from '@/shared/config/page.config';
import { SERVICE_FORM_LABELS } from '@/views/service-form/constants';
import { buildUpdateServiceDto } from '@/views/service-form/lib/build-update-service-dto';
import { serviceToFormState } from '@/views/service-form/lib/service-to-form-state';
import { SERVICE_FORM_VALIDATORS } from '@/views/service-form/models/service-form.constants';
import type { ServiceFormStateType } from '@/views/service-form/types';

export const useUpdateServiceForm = (service: ServiceType) => {
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
		initialValues: serviceToFormState(service),
	});

	const mutation = useMutation(
		(state: ServiceFormStateType) =>
			updateService(service.id, buildUpdateServiceDto(state, service)),
		{
			onSuccess: async (updated) => {
				notifications.show({
					color: 'green',
					title: SERVICE_FORM_LABELS.editSuccessTitle,
					message: SERVICE_FORM_LABELS.editSuccessMessage,
				});
				await queryClient.invalidateQueries([SERVICE_QUERY_KEYS.LIST]);
				await queryClient.invalidateQueries([
					SERVICE_QUERY_KEYS.DETAIL,
					updated.id,
				]);
				router.push(`${pageConfig.catalog}/${updated.id}`);
				router.refresh();
			},
			onError: (error) => {
				notifications.show({
					color: 'red',
					title: SERVICE_FORM_LABELS.editErrorTitle,
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
			handleCancel: () => router.push(`${pageConfig.catalog}/${service.id}`),
		},
		state: {
			isLoading: mutation.isLoading,
		},
	};
};
