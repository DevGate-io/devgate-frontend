'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SEARCH_PARAM_KEYS } from '@/views/catalog/ui/catalog-toolbar/constants';

type CatalogFiltersType = {
	search: string;
	health: string;
	tags: string[];
	setSearch: (value: string) => void;
	setHealth: (value: string | null) => void;
	setTags: (values: string[]) => void;
};

const parseTags = (raw: string | null): string[] =>
	raw ? raw.split(',').filter(Boolean) : [];

export const useCatalogFilters = (): CatalogFiltersType => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const search = searchParams.get(SEARCH_PARAM_KEYS.search) ?? '';
	const health = searchParams.get(SEARCH_PARAM_KEYS.health) ?? '';
	const tags = parseTags(searchParams.get(SEARCH_PARAM_KEYS.tags));

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
		health,
		tags,
		setSearch: (value) => updateParam(SEARCH_PARAM_KEYS.search, value),
		setHealth: (value) => updateParam(SEARCH_PARAM_KEYS.health, value),
		setTags: (values) =>
			updateParam(SEARCH_PARAM_KEYS.tags, values.join(',') || null),
	};
};
