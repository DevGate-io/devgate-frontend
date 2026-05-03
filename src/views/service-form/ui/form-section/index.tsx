import type { FC, PropsWithChildren } from 'react';
import css from './index.module.css';

type FormSectionProps = PropsWithChildren<{
	title: string;
	useGrid?: boolean;
}>;

export const FormSection: FC<FormSectionProps> = ({
	title,
	children,
	useGrid = true,
}) => {
	return (
		<fieldset className={css.root}>
			<legend className={css.legend}>{title}</legend>
			<div className={useGrid ? css.grid : undefined}>{children}</div>
		</fieldset>
	);
};
