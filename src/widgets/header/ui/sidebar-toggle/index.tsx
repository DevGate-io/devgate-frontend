'use client';

import { useMediaQuery } from '@mantine/hooks';
import { MEDIA_QUERIES } from '@/shared/config/media-queries';
import { useSidebarStore } from '@/shared/stores/use-sidebar-store';
import { HEADER_LABELS } from '@/widgets/header/constants';
import { SidebarToggleIcon } from '@/widgets/header/icons/sidebar-toggle-icon';
import { IconButton } from '@/widgets/header/ui/icon-button';

export const SidebarToggle = () => {
	const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

	const isCollapsed = useSidebarStore((state) => state.isCollapsed);
	const mobileOpened = useSidebarStore((state) => state.mobileOpened);
	const toggle = useSidebarStore((state) => state.toggle);
	const toggleMobile = useSidebarStore((state) => state.toggleMobile);

	if (isMobile) {
		const ariaLabel = mobileOpened
			? HEADER_LABELS.sidebarClose
			: HEADER_LABELS.sidebarOpen;

		return (
			<IconButton ariaLabel={ariaLabel} onClick={toggleMobile}>
				<SidebarToggleIcon collapsed={mobileOpened} />
			</IconButton>
		);
	}

	const ariaLabel = isCollapsed
		? HEADER_LABELS.sidebarExpand
		: HEADER_LABELS.sidebarCollapse;

	return (
		<IconButton ariaLabel={ariaLabel} onClick={toggle}>
			<SidebarToggleIcon collapsed={isCollapsed} />
		</IconButton>
	);
};
