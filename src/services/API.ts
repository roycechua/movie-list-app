import { loginPayload } from '../features/auth/types';
import constants from '../utils/constants';
import AxiosModule from './AxiosModule';

export default {
    // Authentication
	getRequestToken: () =>
		AxiosModule.get(`/authentication/token/new?api_key=${constants.API_KEY}`),
	login: (payload: loginPayload, additionalConfig?: any) =>
		AxiosModule.post(
			`/authentication/token/validate_with_login?api_key=${constants.API_KEY}`,
			payload,
			additionalConfig
		),

    // Configuration
    getAPIConfiguration: () => AxiosModule.get(`/configuration?api_key=${constants.API_KEY}`),

    // Home
	getTrendingMovies: () => AxiosModule.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${constants.API_KEY}`),
	searchMovies: (payload: any) => AxiosModule.get(`https://api.themoviedb.org/3/search/movie?query=${payload.query}&language=en-US&api_key=${constants.API_KEY}`),
};
