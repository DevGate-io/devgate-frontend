import { createTheme } from '@mantine/core';
import { InterFont } from '@/shared/config/fonts';
import colors from '@/shared/config/theme/colors';
import { fontSizes, headings } from '@/shared/config/theme/fonts';

export const AppTheme = createTheme({
	colors,
	primaryColor: 'primary',
	fontSizes,
	fontFamily: InterFont.style.fontFamily,
	headings,
});
