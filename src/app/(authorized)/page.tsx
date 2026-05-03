import { getAuditEvents } from '@/shared/api/audit/get-audit-events';
import { getServices } from '@/shared/api/services/get-services';
import { getTeams } from '@/shared/api/teams/get-teams';
import { HomeView } from '@/views/home';

const HomePage = async () => {
	const [services, events, teams] = await Promise.all([
		getServices(),
		getAuditEvents(),
		getTeams(),
	]);

	return <HomeView services={services} events={events} teams={teams} />;
};

export default HomePage;
