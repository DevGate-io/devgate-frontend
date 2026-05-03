import type { FC } from 'react';
import type { TemplateType } from '@/entities/template';
import { ParametersTable } from '@/views/template-detail/ui/parameters-table';
import { TemplateHeaderSection } from '@/views/template-detail/ui/template-header-section';
import css from './index.module.css';

type TemplateDetailViewProps = {
	template: TemplateType;
};

export const TemplateDetailView: FC<TemplateDetailViewProps> = ({
	template,
}) => {
	return (
		<div className={css.root}>
			<TemplateHeaderSection template={template} />
			<ParametersTable parameters={template.parameters} />
		</div>
	);
};
