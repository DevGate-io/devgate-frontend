import { HeaderActions } from '@/widgets/header/ui/header-actions';
import { SearchField } from '@/widgets/header/ui/search-field';
import { WorkspaceChip } from '@/widgets/header/ui/workspace-chip';
import css from './index.module.css';

export const Header = () => {
	return (
		<div className={css.root}>
			<WorkspaceChip />
			<span className={css.divider} aria-hidden='true' />
			<SearchField />
			<span className={css.divider} aria-hidden='true' />
			<HeaderActions />
		</div>
	);
};
