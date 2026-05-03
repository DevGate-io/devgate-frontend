import type { FC, ReactNode } from 'react';
import css from './index.module.css';

type PageHeaderProps = {
	title: string;
	description?: string;
	actions?: ReactNode;
};

export const PageHeader: FC<PageHeaderProps> = ({
	title,
	description,
	actions,
}) => {
	return (
		<header className={css.root}>
			<div className={css.text}>
				<h1 className={css.title}>{title}</h1>
				{description && <p className={css.description}>{description}</p>}
			</div>
			{actions && <div className={css.actions}>{actions}</div>}
		</header>
	);
};
