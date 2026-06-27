import { notFound } from 'next/navigation';
import { AuditTargetType } from '@/entities/audit-event';
import { getAuditEvents } from '@/shared/api/audit/get-audit-events';
import { getServiceById } from '@/shared/api/services/get-service-by-id';
import { getServices } from '@/shared/api/services/get-services';
import { getUsers } from '@/shared/api/users/get-users';
import { ServiceDetailView } from '@/views/service-detail';
import { computeServiceGraph } from '@/views/service-detail/lib/compute-service-graph';

const RECENT_ACTIVITY_LIMIT = 5;

type ServiceDetailPageProps = {
	params: Promise<{ id: string }>;
};

const ServiceDetailPage = async ({ params }: ServiceDetailPageProps) => {
	const { id } = await params;
	const service = await getServiceById(id);

	if (!service) {
		notFound();
	}

	const [allServices, allEvents, users] = await Promise.all([
		getServices(),
		getAuditEvents(),
		getUsers(),
	]);

	const serviceGraph = computeServiceGraph(service.id, allServices);

	const events = allEvents
		.filter(
			(event) =>
				event.targetType === AuditTargetType.SERVICE &&
				event.targetId === service.id,
		)
		.slice(0, RECENT_ACTIVITY_LIMIT);

	const usersById = Object.fromEntries(
		users.map((user) => [user.id, user.fullName]),
	);

	return (
		<ServiceDetailView
			service={service}
			serviceGraph={serviceGraph}
			events={events}
			usersById={usersById}
		/>
	);
};

export default ServiceDetailPage;
