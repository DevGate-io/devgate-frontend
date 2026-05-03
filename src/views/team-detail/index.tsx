import type { FC } from 'react';
import type { ServiceType } from '@/entities/service';
import type { TeamType } from '@/entities/team';
import { computeHealthSummary } from '@/views/team-detail/lib/compute-health-summary';
import { HealthSummaryPanel } from '@/views/team-detail/ui/health-summary-panel';
import { MembersList } from '@/views/team-detail/ui/members-list';
import { OwnedServicesList } from '@/views/team-detail/ui/owned-services-list';
import { TeamHeaderSection } from '@/views/team-detail/ui/team-header-section';
import css from './index.module.css';

type TeamDetailViewProps = {
	team: TeamType;
	ownedServices: ServiceType[];
};

export const TeamDetailView: FC<TeamDetailViewProps> = ({
	team,
	ownedServices,
}) => {
	const summary = computeHealthSummary(ownedServices);

	return (
		<div className={css.root}>
			<TeamHeaderSection team={team} />
			<HealthSummaryPanel summary={summary} />
			<div className={css.grid}>
				<MembersList members={team.members} />
				<OwnedServicesList services={ownedServices} />
			</div>
		</div>
	);
};
