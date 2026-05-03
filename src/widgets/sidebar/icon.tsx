import type { FC, SVGProps } from 'react';

const baseProps: SVGProps<SVGSVGElement> = {
	width: 18,
	height: 18,
	viewBox: '0 0 24 24',
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth: 1.2,
	strokeLinecap: 'round',
	strokeLinejoin: 'round',
};

export const SidebarIcon: FC<{ name: string }> = ({ name }) => {
	switch (name) {
		case 'overview':
			return (
				<svg {...baseProps} aria-hidden='true'>
					<title>Обзор</title>
					<rect x='3' y='3' width='8' height='8' rx='1.5' />
					<rect x='13' y='3' width='8' height='5' rx='1.5' />
					<rect x='13' y='10' width='8' height='11' rx='1.5' />
					<rect x='3' y='13' width='8' height='8' rx='1.5' />
				</svg>
			);
		case 'catalog':
			return (
				<svg {...baseProps} aria-hidden='true'>
					<title>Каталог</title>
					<path d='M4 5h12M4 9h16M4 13h12M4 17h16' />
				</svg>
			);
		case 'templates':
			return (
				<svg {...baseProps} aria-hidden='true'>
					<title>Шаблоны</title>
					<rect x='4' y='4' width='16' height='4' rx='1.5' />
					<rect x='4' y='10' width='7' height='10' rx='1.5' />
					<rect x='13' y='10' width='7' height='10' rx='1.5' />
				</svg>
			);
		case 'teams':
			return (
				<svg {...baseProps} aria-hidden='true'>
					<title>Команды</title>
					<circle cx='9' cy='8' r='3.2' />
					<circle cx='17' cy='10' r='2.4' />
					<path d='M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5' />
					<path d='M14.5 16.5c.7-1 2-1.5 2.5-1.5 2.5 0 4 1.6 4 3.5' />
				</svg>
			);
		case 'admin':
			return (
				<svg {...baseProps} aria-hidden='true'>
					<title>Администрирование</title>
					<path d='M12 3l8 3v5c0 4.5-3 8.5-8 10-5-1.5-8-5.5-8-10V6l8-3z' />
					<path d='M9 12.5l2 2 4-4' />
				</svg>
			);
		case 'profile':
			return (
				<svg {...baseProps} aria-hidden='true'>
					<title>Профиль</title>
					<circle cx='12' cy='8' r='3.5' />
					<path d='M4 20c0-4 3.5-7 8-7s8 3 8 7' />
				</svg>
			);
		default:
			return null;
	}
};

export const iconForHref = (href: string): string => {
	if (href === '/') return 'overview';
	if (href.startsWith('/catalog')) return 'catalog';
	if (href.startsWith('/templates')) return 'templates';
	if (href.startsWith('/teams')) return 'teams';
	if (href.startsWith('/admin')) return 'admin';
	if (href.startsWith('/profile')) return 'profile';
	return 'overview';
};
