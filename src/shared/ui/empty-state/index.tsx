import type { FC, ReactNode } from 'react';
import css from './index.module.css';

type EmptyStateProps = {
	title: string;
	description?: string;
	actions?: ReactNode;
};

export const EmptyState: FC<EmptyStateProps> = ({
	title,
	description,
	actions,
}) => {
	return (
		<section className={css.root}>
			<h2 className={css.title}>{title}</h2>
			{description && <p className={css.description}>{description}</p>}
			{actions && <div className={css.actions}>{actions}</div>}
		</section>
	);
};
