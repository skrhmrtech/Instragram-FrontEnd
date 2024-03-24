import { Box, Card, Grid } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNavigate } from '../../../features/navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import { logoutSingleUserData } from "../../../features/user/getSingleUser";
import RenderPADBButton from "../RenderPADBButton";

function NotificationBottom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector(state => state.getAllUser.getAllUser);

    const handleUserProfile = async (userID) => {
        dispatch(logoutSingleUserData());
        dispatch(setNavigate("otherUser"));
        navigate(`/Dashboard/User/${userID}`);
    }

    return (
        <Box>
            <Box>
                <h5>All User</h5>
            </Box>
            {
                (data.length)
                    ?
                    data && data.map((userProfile) => {
                        return (
                            <Box marginY={1} key={userProfile.id}>
                                <Card>
                                    <Grid
                                        container
                                        display={"flex"}
                                        justifyContent={"space-between"}
                                        textAlign={"center"}
                                        paddingX={2}
                                        paddingY={1}
                                        overflow={"auto"}
                                    >
                                        <Grid item xs={12}>
                                            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                                <Box display={"flex"} alignItems={"center"} className="cursorPointer" onClick={() => { handleUserProfile(userProfile.id) }}>
                                                    <Box borderRadius={"50%"} overflow={"hidden"}>
                                                        <img
                                                            src={
                                                                userProfile.avatar != null
                                                                    ? process.env.REACT_APP_BACKEND_URL + "/" + userProfile.avatar
                                                                    : "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
                                                            }
                                                            alt="Profile Pic."
                                                            width={"60px"}
                                                        />
                                                    </Box>
                                                    <Box marginX={3}>
                                                        <h5>{userProfile.username} ({userProfile.fname + " " + userProfile.lname}) </h5>
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
                        )
                    })
                    :
                    <Box textAlign={"center"}>
                        <h6>No More Data Founded.</h6>
                    </Box>
            }
        </Box>
    )
}

export default NotificationBottom
