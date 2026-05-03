import { Badge } from '@mantine/core';
import type { FC } from 'react';
import type { AuditEventType } from '@/entities/audit-event';
import {
	AUDIT_ACTION_COLOR,
	AUDIT_ACTION_LABEL,
} from '@/views/admin-audit/constants';
import { formatEventTime } from '@/views/admin-audit/lib/format-event-time';
import { SERVICE_DETAIL_LABELS } from '@/views/service-detail/constants';
import css from './index.module.css';

type RecentActivityPanelProps = {
	events: AuditEventType[];
	usersById: Record<string, string>;
};

export const RecentActivityPanel: FC<RecentActivityPanelProps> = ({
	events,
	usersById,
}) => {
	return (
		<article className={css.root}>
			<h2 className={css.title}>{SERVICE_DETAIL_LABELS.activityTitle}</h2>

			{events.length === 0 ? (
				<p className={css.empty}>{SERVICE_DETAIL_LABELS.activityEmpty}</p>
			) : (
				<ul className={css.list}>
					{events.map((event) => (
						<li key={event.id} className={css.item}>
							<div className={css.row}>
								<Badge
									variant='light'
									color={AUDIT_ACTION_COLOR[event.action]}
									radius='sm'
									size='sm'
								>
									{AUDIT_ACTION_LABEL[event.action]}
								</Badge>
								<time className={css.time} dateTime={event.createdAt}>
									{formatEventTime(event.createdAt)}
								</time>
							</div>
							<span className={css.actor}>
								{usersById[event.actorId] ?? event.actorId}
							</span>
						</li>
					))}
				</ul>
			)}
		</article>
	);
};
