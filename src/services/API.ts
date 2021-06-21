import { loginPayload } from '../features/auth/types';
import constants from '../utils/constants';
import AxiosModule from './AxiosModule';

export default {
	// Authentication
	getRequestToken: () =>
		AxiosModule.get(
			`/authentication/token/new?api_key=${constants.API_KEY}`
		),
	login: (payload: loginPayload, additionalConfig?: any) =>
		AxiosModule.post(
			`/authentication/token/validate_with_login?api_key=${constants.API_KEY}`,
			payload,
			additionalConfig
		),
	createSession: (payload: { request_token: string }) =>
		AxiosModule.post(
			`https://api.themoviedb.org/3/authentication/session/new?api_key=${constants.API_KEY}`,
			payload
		),

	// User
	getAccountDetails: (payload: { session_id: string }) =>
		AxiosModule.get(
			`https://api.themoviedb.org/3/account?session_id=${payload.session_id}&api_key=${constants.API_KEY}`
		),

	// Configuration
	getAPIConfiguration: () =>
		AxiosModule.get(`/configuration?api_key=${constants.API_KEY}`),

	// Movies
	getTrendingMovies: () =>
		AxiosModule.get(
			`https://api.themoviedb.org/3/trending/movie/day?api_key=${constants.API_KEY}`
		),
	searchMovies: (payload: any) =>
		AxiosModule.get(
			`https://api.themoviedb.org/3/search/movie?query=${payload.query}&language=en-US&api_key=${constants.API_KEY}`
		),

	// Watchlist
	getWatchlist: (payload: { account_id: number; session_id: string }) =>
		AxiosModule.get(
			`https://api.themoviedb.org/3/account/${payload.account_id}/watchlist/movies?session_id=${payload.session_id}&api_key=${constants.API_KEY}`
		),
	addToWatchlist: (payload: {
		account_id: number;
		session_id: string;
		media_type: string;
		media_id: number;
		watchlist: boolean;
	}) =>
		AxiosModule.post(
			`https://api.themoviedb.org/3/account/${payload.account_id}/watchlist?session_id=${payload.session_id}&api_key=${constants.API_KEY}`,
			{
				"media_type": "movie",
				"media_id": payload.media_id,
				"watchlist": true
			}
		),
};
