'use client';

import { HEADER_LABELS } from '@/widgets/header/constants';
import { useColorSchemeToggle } from '@/widgets/header/hooks/use-color-scheme-toggle';
import { BellIcon } from '@/widgets/header/icons/bell-icon';
import { MoonIcon } from '@/widgets/header/icons/moon-icon';
import { SettingsIcon } from '@/widgets/header/icons/settings-icon';
import { SunIcon } from '@/widgets/header/icons/sun-icon';
import { IconButton } from '@/widgets/header/ui/icon-button';
import { ProfileMenu } from '@/widgets/header/ui/profile-menu';
import css from './index.module.css';

export const HeaderActions = () => {
	const { isDark, handleToggle } = useColorSchemeToggle();

	return (
		<nav className={css.root} aria-label='Действия пользователя'>
			<IconButton
				ariaLabel={isDark ? HEADER_LABELS.themeLight : HEADER_LABELS.themeDark}
				onClick={handleToggle}
			>
				{isDark ? <SunIcon /> : <MoonIcon />}
			</IconButton>

			<IconButton ariaLabel={HEADER_LABELS.notificationsAriaLabel}>
				<BellIcon />
			</IconButton>

			<IconButton ariaLabel={HEADER_LABELS.settingsAriaLabel}>
				<SettingsIcon />
			</IconButton>

			<ProfileMenu />
		</nav>
	);
};
