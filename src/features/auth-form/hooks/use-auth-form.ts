import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import {
	AUTH_FORM_DEFAULT_STATE,
	AUTH_FORM_VALIDATORS,
} from '@/features/auth-form/models/auth-form.constants';
import type { AuthFormState } from '@/features/auth-form/types';
import { AuthService } from '@/shared/api/auth';
import { setAuthCookie } from '@/shared/api/auth/actions';
import type { AuthenticatedResponse } from '@/shared/api/auth/types';
import { pageConfig } from '@/shared/config/page.config';

export const useAuthForm = () => {
	const router = useRouter();
	const { login, password } = AUTH_FORM_VALIDATORS;

	const form = useForm<AuthFormState>({
		mode: 'uncontrolled',
		validateInputOnBlur: true,
		validate: {
			password: password.check,
			login: login.check,
		},
		initialValues: AUTH_FORM_DEFAULT_STATE,
	});

	const mutation = useMutation<AuthenticatedResponse, unknown, AuthFormState>(
		(data) => AuthService.login({ email: data.login, password: data.password }),
		{
			onSuccess: async ({ accessToken }) => {
				await setAuthCookie(accessToken);
				router.replace(pageConfig.base);
				router.refresh();
			},
			onError: (error) => {
				notifications.show({
					color: 'red',
					title: 'Не удалось войти',
					message:
						error instanceof Error
							? error.message
							: 'Проверьте данные и попробуйте ещё раз',
				});
			},
		},
	);

	return {
		form,
		handlers: {
			handleSubmit: (data: AuthFormState) => mutation.mutate(data),
		},
		state: {
			isLoading: mutation.isLoading,
		},
	};
};
