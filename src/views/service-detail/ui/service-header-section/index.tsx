import { Badge, Button } from '@mantine/core';
import type { FC } from 'react';
import type { ServiceType } from '@/entities/service';
import { SERVICE_HEALTH_LABEL } from '@/views/catalog/constants';
import { getHealthColor } from '@/views/catalog/lib/get-health-color';
import { SERVICE_DETAIL_LABELS } from '@/views/service-detail/constants';
import css from './index.module.css';

type ServiceHeaderSectionProps = {
	service: ServiceType;
};

export const ServiceHeaderSection: FC<ServiceHeaderSectionProps> = ({
	service,
}) => {
	return (
		<header className={css.root}>
			<div className={css.title}>
				<span
					className={css.dot}
					style={{ backgroundColor: getHealthColor(service.health) }}
					aria-hidden='true'
				/>
				<div className={css.text}>
					<h1 className={css.name}>{service.name}</h1>
					{service.description && (
						<p className={css.description}>{service.description}</p>
					)}
				</div>
			</div>

			<div className={css.actions}>
				<Badge variant='light' color='gray' radius='sm'>
					{SERVICE_HEALTH_LABEL[service.health]}
				</Badge>
				{service.repoUrl && (
					<Button
						component='a'
						href={service.repoUrl}
						target='_blank'
						rel='noopener noreferrer'
						variant='light'
						color='lavender'
						size='sm'
					>
						{SERVICE_DETAIL_LABELS.openRepo}
					</Button>
				)}
			</div>
		</header>
	);
};
