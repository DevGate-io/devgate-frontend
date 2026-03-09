import {type NextRequest, NextResponse} from 'next/server';
import {pageConfig} from '@/shared/config/page.config';

const protectedRoutes: string[] = [pageConfig.base];
const JWT_ACCESS_TOKEN_KEY = 'jwtToken';

const publicRoutes = ['/auth'];

export const proxy = (request: NextRequest) => {
	const accessToken = request.cookies.get(JWT_ACCESS_TOKEN_KEY)?.value;
	const isAuthorized = !!accessToken;
	const path = request.nextUrl.pathname;
	const isAuth = path === pageConfig.auth;

	console.log(`PROXY: ${request.cookies}`);

	if (isAuthorized && isAuth) {
		return NextResponse.redirect(new URL(pageConfig.base, request.nextUrl));
	}

	if (protectedRoutes.includes(path) && !isAuthorized) {
		return NextResponse.redirect(new URL(pageConfig.auth, request.nextUrl));
	}

	return NextResponse.next();
};

export const config = {
	matcher: ['/', '/auth'],
};
