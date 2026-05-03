import type { FC } from 'react';
import type { ServiceType } from '@/entities/service';
import type { TeamType } from '@/entities/team';
import { EmptyState } from '@/shared/ui/empty-state';
import { PageHeader } from '@/shared/ui/page-header';
import { TEAMS_LABELS } from '@/views/teams/constants';
import { countServicesPerTeam } from '@/views/teams/lib/count-services-per-team';
import { TeamCard } from '@/views/teams/ui/team-card';
import { TeamsToolbar } from '@/views/teams/ui/teams-toolbar';
import css from './index.module.css';

type TeamsViewProps = {
	teams: TeamType[];
	services: ServiceType[];
};

export const TeamsView: FC<TeamsViewProps> = ({ teams, services }) => {
	const servicesPerTeam = countServicesPerTeam(services);

	return (
		<div className={css.root}>
			<PageHeader
				title={TEAMS_LABELS.title}
				description={TEAMS_LABELS.description}
			/>

			<TeamsToolbar />

			{teams.length === 0 ? (
				<EmptyState
					title={TEAMS_LABELS.emptyTitle}
					description={TEAMS_LABELS.emptyDescription}
				/>
			) : (
				<ul className={css.grid}>
					{teams.map((team) => (
						<li key={team.id}>
							<TeamCard
								team={team}
								servicesCount={servicesPerTeam[team.id] ?? 0}
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
