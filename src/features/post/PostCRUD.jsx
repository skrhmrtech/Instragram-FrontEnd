import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const CreatePost = createAsyncThunk("CreatePost", async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("image", data.image);

  const response = await axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/create`, formData, {
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
export const UpdatePost = createAsyncThunk("UpdatePost", async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);

  if (!(data.image === null)) {
    formData.append("image", data.image);
  }
  const response = await axios
    .patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/update/${data.postID}`, formData, {
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
export const DeletePost = createAsyncThunk("DeletePost", async (postID) => {
  const response = await axios
    .delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/delete/${postID}`, {
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
export const SearchPost = createAsyncThunk("SearchPost", async (data) => {
  const response = await axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/search`, {
      title: data, description: data
    }, {
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
  return (data === "") ? { error: false, data: [] } : response;
});
export const SearchUser = createAsyncThunk("SearchUser", async (data) => {
  const response = await axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/search`, {
      username: data,
    }, {
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
  return (data === "") ? { error: false, data: [] } : response;
});

export const PostCRUD = createSlice({
  name: "userPost",
  initialState: {
    status: false,
    searchPost: [],
    searchUser: []
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      CreatePost.pending || CreatePost.rejected,
      (state, action) => {
        state.status = false;
      }
    );
    builder.addCase(CreatePost.fulfilled, (state, action) => {
      state.status = false
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
      SearchPost.pending || SearchPost.rejected,
      (state, action) => { state.status = false; }
    );
    builder.addCase(SearchPost.fulfilled, (state, action) => {
      state.status = false;
      if (action.payload.error === false) {
        state.searchPost = action.payload.data;
      }
    });
    builder.addCase(
      SearchUser.pending || SearchUser.rejected,
      (state, action) => { state.status = false; }
    );
    builder.addCase(SearchUser.fulfilled, (state, action) => {
      state.status = false;
      if (action.payload.error === false) {
        state.searchUser = action.payload.data;
      }
    });
    builder.addCase(
      UpdatePost.pending || UpdatePost.rejected,
      (state, action) => { state.status = false; }
    );
    builder.addCase(UpdatePost.fulfilled, (state, action) => {
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
      DeletePost.pending || DeletePost.rejected,
      (state, action) => { state.status = false; }
    );
    builder.addCase(DeletePost.fulfilled, (state, action) => {
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

export default PostCRUD.reducer;
