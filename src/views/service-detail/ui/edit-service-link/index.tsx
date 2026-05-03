'use client';

import { Button } from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';
import { pageConfig } from '@/shared/config/page.config';
import { SERVICE_FORM_LABELS } from '@/views/service-form/constants';

type EditServiceLinkProps = {
	serviceId: string;
};

export const EditServiceLink: FC<EditServiceLinkProps> = ({ serviceId }) => {
	return (
		<Button
			component={Link}
			href={`${pageConfig.catalog}/${serviceId}/edit`}
			variant='light'
			color='lavender'
			size='sm'
		>
			{SERVICE_FORM_LABELS.editLink}
		</Button>
	);
};
