import { createSlice } from "@reduxjs/toolkit";

export const Navigate = createSlice({
    name: "navigate",
    initialState: {
        navigate: "home",
        userID: 0,
        postID: 0
    },
    reducers: {
        setNavigate: (state, action) => {
            state.navigate = action.payload;
        },
        setUserID: (state, action) => {
            state.userID = action.payload;
        },
        setPostID: (state, action) => {
            state.postID = action.payload;
        },
    },
});

export const { setNavigate, setUserID, setPostID } = Navigate.actions

export default Navigate.reducer;
