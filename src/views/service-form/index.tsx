'use client';

import { PageHeader } from '@/shared/ui/page-header';
import { SERVICE_FORM_LABELS } from '@/views/service-form/constants';
import { useCreateServiceForm } from '@/views/service-form/hooks/use-create-service-form';
import { FormActions } from '@/views/service-form/ui/form-actions';
import { ServiceFormFields } from '@/views/service-form/ui/form-fields';
import css from './index.module.css';

export const CreateServiceView = () => {
	const { form, handlers, state } = useCreateServiceForm();

	return (
		<div className={css.root}>
			<PageHeader
				title={SERVICE_FORM_LABELS.title}
				description={SERVICE_FORM_LABELS.description}
			/>

			<form
				className={css.form}
				onSubmit={form.onSubmit(handlers.handleSubmit)}
			>
				<ServiceFormFields form={form} />

				<FormActions
					submitLabel={SERVICE_FORM_LABELS.submit}
					isLoading={state.isLoading}
					onCancel={handlers.handleCancel}
				/>
			</form>
		</div>
	);
};
