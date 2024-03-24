import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const UserLogin = createAsyncThunk("Login", async (data) => {
  const { userName, password } = data;
  const response = await axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/login`, {
      username: userName,
      password,
    })
    .then((res) => {
      localStorage.setItem("jwtToken", res.data.data.token.accessToken);
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
});

export const UserRegistration = createAsyncThunk(
  "Registration",
  async (data, thunkAPI) => {
    const { firstName, lastName, gender, email, password, bio } = data;
    const response = await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/create`, {
        fname: firstName,
        lname: lastName,
        bio,
        email,
        gender,
        password,
      })
      .then((res) => {
        localStorage.setItem("jwtToken", res.data.data.tokens.accessToken);
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
);

export const LoginRegistraion = createSlice({
  name: "loginRegistraion",
  initialState: {
    status: "init",
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      UserRegistration.pending || UserRegistration.rejected,
      (state, action) => { }
    );
    builder.addCase(UserRegistration.fulfilled, (state, action) => {
      if (action.payload.error === true) {
        try {
          var err = action.payload.errors;
          err.map((e) => {
            return toast.error(e.msg, {
              position: "top-center",
            });
          });
        } catch (err) {
          toast.error(action.payload.message, {
            position: "top-center",
          });
        }
      } else if (action.payload.error === false) {
        toast.success("Your registration has been successfully.", {
          position: "top-center",
        });
      }
    });
    builder.addCase(
      UserLogin.pending || UserLogin.rejected,
      (state, action) => { }
    );
    builder.addCase(UserLogin.fulfilled, (state, action) => {
      if (action.payload.error === true) {
        try {
          var err = action.payload.errors;
          err.map((e) => {
            return toast.error(e.msg, {
              position: "top-center",
            });
          });
        } catch (err) {
          toast.error(action.payload.message, {
            position: "top-center",
          });
        }
      } else if (action.payload.error === false) {
        toast.success("Your Login has been successfully.", {
          position: "top-center",
        });
      }
    });
  },
});

export default LoginRegistraion.reducer;
