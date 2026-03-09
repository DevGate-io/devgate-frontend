import { useForm } from '@mantine/form';
import {
	AUTH_FORM_DEFAULT_STATE,
	AUTH_FORM_VALIDATORS,
} from '@/features/auth-form/models/auth-form.constants';
import type { AuthFormState } from '@/features/auth-form/types';
import { AuthService } from '@/shared/api/auth';

const QUERY_KEY = 'auth';

export const useAuthForm = () => {
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

	const handleSubmit = async (data: AuthFormState) => {
		try {
			const response = await AuthService.login({
				email: data.login,
				password: data.password,
			});

			console.log(response);
		} catch (e) {
			console.error(e);
		}
	};

	return {
		form,
		handlers: {
			handleSubmit,
		},
	};
};
