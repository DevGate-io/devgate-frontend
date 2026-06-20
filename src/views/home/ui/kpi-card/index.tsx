import clsx from 'clsx';
import type { FC } from 'react';
import type { KpiToneType } from '@/views/home/types';
import css from './index.module.css';

type KpiCardProps = {
	label: string;
	value: string;
	delta: string;
	positive: boolean;
	tone: KpiToneType;
};

export const KpiCard: FC<KpiCardProps> = ({
	label,
	value,
	delta,
	positive,
	tone,
}) => {
	return (
		<div className={css.root} data-tone={tone}>
			<dt className={css.label}>
				<span className={css.bullet} aria-hidden='true' />
				{label}
			</dt>
			<dd className={css.row}>
				<span className={css.value}>{value}</span>
				<span
					className={clsx(
						css.delta,
						positive ? css.deltaPositive : css.deltaNegative,
					)}
				>
					{delta}
				</span>
			</dd>
		</div>
	);
};
