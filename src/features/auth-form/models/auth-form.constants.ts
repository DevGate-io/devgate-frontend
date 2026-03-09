import {isEmail} from '@mantine/form';
import type {AuthFormState} from '@/features/auth-form/types';

export const PASSWORD_MIN_LENGTH = 8;

export const AUTH_FORM_DEFAULT_STATE: AuthFormState = {
	login: '',
	password: '',
};

export const AUTH_FORM_VALIDATORS = {
	login: {
		check: isEmail('Неверная электронная почта'),
	},
	password: {
		check: (value: string) =>
			value.length >= PASSWORD_MIN_LENGTH
				? null
				: `Пароль должен содержать минимум ${PASSWORD_MIN_LENGTH} символов`,
	},
};
