import { Badge } from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import { type TeamRole, type TeamType } from '@/entities/team';
import { pageConfig } from '@/shared/config/page.config';
import { ROLE_COLOR, ROLE_LABEL } from '@/views/team-detail/constants';
import { PROFILE_LABELS } from '@/views/profile/constants';
import css from './index.module.css';

type MyTeamsPanelProps = {
	teams: Array<{ team: TeamType; role: TeamRole }>;
};

export const MyTeamsPanel: FC<MyTeamsPanelProps> = ({ teams }) => {
	return (
		<section className={css.root}>
			<h2 className={css.title}>{PROFILE_LABELS.myTeamsTitle}</h2>

			{teams.length === 0 ? (
				<p className={css.empty}>{PROFILE_LABELS.myTeamsEmpty}</p>
			) : (
				<ul className={css.list}>
					{teams.map(({ team, role }) => (
						<li key={team.id} className={css.item}>
							<Link
								className={css.link}
								href={`${pageConfig.teams}/${team.id}`}
							>
								<span className={css.name}>{team.name}</span>
								<span className={css.slug}>{team.slug}</span>
							</Link>
							<Badge
								variant='light'
								color={ROLE_COLOR[role]}
								radius='sm'
								size='sm'
							>
								{ROLE_LABEL[role]}
							</Badge>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};
