'use client';

import { TextInput } from '@mantine/core';
import { useId } from 'react';
import { HEADER_LABELS } from '@/widgets/header/constants';
import { SearchIcon } from '@/widgets/header/icons/search-icon';
import css from './index.module.css';

export const SearchField = () => {
	const inputId = useId();

	return (
		<search className={css.root}>
			<label htmlFor={inputId} className={css.label}>
				{HEADER_LABELS.searchLabel}
			</label>
			<TextInput
				id={inputId}
				placeholder={HEADER_LABELS.searchPlaceholder}
				leftSection={<SearchIcon />}
				radius='md'
				size='sm'
			/>
		</search>
	);
};
