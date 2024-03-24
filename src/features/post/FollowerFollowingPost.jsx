import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getPosts = createAsyncThunk("getPosts", async ({ skip, limit }) => {
    const response = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/followers-following?skip=${skip}&limit=${limit}`, {
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

export const FollowerFollowingPost = createSlice({
    name: "FollowerFollowingPost",
    initialState: {
        status: false,
        posts: [],
        totalNoOfPost: 0
    },
    reducers: {
        logoutAllPostData: (state) => {
            state.posts = [];
            state.totalNoOfPost = 0;
        }
    },
    extraReducers(builder) {
        builder.addCase(
            getPosts.pending || getPosts.rejected,
            (state, action) => {
                state.status = false;
            }
        );
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.status = false
            if (action.payload.error === false) {
                state.totalNoOfPost = action.payload.limit + action.payload.skip;
                if (!(action.payload.data.length === 0)) {
                    if (!(action.payload.skip === 0)) {
                        state.posts = state.posts.concat(action.payload.data);
                    } else {
                        state.posts = action.payload.data;
                    }
                }
                if (action.payload.skip === 0) {
                    state.posts = action.payload.data;
                }
            } else {
                toast.error(action.payload.message, {
                    position: "top-center",
                });
            }
        });
    },
});

export const { logoutAllPostData } = FollowerFollowingPost.actions;
export default FollowerFollowingPost.reducer;
