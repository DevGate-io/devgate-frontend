'use client';

import { Button } from '@mantine/core';
import { useLogout } from '@/widgets/header/hooks/use-logout';
import { PROFILE_LABELS } from '@/views/profile/constants';

export const LogoutButton = () => {
	const { handleLogout, isPending } = useLogout();

	return (
		<Button
			color='red'
			variant='light'
			onClick={handleLogout}
			loading={isPending}
		>
			{PROFILE_LABELS.logoutButton}
		</Button>
	);
};
