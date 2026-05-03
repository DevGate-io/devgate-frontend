import type { FC } from 'react';
import { getHealthColor } from '@/views/home/lib/get-health-color';
import type { HealthToneType } from '@/views/home/types';
import css from './index.module.css';

type ServiceUsageItemProps = {
	name: string;
	owner: string;
	health: HealthToneType;
	usage: number;
};

export const ServiceUsageItem: FC<ServiceUsageItemProps> = ({
	name,
	owner,
	health,
	usage,
}) => {
	return (
		<article className={css.root}>
			<div className={css.left}>
				<span
					className={css.dot}
					style={{ backgroundColor: getHealthColor(health) }}
					aria-hidden='true'
				/>
				<div className={css.text}>
					<span className={css.name}>{name}</span>
					<span className={css.owner}>{owner}</span>
				</div>
			</div>
			<div className={css.bar} aria-hidden='true'>
				<div className={css.barFill} style={{ inlineSize: `${usage}%` }} />
			</div>
			<span className={css.srOnly}>{`Загрузка: ${usage}%`}</span>
		</article>
	);
};
