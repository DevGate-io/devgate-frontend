import type { FC } from 'react';
import css from './index.module.css';

type EmptyTabProps = {
	title: string;
	description: string;
	href?: string;
	linkLabel?: string;
};

export const EmptyTab: FC<EmptyTabProps> = ({
	title,
	description,
	href,
	linkLabel,
}) => {
	return (
		<section className={css.root}>
			<h2 className={css.title}>{title}</h2>
			<p className={css.text}>{description}</p>
			{href && linkLabel && (
				<a
					className={css.link}
					href={href}
					target='_blank'
					rel='noopener noreferrer'
				>
					{linkLabel} →
				</a>
			)}
		</section>
	);
};
