import {
	combineReducers,
	configureStore,
	createStore,
	getDefaultMiddleware,
	Middleware,
	MiddlewareArray,
} from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import configSlice from '../features/config/configSlice';
import userSlice from '../features/user/userSlice';

const middlewares: Middleware[] = [];

const stateWhitelist : string[] = [];

if (__DEV__) {
	const { logger } = require('redux-logger');
	const createDebugger = require('redux-flipper').default;
	middlewares.push(logger);
	middlewares.push(createDebugger({
		stateWhitelist,
	}));
}

export const store = configureStore({
	reducer: {
		auth: authSlice,
		config: configSlice,
		user: userSlice,
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		...middlewares,
	],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
