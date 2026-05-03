import {
	ENVIRONMENTS,
	HOME_LABELS,
	KPIS,
	TOP_SERVICES,
} from '@/views/home/constants';
import { EnvironmentRow } from '@/views/home/ui/environment-row';
import { KpiCard } from '@/views/home/ui/kpi-card';
import { ServiceUsageItem } from '@/views/home/ui/service-usage-item';
import css from './index.module.css';

const TOP_SERVICES_TITLE_ID = 'home-top-services-title';
const ENVIRONMENTS_TITLE_ID = 'home-environments-title';

export const HomeView = () => {
	return (
		<div className={css.root}>
			<header className={css.head}>
				<div>
					<h1 className={css.title}>{HOME_LABELS.title}</h1>
					<p className={css.subtitle}>{HOME_LABELS.subtitle}</p>
				</div>
			</header>

			<dl className={css.kpiGrid} aria-label={HOME_LABELS.kpiSectionLabel}>
				{KPIS.map((kpi) => (
					<KpiCard
						key={kpi.id}
						label={kpi.label}
						value={kpi.value}
						delta={kpi.delta}
						positive={kpi.positive}
					/>
				))}
			</dl>

			<div className={css.contentGrid}>
				<section className={css.panel} aria-labelledby={TOP_SERVICES_TITLE_ID}>
					<h2 id={TOP_SERVICES_TITLE_ID} className={css.panelTitle}>
						{HOME_LABELS.topServicesTitle}
					</h2>
					<ul className={css.list}>
						{TOP_SERVICES.map((service) => (
							<li key={service.id}>
								<ServiceUsageItem
									name={service.name}
									owner={service.owner}
									health={service.health}
									usage={service.usage}
								/>
							</li>
						))}
					</ul>
				</section>

				<section className={css.panel} aria-labelledby={ENVIRONMENTS_TITLE_ID}>
					<h2 id={ENVIRONMENTS_TITLE_ID} className={css.panelTitle}>
						{HOME_LABELS.environmentsTitle}
					</h2>
					<ul className={css.list}>
						{ENVIRONMENTS.map((env) => (
							<li key={env.id}>
								<EnvironmentRow name={env.name} slo={env.slo} tone={env.tone} />
							</li>
						))}
					</ul>
				</section>
			</div>
		</div>
	);
};
