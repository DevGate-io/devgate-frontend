import { Badge } from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import { TeamRole, type TeamType } from '@/entities/team';
import { pageConfig } from '@/shared/config/page.config';
import { formatDate } from '@/shared/lib/format-date';
import { TEAMS_LABELS } from '@/views/teams/constants';
import {
	formatRussianCount,
	RUSSIAN_PLURAL_FORMS,
} from '@/shared/lib/format-russian-count';
import css from './index.module.css';

type TeamCardProps = {
	team: TeamType;
	servicesCount: number;
};

export const TeamCard: FC<TeamCardProps> = ({ team, servicesCount }) => {
	const ownersCount = team.members.filter(
		(member) => member.role === TeamRole.OWNER,
	).length;

	return (
		<article className={css.root}>
			<header className={css.head}>
				<h2 className={css.name}>
					<Link
						className={css.nameLink}
						href={`${pageConfig.teams}/${team.id}`}
					>
						{team.name}
					</Link>
				</h2>
				<Badge variant='light' color='gray' radius='sm' size='sm'>
					{team.slug}
				</Badge>
			</header>

			{team.description && (
				<p className={css.description}>{team.description}</p>
			)}

			<dl className={css.meta}>
				<div className={css.metaItem}>
					<dt className={css.metaLabel}>состав</dt>
					<dd className={css.metaValue}>
						{formatRussianCount(
							team.members.length,
							RUSSIAN_PLURAL_FORMS.members,
						)}
					</dd>
				</div>
				<div className={css.metaItem}>
					<dt className={css.metaLabel}>{TEAMS_LABELS.ownersCount}</dt>
					<dd className={css.metaValue}>{ownersCount}</dd>
				</div>
				<div className={css.metaItem}>
					<dt className={css.metaLabel}>сервисов</dt>
					<dd className={css.metaValue}>
						{formatRussianCount(servicesCount, RUSSIAN_PLURAL_FORMS.services)}
					</dd>
				</div>
				<div className={css.metaItem}>
					<dt className={css.metaLabel}>создана</dt>
					<dd className={css.metaValue}>
						<time dateTime={team.createdAt}>{formatDate(team.createdAt)}</time>
					</dd>
				</div>
			</dl>
		</article>
	);
};
