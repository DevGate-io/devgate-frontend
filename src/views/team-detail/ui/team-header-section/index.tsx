import { Badge } from '@mantine/core';
import type { FC } from 'react';
import type { TeamType } from '@/entities/team';
import { formatDate } from '@/shared/lib/format-date';
import { TEAM_DETAIL_LABELS } from '@/views/team-detail/constants';
import css from './index.module.css';

type TeamHeaderSectionProps = {
	team: TeamType;
};

export const TeamHeaderSection: FC<TeamHeaderSectionProps> = ({ team }) => {
	return (
		<header className={css.root}>
			<div className={css.text}>
				<h1 className={css.name}>{team.name}</h1>
				{team.description && (
					<p className={css.description}>{team.description}</p>
				)}
				<dl className={css.meta}>
					<div className={css.metaItem}>
						<dt className={css.metaLabel}>slug</dt>
						<dd className={css.metaValue}>{team.slug}</dd>
					</div>
					<div className={css.metaItem}>
						<dt className={css.metaLabel}>организация</dt>
						<dd className={css.metaValue}>{team.organizationId}</dd>
					</div>
				</dl>
			</div>

			<div className={css.actions}>
				<Badge variant='light' color='gray' radius='sm'>
					{`${TEAM_DETAIL_LABELS.createdAt}: ${formatDate(team.createdAt)}`}
				</Badge>
			</div>
		</header>
	);
};
