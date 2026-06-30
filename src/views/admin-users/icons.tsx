type IconProps = {
	className?: string;
};

export const PencilIcon = ({ className }: IconProps) => (
	<svg
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.4'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden='true'
		className={className}
	>
		<path d='M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' />
		<path d='M15 5l4 4' />
	</svg>
);

export const TrashIcon = ({ className }: IconProps) => (
	<svg
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.4'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden='true'
		className={className}
	>
		<path d='M3 6h18' />
		<path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
		<path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
		<line x1='10' y1='11' x2='10' y2='17' />
		<line x1='14' y1='11' x2='14' y2='17' />
	</svg>
);

export const PlusIcon = ({ className }: IconProps) => (
	<svg
		width='16'
		height='16'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.4'
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden='true'
		className={className}
	>
		<line x1='12' y1='5' x2='12' y2='19' />
		<line x1='5' y1='12' x2='19' y2='12' />
	</svg>
);
