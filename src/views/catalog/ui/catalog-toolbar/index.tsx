'use client';

import { Select, TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { type ChangeEvent, useId, useState } from 'react';
import {
	HEALTH_FILTER_OPTIONS,
	SEARCH_DEBOUNCE_MS,
	TOOLBAR_LABELS,
} from '@/views/catalog/ui/catalog-toolbar/constants';
import { useCatalogFilters } from '@/views/catalog/ui/catalog-toolbar/hooks/use-catalog-filters';
import css from './index.module.css';

export const CatalogToolbar = () => {
	const filters = useCatalogFilters();
	const searchInputId = useId();
	const healthInputId = useId();

	const [searchDraft, setSearchDraft] = useState(filters.search);

	const commitSearch = useDebouncedCallback((value: string) => {
		filters.setSearch(value);
	}, SEARCH_DEBOUNCE_MS);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		setSearchDraft(value);
		commitSearch(value);
	};

	const handleHealthChange = (value: string | null) => {
		filters.setHealth(value);
	};

	return (
		<search className={css.root}>
			<div className={css.search}>
				<label htmlFor={searchInputId} className={css.label}>
					{TOOLBAR_LABELS.searchLabel}
				</label>
				<TextInput
					id={searchInputId}
					placeholder={TOOLBAR_LABELS.searchPlaceholder}
					value={searchDraft}
					onChange={handleSearchChange}
					radius='md'
					size='sm'
				/>
			</div>

			<div className={css.health}>
				<label htmlFor={healthInputId} className={css.label}>
					{TOOLBAR_LABELS.healthLabel}
				</label>
				<Select
					id={healthInputId}
					placeholder={TOOLBAR_LABELS.healthPlaceholder}
					data={HEALTH_FILTER_OPTIONS}
					value={filters.health || null}
					onChange={handleHealthChange}
					radius='md'
					size='sm'
					clearable
				/>
			</div>
		</search>
	);
};
