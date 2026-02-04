import type { FC, PropsWithChildren } from 'react';
import { Header } from '@/widgets/header';

const UnauthorizedLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<main className='main'>
			<Header />
			{children}
		</main>
	);
};

export default UnauthorizedLayout;
