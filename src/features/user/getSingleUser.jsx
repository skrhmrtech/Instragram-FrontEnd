import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const SingleUser = createAsyncThunk("SingleUser", async (userID) => {
    const response = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/get-single-user/${userID}`, {
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

export const getSingleUser = createSlice({
    name: "getSingleUser",
    initialState: {
        status: false,
        getSingleUser: [],
    },
    reducers: {
        logoutSingleUserData: (state) => {
            state.getSingleUser = [];
        }
    },
    extraReducers(builder) {
        builder.addCase(SingleUser.pending || SingleUser.rejected, (state, action) => { state.status = false });
        builder.addCase(SingleUser.fulfilled, (state, action) => {
            state.status = false;
            if (action.payload.error === false) {
                state.getSingleUser = [action.payload.data]
            } else {
                if (!(action.payload.message === "You can show a current user profile")) {
                    toast.error(action.payload.message, {
                        position: "top-center",
                    });
                }
            }
        });
    },
});

export const { logoutSingleUserData } = getSingleUser.actions;
export default getSingleUser.reducer;
