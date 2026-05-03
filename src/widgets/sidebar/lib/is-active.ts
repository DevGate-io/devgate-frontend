import { pageConfig } from '@/shared/config/page.config';

export const isActiveHref = (pathname: string, href: string): boolean => {
	if (href === pageConfig.base) {
		return pathname === pageConfig.base;
	}

	return pathname === href || pathname.startsWith(`${href}/`);
};
