import { Badge } from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import type { ServiceType } from '@/entities/service';
import { pageConfig } from '@/shared/config/page.config';
import { TEAM_DETAIL_LABELS } from '@/views/team-detail/constants';
import css from './index.module.css';

type OwnedServicesListProps = {
	services: ServiceType[];
};

export const OwnedServicesList: FC<OwnedServicesListProps> = ({ services }) => {
	return (
		<section className={css.root}>
			<h2 className={css.title}>{TEAM_DETAIL_LABELS.servicesTitle}</h2>

			{services.length === 0 ? (
				<p className={css.empty}>{TEAM_DETAIL_LABELS.servicesEmpty}</p>
			) : (
				<ul className={css.list}>
					{services.map((service) => (
						<li key={service.id} className={css.item}>
							<Link
								className={css.link}
								href={`${pageConfig.catalog}/${service.id}`}
							>
								<span className={css.name}>{service.name}</span>
								{service.description && (
									<span className={css.description}>{service.description}</span>
								)}
							</Link>
							<Badge
								variant='light'
								color='gray'
								radius='sm'
								size='xs'
								className={css.health}
							>
								{service.health}
							</Badge>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};
