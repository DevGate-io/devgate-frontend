'use client';

import {
	createContext,
	type FC,
	type PropsWithChildren,
	useContext,
} from 'react';
import type { User } from '@/entities/user';
import { useSession } from '@/shared/hooks/use-session';

type AuthContextValueType = {
	user: User | null;
	isLoading: boolean;
};

const AUTH_CONTEXT_DEFAULT: AuthContextValueType = {
	user: null,
	isLoading: false,
};

const AuthContext = createContext<AuthContextValueType>(AUTH_CONTEXT_DEFAULT);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const { data, isLoading } = useSession();

	return (
		<AuthContext.Provider value={{ user: data ?? null, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useCurrentUser = () => useContext(AuthContext);
