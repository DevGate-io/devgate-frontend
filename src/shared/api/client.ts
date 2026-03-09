import axios, {type AxiosResponse,} from 'axios';
import onServerSuccess from '@/shared/api/interceptors/server';

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

const onError = (error: AxiosResponse) => {
	console.log(error);
};

// apiClient.interceptors.response.use(onSuccess, onError);
apiClient.interceptors.request.use(onServerSuccess, onError);
