'use client';

import { HEADER_LABELS } from '@/widgets/header/constants';
import { ChevronDownIcon } from '@/widgets/header/icons/chevron-down-icon';
import css from './index.module.css';

export const WorkspaceChip = () => {
	return (
		<button type='button' className={css.root} aria-haspopup='menu'>
			{HEADER_LABELS.workspace}
			<span className={css.chevron}>
				<ChevronDownIcon />
			</span>
		</button>
	);
};
