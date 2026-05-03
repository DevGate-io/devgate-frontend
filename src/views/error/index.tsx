'use client';

import { Button } from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import { pageConfig } from '@/shared/config/page.config';
import {
	ERROR_VIEW_LABELS,
	type ErrorStatusCodeType,
} from '@/views/error/constants';
import css from './index.module.css';

type ErrorViewProps = {
	status?: ErrorStatusCodeType;
	title?: string;
	description?: string;
	digest?: string;
	onRetry?: () => void;
};

export const ErrorView: FC<ErrorViewProps> = ({
	status = 'generic',
	title,
	description,
	digest,
	onRetry,
}) => {
	const fallback = ERROR_VIEW_LABELS.statuses[status];

	return (
		<section className={css.root} role='alert' aria-live='assertive'>
			<span className={css.code} aria-hidden='true'>
				{typeof status === 'number' ? status : '!'}
			</span>
			<h1 className={css.title}>{title ?? fallback.title}</h1>
			<p className={css.description}>{description ?? fallback.description}</p>

			{digest && <code className={css.digest}>id: {digest}</code>}

			<div className={css.actions}>
				{onRetry && (
					<Button color='lavender' onClick={onRetry}>
						{ERROR_VIEW_LABELS.retryAction}
					</Button>
				)}
				<Button component={Link} variant='subtle' href={pageConfig.base}>
					{ERROR_VIEW_LABELS.homeAction}
				</Button>
			</div>
		</section>
	);
};
