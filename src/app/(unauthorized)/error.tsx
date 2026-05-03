'use client';

import { useEffect } from 'react';
import { ErrorView } from '@/views/error';

type UnauthorizedErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

const UnauthorizedError = ({ error, reset }: UnauthorizedErrorProps) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return <ErrorView status={500} digest={error.digest} onRetry={reset} />;
};

export default UnauthorizedError;
