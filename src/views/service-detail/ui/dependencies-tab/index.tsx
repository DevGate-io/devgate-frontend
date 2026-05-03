import type { FC } from 'react';
import type { ServiceGraphType } from '@/views/service-detail/lib/compute-service-graph';
import { DependencyGraphCanvas } from '@/views/service-detail/ui/dependency-graph';

type DependenciesTabProps = {
	graph: ServiceGraphType;
};

export const DependenciesTab: FC<DependenciesTabProps> = ({ graph }) => (
	<DependencyGraphCanvas graph={graph} />
);
