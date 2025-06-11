import { createSlice } from '@reduxjs/toolkit'


const feedSlice = createSlice({
    name: 'feed',
    initialState : null,
    reducers : {
        addFeed : (state, action) => {
            return action.payload;
        },
        clearFeed : (state) => {
            return null;
        }
    }
})

export const { addFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;