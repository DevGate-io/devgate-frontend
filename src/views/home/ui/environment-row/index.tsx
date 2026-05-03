import type { FC } from 'react';
import { getToneColor } from '@/views/home/lib/get-health-color';
import type {
	EnvironmentSummaryType,
	HealthToneType,
} from '@/views/home/types';
import css from './index.module.css';

type EnvironmentRowProps = {
	environment: EnvironmentSummaryType;
};

const getToneByRatio = (
	ratio: number,
	servicesCount: number,
): HealthToneType => {
	if (servicesCount === 0) return 'sky';
	if (ratio >= 0.95) return 'mint';
	if (ratio >= 0.7) return 'peach';
	return 'danger';
};

export const EnvironmentRow: FC<EnvironmentRowProps> = ({ environment }) => {
	const tone = getToneByRatio(environment.ratio, environment.servicesCount);
	const sloLabel =
		environment.servicesCount === 0
			? 'нет сервисов'
			: `${environment.healthyCount}/${environment.servicesCount} здоровы`;

	return (
		<article className={css.root}>
			<div className={css.left}>
				<span
					className={css.dot}
					style={
						{ '--dot-color': getToneColor(tone) } as Record<string, string>
					}
					aria-hidden='true'
				/>
				<span className={css.name}>{environment.name}</span>
			</div>
			<span className={css.slo}>{sloLabel}</span>
		</article>
	);
};
