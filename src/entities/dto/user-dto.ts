import type { User } from '@/entities/user';

export type UserDto = Omit<User, 'id' | 'lastLogin' | 'password'> & {
	password: string;
};
