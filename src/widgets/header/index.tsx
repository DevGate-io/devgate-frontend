'use client';

import { Button, useMantineColorScheme } from '@mantine/core';
import css from './index.module.css';

export const Header = () => {
	const { toggleColorScheme } = useMantineColorScheme();

	return (
		<header className={css.root}>
			<Button color='primary.1' onClick={toggleColorScheme}>
				Сменить тему
			</Button>
		</header>
	);
};
