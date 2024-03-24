import { Box, Card } from '@mui/material'
import React from 'react'
import { logoutSinglePostData } from '../../../features/post/getSinglePost';
import { setNavigate } from '../../../features/navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function SearchPosts({ Post }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePost = async (postID) => {
        dispatch(logoutSinglePostData());
        dispatch(setNavigate("otherPost"));
        navigate(`/Dashboard/Post/${postID}`);
    }

    return (
        <Card sx={{width:"100%"}}>
            <Box textAlign={"center"} margin={2} className="cursorPointer" onClick={() => { handlePost(Post.id) }}>
                <Box overflow={"hidden"} borderRadius={5}>
                    <img
                        src={
                            Post.image !== "undefined"
                                ? process.env.REACT_APP_BACKEND_URL + "/" + Post.image
                                : "https://t4.ftcdn.net/jpg/04/70/29/97/240_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                        }
                        alt="Profile Pic."
                        width={"100%"}
                        height={"250px"}
                        style={{objectFit:"cover"}}
                    />
                </Box>
                <Box>
                    <h4>{Post.title}</h4>
                </Box>
                <Box>
                    <h6>{Post.description}</h6>
                </Box>
            </Box>
        </Card>
    )
}

export default SearchPosts
