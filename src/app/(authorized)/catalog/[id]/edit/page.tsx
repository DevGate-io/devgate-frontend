import { notFound } from 'next/navigation';
import { getServiceById } from '@/shared/api/services/get-service-by-id';
import { EditServiceView } from '@/views/service-form/edit';

type EditServicePageProps = {
	params: Promise<{ id: string }>;
};

const EditServicePage = async ({ params }: EditServicePageProps) => {
	const { id } = await params;
	const service = await getServiceById(id);

	if (!service) {
		notFound();
	}

	return <EditServiceView service={service} />;
};

export default EditServicePage;
