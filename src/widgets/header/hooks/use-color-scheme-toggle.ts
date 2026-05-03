'use client';

import { useMantineColorScheme } from '@mantine/core';
import { useTransition } from 'react';
import { setColorScheme } from '@/shared/lib/color-scheme';

export const useColorSchemeToggle = () => {
	const { colorScheme, setColorScheme: setMantineScheme } =
		useMantineColorScheme();
	const [, startTransition] = useTransition();

	const isDark = colorScheme === 'dark';

	const handleToggle = () => {
		const next = isDark ? 'light' : 'dark';
		setMantineScheme(next);
		startTransition(() => {
			void setColorScheme(next);
		});
	};

	return { isDark, handleToggle };
};
