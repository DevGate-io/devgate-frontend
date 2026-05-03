import { Badge } from '@mantine/core';
import type { FC } from 'react';
import type { ServiceType } from '@/entities/service';
import { formatDate } from '@/shared/lib/format-date';
import {
	ENVIRONMENT_LABEL,
	SERVICE_DETAIL_LABELS,
} from '@/views/service-detail/constants';
import css from './index.module.css';

type OverviewTabProps = {
	service: ServiceType;
};

export const OverviewTab: FC<OverviewTabProps> = ({ service }) => {
	return (
		<section className={css.root}>
			<article className={css.panel}>
				<h2 className={css.panelTitle}>{SERVICE_DETAIL_LABELS.tagsTitle}</h2>
				{service.tags.length > 0 ? (
					<ul className={css.tags}>
						{service.tags.map((tag) => (
							<li key={tag}>
								<Badge variant='light' color='lavender' radius='sm'>
									{tag}
								</Badge>
							</li>
						))}
					</ul>
				) : (
					<p className={css.environmentEmpty}>—</p>
				)}

				<dl className={`${css.meta} ${css.metaUnderTags}`}>
					<div className={css.metaRow}>
						<dt className={css.metaLabel}>{SERVICE_DETAIL_LABELS.owner}</dt>
						<dd className={css.metaValue}>{service.ownerTeamId}</dd>
					</div>
					<div className={css.metaRow}>
						<dt className={css.metaLabel}>{SERVICE_DETAIL_LABELS.project}</dt>
						<dd className={css.metaValue}>{service.projectId}</dd>
					</div>
					{service.language && (
						<div className={css.metaRow}>
							<dt className={css.metaLabel}>
								{SERVICE_DETAIL_LABELS.language}
							</dt>
							<dd className={css.metaValue}>{service.language}</dd>
						</div>
					)}
					{service.slo && (
						<div className={css.metaRow}>
							<dt className={css.metaLabel}>{SERVICE_DETAIL_LABELS.slo}</dt>
							<dd className={css.metaValue}>
								{service.slo.availability}%
								{service.slo.latencyP95Ms
									? ` · p95 ${service.slo.latencyP95Ms}мс`
									: ''}
							</dd>
						</div>
					)}
					<div className={css.metaRow}>
						<dt className={css.metaLabel}>{SERVICE_DETAIL_LABELS.createdAt}</dt>
						<dd className={css.metaValue}>{formatDate(service.createdAt)}</dd>
					</div>
					<div className={css.metaRow}>
						<dt className={css.metaLabel}>{SERVICE_DETAIL_LABELS.updatedAt}</dt>
						<dd className={css.metaValue}>{formatDate(service.updatedAt)}</dd>
					</div>
				</dl>
			</article>

			<article className={css.panel}>
				<h2 className={css.panelTitle}>
					{SERVICE_DETAIL_LABELS.environmentsTitle}
				</h2>
				<ul className={css.environments}>
					{service.environments.map((env) => (
						<li key={env.name} className={css.environmentRow}>
							<span className={css.environmentName}>
								{ENVIRONMENT_LABEL[env.name] ?? env.name}
							</span>
							{env.url ? (
								<a
									className={css.environmentLink}
									href={env.url}
									target='_blank'
									rel='noopener noreferrer'
								>
									{SERVICE_DETAIL_LABELS.openInEnv}
								</a>
							) : (
								<span className={css.environmentEmpty}>
									{SERVICE_DETAIL_LABELS.noEnvUrl}
								</span>
							)}
						</li>
					))}
				</ul>
			</article>
		</section>
	);
};
