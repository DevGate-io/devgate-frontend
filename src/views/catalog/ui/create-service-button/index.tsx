'use client';

import { Button } from '@mantine/core';
import Link from 'next/link';
import { pageConfig } from '@/shared/config/page.config';
import { CATALOG_LABELS } from '@/views/catalog/constants';

export const CreateServiceButton = () => {
	return (
		<Button
			component={Link}
			href={`${pageConfig.catalog}/new`}
			color='lavender'
			size='sm'
		>
			{CATALOG_LABELS.createServiceCta}
		</Button>
	);
};
