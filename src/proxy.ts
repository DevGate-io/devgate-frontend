import { type NextRequest, NextResponse } from 'next/server';
import { pageConfig } from '@/shared/config/page.config';
import { ACCESS_TOKEN_KEY } from '@/shared/constants';

const protectedPrefixes = [
	pageConfig.base,
	pageConfig.catalog,
	pageConfig.templates,
	pageConfig.teams,
	pageConfig.admin,
	pageConfig.profile,
];

const isProtected = (path: string) =>
	protectedPrefixes.some((prefix) =>
		prefix === pageConfig.base
			? path === pageConfig.base
			: path === prefix || path.startsWith(`${prefix}/`),
	);

export const proxy = (request: NextRequest) => {
	const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
	const isAuthorized = !!accessToken;
	const path = request.nextUrl.pathname;
	const isAuthPath = path === pageConfig.auth;

	if (isAuthorized && isAuthPath) {
		return NextResponse.redirect(new URL(pageConfig.base, request.nextUrl));
	}

	if (isProtected(path) && !isAuthorized) {
		return NextResponse.redirect(new URL(pageConfig.auth, request.nextUrl));
	}

	return NextResponse.next();
};

export const config = {
	matcher: [
		'/',
		'/auth',
		'/catalog/:path*',
		'/templates/:path*',
		'/teams/:path*',
		'/admin/:path*',
		'/profile/:path*',
	],
};
