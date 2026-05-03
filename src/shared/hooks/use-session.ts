'use client';

import { useQuery } from 'react-query';
import type { User } from '@/entities/user';
import { getCurrentUser } from '@/shared/api/auth/get-current-user';
import { AUTH_QUERY_KEYS } from '@/shared/api/auth/query-keys';

const fetchSession = async (): Promise<User | null> => {
	try {
		return await getCurrentUser();
	} catch {
		return null;
	}
};

export const useSession = () =>
	useQuery<User | null>([AUTH_QUERY_KEYS.CURRENT_USER], fetchSession, {
		refetchOnWindowFocus: false,
		retry: false,
	});
