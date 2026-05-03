import { notFound } from 'next/navigation';
import { getTemplateById } from '@/shared/api/templates/get-template-by-id';
import { TemplateDetailView } from '@/views/template-detail';

type TemplateDetailPageProps = {
	params: Promise<{ id: string }>;
};

const TemplateDetailPage = async ({ params }: TemplateDetailPageProps) => {
	const { id } = await params;
	const template = await getTemplateById(id);

	if (!template) {
		notFound();
	}

	return <TemplateDetailView template={template} />;
};

export default TemplateDetailPage;
