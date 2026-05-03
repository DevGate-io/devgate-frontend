import { CardsGridSkeleton } from '@/shared/ui/page-skeleton';

const TemplatesLoading = () => (
	<CardsGridSkeleton cards={5} withToolbar={false} />
);

export default TemplatesLoading;
