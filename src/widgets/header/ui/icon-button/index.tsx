import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import css from './index.module.css';

type IconButtonProps = PropsWithChildren<{
	ariaLabel: string;
	onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}>;

export const IconButton: FC<IconButtonProps> = ({
	ariaLabel,
	onClick,
	children,
}) => {
	return (
		<button
			type='button'
			className={css.root}
			onClick={onClick}
			aria-label={ariaLabel}
		>
			{children}
		</button>
	);
};
