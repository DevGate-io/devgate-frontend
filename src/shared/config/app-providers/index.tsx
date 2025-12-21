'use client';

import { MantineProvider } from '@mantine/core';
import type { FC, PropsWithChildren } from 'react';
import { AppTheme } from '@/shared/config/theme';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
	return <MantineProvider theme={AppTheme}>{children}</MantineProvider>;
};
