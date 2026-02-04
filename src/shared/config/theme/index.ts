import { createTheme } from '@mantine/core';
import colors from '@/shared/config/theme/colors';
import { components } from '@/shared/config/theme/components';
import { fontSizes, headings } from '@/shared/config/theme/fonts';
import radius from '@/shared/config/theme/radius';

export const AppTheme = createTheme({
	colors,
	primaryColor: 'primary',
	fontSizes,
	headings,
	components,
	radius,
});
