import { configureStore } from "@reduxjs/toolkit";
import Navigate from "./features/navigation/Navigation";
import LoginRegistration from "./features/user/LoginRegistration";
import UserProfile from "./features/user/UserProfile";
import PostCRUD from "./features/post/PostCRUD";
import getAllUser from "./features/user/getAllUser";
import FollowerFollowingPost from "./features/post/FollowerFollowingPost";
import getSingleUser from "./features/user/getSingleUser";
import getSinglePost from "./features/post/getSinglePost";

export const store = configureStore({
  reducer: {
    navigate: Navigate,
    loginRegistraion: LoginRegistration,
    userProfile: UserProfile,
    postCRUD: PostCRUD,
    getAllUser: getAllUser,
    followers: FollowerFollowingPost,
    singleUser: getSingleUser,
    singlePost: getSinglePost
  },
});
