'use client';

import { AppShell } from '@mantine/core';
import type { FC, PropsWithChildren } from 'react';
import { ActivityPanel } from '@/widgets/activity-panel';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';
import css from './layout.module.css';

const AuthorizedLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 248, breakpoint: 'sm' }}
			aside={{ width: 320, breakpoint: 'lg' }}
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

			<AppShell.Navbar>
				<Sidebar />
			</AppShell.Navbar>

			<AppShell.Main>{children}</AppShell.Main>

			<AppShell.Aside>
				<ActivityPanel />
			</AppShell.Aside>
		</AppShell>
	);
};

export default AuthorizedLayout;
