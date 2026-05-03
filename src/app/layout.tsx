import type { PropsWithChildren } from 'react';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/shared/styles/global.css';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import type { Metadata } from 'next';
import { AppProviders } from '@/shared/config/app-providers';
import { Favicons } from '@/shared/config/favicons';
import { InterFont } from '@/shared/config/fonts';
import { readColorScheme } from '@/shared/lib/color-scheme';

export const metadata: Metadata = {
	title: 'DevGate',
};

const RootLayout = async ({ children }: Readonly<PropsWithChildren>) => {
	const colorScheme = await readColorScheme();

	return (
		<html
			lang='ru'
			{...mantineHtmlProps}
			data-mantine-color-scheme={colorScheme}
		>
			<head>
				<Favicons />
				<ColorSchemeScript defaultColorScheme={colorScheme} />
			</head>

			<body className={InterFont.className}>
				<AppProviders defaultColorScheme={colorScheme}>{children}</AppProviders>
			</body>
		</html>
	);
};

export default RootLayout;
