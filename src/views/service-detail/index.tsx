'use client';

import { Tabs } from '@mantine/core';
import { type FC, useEffect } from 'react';
import type { AuditEventType } from '@/entities/audit-event';
import type { ServiceType } from '@/entities/service';
import { useRecentlyViewedStore } from '@/shared/stores/use-recently-viewed-store';
import {
	SERVICE_DETAIL_LABELS,
	SERVICE_DETAIL_TABS,
} from '@/views/service-detail/constants';
import { DependenciesTab } from '@/views/service-detail/ui/dependencies-tab';
import { EmptyTab } from '@/views/service-detail/ui/empty-tab';
import { OverviewTab } from '@/views/service-detail/ui/overview-tab';
import { ServiceHeaderSection } from '@/views/service-detail/ui/service-header-section';
import css from './index.module.css';

type ServiceDetailViewProps = {
	service: ServiceType;
	dependencies: ServiceType[];
	events: AuditEventType[];
	usersById: Record<string, string>;
};

export const ServiceDetailView: FC<ServiceDetailViewProps> = ({
	service,
	dependencies,
	events,
	usersById,
}) => {
	useEffect(() => {
		useRecentlyViewedStore.getState().markViewed(service.id, service.name);
	}, [service.id, service.name]);

	return (
		<div className={css.root}>
			<ServiceHeaderSection service={service} />

			<Tabs
				defaultValue={SERVICE_DETAIL_TABS.overview}
				className={css.tabs}
				keepMounted={false}
			>
				<Tabs.List>
					<Tabs.Tab value={SERVICE_DETAIL_TABS.overview}>
						{SERVICE_DETAIL_LABELS.tabOverview}
					</Tabs.Tab>
					<Tabs.Tab value={SERVICE_DETAIL_TABS.pipeline}>
						{SERVICE_DETAIL_LABELS.tabPipeline}
					</Tabs.Tab>
					<Tabs.Tab value={SERVICE_DETAIL_TABS.docs}>
						{SERVICE_DETAIL_LABELS.tabDocs}
					</Tabs.Tab>
					<Tabs.Tab value={SERVICE_DETAIL_TABS.dependencies}>
						{SERVICE_DETAIL_LABELS.tabDependencies}
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value={SERVICE_DETAIL_TABS.overview} pt='md'>
					<OverviewTab
						service={service}
						events={events}
						usersById={usersById}
					/>
				</Tabs.Panel>

				<Tabs.Panel value={SERVICE_DETAIL_TABS.pipeline} pt='md'>
					<EmptyTab
						title={SERVICE_DETAIL_LABELS.pipelineTitle}
						description={SERVICE_DETAIL_LABELS.pipelineEmpty}
						href={service.pipelineUrl}
						linkLabel={SERVICE_DETAIL_LABELS.openPipeline}
					/>
				</Tabs.Panel>

				<Tabs.Panel value={SERVICE_DETAIL_TABS.docs} pt='md'>
					<EmptyTab
						title={SERVICE_DETAIL_LABELS.docsTitle}
						description={SERVICE_DETAIL_LABELS.docsEmpty}
						href={service.docsUrl}
						linkLabel={SERVICE_DETAIL_LABELS.openDocs}
					/>
				</Tabs.Panel>

				<Tabs.Panel value={SERVICE_DETAIL_TABS.dependencies} pt='md'>
					<DependenciesTab dependencies={dependencies} />
				</Tabs.Panel>
			</Tabs>
		</div>
	);
};
