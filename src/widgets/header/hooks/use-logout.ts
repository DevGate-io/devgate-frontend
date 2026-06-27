'use client';

import { useTransition } from 'react';
import { logout } from '@/shared/api/auth/actions';

export const useLogout = () => {
	const [isPending, startTransition] = useTransition();

	const handleLogout = () => {
		startTransition(async () => {
			await logout();
		});
	};

	return { isPending, handleLogout };
};
