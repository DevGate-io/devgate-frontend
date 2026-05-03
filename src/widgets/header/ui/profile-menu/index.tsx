'use client';

import { Avatar, Menu } from '@mantine/core';
import Link from 'next/link';
import { pageConfig } from '@/shared/config/page.config';
import { HEADER_LABELS, PROFILE_INITIALS } from '@/widgets/header/constants';
import { useLogout } from '@/widgets/header/hooks/use-logout';
import css from './index.module.css';

export const ProfileMenu = () => {
	const { handleLogout } = useLogout();

	return (
		<Menu position='bottom-end' shadow='md' width={200}>
			<Menu.Target>
				<button
					type='button'
					className={css.trigger}
					aria-label={HEADER_LABELS.profileAriaLabel}
				>
					<Avatar size={28} radius='xl' color='lavender'>
						{PROFILE_INITIALS}
					</Avatar>
				</button>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>{HEADER_LABELS.menuTitle}</Menu.Label>
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
