import type { FC } from 'react';
import type { ServiceType } from '@/entities/service';
import type { DependencyGraphType } from '@/views/service-detail/lib/compute-dependency-graph';
import { DependencyGraph } from '@/views/service-detail/ui/dependency-graph';

type DependenciesTabProps = {
	service: ServiceType;
	graph: DependencyGraphType;
};

export const DependenciesTab: FC<DependenciesTabProps> = ({
	service,
	graph,
}) => <DependencyGraph service={service} graph={graph} />;
