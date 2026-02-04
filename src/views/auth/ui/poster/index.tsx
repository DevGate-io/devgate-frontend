import { Container, Group, Text } from '@mantine/core';
import Logo from '@/public/images/icons/logo-light.svg';
import { Picture } from '@/shared/ui/picture';
import { AUTH_BANNER } from '@/views/auth/constants';
import css from './index.module.css';

export const AuthPoster = () => {
	return (
		<Container className={css.card}>
			<Group className={css.logoWrapper} gap={8} align='center'>
				<Logo className={css.logo} />
				<Text size='h1' className={css.productName}>
					DevGate
				</Text>
			</Group>

			<Picture className={css.banner} poster={AUTH_BANNER} />
		</Container>
	);
};
