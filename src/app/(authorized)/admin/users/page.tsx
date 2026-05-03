import { getUsers } from '@/shared/api/users/get-users';
import { AdminUsersView } from '@/views/admin-users';

type AdminUsersPageProps = {
	searchParams: Promise<{ q?: string }>;
};

const AdminUsersPage = async ({ searchParams }: AdminUsersPageProps) => {
	const params = await searchParams;
	const users = await getUsers({ search: params.q });

	return <AdminUsersView users={users} />;
};

export default AdminUsersPage;
