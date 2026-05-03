import { Badge } from '@mantine/core';
import type { FC } from 'react';
import type { User } from '@/entities/user';
import { getUserInitials } from '@/shared/lib/get-user-initials';
import { PROFILE_LABELS, ROLE_LABEL } from '@/views/profile/constants';
import { LogoutButton } from '@/views/profile/ui/logout-button';
import css from './index.module.css';

const FORMATTER = new Intl.DateTimeFormat('ru-RU', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
});

const formatLastLogin = (iso: string | undefined): string => {
	if (!iso) return PROFILE_LABELS.neverLoggedIn;
	return FORMATTER.format(new Date(iso));
};

type ProfileHeaderProps = {
	user: User;
};

export const ProfileHeader: FC<ProfileHeaderProps> = ({ user }) => {
	return (
		<header className={css.root}>
			<div className={css.identity}>
				<span className={css.avatar} aria-hidden='true'>
					{getUserInitials(user)}
				</span>
				<div className={css.text}>
					<h1 className={css.name}>{user.fullName}</h1>
					<dl className={css.meta}>
						<div className={css.metaItem}>
							<dt className={css.metaLabel}>{PROFILE_LABELS.emailLabel}</dt>
							<dd className={css.metaValue}>{user.email}</dd>
						</div>
						<div className={css.metaItem}>
							<dt className={css.metaLabel}>{PROFILE_LABELS.roleLabel}</dt>
							<dd className={css.metaValue}>
								<Badge variant='light' color='lavender' radius='sm' size='sm'>
									{ROLE_LABEL[user.role]}
								</Badge>
							</dd>
						</div>
						<div className={css.metaItem}>
							<dt className={css.metaLabel}>{PROFILE_LABELS.lastLoginLabel}</dt>
							<dd className={css.metaValue}>
								{user.lastLogin ? (
									<time dateTime={user.lastLogin}>
										{formatLastLogin(user.lastLogin)}
									</time>
								) : (
									<span className={css.muted}>
										{PROFILE_LABELS.neverLoggedIn}
									</span>
								)}
							</dd>
						</div>
					</dl>
				</div>
			</div>

			<div className={css.actions}>
				<LogoutButton />
			</div>
		</header>
	);
};
