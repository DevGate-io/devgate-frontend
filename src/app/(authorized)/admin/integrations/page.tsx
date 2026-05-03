import { getIntegrations } from '@/shared/api/integrations/get-integrations';
import { AdminIntegrationsView } from '@/views/admin-integrations';

const AdminIntegrationsPage = async () => {
	const integrations = await getIntegrations();

	return <AdminIntegrationsView integrations={integrations} />;
};

export default AdminIntegrationsPage;
