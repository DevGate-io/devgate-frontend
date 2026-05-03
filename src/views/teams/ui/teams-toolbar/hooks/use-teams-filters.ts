'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TEAMS_SEARCH_PARAM_KEYS } from '@/views/teams/ui/teams-toolbar/constants';

type TeamsFiltersStateType = {
	search: string;
	setSearch: (value: string) => void;
};

export const useTeamsFilters = (): TeamsFiltersStateType => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const search = searchParams.get(TEAMS_SEARCH_PARAM_KEYS.search) ?? '';

	const updateParam = (key: string, value: string | null) => {
		const next = new URLSearchParams(searchParams);
		if (value && value.length > 0) {
			next.set(key, value);
		} else {
			next.delete(key);
		}
		const query = next.toString();
		router.replace(query ? `${pathname}?${query}` : pathname);
	};

	return {
		search,
		setSearch: (value) => updateParam(TEAMS_SEARCH_PARAM_KEYS.search, value),
	};
};
