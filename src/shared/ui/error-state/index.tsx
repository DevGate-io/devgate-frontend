import { Button } from '@mantine/core';
import type { FC } from 'react';
import { ERROR_STATE_LABELS } from './constants';
import css from './index.module.css';

type ErrorStateProps = {
	title?: string;
	description?: string;
	onRetry?: () => void;
};

export const ErrorState: FC<ErrorStateProps> = ({
	title = ERROR_STATE_LABELS.defaultTitle,
	description = ERROR_STATE_LABELS.defaultDescription,
	onRetry,
}) => {
	return (
		<section className={css.root} role='alert' aria-live='assertive'>
			<h2 className={css.title}>{title}</h2>
			<p className={css.description}>{description}</p>
			{onRetry && (
				<Button variant='light' color='lavender' onClick={onRetry}>
					{ERROR_STATE_LABELS.retry}
				</Button>
			)}
		</section>
	);
};
