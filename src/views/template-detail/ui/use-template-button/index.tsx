'use client';

import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import type { FC } from 'react';
import { TEMPLATE_DETAIL_LABELS } from '@/views/template-detail/constants';

type UseTemplateButtonProps = {
	templateName: string;
};

export const UseTemplateButton: FC<UseTemplateButtonProps> = ({
	templateName,
}) => {
	const handleClick = () => {
		notifications.show({
			color: 'lavender',
			title: 'Запуск scaffolder',
			message: `Шаблон «${templateName}» будет применён, когда форма scaffolder будет готова.`,
		});
	};

	return (
		<Button color='lavender' size='sm' onClick={handleClick}>
			{TEMPLATE_DETAIL_LABELS.useTemplate}
		</Button>
	);
};
