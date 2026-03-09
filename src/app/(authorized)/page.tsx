import { apiClient } from '@/shared/api/client';
import { HomeView } from '@/views/home';

const HomePage = async () => {
	const getUsers = async () => {
		return apiClient.get('/users');
	};

	const data = await getUsers();

	console.log(data);

	return <HomeView />;
};

export default HomePage;
