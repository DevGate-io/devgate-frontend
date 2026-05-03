import type { FC } from 'react';
import type { AuditEventType } from '@/entities/audit-event';
import type { ServiceType } from '@/entities/service';
import type { TeamType } from '@/entities/team';
import { PageHeader } from '@/shared/ui/page-header';
import { HOME_LABELS } from '@/views/home/constants';
import { computeHomeData } from '@/views/home/lib/compute-home-data';
import { EnvironmentRow } from '@/views/home/ui/environment-row';
import { KpiCard } from '@/views/home/ui/kpi-card';
import { ServiceUsageItem } from '@/views/home/ui/service-usage-item';
import css from './index.module.css';

const TOP_SERVICES_TITLE_ID = 'home-top-services-title';
const ENVIRONMENTS_TITLE_ID = 'home-environments-title';

type HomeViewProps = {
	services: ServiceType[];
	events: AuditEventType[];
	teams: TeamType[];
};

export const HomeView: FC<HomeViewProps> = ({ services, events, teams }) => {
	const { kpis, topServices, environments } = computeHomeData(
		services,
		events,
		teams,
	);

	return (
		<div className={css.root}>
			<PageHeader
				title={HOME_LABELS.title}
				description={HOME_LABELS.subtitle}
			/>

			<dl className={css.kpiGrid} aria-label={HOME_LABELS.kpiSectionLabel}>
				{kpis.map((kpi) => (
					<KpiCard
						key={kpi.id}
						label={kpi.label}
						value={kpi.value}
						delta={kpi.delta}
						positive={kpi.positive}
						tone={kpi.tone}
					/>
				))}
			</dl>

			<div className={css.contentGrid}>
				<section className={css.panel} aria-labelledby={TOP_SERVICES_TITLE_ID}>
					<h2 id={TOP_SERVICES_TITLE_ID} className={css.panelTitle}>
						{HOME_LABELS.topServicesTitle}
					</h2>
					{topServices.length === 0 ? (
						<p className={css.empty}>{HOME_LABELS.topServicesEmpty}</p>
					) : (
						<ul className={css.list}>
							{topServices.map((service) => (
								<li key={service.id}>
									<ServiceUsageItem service={service} />
								</li>
							))}
						</ul>
					)}
				</section>

				<section className={css.panel} aria-labelledby={ENVIRONMENTS_TITLE_ID}>
					<h2 id={ENVIRONMENTS_TITLE_ID} className={css.panelTitle}>
						{HOME_LABELS.environmentsTitle}
					</h2>
					<ul className={css.list}>
						{environments.map((environment) => (
							<li key={environment.id}>
								<EnvironmentRow environment={environment} />
							</li>
						))}
					</ul>
				</section>
			</div>
		</div>
	);
};
