import { Badge } from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import type { ServiceType } from '@/entities/service';
import { pageConfig } from '@/shared/config/page.config';
import {
	CATALOG_LABELS,
	SERVICE_HEALTH_LABEL,
} from '@/views/catalog/constants';
import { getHealthColor } from '@/views/catalog/lib/get-health-color';
import css from './index.module.css';

type ServiceCardProps = {
	service: ServiceType;
};

export const ServiceCard: FC<ServiceCardProps> = ({ service }) => {
	return (
		<article className={css.root}>
			<header className={css.head}>
				<div className={css.title}>
					<span
						className={css.dot}
						style={{ backgroundColor: getHealthColor(service.health) }}
						aria-hidden='true'
					/>
					<h2 className={css.name}>
						<Link
							className={css.nameLink}
							href={`${pageConfig.catalog}/${service.id}`}
						>
							{service.name}
						</Link>
					</h2>
				</div>
				<Badge
					variant='light'
					color='gray'
					radius='sm'
					size='sm'
					className={css.healthBadge}
				>
					{SERVICE_HEALTH_LABEL[service.health]}
				</Badge>
			</header>

			{service.description && (
				<p className={css.description}>{service.description}</p>
			)}

			<dl className={css.meta}>
				{service.language && (
					<div className={css.metaItem}>
						<dt className={css.metaLabel}>lang</dt>
						<dd className={css.metaValue}>{service.language}</dd>
					</div>
				)}
				<div className={css.metaItem}>
					<dt className={css.metaLabel}>owner</dt>
					<dd className={css.metaValue}>{service.ownerTeamId}</dd>
				</div>
				{service.slo && (
					<div className={css.metaItem}>
						<dt className={css.metaLabel}>SLO</dt>
						<dd className={css.metaValue}>{service.slo.availability}%</dd>
					</div>
				)}
			</dl>

			{service.tags.length > 0 && (
				<ul className={css.tags}>
					{service.tags.map((tag) => (
						<li key={tag}>
							<Badge variant='light' color='lavender' radius='sm' size='xs'>
								{tag}
							</Badge>
						</li>
					))}
				</ul>
			)}

			<nav className={css.actions} aria-label={`Действия: ${service.name}`}>
				{service.repoUrl && (
					<a
						className={css.actionLink}
						href={service.repoUrl}
						target='_blank'
						rel='noopener noreferrer'
					>
						{CATALOG_LABELS.repoLinkLabel}
					</a>
				)}
				{service.pipelineUrl && (
					<a
						className={css.actionLink}
						href={service.pipelineUrl}
						target='_blank'
						rel='noopener noreferrer'
					>
						{CATALOG_LABELS.pipelineLinkLabel}
					</a>
				)}
				{service.docsUrl && (
					<a
						className={css.actionLink}
						href={service.docsUrl}
						target='_blank'
						rel='noopener noreferrer'
					>
						{CATALOG_LABELS.docsLinkLabel}
					</a>
				)}
			</nav>
		</article>
	);
};
