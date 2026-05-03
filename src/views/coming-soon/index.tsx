import type { FC } from 'react';
import { PageHeader } from '@/shared/ui/page-header';
import { COMING_SOON_DEFAULT_DESCRIPTION } from '@/views/coming-soon/constants';

type ComingSoonViewProps = {
	title: string;
	description?: string;
};

export const ComingSoonView: FC<ComingSoonViewProps> = ({
	title,
	description = COMING_SOON_DEFAULT_DESCRIPTION,
}) => {
	return <PageHeader title={title} description={description} />;
};
