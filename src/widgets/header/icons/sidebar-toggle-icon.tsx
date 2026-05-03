import type { FC } from 'react';

type SidebarToggleIconProps = {
	collapsed: boolean;
};

export const SidebarToggleIcon: FC<SidebarToggleIconProps> = ({
	collapsed,
}) => (
	<svg
		width='18'
		height='18'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.4'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden='true'
	>
		<rect x='3' y='4' width='18' height='16' rx='2' />
		<path d='M9 4v16' />
		{collapsed ? <path d='M13 9l3 3-3 3' /> : <path d='M16 9l-3 3 3 3' />}
	</svg>
);
