import { notFound } from 'next/navigation';
import { getServices } from '@/shared/api/services/get-services';
import { getTeamById } from '@/shared/api/teams/get-team-by-id';
import { TeamDetailView } from '@/views/team-detail';

type TeamDetailPageProps = {
	params: Promise<{ id: string }>;
};

const TeamDetailPage = async ({ params }: TeamDetailPageProps) => {
	const { id } = await params;
	const team = await getTeamById(id);

	if (!team) {
		notFound();
	}

	const ownedServices = await getServices({ ownerTeamId: team.id });

	return <TeamDetailView team={team} ownedServices={ownedServices} />;
};

export default TeamDetailPage;
