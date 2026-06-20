import axios from 'axios';
import {
	onRequestSuccess,
	onResponseError,
} from '@/shared/api/interceptors/server';

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

apiClient.interceptors.request.use(onRequestSuccess);
apiClient.interceptors.response.use(undefined, onResponseError);
