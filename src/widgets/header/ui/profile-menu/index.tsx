'use client';

import { Avatar, Menu } from '@mantine/core';
import Link from 'next/link';
import { useCurrentUser } from '@/shared/config/app-providers/auth-provider';
import { pageConfig } from '@/shared/config/page.config';
import { getUserInitials } from '@/shared/lib/get-user-initials';
import { HEADER_LABELS } from '@/widgets/header/constants';
import { useLogout } from '@/widgets/header/hooks/use-logout';
import css from './index.module.css';

export const ProfileMenu = () => {
	const { handleLogout } = useLogout();
	const { user } = useCurrentUser();

	const initials = getUserInitials(user);
	const menuTitle = user?.fullName ?? HEADER_LABELS.menuTitle;

	return (
		<Menu position='bottom-end' shadow='md' width={200}>
			<Menu.Target>
				<button
					type='button'
					className={css.trigger}
					aria-label={HEADER_LABELS.profileAriaLabel}
				>
					<Avatar size={28} radius='xl' color='lavender'>
						{initials}
					</Avatar>
				</button>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>{menuTitle}</Menu.Label>
				<Menu.Item component={Link} href={pageConfig.profile}>
					{HEADER_LABELS.menuProfile}
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item color='red' onClick={handleLogout}>
					{HEADER_LABELS.menuLogout}
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};
