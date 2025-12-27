'use client';

import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import clsx from 'clsx';
import type { FC } from 'react';
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
			onSubmit={form.onSubmit(handleSubmit)}>
			<TextInput />
			<PasswordInput />

			<Button type='submit'>Login</Button>
		</form>
	);
};
