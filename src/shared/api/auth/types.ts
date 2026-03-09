import type { User } from '@/entities/user';

export type AuthDto = {
	email: string;
	password: string;
};

export type AccessTokenResponse = {
	accessToken: string;
};

export type AuthenticatedResponse = AccessTokenResponse & {
	user: User;
};
