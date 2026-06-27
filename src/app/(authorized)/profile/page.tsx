import { redirect } from 'next/navigation';
import type { TeamRole, TeamType } from '@/entities/team';
import { getAuditEvents } from '@/shared/api/audit/get-audit-events';
import { getCurrentUser } from '@/shared/api/auth/get-current-user';
import { getTeams } from '@/shared/api/teams/get-teams';
import { pageConfig } from '@/shared/config/page.config';
import { ProfileView } from '@/views/profile';

const ACTIVITY_LIMIT = 5;

type TeamMembershipType = { team: TeamType; role: TeamRole };

const ProfilePage = async () => {
	let user;
	try {
		user = await getCurrentUser();
	} catch {
		redirect(pageConfig.auth);
	}

	const [allTeams, allEvents] = await Promise.all([
		getTeams(),
		getAuditEvents(),
	]);

	const teams: TeamMembershipType[] = [];
	for (const team of allTeams) {
		const membership = team.members.find((member) => member.userId === user.id);
		if (membership) {
			teams.push({ team, role: membership.role });
		}
	}

	const events = allEvents
		.filter((event) => event.actorId === user.id)
		.slice(0, ACTIVITY_LIMIT);

	return <ProfileView user={user} teams={teams} events={events} />;
};

export default ProfilePage;
