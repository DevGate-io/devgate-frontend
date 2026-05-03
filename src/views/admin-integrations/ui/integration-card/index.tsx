import { Badge } from '@mantine/core';
import type { FC } from 'react';
import type { IntegrationType } from '@/entities/integration';
import {
	ADMIN_INTEGRATIONS_LABELS,
	KIND_LABEL,
	STATUS_COLOR,
	STATUS_LABEL,
} from '@/views/admin-integrations/constants';
import { formatRelativeTime } from '@/views/admin-integrations/lib/format-relative-time';
import css from './index.module.css';

type IntegrationCardProps = {
	integration: IntegrationType;
};

export const IntegrationCard: FC<IntegrationCardProps> = ({ integration }) => {
	return (
		<article className={css.root}>
			<header className={css.head}>
				<div className={css.heading}>
					<h2 className={css.name}>{integration.name}</h2>
					<span className={css.provider}>{integration.provider}</span>
				</div>
				<Badge
					variant='light'
					color={STATUS_COLOR[integration.status]}
					radius='sm'
					size='sm'
				>
					{STATUS_LABEL[integration.status]}
				</Badge>
			</header>

			<p className={css.description}>{integration.description}</p>

			{integration.statusMessage && (
				<p className={css.statusMessage}>{integration.statusMessage}</p>
			)}

			<dl className={css.meta}>
				<div className={css.metaItem}>
					<dt className={css.metaLabel}>тип</dt>
					<dd className={css.metaValue}>{KIND_LABEL[integration.kind]}</dd>
				</div>
				<div className={css.metaItem}>
					<dt className={css.metaLabel}>
						{ADMIN_INTEGRATIONS_LABELS.lastSyncedLabel}
					</dt>
					<dd className={css.metaValue}>
						{integration.lastSyncedAt ? (
							<time dateTime={integration.lastSyncedAt}>
								{formatRelativeTime(integration.lastSyncedAt)}
							</time>
						) : (
							<span className={css.muted}>
								{ADMIN_INTEGRATIONS_LABELS.neverSynced}
							</span>
						)}
					</dd>
				</div>
			</dl>

			<nav className={css.actions} aria-label={`Действия: ${integration.name}`}>
				{integration.configUrl && (
					<a
						className={css.actionLink}
						href={integration.configUrl}
						target='_blank'
						rel='noopener noreferrer'
					>
						{ADMIN_INTEGRATIONS_LABELS.configLink}
					</a>
				)}
				{integration.docsUrl && (
					<a
						className={css.actionLink}
						href={integration.docsUrl}
						target='_blank'
						rel='noopener noreferrer'
					>
						{ADMIN_INTEGRATIONS_LABELS.docsLink}
					</a>
				)}
			</nav>
		</article>
	);
};
