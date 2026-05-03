'use client';

import { Button, PasswordInput, TextInput } from '@mantine/core';
import clsx from 'clsx';
import type { FC } from 'react';
import { useAuthForm } from '@/features/auth-form/hooks/use-auth-form';
import IdentificationThinIcon from '@/public/images/icons/identification-badge-thin.svg';
import PasswordThinIcon from '@/public/images/icons/password-thin.svg';
import css from './index.module.css';

type AuthFormProps = {
	className?: string;
};

export const AuthForm: FC<AuthFormProps> = ({ className }) => {
	const { form, handlers, state } = useAuthForm();

	return (
		<form
			className={clsx(css.form, className)}
			onSubmit={form.onSubmit(handlers.handleSubmit)}
		>
			<TextInput
				{...form.getInputProps('login')}
				type='email'
				leftSection={<IdentificationThinIcon />}
				label='Логин'
			/>

			<PasswordInput
				{...form.getInputProps('password')}
				leftSection={<PasswordThinIcon />}
				label='Пароль'
			/>

			<Button type='submit' loading={state.isLoading}>
				Войти
			</Button>
		</form>
	);
};
