import "./App.css";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import Login from "./componets/Login";
import Registration from "./componets/Registration";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Dashboard from "./componets/Dashboard";
import OtherUser from "./componets/utils/OtherUser";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OtherPost from "./componets/utils/OtherPost";
import { Box } from "@mui/material";

function App() {

  const FollowersFollowings = useSelector(state => state.followers.status);
  const Post = useSelector(state => state.postCRUD.status);
  const SinglePost = useSelector(state => state.singlePost.status);
  const AllUser = useSelector(state => state.getAllUser.status);
  const SingleUser = useSelector(state => state.singleUser.status);
  const UserProfile = useSelector(state => state.userProfile.status);

  const [Preload, setPreload] = useState(true);

  useEffect(() => {

    if (FollowersFollowings || Post || SinglePost || AllUser || SingleUser || UserProfile) {
      setPreload(true);
    } else {
      setPreload(false);
    }

  }, [FollowersFollowings, Post, SinglePost, AllUser, SingleUser, UserProfile]);

  useEffect(() => {
    setInterval(() => {
      var height = Math.max((Math.floor((450 * 100) / document.body.clientWidth) - 1), 99);
      document.body.style.height = `${height}vh`;
    }, 1);
  }, [])

  return (
    <>
      <Box width={"100%"} height={"100%"} minWidth={"450px"}>
        <ToastContainer />
        <Routes>
          <Route path={"/"} element={<Login />}></Route>
          <Route path={"/Registration"} element={<Registration />}></Route>
          <Route path={"/Dashboard"} element={<Dashboard Preload={Preload} />}></Route>
          <Route path={"/Dashboard/User/:userID"} element={<OtherUser Preload={Preload} setPreload={setPreload} />}></Route>
          <Route path={"/Dashboard/Post/:postID"} element={<OtherPost Preload={Preload} setPreload={setPreload} />}></Route>
        </Routes>
      </Box>
    </>
  );
}

export default App;
