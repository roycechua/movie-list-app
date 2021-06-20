import axios, { AxiosPromise } from 'axios';
import constants from '../utils/constants';

const config = {
	baseURL: constants.BASE_URL,
};

const axiosInstance = axios.create(config);

export default {
	get: (url: string, config?: any) => axiosInstance.get(url, config),
	post: (url: string, data: any, config?: any) => axiosInstance.post(url, data, config),
	put: (url: string, data: any, config?: any) => axiosInstance.put(url, data, config),
	delete: (url: string, config?: any) => axiosInstance.delete(url, config),
}
