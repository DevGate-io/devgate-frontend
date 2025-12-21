import { type NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/'];

const publicRoutes = ['/auth'];

export const proxy = (request: NextRequest) => {
	// TODO: заменить на http only cookie
	const isAuthorized = false;
	const path = request.nextUrl.pathname;

	if (protectedRoutes.includes(path) && !isAuthorized) {
		return NextResponse.redirect(new URL('/auth', request.nextUrl));
	}

	return NextResponse.next();
};
