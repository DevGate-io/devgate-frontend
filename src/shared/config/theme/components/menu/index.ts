'use client';

import { Menu as MantineMenu } from '@mantine/core';
import css from './index.module.css';

const Menu = MantineMenu.extend({
	classNames: css,
});

export default Menu;
