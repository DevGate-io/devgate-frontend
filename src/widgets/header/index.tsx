'use client';

import { useMantineColorScheme } from '@mantine/core';
import Logo from '@/public/images/icons/full-logo-dark.svg';
import css from './index.module.css';

export const Header = () => {
	const { toggleColorScheme } = useMantineColorScheme();

	return (
		<header className={css.root}>
			<Logo className={css.logo} />
		</header>
	);
};
