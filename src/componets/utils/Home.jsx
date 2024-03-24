import { Box, Card, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PostCard from './Home/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../features/post/FollowerFollowingPost';
import { Button } from 'antd';
import { logoutSingleUserData } from '../../features/user/getSingleUser';
import { setNavigate } from '../../features/navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import RenderPADBButton from './RenderPADBButton';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [update, setUpdate] = useState(1);

  const data = useSelector(state => state.followers.posts);
  const currentUser = useSelector(state => state.userProfile.userProfile);
  const totalNoOfPost = useSelector(state => state.followers.totalNoOfPost);

  const getAllUserNotification = useSelector(state => state.getAllUser.getAllUser);

  useEffect(() => {
    if (!(update <= 1)) {
      dispatch(getPosts({ skip: 0, limit: totalNoOfPost }));
    }
  }, [update, dispatch, totalNoOfPost ])

  const handleUserProfile = async (userID) => {
    dispatch(logoutSingleUserData());
    dispatch(setNavigate("otherUser"));
    navigate(`/Dashboard/User/${userID}`);
  }

  return (
    <Box>
      <Grid container display={"felx"} justifyContent={"center"}>
        <Grid item md={8} sm={10} xs={12} margin={2}>
          {
            data && data.map((userPost, index) => {
              return (
                <Box key={userPost.id}>
                  <PostCard userData={userPost} currentUser={currentUser} changePostData={() => { setUpdate(update + 1) }} />
                  {
                    ((index + 1) % 3 === 0)
                      ?
                      <Box sx={{ userSelect: "none" }}>
                        <Grid container display={"flex"} justifyContent={"center"} flexWrap={"nowrap"} overflow={"auto"}>
                          {
                            (getAllUserNotification.length)
                              ?
                              getAllUserNotification && getAllUserNotification.map((userProfile) => {
                                return (
                                  <Grid item xs={4} key={userProfile.id} width={"100%"} minWidth={"220px"}>
                                    <Box margin={1} border={"solid"} borderRadius={1}>
                                      <Card>
                                        <Grid
                                          container
                                          display={"flex"}
                                          justifyContent={"space-between"}
                                          textAlign={"center"}
                                          paddingX={2}
                                          paddingY={1}
                                        >
                                          <Grid item xs={12}>
                                            <Box>
                                              <Box onClick={() => { handleUserProfile(userProfile.id) }} className="cursorPointer">
                                                <Box borderRadius={"50%"} overflow={"hidden"} >
                                                  <img
                                                    src={
                                                      userProfile.avatar != null
                                                        ? process.env.REACT_APP_BACKEND_URL + "/" + userProfile.avatar
                                                        : "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
                                                    }
                                                    alt="Profile Pic."
                                                    width={"60px"}
                                                    height={"60px"}
                                                  />
                                                </Box>
                                                <Box marginX={3}>
                                                  <h6>{userProfile.username} <br /> ({userProfile.fname + " " + userProfile.lname}) </h6>
                                                </Box>
                                              </Box>
                                              <Box>
                                                <RenderPADBButton userID={userProfile.id} />
                                              </Box>
                                            </Box>
                                          </Grid>
                                        </Grid>
                                      </Card>
                                    </Box>
                                  </Grid>
                                )
                              })
                              :
                              ""
                          }
                        </Grid>
                      </Box>
                      :
                      ""
                  }
                </Box>
              )
            })
          }
          {
            data.length === 0
              ?
              <Box>
                <video src='https://cdnl.iconscout.com/lottie/premium/preview-watermark/404-error-page-4942367-4122465.mp4' width={"100%"} height={"100%"} autoPlay loop></video>
              </Box>
              :
              <Box display={"flex"} justifyContent={"center"} marginY={2}>
                <Button onClick={() => { dispatch(getPosts({ skip: totalNoOfPost, limit: 5 })); }}>
                  Load More...
                </Button>
              </Box>
          }
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
