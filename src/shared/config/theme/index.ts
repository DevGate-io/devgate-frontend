import { createTheme } from '@mantine/core';
import colors from '@/shared/config/theme/colors';
import { components } from '@/shared/config/theme/components';
import { fontSizes, headings } from '@/shared/config/theme/fonts';
import radius from '@/shared/config/theme/radius';

export const AppTheme = createTheme({
	colors,
	primaryColor: 'lavender',
	primaryShade: { light: 5, dark: 4 },
	fontSizes,
	headings,
	components,
	radius,
	defaultRadius: 'lg',
	shadows: {
		xs: '0 1px 2px rgba(15, 16, 18, 0.04)',
		sm: '0 2px 6px rgba(15, 16, 18, 0.05), 0 1px 2px rgba(15, 16, 18, 0.04)',
		md: '0 6px 16px rgba(15, 16, 18, 0.06), 0 2px 4px rgba(15, 16, 18, 0.04)',
		lg: '0 12px 32px rgba(15, 16, 18, 0.08), 0 4px 8px rgba(15, 16, 18, 0.04)',
		xl: '0 24px 64px rgba(15, 16, 18, 0.12), 0 8px 16px rgba(15, 16, 18, 0.06)',
	},
	other: {
		appShell: {
			navbarWidth: 248,
			asideWidth: 320,
			headerHeight: 60,
		},
	},
});
