import { Button } from '@mantine/core';
import type { FC } from 'react';
import { SERVICE_FORM_LABELS } from '@/views/service-form/constants';
import css from './index.module.css';

type FormActionsProps = {
	submitLabel: string;
	isLoading: boolean;
	onCancel: () => void;
};

export const FormActions: FC<FormActionsProps> = ({
	submitLabel,
	isLoading,
	onCancel,
}) => {
	return (
		<div className={css.root}>
			<Button variant='subtle' onClick={onCancel} type='button'>
				{SERVICE_FORM_LABELS.cancel}
			</Button>
			<Button type='submit' loading={isLoading}>
				{submitLabel}
			</Button>
		</div>
	);
};
