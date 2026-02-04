'use client';

import { TextInput as MantineTextInput } from '@mantine/core';
import css from './index.module.css';

const TextInput = MantineTextInput.extend({
	classNames: css,
});

export default TextInput;
