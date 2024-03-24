import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const setGetlike = createAsyncThunk("setGetlike", async (postId) => {
    const response = await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/${postId}/like`, {}, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response;
        });
    return response;
});
export const setGetComments = createAsyncThunk("setGetComments", async ({ postID, message }) => {
    const response = await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/${postID}/comment`, { message }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response;
        });
    return response;
});
export const removeComments = createAsyncThunk("removeComments", async ({ postID, commentID }) => {
    const response = await axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/${postID}/comment/${commentID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response;
        });
    return response;
});

export const LikeComments = createSlice({
    name: "LikeComments",
    initialState: {
    },
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(
            setGetlike.pending || setGetlike.rejected,
            (state, action) => { }
        );
        builder.addCase(setGetlike.fulfilled, (state, action) => {
            if (action.payload.error === false) {
                toast.success(action.payload.message, {
                    position: "top-center",
                });
            } else {
                toast.error(action.payload.message, {
                    position: "top-center",
                });
            }
        });
        builder.addCase(
            setGetComments.pending || setGetComments.rejected,
            (state, action) => { }
        );
        builder.addCase(setGetComments.fulfilled, (state, action) => {
            if (action.payload.error === false) {
                toast.success(action.payload.message, {
                    position: "top-center",
                });
            } else {
                toast.error(action.payload.message, {
                    position: "top-center",
                });
            }
        });
        builder.addCase(
            removeComments.pending || removeComments.rejected,
            (state, action) => { }
        );
        builder.addCase(removeComments.fulfilled, (state, action) => {
            if (action.payload.error === false) {
                toast.success(action.payload.message, {
                    position: "top-center",
                });
            } else {
                toast.error(action.payload.message, {
                    position: "top-center",
                });
            }
        });
    },
});

export default LikeComments.reducer;
