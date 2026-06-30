'use client';

import { Button, Modal, PasswordInput, Select, TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import type { FC } from 'react';
import type { Role } from '@/entities/user';
import {
	ADMIN_USERS_MODAL_LABELS,
	ROLE_OPTIONS,
} from '@/views/admin-users/constants';
import css from './index.module.css';

type UserFormValues = {
	fullName: string;
	email: string;
	password: string;
	role: Role | null;
};

type UserFormModalProps = {
	opened: boolean;
	onClose: () => void;
	onSubmit: (values: UserFormValues) => void;
	loading?: boolean;
	mode: 'create' | 'edit';
	initialValues?: Partial<UserFormValues>;
};

export const UserFormModal: FC<UserFormModalProps> = ({
	opened,
	onClose,
	onSubmit,
	loading,
	mode,
	initialValues,
}) => {
	const form = useForm<UserFormValues>({
		mode: 'uncontrolled',
		validateInputOnBlur: true,
		initialValues: {
			fullName: initialValues?.fullName ?? '',
			email: initialValues?.email ?? '',
			password: '',
			role: initialValues?.role ?? null,
		},
		validate: {
			fullName: (value) =>
				value.trim().length > 0
					? null
					: ADMIN_USERS_MODAL_LABELS.fullNameRequired,
			email: (value) => {
				if (value.trim().length === 0) {
					return ADMIN_USERS_MODAL_LABELS.emailRequired;
				}
				const check = isEmail(ADMIN_USERS_MODAL_LABELS.emailInvalid);
				return check(value);
			},
			password: (value) => {
				if (mode === 'edit' && value.length === 0) {
					return null;
				}
				return value.length >= 8 ? null : ADMIN_USERS_MODAL_LABELS.passwordMin;
			},
			role: (value) =>
				value != null ? null : ADMIN_USERS_MODAL_LABELS.fieldRole,
		},
	});

	const title =
		mode === 'create'
			? ADMIN_USERS_MODAL_LABELS.createTitle
			: ADMIN_USERS_MODAL_LABELS.editTitle;

	const submitLabel =
		mode === 'create'
			? ADMIN_USERS_MODAL_LABELS.create
			: ADMIN_USERS_MODAL_LABELS.save;

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={title}
			radius='xl'
			size='md'
		>
			<form
				onSubmit={form.onSubmit((values) => {
					onSubmit(values);
					form.reset();
				})}
			>
				<div className={css.fields}>
					<TextInput
						{...form.getInputProps('fullName')}
						label={ADMIN_USERS_MODAL_LABELS.fieldFullName}
						radius='md'
						size='sm'
					/>

					<TextInput
						{...form.getInputProps('email')}
						label={ADMIN_USERS_MODAL_LABELS.fieldEmail}
						type='email'
						radius='md'
						size='sm'
					/>

					<PasswordInput
						{...form.getInputProps('password')}
						label={ADMIN_USERS_MODAL_LABELS.fieldPassword}
						radius='md'
						size='sm'
					/>

					<Select
						{...form.getInputProps('role')}
						label={ADMIN_USERS_MODAL_LABELS.fieldRole}
						data={ROLE_OPTIONS}
						radius='md'
						size='sm'
						allowDeselect={false}
					/>
				</div>

				<div className={css.actions}>
					<Button
						type='button'
						variant='default'
						onClick={onClose}
						radius='md'
						size='sm'
					>
						{ADMIN_USERS_MODAL_LABELS.cancel}
					</Button>
					<Button type='submit' loading={loading} radius='md' size='sm'>
						{submitLabel}
					</Button>
				</div>
			</form>
		</Modal>
	);
};
