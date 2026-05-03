'use client';

import { useSidebarStore } from '@/shared/stores/use-sidebar-store';
import { HEADER_LABELS } from '@/widgets/header/constants';
import { SidebarToggleIcon } from '@/widgets/header/icons/sidebar-toggle-icon';
import { IconButton } from '@/widgets/header/ui/icon-button';

export const SidebarToggle = () => {
	const isCollapsed = useSidebarStore((state) => state.isCollapsed);
	const toggle = useSidebarStore((state) => state.toggle);

	const ariaLabel = isCollapsed
		? HEADER_LABELS.sidebarExpand
		: HEADER_LABELS.sidebarCollapse;

	return (
		<IconButton ariaLabel={ariaLabel} onClick={toggle}>
			<SidebarToggleIcon collapsed={isCollapsed} />
		</IconButton>
	);
};
