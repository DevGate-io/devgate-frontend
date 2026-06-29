'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import type { User } from '@/entities/user';
import { getCurrentUser } from '@/shared/api/auth/get-current-user';
import { AUTH_QUERY_KEYS } from '@/shared/api/auth/query-keys';
import { pageConfig } from '@/shared/config/page.config';

const fetchSession = async (): Promise<User | null> => {
	try {
		return await getCurrentUser();
	} catch {
		return null;
	}
};

export const useSession = () => {
	const query = useQuery<User | null>(
		[AUTH_QUERY_KEYS.CURRENT_USER],
		fetchSession,
		{
			refetchOnWindowFocus: false,
			retry: false,
		},
	);

	const wasAuthenticated = useRef(false);
	const hasTriedRefetch = useRef(false);

	useEffect(() => {
		if (query.data) {
			if (!wasAuthenticated.current) {
				wasAuthenticated.current = true;
			}
			hasTriedRefetch.current = false;
			return;
		}

		if (wasAuthenticated.current && !query.isLoading) {
			if (!hasTriedRefetch.current) {
				hasTriedRefetch.current = true;
				query.refetch();
			} else {
				window.location.href = pageConfig.auth;
			}
		}
	}, [query.data, query.isLoading]);

	return query;
};
