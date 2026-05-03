import { HEADER_LABELS } from '@/widgets/header/constants';
import { HeaderActions } from '@/widgets/header/ui/header-actions';
import { SearchField } from '@/widgets/header/ui/search-field';
import css from './index.module.css';

export const Header = () => {
	return (
		<div className={css.root}>
			<span className={css.workspace}>{HEADER_LABELS.workspace}</span>
			<SearchField />
			<HeaderActions />
		</div>
	);
};
