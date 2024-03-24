import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const SinglePost = createAsyncThunk("SinglePost", async (postID) => {
    const response = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/get-single-post/${postID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response.data;
        });
    return response;
});

export const getSinglPost = createSlice({
    name: "getSinglPost",
    initialState: {
        status: false,
        getSinglPost: [],
    },
    reducers: {
        logoutSinglePostData: (state) => {
            state.getSinglPost = [];
        }
    },
    extraReducers(builder) {
        builder.addCase(SinglePost.pending || SinglePost.rejected, (state, action) => { state.status = false });
        builder.addCase(SinglePost.fulfilled, (state, action) => {
            state.status = false;
            if (action.payload.error === false) {
                state.getSinglPost = [action.payload.data]
            } else {
                toast.error(action.payload.message, {
                    position: "top-center",
                });
            }
        });
    },
});

export const { logoutSinglePostData } = getSinglPost.actions;
export default getSinglPost.reducer;
