import type { PropsWithChildren } from 'react';

import { InterFont } from '@/shared/config/fonts';

import '@mantine/core/styles.css';
import '@/shared/styles/global.css';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import type { Metadata } from 'next';
import { AppProviders } from '@/shared/config/app-providers';
import { Favicons } from '@/shared/config/favicons';

export const metadata: Metadata = {
	title: 'DevGate',
};

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
	return (
		<html lang='ru' {...mantineHtmlProps}>
			<head>
				<Favicons />
				<ColorSchemeScript defaultColorScheme='light' />
			</head>

			<body className={InterFont.className}>
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
};

export default RootLayout;
