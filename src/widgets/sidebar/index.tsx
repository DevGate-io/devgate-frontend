'use client';

import { useSidebarStore } from '@/shared/stores/use-sidebar-store';
import { SIDEBAR_LABELS, SIDEBAR_SECTIONS } from '@/widgets/sidebar/constants';
import { Brand } from '@/widgets/sidebar/ui/brand';
import { NavItem } from '@/widgets/sidebar/ui/nav-item';
import { RecentlyViewedSection } from '@/widgets/sidebar/ui/recently-viewed-section';
import css from './index.module.css';

export const Sidebar = () => {
	const isCollapsed = useSidebarStore((state) => state.isCollapsed);

	return (
		<nav
			className={css.root}
			aria-label={SIDEBAR_LABELS.root}
			data-collapsed={isCollapsed || undefined}
		>
			<Brand />

			{SIDEBAR_SECTIONS.map((section) => (
				<section
					key={section.id}
					className={css.section}
					aria-label={section.label}
				>
					<h2 className={css.title}>{section.label}</h2>
					<ul className={css.list}>
						{section.items.map((item) => (
							<li key={item.id}>
								<NavItem href={item.href} label={item.label} />
							</li>
						))}
					</ul>
				</section>
			))}

			<RecentlyViewedSection />
		</nav>
	);
};
