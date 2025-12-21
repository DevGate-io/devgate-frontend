import type {NextPage} from 'next';
import css from './index.module.css';

export const Home: NextPage = () => {
	return (
		<main>
			<h1 className={css.title}>Title</h1>
		</main>
	);
};
