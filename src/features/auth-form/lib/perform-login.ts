import type { AuthFormState } from '@/features/auth-form/types';
import { AuthService } from '@/shared/api/auth';
import type { AuthenticatedResponse } from '@/shared/api/auth/types';
import {
	isTestCredentials,
	TEST_ACCESS_TOKEN,
	TEST_REFRESH_TOKEN,
	TEST_USER,
} from '@/shared/lib/test-auth';

export const performLogin = async (
	data: AuthFormState,
): Promise<AuthenticatedResponse> => {
	if (isTestCredentials(data.login, data.password)) {
		return {
			accessToken: TEST_ACCESS_TOKEN,
			refreshToken: TEST_REFRESH_TOKEN,
			user: TEST_USER,
		};
	}

	return AuthService.login({ email: data.login, password: data.password });
};
