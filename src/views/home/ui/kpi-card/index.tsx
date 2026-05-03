import clsx from 'clsx';
import type { FC } from 'react';
import css from './index.module.css';

type KpiCardProps = {
	label: string;
	value: string;
	delta: string;
	positive: boolean;
};

export const KpiCard: FC<KpiCardProps> = ({
	label,
	value,
	delta,
	positive,
}) => {
	return (
		<div className={css.root}>
			<dt className={css.label}>{label}</dt>
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
