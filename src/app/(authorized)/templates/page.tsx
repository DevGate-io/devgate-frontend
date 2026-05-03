import { getTemplates } from '@/shared/api/templates/get-templates';
import { TemplatesView } from '@/views/templates';

const TemplatesPage = async () => {
	const templates = await getTemplates();

	return <TemplatesView templates={templates} />;
};

export default TemplatesPage;
