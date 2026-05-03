import type { FC } from 'react';
import { COMING_SOON_DEFAULT_DESCRIPTION } from '@/views/coming-soon/constants';
import css from './index.module.css';

type ComingSoonViewProps = {
	title: string;
	description?: string;
};

export const ComingSoonView: FC<ComingSoonViewProps> = ({
	title,
	description = COMING_SOON_DEFAULT_DESCRIPTION,
}) => {
	return (
		<section className={css.root}>
			<header>
				<h1 className={css.title}>{title}</h1>
			</header>
			<p className={css.description}>{description}</p>
		</section>
	);
};
