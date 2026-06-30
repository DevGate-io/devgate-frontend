'use client';

import { type FC, useState } from 'react';
import type { TeamMemberUserType } from '@/shared/lib/test-users';
import { EmptyState } from '@/shared/ui/empty-state';
import { PageHeader } from '@/shared/ui/page-header';
import {
	ADMIN_USERS_LABELS,
	ADMIN_USERS_MODAL_LABELS,
} from '@/views/admin-users/constants';
import { useCreateUser } from '@/views/admin-users/hooks/use-create-user';
import { useDeleteUser } from '@/views/admin-users/hooks/use-delete-user';
import { useUpdateUser } from '@/views/admin-users/hooks/use-update-user';
import { UserDeleteModal } from '@/views/admin-users/ui/user-delete-modal';
import { UserFormModal } from '@/views/admin-users/ui/user-form-modal';
import { UserRow } from '@/views/admin-users/ui/user-row';
import { UsersToolbar } from '@/views/admin-users/ui/users-toolbar';
import css from './index.module.css';

type AdminUsersViewProps = {
	users: TeamMemberUserType[];
};

export const AdminUsersView: FC<AdminUsersViewProps> = ({ users }) => {
	const [createOpen, setCreateOpen] = useState(false);
	const [editUser, setEditUser] = useState<TeamMemberUserType | null>(null);
	const [deleteUser, setDeleteUser] = useState<TeamMemberUserType | null>(null);

	const createMutation = useCreateUser();
	const updateMutation = useUpdateUser();
	const deleteMutation = useDeleteUser();

	const handleEdit = (user: TeamMemberUserType) => {
		setEditUser(user);
	};

	const handleDelete = (user: TeamMemberUserType) => {
		setDeleteUser(user);
	};

	return (
		<div className={css.root}>
			<PageHeader
				title={ADMIN_USERS_LABELS.title}
				description={ADMIN_USERS_LABELS.description}
			/>

			<UsersToolbar onAddUser={() => setCreateOpen(true)} />

			{users.length === 0 ? (
				<EmptyState
					title={ADMIN_USERS_LABELS.emptyTitle}
					description={ADMIN_USERS_LABELS.emptyDescription}
				/>
			) : (
				<div className={css.tableWrap}>
					<table className={css.table}>
						<thead>
							<tr>
								<th scope='col' className={css.th}>
									{ADMIN_USERS_LABELS.headerName}
								</th>
								<th scope='col' className={css.th}>
									{ADMIN_USERS_LABELS.headerEmail}
								</th>
								<th scope='col' className={css.th}>
									{ADMIN_USERS_LABELS.headerRole}
								</th>
								<th scope='col' className={css.th}>
									{ADMIN_USERS_LABELS.headerLastLogin}
								</th>
								<th scope='col' className={css.th}>
									{ADMIN_USERS_MODAL_LABELS.actions}
								</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<UserRow
									key={user.id}
									user={user}
									onEdit={handleEdit}
									onDelete={handleDelete}
								/>
							))}
						</tbody>
					</table>
				</div>
			)}

			<UserFormModal
				opened={createOpen}
				onClose={() => setCreateOpen(false)}
				onSubmit={(values) => {
					createMutation.mutate(
						{
							fullName: values.fullName,
							email: values.email,
							password: values.password,
							role: values.role ?? undefined,
						},
						{
							onSuccess: () => setCreateOpen(false),
						},
					);
				}}
				loading={createMutation.isLoading}
				mode='create'
			/>

			<UserFormModal
				opened={editUser != null}
				onClose={() => setEditUser(null)}
				onSubmit={(values) => {
					if (!editUser) {
						return;
					}
					updateMutation.mutate(
						{
							fullName: values.fullName,
							email: values.email,
							password: values.password,
							role: values.role ?? undefined,
						},
						{
							onSuccess: () => setEditUser(null),
						},
					);
				}}
				loading={updateMutation.isLoading}
				mode='edit'
				initialValues={{
					fullName: editUser?.fullName,
					email: editUser?.email,
					role: editUser?.role,
				}}
			/>

			<UserDeleteModal
				opened={deleteUser != null}
				onClose={() => setDeleteUser(null)}
				onConfirm={() => {
					if (!deleteUser) {
						return;
					}
					deleteMutation.mutate(deleteUser.id, {
						onSuccess: () => setDeleteUser(null),
					});
				}}
				user={deleteUser}
				loading={deleteMutation.isLoading}
			/>
		</div>
	);
};
