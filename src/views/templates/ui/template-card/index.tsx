import { Badge } from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import type { TemplateType } from '@/entities/template';
import { pageConfig } from '@/shared/config/page.config';
import { TEMPLATES_LABELS } from '@/views/templates/constants';
import css from './index.module.css';

type TemplateCardProps = {
	template: TemplateType;
};

const SparklesIcon = () => (
	<svg
		width='12'
		height='12'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.5'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden='true'
	>
		<path d='M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z' />
		<path d='M19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1z' />
	</svg>
);

export const TemplateCard: FC<TemplateCardProps> = ({ template }) => {
	return (
		<article className={css.root}>
			<header className={css.head}>
				<h2 className={css.name}>
					<Link
						className={css.nameLink}
						href={`${pageConfig.templates}/${template.id}`}
					>
						{template.name}
					</Link>
				</h2>
			</header>

			<p className={css.description}>{template.description}</p>

			{template.tags.length > 0 && (
				<ul className={css.tags}>
					{template.tags.map((tag) => (
						<li key={tag}>
							<Badge variant='light' color='lavender' radius='sm' size='xs'>
								{tag}
							</Badge>
						</li>
					))}
				</ul>
			)}

			<div className={css.meta}>
				<span className={css.metaIcon}>
					<SparklesIcon />
				</span>
				{TEMPLATES_LABELS.parameterCount(template.parameters.length)}
			</div>
		</article>
	);
};
