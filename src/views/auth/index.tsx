import { AuthFormCard } from '@/views/auth/ui/form';
import css from './index.module.css';

export const AuthView = () => {
	return (
		<div className={css.root}>
			<AuthView.Form />
		</div>
	);
};

AuthView.Form = AuthFormCard;
