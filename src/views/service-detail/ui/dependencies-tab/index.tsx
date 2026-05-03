import Link from 'next/link';
import type { FC } from 'react';
import type { ServiceType } from '@/entities/service';
import { pageConfig } from '@/shared/config/page.config';
import { getHealthColor } from '@/views/catalog/lib/get-health-color';
import { SERVICE_DETAIL_LABELS } from '@/views/service-detail/constants';
import css from './index.module.css';

type DependenciesTabProps = {
	dependencies: ServiceType[];
};

export const DependenciesTab: FC<DependenciesTabProps> = ({ dependencies }) => {
	if (dependencies.length === 0) {
		return (
			<section className={css.root}>
				<h2 className={css.title}>{SERVICE_DETAIL_LABELS.dependenciesTitle}</h2>
				<p className={css.empty}>{SERVICE_DETAIL_LABELS.dependenciesEmpty}</p>
			</section>
		);
	}

	return (
		<section className={css.root}>
			<h2 className={css.title}>{SERVICE_DETAIL_LABELS.dependenciesTitle}</h2>
			<ul className={css.list}>
				{dependencies.map((dependency) => (
					<li key={dependency.id}>
						<Link
							className={css.row}
							href={`${pageConfig.catalog}/${dependency.id}`}
						>
							<span
								className={css.dot}
								style={{ backgroundColor: getHealthColor(dependency.health) }}
								aria-hidden='true'
							/>
							<span className={css.name}>{dependency.name}</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};
