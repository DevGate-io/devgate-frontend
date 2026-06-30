'use client';

import { Button, TextInput } from '@mantine/core';
import type { FC } from 'react';
import { useId } from 'react';
import {
	ADMIN_USERS_LABELS,
	ADMIN_USERS_MODAL_LABELS,
} from '@/views/admin-users/constants';
import { useUsersSearch } from '@/views/admin-users/hooks/use-users-search';
import { PlusIcon } from '@/views/admin-users/icons';
import css from './index.module.css';

type UsersToolbarProps = {
	onAddUser: () => void;
};

export const UsersToolbar: FC<UsersToolbarProps> = ({ onAddUser }) => {
	const inputId = useId();
	const { draft, handleChange } = useUsersSearch();

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
			<Button
				type='button'
				onClick={onAddUser}
				radius='md'
				size='sm'
				leftSection={<PlusIcon />}
			>
				{ADMIN_USERS_MODAL_LABELS.addUser}
			</Button>
		</search>
	);
};
