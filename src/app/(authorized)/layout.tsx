'use client';

import { AppShell } from '@mantine/core';
import type { FC, PropsWithChildren } from 'react';
import { useSidebarStore } from '@/shared/stores/use-sidebar-store';
import { ActivityPanel } from '@/widgets/activity-panel';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';
import css from './layout.module.css';

const NAVBAR_WIDTH_EXPANDED = 248;
const NAVBAR_WIDTH_COLLAPSED = 72;

const AuthorizedLayout: FC<PropsWithChildren> = ({ children }) => {
	const isCollapsed = useSidebarStore((state) => state.isCollapsed);
	const mobileOpened = useSidebarStore((state) => state.mobileOpened);
	const navbarWidth = isCollapsed
		? NAVBAR_WIDTH_COLLAPSED
		: NAVBAR_WIDTH_EXPANDED;

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: navbarWidth,
				breakpoint: 'sm',
				collapsed: { mobile: !mobileOpened },
			}}
			aside={{
				width: 320,
				breakpoint: 'lg',
				collapsed: { mobile: true },
			}}
			padding={24}
			classNames={{
				root: css.shell,
				header: css.header,
				navbar: css.navbar,
				aside: css.aside,
			}}
		>
			<AppShell.Header>
				<Header />
			</AppShell.Header>
			<AppShell.Navbar data-collapsed={isCollapsed || undefined}>
				<Sidebar />
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>

			{/*TODO: поправить панель с уведомлениями*/}
			{/*<AppShell.Aside>*/}
			{/*	<ActivityPanel />*/}
			{/*</AppShell.Aside>*/}
		</AppShell>
	);
};

export default AuthorizedLayout;
