import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SinglePost } from '../../features/post/getSinglePost';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardBottomNavigation from './DashboardBottomNavigation';
import { Vortex } from 'react-loader-spinner';
import PostCard from './Home/PostCard';

function OtherPost({ Preload, setPreload }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [update, setUpdate] = useState(1);

    const currentNavigation = useSelector(state => state.navigate.navigate);
    const currentUser = useSelector(state => state.userProfile.userProfile);

    const { postID } = useParams();

    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) {
            navigate("/");
        }
    }, [currentNavigation, postID, navigate, dispatch]);

    if (currentNavigation === "home" || currentNavigation === "search" || currentNavigation === "addpost" || currentNavigation === "notification" || currentNavigation === "account") {
        navigate("/Dashboard");
    }

    const postData = useSelector(state => state.singlePost.getSinglPost);

    let counter = 0;
    useEffect(() => {
        if ((counter === 1) || (update > 1)) {
            const getSinglePostData = async () => {
                let response = await dispatch(SinglePost(postID));
                if (response.payload.error === true || !response) {
                    navigate("/Dashboard");
                }
            }
            getSinglePostData();
        }
        counter++;
    }, [postID, update, counter, navigate, dispatch]);

    useEffect(() => {
        !(postData.length === 0) ? setPreload(false) : setPreload(true);
    }, [postData, setPreload])

    return (
        <Box width={"100%"} height={"100%"}>
            <Container style={{ width: "100%", height: "100%" }}>
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
                        <Box height={"100%"} overflow={"auto"}>
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
                            <Box>
                                <Box margin={3}>
                                    {
                                        !(postData.length === 0)
                                            ?
                                            <PostCard userData={postData[0]} currentUser={currentUser} changePostData={() => { setUpdate(update + 1) }} />
                                            :
                                            "Loading..."
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <DashboardBottomNavigation
                        currentNavigation={currentNavigation}
                    />
                </Box>
            </Container>
        </Box>
    )
}

export default OtherPost
