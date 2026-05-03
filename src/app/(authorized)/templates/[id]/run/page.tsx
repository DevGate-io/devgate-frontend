import { notFound } from 'next/navigation';
import { getTemplateById } from '@/shared/api/templates/get-template-by-id';
import { TemplateRunView } from '@/views/template-run';

type TemplateRunPageProps = {
	params: Promise<{ id: string }>;
};

const TemplateRunPage = async ({ params }: TemplateRunPageProps) => {
	const { id } = await params;
	const template = await getTemplateById(id);

	if (!template) {
		notFound();
	}

	return <TemplateRunView template={template} />;
};

export default TemplateRunPage;
