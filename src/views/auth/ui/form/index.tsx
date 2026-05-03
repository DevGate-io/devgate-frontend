import { Card, Stack, Text, Title } from '@mantine/core';
import { AuthForm } from '@/features/auth-form';
import css from './index.module.css';

export const AuthFormCard = () => {
	return (
		<Card className={css.card} p={24} radius='xl' shadow='md'>
			<Stack gap={4} align='center'>
				<Title order={1} fz='h4' fw={700}>
					Войдите в DevGate
				</Title>
				<Text fz='sm' c='dimmed' ta='center'>
					и получите доступ к корпоративному пространству
				</Text>
			</Stack>

			<AuthForm className={css.form} />
		</Card>
	);
};
