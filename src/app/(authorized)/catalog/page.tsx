import { getServices } from '@/shared/api/services/get-services';
import { parseHealthFilter } from '@/shared/api/services/lib/parse-health-filter';
import { CatalogView } from '@/views/catalog';

type CatalogSearchParamsType = {
	q?: string;
	health?: string;
};

type CatalogPageProps = {
	searchParams: Promise<CatalogSearchParamsType>;
};

const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
	const params = await searchParams;
	const services = await getServices({
		search: params.q,
		health: parseHealthFilter(params.health),
	});

	return <CatalogView services={services} />;
};

export default CatalogPage;
