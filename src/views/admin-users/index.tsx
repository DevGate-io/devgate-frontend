import type { FC } from 'react';
import { EmptyState } from '@/shared/ui/empty-state';
import { PageHeader } from '@/shared/ui/page-header';
import type { TeamMemberUserType } from '@/shared/lib/test-users';
import { ADMIN_USERS_LABELS } from '@/views/admin-users/constants';
import { UserRow } from '@/views/admin-users/ui/user-row';
import { UsersToolbar } from '@/views/admin-users/ui/users-toolbar';
import css from './index.module.css';

type AdminUsersViewProps = {
	users: TeamMemberUserType[];
};

export const AdminUsersView: FC<AdminUsersViewProps> = ({ users }) => {
	return (
		<div className={css.root}>
			<PageHeader
				title={ADMIN_USERS_LABELS.title}
				description={ADMIN_USERS_LABELS.description}
			/>

			<UsersToolbar />

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
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<UserRow key={user.id} user={user} />
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
