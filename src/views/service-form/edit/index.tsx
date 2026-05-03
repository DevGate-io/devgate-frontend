'use client';

import type { FC } from 'react';
import type { ServiceType } from '@/entities/service';
import { PageHeader } from '@/shared/ui/page-header';
import { SERVICE_FORM_LABELS } from '@/views/service-form/constants';
import { useUpdateServiceForm } from '@/views/service-form/hooks/use-update-service-form';
import css from '@/views/service-form/index.module.css';
import { FormActions } from '@/views/service-form/ui/form-actions';
import { ServiceFormFields } from '@/views/service-form/ui/form-fields';

type EditServiceViewProps = {
	service: ServiceType;
};

export const EditServiceView: FC<EditServiceViewProps> = ({ service }) => {
	const { form, handlers, state } = useUpdateServiceForm(service);

	return (
		<div className={css.root}>
			<PageHeader
				title={`${SERVICE_FORM_LABELS.editTitle}: ${service.name}`}
				description={SERVICE_FORM_LABELS.editDescription}
			/>

			<form
				className={css.form}
				onSubmit={form.onSubmit(handlers.handleSubmit)}
			>
				<ServiceFormFields form={form} />

				<FormActions
					submitLabel={SERVICE_FORM_LABELS.editSubmit}
					isLoading={state.isLoading}
					onCancel={handlers.handleCancel}
				/>
			</form>
		</div>
	);
};
