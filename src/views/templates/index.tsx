import type { FC } from 'react';
import type { TemplateType } from '@/entities/template';
import { EmptyState } from '@/shared/ui/empty-state';
import { PageHeader } from '@/shared/ui/page-header';
import { TEMPLATES_LABELS } from '@/views/templates/constants';
import { TemplateCard } from '@/views/templates/ui/template-card';
import css from './index.module.css';

type TemplatesViewProps = {
	templates: TemplateType[];
};

export const TemplatesView: FC<TemplatesViewProps> = ({ templates }) => {
	return (
		<div className={css.root}>
			<PageHeader
				title={TEMPLATES_LABELS.title}
				description={TEMPLATES_LABELS.description}
			/>

			{templates.length === 0 ? (
				<EmptyState
					title={TEMPLATES_LABELS.emptyTitle}
					description={TEMPLATES_LABELS.emptyDescription}
				/>
			) : (
				<ul className={css.grid}>
					{templates.map((template) => (
						<li key={template.id}>
							<TemplateCard template={template} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
