import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getMe = createAsyncThunk("getMe", async () => {
  const response = await axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/me`, {
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
export const UpdateUser = createAsyncThunk("UpdateUser", async (data) => {
  const formData = new FormData();
  formData.append("fname", data.fname);
  formData.append("lname", data.lname);
  formData.append("bio", data.bio);
  if (!(data.image === null)) {
    formData.append("avatar", data.image);
  }

  const response = await axios
    .patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
export const RemoveProfile = createAsyncThunk("RemoveProfile", async () => {
  const response = await axios
    .patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/remove-avatar`, {}, {
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
export const UpdateStatus = createAsyncThunk("UpdateStatus", async () => {

  const response = await axios
    .patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/isPublic`, {}, {
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


export const UserProfile = createSlice({
  name: "userProfile",
  initialState: {
    status: false,
    userProfile: [],
  },
  reducers: {
    logoutUserData: (state) => {
      state.userProfile = [];
    }
  },
  extraReducers(builder) {
    builder.addCase(getMe.pending || getMe.rejected, (state, action) => { state.status = false; });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.status = false;
      if (action.payload.error === false) {
        state.userProfile = [action.payload.data];
      } else {
        toast.error(action.payload.message, {
          position: "top-center",
        });
      }
    });
    builder.addCase(
      UpdateUser.pending || UpdateUser.rejected,
      (state, action) => { state.status = true; }
    );
    builder.addCase(UpdateUser.fulfilled, (state, action) => {
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
    builder.addCase(
      RemoveProfile.pending || RemoveProfile.rejected,
      (state, action) => { state.status = true; }
    );
    builder.addCase(RemoveProfile.fulfilled, (state, action) => {
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
    builder.addCase(
      UpdateStatus.pending || UpdateStatus.rejected,
      (state, action) => { state.status = true; }
    );
    builder.addCase(UpdateStatus.fulfilled, (state, action) => {
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

export const { logoutUserData } = UserProfile.actions;
export default UserProfile.reducer;
