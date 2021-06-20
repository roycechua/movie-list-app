import {
	combineReducers,
	configureStore,
	createStore,
	getDefaultMiddleware,
	Middleware,
	MiddlewareArray,
} from '@reduxjs/toolkit';

const middlewares: Middleware[] = [];

if (__DEV__) {
	const { logger } = require('redux-logger');
	const createDebugger = require('redux-flipper').default;
	middlewares.push(logger);
	middlewares.push(createDebugger());
}

export const store = configureStore({
	reducer: {

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
