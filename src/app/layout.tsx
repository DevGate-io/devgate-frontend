import {MantineProvider} from '@mantine/core';
import clsx from 'clsx';
import type {PropsWithChildren} from 'react';
import {geistMono, geistSans} from '@/config/fonts';

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
	return (
		<html lang='ru'>
			<body className={clsx(geistSans.variable, geistMono.variable)}>
				<MantineProvider>{children}</MantineProvider>
			</body>
		</html>
	);
}
