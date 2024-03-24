import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const AllUser = createAsyncThunk("AllUser", async () => {
    const response = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/get-all-user`, {
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

export const sendFollowRequest = createAsyncThunk("sendFollowRequest", async (value) => {
    const response = await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/followers-following/${value}/follow`, {}, {
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
export const performActionFollowRequest = createAsyncThunk("performActionFollowRequest", async ({ id, status }) => {
    const response = await axios
        .patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/followers-following/${id}/${status}`, {}, {
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

export const getAllUser = createSlice({
    name: "getAllUser",
    initialState: {
        status: false,
        requestedUser: [],
        receiverUser: [],
        getAllUser: [],
    },
    reducers: {
        logoutAllUserData: (state) => {
            state.requestedUser = [];
            state.receiverUser = [];
            state.getAllUser = [];
        }
    },
    extraReducers(builder) {
        builder.addCase(AllUser.pending || AllUser.rejected, (state, action) => { state.status = false });
        builder.addCase(AllUser.fulfilled, (state, action) => {
            state.status = false;
            if (action.payload.error === false) {
                state.requestedUser = action.payload.requestedUser[0].following;
                state.receiverUser = action.payload.requestedUser[0].followers;
                state.getAllUser = action.payload.data;
            } else {
                toast.error(action.payload.message, {
                    position: "top-center",
                });
            }
        });
        builder.addCase(sendFollowRequest.pending || sendFollowRequest.rejected, (state, action) => { state.status = true });
        builder.addCase(sendFollowRequest.fulfilled, (state, action) => {
            state.status = false;
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
        builder.addCase(performActionFollowRequest.pending || performActionFollowRequest.rejected, (state, action) => { state.status = true });
        builder.addCase(performActionFollowRequest.fulfilled, (state, action) => {
            state.status = false;
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

export const { logoutAllUserData } = getAllUser.actions;
export default getAllUser.reducer;
