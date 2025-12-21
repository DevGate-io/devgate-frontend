import type { FC, PropsWithChildren } from 'react';

const UnauthorizedLayout: FC<PropsWithChildren> = ({ children }) => {
	return <main>{children}</main>;
};

export default UnauthorizedLayout;
