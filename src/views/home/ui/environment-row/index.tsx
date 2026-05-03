import type { FC } from 'react';
import { getHealthColor } from '@/views/home/lib/get-health-color';
import type { HealthToneType } from '@/views/home/types';
import css from './index.module.css';

type EnvironmentRowProps = {
	name: string;
	slo: string;
	tone: HealthToneType;
};

export const EnvironmentRow: FC<EnvironmentRowProps> = ({
	name,
	slo,
	tone,
}) => {
	return (
		<article className={css.root}>
			<div className={css.left}>
				<span
					className={css.dot}
					style={{ backgroundColor: getHealthColor(tone) }}
					aria-hidden='true'
				/>
				<span className={css.name}>{name}</span>
			</div>
			<span className={css.slo}>{slo}</span>
		</article>
	);
};
