import { Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import { AuthForm } from '@/features/auth-form';
import Logo from '@/public/images/icons/logo-light.svg';
import { Picture } from '@/shared/ui/picture';
import { AUTH_BANNER } from '@/views/auth/constants';
import css from './index.module.css';

export const AuthView = () => {
	return (
		<div className={css.root}>
			<Card className={css.formCard}>
				<Stack gap={4} align='center'>
					<Title order={1} fz='h3' fw={700}>
						Войдите в DevGate
					</Title>
					<Text size='xl' c='gray.8'>
						и получите доступ к корпоративному пространству
					</Text>
				</Stack>

				<AuthForm className={css.form} />
			</Card>

			<Container className={css.card}>
				<Group className={css.logoWrapper} gap={8} align='center'>
					<Logo className={css.logo} />
					<span className={css.productName}>DevGate</span>
				</Group>

				<Picture className={css.banner} poster={AUTH_BANNER} />
			</Container>
		</div>
	);
};
