import type { MantineThemeOverride } from '@mantine/core';

export const fontSizes: MantineThemeOverride['fontSizes'] = {
	xs: 'var(--text-xs)',
	xl: 'var(--text-l)',
};

export const headings: MantineThemeOverride['headings'] = {
	sizes: {
		h1: {
			fontWeight: '500',
			lineHeight: 'var(--h1-lh)',
			fontSize: 'var(--h1)',
		},
		h2: {
			fontWeight: '500',
			lineHeight: 'var(--h2-lh)',
			fontSize: 'var(--h2)',
		},
		h3: {
			fontWeight: '500',
			lineHeight: 'var(--h3-lh)',
			fontSize: 'var(--h3)',
		},
		h4: {
			fontWeight: '500',
			lineHeight: 'var(--h4-lh)',
			fontSize: 'var(--h4)',
		},
		h5: {
			fontWeight: '500',
			lineHeight: 'var(--h5-lh)',
			fontSize: 'var(--h5)',
		},
		h6: {
			fontWeight: '500',
			lineHeight: 'var(--h6-lh)',
			fontSize: 'var(--h6)',
		},
	},
};
