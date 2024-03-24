import React, { useEffect } from "react";
import DashboardBottomNavigation from "./utils/DashboardBottomNavigation";
import Home from "./utils/Home";
import Search from "./utils/Search";
import Notification from "./utils/Notification";
import AddPost from "./utils/AddPost";
import Account from "./utils/Account";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../features/post/FollowerFollowingPost";
import { getMe } from "../features/user/UserProfile";
import { AllUser } from "../features/user/getAllUser";
import { Vortex } from "react-loader-spinner";

function Dashboard({ Preload }) {

  const currentNavigation = useSelector(state => state.navigate.navigate);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) {
      navigate("/");
    }
  }, [currentNavigation, navigate]);

  let counter = 0;
  useEffect(() => {
    if (counter === 0) {

      const getPostData = async () => {
        await dispatch(getPosts({ skip: 0, limit: 5 }));
      }
      const getUserProfileData = async () => {
        await dispatch(getMe());
      };
      const getAllUser = async () => {
        await dispatch(AllUser());
      }

      getPostData();
      getUserProfileData();
      getAllUser();
    }
    counter++;
  }, [counter, dispatch]);

  return (
    <Box width={"100%"} height={"100%"}>
      <Container style={{width:"100%",height:"100%"}}>
        <Box width={"100%"} height={"100%"}>
          <Box
            border={"solid"}
            height={"calc(100% - 77px)"}
            borderColor={"#E73B6E"}
            marginY={"5px"}
            borderRadius={"25px 25px 0px 0px"}
            paddingY={2}
            position={"relative"}
            overflow={"hidden"}
          >
            <Box height={"100%"} overflow={"auto"} >
              <Box width={"100%"} height={"100%"} display={(Preload) ? "flex" : "none"} justifyContent={"center"} alignItems={"center"} bgcolor={"rgba(0,0,0,.8)"} position={"absolute"} top={0} left={0} zIndex={1}>
                <Vortex
                  visible={true}
                  height="100"
                  width="100"
                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  wrapperClass="vortex-wrapper"
                  colors={['#E73B6E', '#A800EE', '#FF00C6', '#E73B6E', '#A800EE', '#FF00C6']}
                />
              </Box>
              {(currentNavigation === "home" && <Home />) ||
                (currentNavigation === "search" && <Search />) ||
                (currentNavigation === "addpost" && <AddPost />) ||
                (currentNavigation === "notification" && <Notification />) ||
                (currentNavigation === "account" && <Account />)}
            </Box>

          </Box>
          <DashboardBottomNavigation
            currentNavigation={currentNavigation}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default Dashboard;
