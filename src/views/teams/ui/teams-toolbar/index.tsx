'use client';

import { TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { type ChangeEvent, type FC, useId, useState } from 'react';
import {
	TEAMS_SEARCH_DEBOUNCE_MS,
	TEAMS_TOOLBAR_LABELS,
} from '@/views/teams/ui/teams-toolbar/constants';
import { useTeamsFilters } from '@/views/teams/ui/teams-toolbar/hooks/use-teams-filters';
import css from './index.module.css';

export const TeamsToolbar: FC = () => {
	const filters = useTeamsFilters();
	const searchInputId = useId();
	const [searchDraft, setSearchDraft] = useState(filters.search);

	const commitSearch = useDebouncedCallback((value: string) => {
		filters.setSearch(value);
	}, TEAMS_SEARCH_DEBOUNCE_MS);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		setSearchDraft(value);
		commitSearch(value);
	};

	return (
		<search className={css.root}>
			<div className={css.search}>
				<label htmlFor={searchInputId} className={css.label}>
					{TEAMS_TOOLBAR_LABELS.searchLabel}
				</label>
				<TextInput
					id={searchInputId}
					placeholder={TEAMS_TOOLBAR_LABELS.searchPlaceholder}
					value={searchDraft}
					onChange={handleSearchChange}
					radius='md'
					size='sm'
				/>
			</div>
		</search>
	);
};
