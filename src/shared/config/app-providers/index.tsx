'use client';

import { type MantineColorScheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { type FC, type PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppTheme } from '@/shared/config/theme';

type AppProvidersProps = PropsWithChildren<{
	defaultColorScheme?: MantineColorScheme;
}>;

export const AppProviders: FC<AppProvidersProps> = ({
	children,
	defaultColorScheme = 'light',
}) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						retry: false,
					},
				},
			}),
	);

	return (
		<MantineProvider theme={AppTheme} defaultColorScheme={defaultColorScheme}>
			<Notifications />
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</MantineProvider>
	);
};
