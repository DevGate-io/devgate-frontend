'use client';

import { PasswordInput as MantinePasswordInput } from '@mantine/core';
import css from '../text-input/index.module.css';

export const PasswordInput = MantinePasswordInput.extend({
	classNames: css,
});
