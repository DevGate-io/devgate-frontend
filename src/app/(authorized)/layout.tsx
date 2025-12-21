import type { FC, PropsWithChildren } from 'react';
import { Header } from '@/widgets/header';

const AuthorizedLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<main>
			<Header />
			{children}
		</main>
	);
};

export default AuthorizedLayout;
