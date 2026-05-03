'use client';

import { Button } from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import { pageConfig } from '@/shared/config/page.config';
import { TEMPLATE_DETAIL_LABELS } from '@/views/template-detail/constants';

type UseTemplateButtonProps = {
	templateId: string;
};

export const UseTemplateButton: FC<UseTemplateButtonProps> = ({
	templateId,
}) => {
	return (
		<Button
			component={Link}
			href={`${pageConfig.templates}/${templateId}/run`}
			color='lavender'
			size='sm'
		>
			{TEMPLATE_DETAIL_LABELS.useTemplate}
		</Button>
	);
};
