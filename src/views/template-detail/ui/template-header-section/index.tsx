import { Badge } from '@mantine/core';
import type { FC } from 'react';
import type { TemplateType } from '@/entities/template';
import { formatDate } from '@/shared/lib/format-date';
import { TEMPLATE_DETAIL_LABELS } from '@/views/template-detail/constants';
import { UseTemplateButton } from '@/views/template-detail/ui/use-template-button';
import css from './index.module.css';

type TemplateHeaderSectionProps = {
	template: TemplateType;
};

export const TemplateHeaderSection: FC<TemplateHeaderSectionProps> = ({
	template,
}) => {
	return (
		<header className={css.root}>
			<div className={css.text}>
				<h1 className={css.name}>{template.name}</h1>
				<p className={css.description}>{template.description}</p>
				{template.tags.length > 0 && (
					<ul className={css.tags}>
						{template.tags.map((tag) => (
							<li key={tag}>
								<Badge variant='light' color='lavender' radius='sm' size='sm'>
									{tag}
								</Badge>
							</li>
						))}
					</ul>
				)}
			</div>

			<div className={css.actions}>
				<Badge variant='light' color='gray' radius='sm'>
					{`${TEMPLATE_DETAIL_LABELS.createdAt}: ${formatDate(template.createdAt)}`}
				</Badge>
				<UseTemplateButton templateName={template.name} />
			</div>
		</header>
	);
};
