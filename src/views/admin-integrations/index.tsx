import type { FC } from 'react';
import type { IntegrationType } from '@/entities/integration';
import { EmptyState } from '@/shared/ui/empty-state';
import { PageHeader } from '@/shared/ui/page-header';
import { ADMIN_INTEGRATIONS_LABELS } from '@/views/admin-integrations/constants';
import { IntegrationCard } from '@/views/admin-integrations/ui/integration-card';
import css from './index.module.css';

type AdminIntegrationsViewProps = {
	integrations: IntegrationType[];
};

export const AdminIntegrationsView: FC<AdminIntegrationsViewProps> = ({
	integrations,
}) => {
	return (
		<div className={css.root}>
			<PageHeader
				title={ADMIN_INTEGRATIONS_LABELS.title}
				description={ADMIN_INTEGRATIONS_LABELS.description}
			/>

			{integrations.length === 0 ? (
				<EmptyState
					title={ADMIN_INTEGRATIONS_LABELS.emptyTitle}
					description={ADMIN_INTEGRATIONS_LABELS.emptyDescription}
				/>
			) : (
				<ul className={css.grid}>
					{integrations.map((integration) => (
						<li key={integration.id}>
							<IntegrationCard integration={integration} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
