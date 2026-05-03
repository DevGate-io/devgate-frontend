import { Badge } from '@mantine/core';
import type { FC } from 'react';
import type { TemplateType } from '@/entities/template';
import css from './index.module.css';

type TemplateSummaryProps = {
	template: TemplateType;
};

export const TemplateSummary: FC<TemplateSummaryProps> = ({ template }) => {
	return (
		<aside className={css.root}>
			<h2 className={css.name}>{template.name}</h2>
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
		</aside>
	);
};
