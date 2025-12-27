import { createTheme } from '@mantine/core';
import colors from '@/shared/config/theme/colors';
import { fontSizes, headings } from '@/shared/config/theme/fonts';

export const AppTheme = createTheme({
	colors,
	primaryColor: 'primary',
	fontSizes,
	headings,
});
