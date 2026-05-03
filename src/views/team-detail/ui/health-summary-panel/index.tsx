import type { FC } from 'react';
import { ServiceHealthEnum, type ServiceHealthType } from '@/entities/service';
import { SERVICE_HEALTH_LABEL } from '@/views/catalog/constants';
import { TEAM_DETAIL_LABELS } from '@/views/team-detail/constants';
import type { HealthSummaryType } from '@/views/team-detail/lib/compute-health-summary';
import css from './index.module.css';

type HealthSummaryPanelProps = {
	summary: HealthSummaryType;
};

const HEALTH_ORDER: ServiceHealthType[] = [
	ServiceHealthEnum.HEALTHY,
	ServiceHealthEnum.DEGRADED,
	ServiceHealthEnum.DOWN,
	ServiceHealthEnum.UNKNOWN,
];

export const HealthSummaryPanel: FC<HealthSummaryPanelProps> = ({
	summary,
}) => {
	if (summary.total === 0) {
		return (
			<section className={css.root}>
				<h2 className={css.title}>{TEAM_DETAIL_LABELS.healthTitle}</h2>
				<p className={css.empty}>{TEAM_DETAIL_LABELS.healthEmpty}</p>
			</section>
		);
	}

	return (
		<section className={css.root}>
			<h2 className={css.title}>{TEAM_DETAIL_LABELS.healthTitle}</h2>

			<div className={css.bar} aria-hidden='true'>
				{HEALTH_ORDER.map((health) => {
					const value = summary.counts[health];
					if (value === 0) return null;
					const widthPercent = (value / summary.total) * 100;
					return (
						<span
							key={health}
							className={css.barSegment}
							data-health={health}
							style={{ inlineSize: `${widthPercent}%` }}
						/>
					);
				})}
			</div>

			<dl className={css.tiles}>
				{HEALTH_ORDER.map((health) => (
					<div key={health} className={css.tile} data-health={health}>
						<dt className={css.tileLabel}>{SERVICE_HEALTH_LABEL[health]}</dt>
						<dd className={css.tileValue}>{summary.counts[health]}</dd>
					</div>
				))}
			</dl>
		</section>
	);
};
