import { createSlice } from '@reduxjs/toolkit';

type initialAuthState = {
    data: {
		avatar: {
			gravatar: {
				hash: string,
			},
			tmdb: {
				avatar_path: string,
			},
		},
		id: number,
		iso_639_1: string,
		iso_3166_1: string,
		name: string,
		include_adult: boolean,
		username: string,
        sessionId: string,
	},
	requestToken: string,
}

const initialState : initialAuthState = {
	data: {
		avatar: {
			gravatar: {
				hash: '',
			},
			tmdb: {
				avatar_path: '',
			},
		},
		id: 0,
		iso_639_1: '',
		iso_3166_1: '',
		name: '',
		include_adult: false,
		username: '',
        sessionId: '',
	},
	requestToken: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setRequestToken: (state, action) => {
			state.requestToken = action.payload;
		},
		setUserData: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const { setRequestToken, setUserData } = userSlice.actions;
export default userSlice.reducer;
