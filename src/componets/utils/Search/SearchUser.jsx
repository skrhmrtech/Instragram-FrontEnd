import { Box, Card } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutSingleUserData } from '../../../features/user/getSingleUser';
import { setNavigate } from '../../../features/navigation/Navigation';
import RenderPADBButton from '../RenderPADBButton';

function SearchUsers({ User }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUserProfile = async (userID) => {
        dispatch(logoutSingleUserData());
        dispatch(setNavigate("otherUser"));
        navigate(`/Dashboard/User/${userID}`);
    }

    return (
        <Box width={"100%"} marginX={2}>
            <Card>
                <Box display={"flex"} alignItems={"end"} flexDirection={"column"} margin={1}>
                    <Box textAlign={"start"} display={"flex"} alignItems={"center"} width={"100%"} className="cursorPointer" onClick={() => { handleUserProfile(User.id) }}>
                        <Box overflow={"hidden"} borderRadius={1}>
                            <img
                                src={
                                    User.avatar != null
                                        ? process.env.REACT_APP_BACKEND_URL + "/" + User.avatar
                                        : "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
                                }
                                alt="Profile Pic."
                                width={"50px"}
                                height={"50px"}
                            />
                        </Box>
                        <Box marginX={3} display={"flex"} justifyContent={"end"} flexDirection={"column"}>
                            <Box>
                                <h6>{User.fname + " " + User.lname} ( {User.username} )</h6>
                            </Box>
                            <Box>
                                <p>{User.email}</p>
                            </Box>
                        </Box>
                    </Box>
                    <Box >
                        <RenderPADBButton userID={User.id} />
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}

export default SearchUsers
