'use client';

import { useSidebarStore } from '@/shared/stores/use-sidebar-store';
import { SIDEBAR_LABELS } from '@/widgets/sidebar/constants';
import css from './index.module.css';

export const Brand = () => {
	const isCollapsed = useSidebarStore((state) => state.isCollapsed);
	const label = isCollapsed
		? SIDEBAR_LABELS.brand.charAt(0)
		: SIDEBAR_LABELS.brand;

	return (
		<header className={css.root} data-collapsed={isCollapsed || undefined}>
			<span className={css.name}>{label}</span>
		</header>
	);
};
