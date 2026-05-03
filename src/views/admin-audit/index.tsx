import type { FC } from 'react';
import type { AuditEventType } from '@/entities/audit-event';
import type { TeamMemberUserType } from '@/shared/lib/test-users';
import { EmptyState } from '@/shared/ui/empty-state';
import { PageHeader } from '@/shared/ui/page-header';
import { ADMIN_AUDIT_LABELS } from '@/views/admin-audit/constants';
import { AuditRow } from '@/views/admin-audit/ui/audit-row';
import { AuditToolbar } from '@/views/admin-audit/ui/audit-toolbar';
import css from './index.module.css';

type AdminAuditViewProps = {
	events: AuditEventType[];
	users: TeamMemberUserType[];
};

export const AdminAuditView: FC<AdminAuditViewProps> = ({ events, users }) => {
	const userById = new Map(users.map((user) => [user.id, user]));
	const actorOptions = users.map((user) => ({
		value: user.id,
		label: user.fullName,
	}));

	return (
		<div className={css.root}>
			<PageHeader
				title={ADMIN_AUDIT_LABELS.title}
				description={ADMIN_AUDIT_LABELS.description}
			/>

			<AuditToolbar actorOptions={actorOptions} />

			{events.length === 0 ? (
				<EmptyState
					title={ADMIN_AUDIT_LABELS.emptyTitle}
					description={ADMIN_AUDIT_LABELS.emptyDescription}
				/>
			) : (
				<div className={css.tableWrap}>
					<table className={css.table}>
						<thead>
							<tr>
								<th scope='col' className={css.th}>
									{ADMIN_AUDIT_LABELS.headerWhen}
								</th>
								<th scope='col' className={css.th}>
									{ADMIN_AUDIT_LABELS.headerActor}
								</th>
								<th scope='col' className={css.th}>
									{ADMIN_AUDIT_LABELS.headerAction}
								</th>
								<th scope='col' className={css.th}>
									{ADMIN_AUDIT_LABELS.headerTarget}
								</th>
							</tr>
						</thead>
						<tbody>
							{events.map((event) => (
								<AuditRow
									key={event.id}
									event={event}
									actorName={userById.get(event.actorId)?.fullName ?? ''}
								/>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
