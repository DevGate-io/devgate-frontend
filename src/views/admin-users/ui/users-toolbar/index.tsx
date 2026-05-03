'use client';

import { TextInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ChangeEvent, type FC, useId, useState } from 'react';
import {
	ADMIN_USERS_LABELS,
	ADMIN_USERS_SEARCH_PARAM,
} from '@/views/admin-users/constants';
import css from './index.module.css';

const SEARCH_DEBOUNCE_MS = 250;

export const UsersToolbar: FC = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const initialSearch = searchParams.get(ADMIN_USERS_SEARCH_PARAM) ?? '';
	const inputId = useId();
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

	return (
		<search className={css.root}>
			<label htmlFor={inputId} className={css.label}>
				{ADMIN_USERS_LABELS.searchLabel}
			</label>
			<TextInput
				id={inputId}
				placeholder={ADMIN_USERS_LABELS.searchPlaceholder}
				value={draft}
				onChange={handleChange}
				radius='md'
				size='sm'
				className={css.input}
			/>
		</search>
	);
};
