import Link from 'next/link';
import type { FC } from 'react';
import { pageConfig } from '@/shared/config/page.config';
import {
	formatRussianCount,
	RUSSIAN_PLURAL_FORMS,
} from '@/shared/lib/format-russian-count';
import { getHealthColor } from '@/views/home/lib/get-health-color';
import type { TopServiceType } from '@/views/home/types';
import css from './index.module.css';

type ServiceUsageItemProps = {
	service: TopServiceType;
};

export const ServiceUsageItem: FC<ServiceUsageItemProps> = ({ service }) => {
	const usage = Math.max(service.usagePercent, 4);

	return (
		<article className={css.root}>
			<div className={css.left}>
				<span
					className={css.dot}
					style={
						{ '--dot-color': getHealthColor(service.health) } as Record<
							string,
							string
						>
					}
					aria-hidden='true'
				/>
				<div className={css.text}>
					<Link
						className={css.name}
						href={`${pageConfig.catalog}/${service.id}`}
					>
						{service.name}
					</Link>
					<Link
						className={css.owner}
						href={`${pageConfig.teams}/${service.ownerTeamId}`}
					>
						{service.ownerTeamName}
					</Link>
				</div>
			</div>
			<div className={css.bar} aria-hidden='true'>
				<div className={css.barFill} style={{ inlineSize: `${usage}%` }} />
			</div>
			<span className={css.srOnly}>
				{service.activity === 0
					? 'нет активности за 30 дней'
					: `${formatRussianCount(service.activity, RUSSIAN_PLURAL_FORMS.events)} за 30 дней`}
			</span>
		</article>
	);
};
