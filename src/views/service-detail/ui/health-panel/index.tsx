import { Badge } from '@mantine/core';
import type { FC } from 'react';
import type { ServiceType } from '@/entities/service';
import { SERVICE_HEALTH_LABEL } from '@/views/catalog/constants';
import {
	getHealthBadgeColor,
	getHealthColor,
} from '@/views/catalog/lib/get-health-color';
import { SERVICE_DETAIL_LABELS } from '@/views/service-detail/constants';
import { getHealthText } from '@/views/service-detail/lib/get-health-text';
import css from './index.module.css';

type HealthPanelProps = {
	service: ServiceType;
};

export const HealthPanel: FC<HealthPanelProps> = ({ service }) => {
	const { slo, health } = service;
	const healthBgVar = getHealthColor(health).replace('-5)', '-0)');

	return (
		<article className={css.root}>
			<header className={css.head}>
				<div className={css.titleGroup}>
					<h2 className={css.title}>{SERVICE_DETAIL_LABELS.healthTitle}</h2>
					<Badge
						variant='light'
						color={getHealthBadgeColor(health)}
						radius='sm'
						size='sm'
					>
						{SERVICE_HEALTH_LABEL[health]}
					</Badge>
				</div>
			</header>

			<p
				className={css.summary}
				style={{ '--health-bg': healthBgVar } as Record<string, string>}
			>
				<span
					className={css.dot}
					style={{ backgroundColor: getHealthColor(health) }}
					aria-hidden='true'
				/>
				{getHealthText(health)}
			</p>

			<dl className={css.metrics}>
				<div className={css.metric}>
					<dt className={css.metricLabel}>
						{SERVICE_DETAIL_LABELS.availabilityLabel}
					</dt>
					<dd className={css.metricValue}>
						{slo ? `${slo.availability}%` : SERVICE_DETAIL_LABELS.noSloData}
					</dd>
				</div>
				<div className={css.metric}>
					<dt className={css.metricLabel}>
						{SERVICE_DETAIL_LABELS.latencyLabel}
					</dt>
					<dd className={css.metricValue}>
						{slo?.latencyP95Ms
							? `${slo.latencyP95Ms} мс`
							: SERVICE_DETAIL_LABELS.noSloData}
					</dd>
				</div>
			</dl>
		</article>
	);
};
