import type { FC } from 'react';
import type { AuditEventType } from '@/entities/audit-event';
import type { TeamRole, TeamType } from '@/entities/team';
import type { User } from '@/entities/user';
import { MyActivityPanel } from '@/views/profile/ui/my-activity-panel';
import { MyTeamsPanel } from '@/views/profile/ui/my-teams-panel';
import { ProfileHeader } from '@/views/profile/ui/profile-header';
import css from './index.module.css';

type ProfileViewProps = {
	user: User;
	teams: Array<{ team: TeamType; role: TeamRole }>;
	events: AuditEventType[];
};

export const ProfileView: FC<ProfileViewProps> = ({ user, teams, events }) => {
	return (
		<div className={css.root}>
			<ProfileHeader user={user} />

			<div className={css.grid}>
				<MyTeamsPanel teams={teams} />
				<MyActivityPanel events={events} />
			</div>
		</div>
	);
};
