'use client';

import { Select } from '@mantine/core';
import type { FC } from 'react';
import { Role } from '@/entities/user';
import type { TeamMemberUserType } from '@/shared/lib/test-users';
import {
	ADMIN_USERS_LABELS,
	ROLE_OPTIONS,
} from '@/views/admin-users/constants';
import { useUpdateUserRole } from '@/views/admin-users/hooks/use-update-user-role';
import { PencilIcon, TrashIcon } from '@/views/admin-users/icons';
import { formatLastLogin } from '@/views/admin-users/lib/format-last-login';
import { getNameInitials } from '@/views/team-detail/lib/get-name-initials';
import css from './index.module.css';

type UserRowProps = {
	user: TeamMemberUserType;
	onEdit: (user: TeamMemberUserType) => void;
	onDelete: (user: TeamMemberUserType) => void;
};

const isRole = (value: string): value is Role =>
	(Object.values(Role) as string[]).includes(value);

export const UserRow: FC<UserRowProps> = ({ user, onEdit, onDelete }) => {
	const mutation = useUpdateUserRole();

	const handleRoleChange = (value: string | null) => {
		if (!value || !isRole(value) || value === user.role) {
			return;
		}
		mutation.mutate({
			userId: user.id,
			role: value,
			userLabel: user.fullName,
		});
	};

	return (
		<tr className={css.row}>
			<td className={css.identityCell}>
				<span className={css.avatar} aria-hidden='true'>
					{getNameInitials(user.fullName)}
				</span>
				<span className={css.name}>{user.fullName}</span>
			</td>
			<td className={css.emailCell}>{user.email}</td>
			<td className={css.roleCell}>
				<Select
					aria-label={ADMIN_USERS_LABELS.roleLabel}
					data={ROLE_OPTIONS}
					value={user.role}
					onChange={handleRoleChange}
					disabled={mutation.isLoading}
					allowDeselect={false}
					radius='md'
					size='sm'
				/>
			</td>
			<td className={css.lastLoginCell}>
				{user.lastLogin ? (
					<time dateTime={user.lastLogin}>
						{formatLastLogin(user.lastLogin)}
					</time>
				) : (
					<span className={css.muted}>{ADMIN_USERS_LABELS.neverLoggedIn}</span>
				)}
			</td>
			<td className={css.actionsCell}>
				<button
					type='button'
					className={css.iconBtn}
					aria-label='Редактировать пользователя'
					onClick={() => onEdit(user)}
				>
					<PencilIcon />
				</button>
				<button
					type='button'
					className={css.iconBtn}
					aria-label='Удалить пользователя'
					onClick={() => onDelete(user)}
				>
					<TrashIcon />
				</button>
			</td>
		</tr>
	);
};
