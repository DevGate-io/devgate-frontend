import { notFound } from 'next/navigation';
import { getServiceById } from '@/shared/api/services/get-service-by-id';
import { getServices } from '@/shared/api/services/get-services';
import { ServiceDetailView } from '@/views/service-detail';

type ServiceDetailPageProps = {
	params: Promise<{ id: string }>;
};

const ServiceDetailPage = async ({ params }: ServiceDetailPageProps) => {
	const { id } = await params;
	const service = await getServiceById(id);

	if (!service) {
		notFound();
	}

	const allServices = await getServices();
	const dependencies = allServices.filter((candidate) =>
		service.dependencies.includes(candidate.id),
	);

	return <ServiceDetailView service={service} dependencies={dependencies} />;
};

export default ServiceDetailPage;
