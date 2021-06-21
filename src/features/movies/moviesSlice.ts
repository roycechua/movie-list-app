import { createSlice, Dispatch, Store } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import API from '../../services/API';

type initialMoviesState = {
	ratings: any[];
};

const initialState: initialMoviesState = {
	ratings: [],
};

const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setUserMovieRatings: (state, action) => {
			state.ratings = action.payload;
		},
	},
});

export const { setUserMovieRatings } = moviesSlice.actions;

export const getMovieRatings =
	() => async (dispatch: Dispatch, getState: () => RootState) => {
		try {
			const { user } = getState();
			let movieRatingsRes = await API.getRatings({
                account_id: user.data.id,
                session_id: user.data.sessionId,
            });

            if(movieRatingsRes.status != 200) throw new Error('Something went wrong while retrieving user movie ratings.')
            
            dispatch(setUserMovieRatings(movieRatingsRes.data.results));
        } catch (error) {
            alert(error.message)
        }
	};

export default moviesSlice.reducer;
