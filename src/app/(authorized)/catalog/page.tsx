import { getServiceTags } from '@/shared/api/services/get-service-tags';
import { getServices } from '@/shared/api/services/get-services';
import { parseHealthFilter } from '@/shared/api/services/lib/parse-health-filter';
import { CatalogView } from '@/views/catalog';

type CatalogSearchParamsType = {
	q?: string;
	health?: string;
	tags?: string;
};

type CatalogPageProps = {
	searchParams: Promise<CatalogSearchParamsType>;
};

const parseTags = (raw: string | undefined): string[] | undefined => {
	if (!raw) return undefined;
	const list = raw.split(',').filter(Boolean);
	return list.length > 0 ? list : undefined;
};

const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
	const params = await searchParams;
	const [services, availableTags] = await Promise.all([
		getServices({
			search: params.q,
			health: parseHealthFilter(params.health),
			tags: parseTags(params.tags),
		}),
		getServiceTags(),
	]);

	return <CatalogView services={services} availableTags={availableTags} />;
};

export default CatalogPage;
