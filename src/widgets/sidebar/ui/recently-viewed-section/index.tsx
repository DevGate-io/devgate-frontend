'use client';

import Link from 'next/link';
import { pageConfig } from '@/shared/config/page.config';
import { useHydrated } from '@/shared/hooks/use-hydrated';
import { useRecentlyViewedStore } from '@/shared/stores/use-recently-viewed-store';
import { useSidebarStore } from '@/shared/stores/use-sidebar-store';
import { SIDEBAR_LABELS } from '@/widgets/sidebar/constants';
import css from './index.module.css';

export const RecentlyViewedSection = () => {
	const hydrated = useHydrated();
	const viewed = useRecentlyViewedStore((state) => state.viewed);
	const isCollapsed = useSidebarStore((state) => state.isCollapsed);

	if (!hydrated || viewed.length === 0 || isCollapsed) {
		return null;
	}

	return (
		<section className={css.root} aria-label={SIDEBAR_LABELS.recent}>
			<h2 className={css.title}>{SIDEBAR_LABELS.recent}</h2>
			<ul className={css.list}>
				{viewed.map((entry) => (
					<li key={entry.id}>
						<Link
							className={css.item}
							href={`${pageConfig.catalog}/${entry.id}`}
						>
							<span className={css.dot} aria-hidden='true' />
							{entry.name}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};
