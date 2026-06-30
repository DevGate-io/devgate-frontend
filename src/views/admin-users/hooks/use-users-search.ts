'use client';

import { useDebouncedCallback } from '@mantine/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ChangeEvent, useState } from 'react';
import { ADMIN_USERS_SEARCH_PARAM } from '@/views/admin-users/constants';

const SEARCH_DEBOUNCE_MS = 250;

type UseUsersSearchReturn = {
	draft: string;
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const useUsersSearch = (): UseUsersSearchReturn => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const initialSearch = searchParams.get(ADMIN_USERS_SEARCH_PARAM) ?? '';
	const [draft, setDraft] = useState(initialSearch);

	const commit = useDebouncedCallback((value: string) => {
		const next = new URLSearchParams(searchParams);
		if (value.length > 0) {
			next.set(ADMIN_USERS_SEARCH_PARAM, value);
		} else {
			next.delete(ADMIN_USERS_SEARCH_PARAM);
		}
		const query = next.toString();
		router.replace(query ? `${pathname}?${query}` : pathname);
	}, SEARCH_DEBOUNCE_MS);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		setDraft(value);
		commit(value);
	};

	return { draft, handleChange };
};
