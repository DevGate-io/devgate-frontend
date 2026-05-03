'use client';

import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import type { TemplateType } from '@/entities/template';
import {
	type CreateServiceDtoType,
	createService,
} from '@/shared/api/services/create-service';
import { SERVICE_QUERY_KEYS } from '@/shared/api/services/query-keys';
import { pageConfig } from '@/shared/config/page.config';
import { TEMPLATE_RUN_LABELS } from '@/views/template-run/constants';
import { buildCreateServiceDtoFromTemplate } from '@/views/template-run/lib/build-create-service-dto';
import { buildFormDefaults } from '@/views/template-run/lib/build-form-defaults';
import { buildParameterValidators } from '@/views/template-run/lib/build-form-validators';
import type { TemplateRunFormStateType } from '@/views/template-run/types';

export const useTemplateRunForm = (template: TemplateType) => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const requiredString = (message: string) => (value: string) =>
		value.trim().length > 0 ? null : message;

	const form = useForm<TemplateRunFormStateType>({
		mode: 'uncontrolled',
		validateInputOnBlur: true,
		validate: {
			...buildParameterValidators(template),
			ownerTeamId: requiredString(TEMPLATE_RUN_LABELS.ownerTeamRequiredError),
			projectId: requiredString(TEMPLATE_RUN_LABELS.projectRequiredError),
		},
		initialValues: buildFormDefaults(template),
	});

	const mutation = useMutation(
		(state: TemplateRunFormStateType) =>
			createService(
				buildCreateServiceDtoFromTemplate(
					template,
					state,
				) satisfies CreateServiceDtoType,
			),
		{
			onSuccess: async (created) => {
				notifications.show({
					color: 'green',
					title: TEMPLATE_RUN_LABELS.successTitle,
					message: `«${created.name}» ${TEMPLATE_RUN_LABELS.successMessageSuffix} «${template.name}».`,
				});
				await queryClient.invalidateQueries([SERVICE_QUERY_KEYS.LIST]);
				router.push(`${pageConfig.catalog}/${created.id}`);
				router.refresh();
			},
			onError: (error) => {
				notifications.show({
					color: 'red',
					title: TEMPLATE_RUN_LABELS.errorTitle,
					message:
						error instanceof Error
							? error.message
							: TEMPLATE_RUN_LABELS.errorMessage,
				});
			},
		},
	);

	return {
		form,
		handlers: {
			handleSubmit: (state: TemplateRunFormStateType) => mutation.mutate(state),
			handleCancel: () => router.push(`${pageConfig.templates}/${template.id}`),
		},
		state: {
			isLoading: mutation.isLoading,
		},
	};
};
