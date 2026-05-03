import { getServices } from '@/shared/api/services/get-services';
import { getTeams } from '@/shared/api/teams/get-teams';
import { TeamsView } from '@/views/teams';

type TeamsSearchParamsType = {
	q?: string;
};

type TeamsPageProps = {
	searchParams: Promise<TeamsSearchParamsType>;
};

const TeamsPage = async ({ searchParams }: TeamsPageProps) => {
	const params = await searchParams;
	const [teams, services] = await Promise.all([
		getTeams({ search: params.q }),
		getServices(),
	]);

	return <TeamsView teams={teams} services={services} />;
};

export default TeamsPage;
