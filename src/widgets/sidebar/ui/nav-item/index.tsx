'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import { iconForHref, SidebarIcon } from '@/widgets/sidebar/icon';
import { isActiveHref } from '@/widgets/sidebar/lib/is-active';
import css from './index.module.css';

type NavItemProps = {
	href: string;
	label: string;
};

export const NavItem: FC<NavItemProps> = ({ href, label }) => {
	const pathname = usePathname();
	const isActive = isActiveHref(pathname, href);

	return (
		<Link
			href={href}
			className={clsx(css.root, isActive && css.active)}
			aria-current={isActive ? 'page' : undefined}
		>
			<span className={css.icon}>
				<SidebarIcon name={iconForHref(href)} />
			</span>
			{label}
		</Link>
	);
};
