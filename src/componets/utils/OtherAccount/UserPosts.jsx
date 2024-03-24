import { Box, CardActions, Grid, IconButton, Modal } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { getMe } from '../../../features/user/UserProfile';
import { setGetlike } from '../../../features/post/LikeComments';
import { useDispatch } from 'react-redux';
import LikeCommentModel from '../Home/LikeCommentModel';
import { useNavigate } from 'react-router-dom';
import { logoutSinglePostData } from '../../../features/post/getSinglePost';
import { setNavigate } from '../../../features/navigation/Navigation';
import { Avatar } from 'antd';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

function UserPosts({ post, likeBtn, updateProfile }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [openMenu, setOpenMenu] = React.useState("like");
    const [reason, setReason] = React.useState("");
    const handleOpen = (value, reason) => { setReason(reason); setOpenMenu(value); setOpen(true) };
    const handleClose = () => setOpen(false);

    const likeHandler = async (postId) => {
        await dispatch(setGetlike(postId));
        await dispatch(getMe());
        await updateProfile();
    }

    const handlePost = async (postID) => {
        dispatch(logoutSinglePostData());
        dispatch(setNavigate("otherPost"));
        navigate(`/Dashboard/Post/${postID}`);
    }

    return (
        <Grid item md={3} sm={6} xs={12}>
            <Box border={"solid"} borderRadius={3} height={"100%"}>
                <Box overflow={"hidden"} padding={2} className="cursorPointer" onClick={() => { handlePost(post.id) }}>
                    <img
                        src={
                            post.image !== "undefined"
                                ? process.env.REACT_APP_BACKEND_URL + "/" + post.image
                                : "https://t4.ftcdn.net/jpg/04/70/29/97/240_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                        }
                        alt="Post Pic."
                        width={"100%"}
                        height={"100%"}
                        style={{
                            aspectRatio: "1",
                            objectFit: "cover",
                            borderRadius: "5px",
                        }}
                    />
                </Box>
                <Box paddingX={2} textAlign={"center"}>
                    <h6>{post.title}</h6>
                </Box>
                <Box paddingX={2} textAlign={"start"}>
                    <p>{post.description}</p>
                </Box>
                <CardActions disableSpacing>
                    <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                        <Box>
                            <IconButton aria-label="add to like" onClick={() => { likeHandler(post.id) }}>
                                {
                                    (!likeBtn) ? <FavoriteIcon /> : <FavoriteIcon style={{ fill: '#E73B6E' }} />
                                }
                            </IconButton>
                            <IconButton aria-label="comment" onClick={() => { handleOpen("comment", "LikeComment") }}>
                                <ChatBubbleOutlineIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </CardActions>
                <Box paddingX={2}>
                    <Box className="cursorPointer" onClick={() => { handleOpen("like", "LikeComment") }} display={"flex"} alignItems={"center"}>
                        <Box>
                            <Avatar.Group maxCount={3} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                                {
                                    (post?.likes.length !== 0)
                                        ?
                                        post.likes.map((user) => {
                                            return <Avatar src={
                                                user?.user?.avatar != null
                                                    ? process.env.REACT_APP_BACKEND_URL + "/" + user?.user?.avatar
                                                    : "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
                                            } key={user.id} />
                                        })
                                        :
                                        post.likes.length
                                }
                            </Avatar.Group>
                        </Box>
                        <Box marginX={2}>
                            Likes
                        </Box>
                    </Box>
                    <Box className="cursorPointer" onClick={() => { handleOpen("comment", "LikeComment") }}>
                        {post.comments.length} Comments
                    </Box>
                </Box>
                <Box display={"flex"} flexWrap={"wrap"} margin={1}>
                    {
                        post?.hashTag && post?.hashTag.map((tag, i) => {
                            return (
                                <Box key={i} border={"2px solid"} borderRadius={1} backgroundColor={"#E5F6FD"} margin={"3px"} paddingX={1} width={"fit-content"} >
                                    <b>#</b>{tag}
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        (reason === "LikeComment")
                            ?
                            <LikeCommentModel postDetails={post} openMenu={openMenu} />
                            :
                            ""
                    }
                </Box>
            </Modal>
        </Grid>
    )
}

export default UserPosts
