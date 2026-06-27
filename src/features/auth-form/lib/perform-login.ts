import type { AuthFormState } from '@/features/auth-form/types';
import { login } from '@/shared/api/auth/login';
import type { AuthenticatedResponse } from '@/shared/api/auth/types';

export const performLogin = async (
	data: AuthFormState,
): Promise<AuthenticatedResponse> => {
	return login({ email: data.login, password: data.password });
};
