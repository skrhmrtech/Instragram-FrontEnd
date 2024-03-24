import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Box, Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setGetlike } from '../../../features/post/LikeComments';
import { setNavigate } from '../../../features/navigation/Navigation';
import { logoutSingleUserData } from '../../../features/user/getSingleUser';
import { useNavigate } from 'react-router-dom';
import { logoutSinglePostData } from '../../../features/post/getSinglePost';
import LikeCommentModel from '../Home/LikeCommentModel';
import { Avatar } from 'antd';
import { getMe } from '../../../features/user/UserProfile';

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

export default function PostCard({ userData, currentUser, changePostData }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const post = userData || [];
    const date = new Date(post.updatedAt);
    const postDate = date.getDate() + " " + ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()] + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const likeBtn = post.likes.find((l) => {
        return l?.user?.id === currentUser[0]?.id;
    })

    const [open, setOpen] = React.useState(false);
    const [openMenu, setOpenMenu] = React.useState("like");
    const handleOpen = (value) => { setOpenMenu(value); setOpen(true) };
    const handleClose = () => setOpen(false);

    const likeHandler = async (postId) => {
        changePostData();
        dispatch(setGetlike(postId));
        await dispatch(getMe());
    }

    const handleUserProfile = async (userID) => {
        dispatch(logoutSingleUserData());
        dispatch(setNavigate("otherUser"));
        navigate(`/Dashboard/User/${userID}`);
    }

    const handlePost = async (postID) => {
        changePostData();
        dispatch(logoutSinglePostData());
        dispatch(setNavigate("otherPost"));
        navigate(`/Dashboard/Post/${postID}`);
    }

    return (
        <Box>
            <Box paddingY={1}>
                <Card sx={{ width: "100%" }}>
                    <CardHeader
                        avatar={
                            <Box borderRadius={"50%"} overflow={"hidden"} className="cursorPointer" onClick={() => { handleUserProfile(userData.user_id) }}>
                                <img
                                    src={
                                        userData.user.avatar != null
                                            ? process.env.REACT_APP_BACKEND_URL + "/" + userData.user.avatar
                                            : "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
                                    }
                                    alt="Profile Pic."
                                    width={"45px"}
                                />
                            </Box>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={<Box className="cursorPointer" onClick={() => { handleUserProfile(userData.user_id) }}>{userData.user.fname + " " + userData.user.lname + " (" + userData.user.username + ")"}</Box>}
                        subheader={<Box className="cursorPointer" onClick={() => { handleUserProfile(userData.user_id) }}>{postDate}</Box>}
                    />
                    <Box paddingX={10} paddingBottom={1}>
                        {post.title}
                    </Box>
                    <CardMedia
                        component="img"
                        image={
                            post.image !== "undefined"
                                ? process.env.REACT_APP_BACKEND_URL + "/" + post.image
                                : "https://t4.ftcdn.net/jpg/04/70/29/97/240_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                        }
                        alt="Post Pic."
                        className="cursorPointer"
                        onClick={() => { handlePost(post.id) }}
                    />
                    <CardActions disableSpacing>
                        <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
                            <Box>
                                <IconButton aria-label="add to like" onClick={() => { likeHandler(post.id) }}>
                                    {
                                        (!likeBtn) ? <FavoriteIcon /> : <FavoriteIcon style={{ fill: '#E73B6E' }} />
                                    }
                                </IconButton>
                                <IconButton aria-label="comment" onClick={() => { handleOpen("comment") }}>
                                    <ChatBubbleOutlineIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <SendIcon />
                                </IconButton>
                            </Box>
                            <Box>
                                <IconButton aria-label="save">
                                    <BookmarkBorderIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </CardActions>
                    <Box paddingX={2}>
                        <Box className="cursorPointer" onClick={() => { handleOpen("like") }} display={"flex"} alignItems={"center"}>
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
                        <Box className="cursorPointer" onClick={() => { handleOpen("comment") }}>
                            {post.comments.length} Comments
                        </Box>
                    </Box>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {post.description}
                        </Typography>
                        <Box display={"flex"} flexWrap={"wrap"} marginTop={1}>
                            {
                                post?.hashTag && post?.hashTag.map((tag, i) => {
                                    return (
                                        <Box key={i} border={"2px solid"} borderRadius={1} backgroundColor={"#EDF7ED"} margin={"3px"} paddingX={1} width={"fit-content"} >
                                            <b>#</b>{tag}
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <LikeCommentModel postDetails={post} openMenu={openMenu} updatePost={() => { changePostData() }} />
                </Box>
            </Modal>

        </Box>
    );
}
