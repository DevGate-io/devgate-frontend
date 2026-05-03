import { CardsGridSkeleton } from '@/shared/ui/page-skeleton';

const AdminIntegrationsLoading = () => (
	<CardsGridSkeleton cards={6} withToolbar={false} />
);

export default AdminIntegrationsLoading;
