'use client';

import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import clsx from 'clsx';
import type { FC } from 'react';
import IdentificationThinIcon from '@/public/images/icons/identification-badge-thin.svg';
import PasswordThinIcon from '@/public/images/icons/password-thin.svg';
import css from './index.module.css';

type AuthFormProps = {
	className?: string;
};

export const AuthForm: FC<AuthFormProps> = ({ className }) => {
	const form = useForm();

	const handleSubmit = () => {};

	return (
		<form
			className={clsx(css.form, className)}
			onSubmit={form.onSubmit(handleSubmit)}
		>
			<TextInput leftSection={<IdentificationThinIcon />} label='Логин' />
			<PasswordInput leftSection={<PasswordThinIcon />} label='Пароль' />

			<Button bg='primary.1' type='submit'>
				Войти
			</Button>
		</form>
	);
};
