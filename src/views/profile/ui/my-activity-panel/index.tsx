import { Badge } from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import type { AuditEventType } from '@/entities/audit-event';
import {
	ADMIN_AUDIT_LABELS,
	AUDIT_ACTION_COLOR,
	AUDIT_ACTION_LABEL,
	TARGET_TYPE_LABEL,
} from '@/views/admin-audit/constants';
import { formatEventTime } from '@/views/admin-audit/lib/format-event-time';
import { getTargetHref } from '@/views/admin-audit/lib/get-target-href';
import { PROFILE_LABELS } from '@/views/profile/constants';
import css from './index.module.css';

type MyActivityPanelProps = {
	events: AuditEventType[];
};

export const MyActivityPanel: FC<MyActivityPanelProps> = ({ events }) => {
	return (
		<section className={css.root}>
			<h2 className={css.title}>{PROFILE_LABELS.myActivityTitle}</h2>

			{events.length === 0 ? (
				<p className={css.empty}>{PROFILE_LABELS.myActivityEmpty}</p>
			) : (
				<ul className={css.list}>
					{events.map((event) => {
						const href = getTargetHref(event);
						return (
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
								<div className={css.target}>
									<span className={css.targetType}>
										{TARGET_TYPE_LABEL[event.target.type] ??
											ADMIN_AUDIT_LABELS.headerTarget}
									</span>{' '}
									{href ? (
										<Link className={css.targetLink} href={href}>
											{event.target.label}
										</Link>
									) : (
										<span>{event.target.label}</span>
									)}
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
};
