'use client';

import { useEffect } from 'react';
import { ErrorView } from '@/views/error';

type AuthorizedErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

const AuthorizedError = ({ error, reset }: AuthorizedErrorProps) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return <ErrorView status={500} digest={error.digest} onRetry={reset} />;
};

export default AuthorizedError;
