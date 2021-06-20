import { createSlice, Dispatch } from '@reduxjs/toolkit';
import API from '../../services/API';

const initialState = {
	requestToken: '',
	configuration: {},
	isAttemptingFetchConfiguration: false,
	fetchConfigurationSuccess: false,
	fetchConfigurationFailed: false,
};

const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
		setRequestToken: (state, action) => {
			state.requestToken = action.payload;
		},
		setConfiguration: (state, action) => {
			state.configuration = action.payload;
		},
		setAttemptingFetchConfiguration: (state) => {
			state.isAttemptingFetchConfiguration = true;
			state.fetchConfigurationSuccess = false;
			state.fetchConfigurationFailed = false;
		},
		setFetchConfigurationSuccess: (state) => {
			state.isAttemptingFetchConfiguration = false;
			state.fetchConfigurationSuccess = true;
			state.fetchConfigurationFailed = false;
		},
		setFetchConfigurationFailed: (state) => {
			state.isAttemptingFetchConfiguration = false;
			state.fetchConfigurationSuccess = false;
			state.fetchConfigurationFailed = true;
		},
	},
});

export const {
	setRequestToken,
	setConfiguration,
	setAttemptingFetchConfiguration,
	setFetchConfigurationSuccess,
	setFetchConfigurationFailed,
} = configSlice.actions;

// thunks
export const fetchConfiguration = () => async (dispatch: Dispatch) => {
	try {
		dispatch(setAttemptingFetchConfiguration());
		let configResponse = await API.getAPIConfiguration();
		if (configResponse.status == 200) {
			dispatch(setConfiguration(configResponse.data));
			dispatch(setFetchConfigurationSuccess());
		} else {
			dispatch(setFetchConfigurationFailed());
			throw Error('Fetch Configuration Failed');
		}
	} catch (error) {
		alert(`Fetch Configuration Failed. Error '${error.message}'`);
		dispatch(setFetchConfigurationFailed());
	}
};

export default configSlice.reducer;
