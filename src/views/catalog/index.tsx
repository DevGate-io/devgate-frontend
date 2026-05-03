import type { FC } from 'react';
import type { ServiceType } from '@/entities/service';
import { EmptyState } from '@/shared/ui/empty-state';
import { PageHeader } from '@/shared/ui/page-header';
import { CATALOG_LABELS } from '@/views/catalog/constants';
import { CatalogToolbar } from '@/views/catalog/ui/catalog-toolbar';
import { CreateServiceButton } from '@/views/catalog/ui/create-service-button';
import { ServiceCard } from '@/views/catalog/ui/service-card';
import css from './index.module.css';

type CatalogViewProps = {
	services: ServiceType[];
	availableTags: string[];
};

export const CatalogView: FC<CatalogViewProps> = ({
	services,
	availableTags,
}) => {
	return (
		<div className={css.root}>
			<PageHeader
				title={CATALOG_LABELS.title}
				description={CATALOG_LABELS.description}
				actions={<CreateServiceButton />}
			/>

			<CatalogToolbar availableTags={availableTags} />

			{services.length === 0 ? (
				<EmptyState
					title={CATALOG_LABELS.emptyTitle}
					description={CATALOG_LABELS.emptyDescription}
				/>
			) : (
				<ul className={css.grid}>
					{services.map((service) => (
						<li key={service.id}>
							<ServiceCard service={service} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
