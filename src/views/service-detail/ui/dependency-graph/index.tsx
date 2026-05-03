import Link from 'next/link';
import type { FC } from 'react';
import type { ServiceType } from '@/entities/service';
import { pageConfig } from '@/shared/config/page.config';
import { getHealthColor } from '@/views/catalog/lib/get-health-color';
import { SERVICE_DETAIL_LABELS } from '@/views/service-detail/constants';
import type { DependencyGraphType } from '@/views/service-detail/lib/compute-dependency-graph';
import css from './index.module.css';

type DependencyGraphProps = {
	service: ServiceType;
	graph: DependencyGraphType;
};

type ServiceNodeProps = {
	service: ServiceType;
	variant?: 'side' | 'center';
};

const ServiceNode: FC<ServiceNodeProps> = ({ service, variant = 'side' }) => {
	const content = (
		<>
			<span
				className={css.dot}
				style={{ backgroundColor: getHealthColor(service.health) }}
				aria-hidden='true'
			/>
			<span className={css.nodeName}>{service.name}</span>
		</>
	);

	if (variant === 'center') {
		return (
			<article className={`${css.node} ${css.nodeCenter}`}>{content}</article>
		);
	}

	return (
		<Link
			className={`${css.node} ${css.nodeLink}`}
			href={`${pageConfig.catalog}/${service.id}`}
		>
			{content}
		</Link>
	);
};

export const DependencyGraph: FC<DependencyGraphProps> = ({
	service,
	graph,
}) => {
	const { upstream, downstream } = graph;

	if (upstream.length === 0 && downstream.length === 0) {
		return (
			<section className={css.root}>
				<header className={css.head}>
					<h2 className={css.title}>
						{SERVICE_DETAIL_LABELS.dependenciesTitle}
					</h2>
				</header>
				<p className={css.empty}>{SERVICE_DETAIL_LABELS.dependenciesEmpty}</p>
			</section>
		);
	}

	return (
		<section className={css.root}>
			<header className={css.head}>
				<h2 className={css.title}>{SERVICE_DETAIL_LABELS.dependenciesTitle}</h2>
				<span className={css.legend}>
					{SERVICE_DETAIL_LABELS.dependencyGraphLegend}
				</span>
			</header>

			<div className={css.grid}>
				<div className={css.column}>
					<h3 className={css.columnTitle}>
						{SERVICE_DETAIL_LABELS.dependsOnTitle}
					</h3>
					{upstream.length === 0 ? (
						<p className={css.columnEmpty}>
							{SERVICE_DETAIL_LABELS.dependsOnEmpty}
						</p>
					) : (
						<ul className={css.list}>
							{upstream.map((dep) => (
								<li key={dep.id}>
									<ServiceNode service={dep} />
								</li>
							))}
						</ul>
					)}
				</div>

				<div className={css.connector} aria-hidden='true'>
					<span
						className={`${css.arrow} ${css.arrowLeft} ${
							upstream.length === 0 ? css.arrowDisabled : ''
						}`}
					/>
					<ServiceNode service={service} variant='center' />
					<span
						className={`${css.arrow} ${css.arrowRight} ${
							downstream.length === 0 ? css.arrowDisabled : ''
						}`}
					/>
				</div>

				<div className={css.column}>
					<h3 className={css.columnTitle}>
						{SERVICE_DETAIL_LABELS.usedByTitle}
					</h3>
					{downstream.length === 0 ? (
						<p className={css.columnEmpty}>
							{SERVICE_DETAIL_LABELS.usedByEmpty}
						</p>
					) : (
						<ul className={css.list}>
							{downstream.map((dep) => (
								<li key={dep.id}>
									<ServiceNode service={dep} />
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</section>
	);
};
