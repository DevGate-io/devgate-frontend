import { Card, Stack, Text, Title } from '@mantine/core';
import { AuthForm } from '@/features/auth-form';
import { AUTH_FORM_CARD_LABELS } from './constants';
import css from './index.module.css';

export const AuthFormCard = () => {
	return (
		<Card className={css.card} p={24} radius='xl' shadow='md'>
			<Stack gap={4} align='center'>
				<Title order={1} fz='h4' fw={700}>
					{AUTH_FORM_CARD_LABELS.title}
				</Title>
				<Text fz='sm' c='dimmed' ta='center'>
					{AUTH_FORM_CARD_LABELS.subtitle}
				</Text>
			</Stack>

			<AuthForm className={css.form} />
		</Card>
	);
};
