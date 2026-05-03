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
import css from './index.module.css';

type AuditRowProps = {
	event: AuditEventType;
	actorName: string;
};

export const AuditRow: FC<AuditRowProps> = ({ event, actorName }) => {
	const href = getTargetHref(event);

	return (
		<tr className={css.row}>
			<td className={css.timeCell}>
				<time dateTime={event.createdAt}>
					{formatEventTime(event.createdAt)}
				</time>
			</td>
			<td className={css.actorCell}>
				{actorName || ADMIN_AUDIT_LABELS.unknownActor}
			</td>
			<td className={css.actionCell}>
				<Badge
					variant='light'
					color={AUDIT_ACTION_COLOR[event.action]}
					radius='sm'
					size='sm'
				>
					{AUDIT_ACTION_LABEL[event.action]}
				</Badge>
			</td>
			<td className={css.targetCell}>
				<span className={css.targetType}>
					{TARGET_TYPE_LABEL[event.targetType]}
				</span>{' '}
				{href ? (
					<Link className={css.targetLink} href={href}>
						{event.targetLabel}
					</Link>
				) : (
					<span className={css.targetLabel}>{event.targetLabel}</span>
				)}
			</td>
		</tr>
	);
};
