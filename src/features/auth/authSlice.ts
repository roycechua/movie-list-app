import { createSlice, Dispatch } from '@reduxjs/toolkit';
import API from '../../services/API';
import { setRequestToken } from '../config/configSlice';
import { loginPayload } from './types';

const initialState = {
	isLoggedIn: false,
	attemptingLogin: false,
	loginSuccess: false,
	loginFailed: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAttemptingLogin: (state) => {
			state.attemptingLogin = true;
			state.loginSuccess = false;
			state.loginFailed = false;
		},
		setLoginSuccess: (state) => {
			state.attemptingLogin = false;
			state.loginSuccess = true;
			state.loginFailed = false;
			state.isLoggedIn = true;
		},
		setLoginFailed: (state) => {
			state.attemptingLogin = false;
			state.loginSuccess = false;
			state.loginFailed = true;
		},
		setLogout: (state) => {
			state.attemptingLogin = false;
			state.loginSuccess = false;
			state.loginFailed = false;
			state.isLoggedIn = false;
		},
	},
});

export const { setAttemptingLogin, setLoginSuccess, setLoginFailed, setLogout } =
	authSlice.actions;

// thunks
export const login = (payload: loginPayload) => async (dispatch: Dispatch) => {
	try {
		dispatch(setAttemptingLogin());
		// get request token needed for login
		let requestTokenRes = await API.getRequestToken();

		if (requestTokenRes.status != 200)
			throw new Error('Get Request Token Failed');

		// save request token to avoid redundant API calls
		dispatch(setRequestToken(requestTokenRes.data.request_token));

		// perform login POST request
		let loginRes = await API.login({
			...payload,
			request_token: requestTokenRes.data.request_token,
		});

		if (loginRes.status != 200) throw new Error('Login Failed');

		dispatch(setLoginSuccess());
	} catch (error) {
		alert(`Login Failed. '${error.message}'`);
		dispatch(setLoginFailed());
	}
};

export default authSlice.reducer;
