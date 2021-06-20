import { createSlice, Dispatch } from '@reduxjs/toolkit'

const initialState = {
    configuration: {},
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setConfiguration: (state, action) => {
            state.configuration = action.payload;
        }
    }
});

export const {
    setConfiguration,
} = configSlice.actions

// thunks
const fetchConfiguration = () => async (dispatch : Dispatch) => {
    
}

export default configSlice.reducer