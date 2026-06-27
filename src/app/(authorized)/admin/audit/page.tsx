import { AuditAction } from '@/entities/audit-event';
import { getAuditEvents } from '@/shared/api/audit/get-audit-events';
import { getUsers } from '@/shared/api/users/get-users';
import { AdminAuditView } from '@/views/admin-audit';

type AdminAuditPageProps = {
	searchParams: Promise<{
		action?: string;
		actor?: string;
		from?: string;
		to?: string;
	}>;
};

const isAuditAction = (value: string | undefined): value is AuditAction =>
	!!value && (Object.values(AuditAction) as string[]).includes(value);

const AdminAuditPage = async ({ searchParams }: AdminAuditPageProps) => {
	const params = await searchParams;
	const [events, users] = await Promise.all([
		getAuditEvents({
			action: isAuditAction(params.action) ? params.action : undefined,
			actorId: params.actor,
			from: params.from,
			to: params.to,
		}),
		getUsers(),
	]);

	return <AdminAuditView events={events} users={users} />;
};

export default AdminAuditPage;
