'use client';

import { useTransition } from 'react';
import { AuthService } from '@/shared/api/auth';
import { logout } from '@/shared/api/auth/actions';

export const useLogout = () => {
	const [isPending, startTransition] = useTransition();

	const handleLogout = () => {
		startTransition(async () => {
			try {
				await AuthService.logout();
			} catch (error) {
				console.error(error);
			}

			await logout();
		});
	};

	return { isPending, handleLogout };
};
