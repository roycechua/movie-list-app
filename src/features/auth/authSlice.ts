import { createSlice, Dispatch } from '@reduxjs/toolkit';
import API from '../../services/API';
import { setRequestToken, setUserData } from '../user/userSlice';
import { loginPayload } from './types';

type initialAuthState = {
	isLoggedIn: boolean,
	attemptingLogin: boolean,
	loginSuccess: boolean,
	loginFailed: boolean,
};

const initialState : initialAuthState = {
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

		// assign API data to a binding
		const request_token = requestTokenRes.data.request_token;

		// save request token to avoid redundant API calls
		dispatch(setRequestToken(request_token));

		// perform login POST request
		let loginRes = await API.login({
			...payload,
			request_token,
		});

		if (loginRes.status != 200) throw new Error('Login Failed');

		// create session to access user data and user data API functions
		let createSessionRes = await API.createSession({ request_token });

		if (createSessionRes.status != 200) throw new Error('Create Session Failed');

		// assign session id API data to a binding
		const session_id = createSessionRes.data.session_id;

		// get user account details
		let accountDetailsRes = await API.getAccountDetails({ session_id });

		if (accountDetailsRes.status != 200) throw new Error('Get Account Details Failed');

		// set user data on a redux state with session_id
		dispatch(setUserData({...accountDetailsRes.data, sessionId: session_id }))
		dispatch(setLoginSuccess());
	} catch (error) {
		alert(`Login Failed. '${error.message}'`);
		dispatch(setLoginFailed());
	}
};

export default authSlice.reducer;
