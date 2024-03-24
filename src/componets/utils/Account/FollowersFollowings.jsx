import { BottomNavigation, BottomNavigationAction, Box, Grid } from '@mui/material'
import React from 'react'
import AddReactionIcon from '@mui/icons-material/AddReaction';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch } from 'react-redux';
import { setNavigate } from '../../../features/navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import { logoutSingleUserData } from "../../../features/user/getSingleUser";
import RenderPADBButton from '../RenderPADBButton';

function FollowerFollowings({ userDetails, openMenu }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [value, setValue] = React.useState(openMenu);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleUserProfile = async (userID) => {
        dispatch(logoutSingleUserData());
        dispatch(setNavigate("otherUser"));
        navigate(`/Dashboard/User/${userID}`);
    }

    return (
        <Box>

            <BottomNavigation
                sx={{ width: "100%" }}
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction
                    label="Followers"
                    value="followers"
                    icon={<AddReactionIcon />}
                />
                <BottomNavigationAction
                    label="Followings"
                    value="followings"
                    icon={<PersonAddIcon />}
                />
            </BottomNavigation>

            <Box minHeight={400} border={"dashed"} position={"relative"} borderRadius={1} padding={1}>
                {
                    (value === "followers")
                        ?
                        <Box overflow={"auto"} maxHeight={400}>
                            {
                                userDetails.followers.map((user) => {
                                    return (
                                        <Grid item sm={12} key={user.id}>
                                            <Box border={"solid"} padding={1} marginY={1} borderRadius={3} height={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                                <Box display={"flex"} alignItems={"center"} className="cursorPointer" onClick={() => { handleUserProfile(user.sender_user.id) }}>
                                                    <Box overflow={"hidden"}>
                                                        <img
                                                            src={
                                                                user.sender_user.avatar != null
                                                                    ? process.env.REACT_APP_BACKEND_URL + "/" + user.sender_user.avatar
                                                                    : "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
                                                            }
                                                            alt="Post Pic."
                                                            width={"50px"}
                                                            height={"50px"}
                                                            style={{
                                                                aspectRatio: "1",
                                                                objectFit: "cover",
                                                                borderRadius: "5px",
                                                            }}
                                                        />
                                                    </Box>
                                                    <Box paddingX={2} textAlign={"center"}>
                                                        <h6>{user.sender_user.fname + " " + user.sender_user.lname}</h6>
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <RenderPADBButton userID={user.sender_user.id} />
                                                </Box>
                                            </Box>
                                        </Grid>
                                    )
                                })
                            }
                            {
                                (userDetails.followers.length === 0) ? <Box textAlign={"center"} marginY={4}>"No Any Followers"</Box> : ""
                            }
                        </Box>
                        :
                        <Box>
                            <Box overflow={"auto"} maxHeight={400}>
                                {
                                    userDetails.following.map((user) => {
                                        return (
                                            <Grid item sm={12} key={user.id}>
                                                <Box border={"solid"} padding={1} marginY={1} borderRadius={3} height={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                                    <Box display={"flex"} alignItems={"center"} className="cursorPointer" onClick={() => { handleUserProfile(user.receiver_user.id) }}>
                                                        <Box overflow={"hidden"}>
                                                            <img
                                                                src={
                                                                    user.receiver_user.avatar != null
                                                                        ? process.env.REACT_APP_BACKEND_URL + "/" + user.receiver_user.avatar
                                                                        : "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
                                                                }
                                                                alt="Post Pic."
                                                                width={"50px"}
                                                                height={"50px"}
                                                                style={{
                                                                    aspectRatio: "1",
                                                                    objectFit: "cover",
                                                                    borderRadius: "5px",
                                                                }}
                                                            />
                                                        </Box>
                                                        <Box paddingX={2} textAlign={"center"}>
                                                            <h6>{user.receiver_user.fname + " " + user.receiver_user.lname}</h6>
                                                        </Box>
                                                    </Box>
                                                    <Box>
                                                        <RenderPADBButton userID={user.receiver_user.id} />
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        )
                                    })
                                }
                                {
                                    (userDetails.following.length === 0) ? <Box textAlign={"center"} marginY={4}>"No Any Followings"</Box> : ""
                                }
                            </Box>
                        </Box>
                }
            </Box>

        </Box>
    )
}

export default FollowerFollowings
