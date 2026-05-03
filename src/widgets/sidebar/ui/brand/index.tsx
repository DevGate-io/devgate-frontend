import { SIDEBAR_LABELS } from '@/widgets/sidebar/constants';
import css from './index.module.css';

export const Brand = () => {
	return (
		<header className={css.root}>
			<span className={css.name}>{SIDEBAR_LABELS.brand}</span>
		</header>
	);
};
