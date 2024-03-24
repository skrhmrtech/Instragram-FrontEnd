import { BottomNavigation, BottomNavigationAction, Box, Button, Grid, Input } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import { removeComments, setGetComments } from '../../../features/post/LikeComments';
import { getPosts } from '../../../features/post/FollowerFollowingPost';
import DeleteIcon from '@mui/icons-material/Delete';
import { getMe } from "../../../features/user/UserProfile";
import { logoutSingleUserData } from "../../../features/user/getSingleUser";
import { setNavigate } from '../../../features/navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import RenderPADBButton from '../RenderPADBButton';


function LikeCommentModel({ postDetails, openMenu, updatePost }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.userProfile.userProfile);
    const currentNavigation = useSelector(state => state.navigate.navigate);
    const totalNoOfPost = useSelector(state => state.followers.totalNoOfPost);

    const [value, setValue] = React.useState(openMenu);

    const AddCommentSchema = Yup.object().shape({
        comments: Yup.string()
            .required("Required")
            .min(7, "Min 7 Characters."),
    });
    const formik = new useFormik({
        initialValues: {
            comments: "",
        },
        validationSchema: AddCommentSchema,
        onSubmit: async (values) => {
            await dispatch(setGetComments({
                postID: postDetails.id,
                message: values.comments
            }));
            if (currentNavigation === "otherPost") {
                updatePost();
            }
            await dispatch(getPosts({ skip: 0, limit: totalNoOfPost }));
            await dispatch(getMe());
            formik.handleReset();
        },
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const removeCommentHandler = async (postID, commentID) => {
        dispatch(removeComments({ postID, commentID }));
        if (currentNavigation === "otherPost") {
            updatePost();
        }
        await dispatch(getPosts({ skip: 0, limit: totalNoOfPost }));
        await dispatch(getMe());
    }

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
                    label="Likes"
                    value="like"
                    icon={<FavoriteIcon />}
                />
                <BottomNavigationAction
                    label="Comments"
                    value="comment"
                    icon={<ChatBubbleOutlineIcon />}
                />
            </BottomNavigation>

            <Box minHeight={400} border={"dashed"} position={"relative"} borderRadius={1} padding={1}>
                {
                    (value === "like")
                        ?
                        <Box overflow={"auto"} maxHeight={400}>
                            {
                                postDetails.likes.map((user) => {
                                    return (
                                        <Grid item sm={12} key={user.id}>
                                            <Box border={"solid"} padding={1} marginY={1} borderRadius={3} height={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                                <Box display={"flex"} alignItems={"center"} className="cursorPointer" onClick={() => { handleUserProfile(user.user.id) }}>
                                                    <Box overflow={"hidden"}>
                                                        <img
                                                            src={
                                                                user.user.avatar != null
                                                                    ? process.env.REACT_APP_BACKEND_URL + "/" + user.user.avatar
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
                                                        <h6>{user.user.fname + " " + user.user.lname}</h6>
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <RenderPADBButton userID={user.user.id} />
                                                </Box>
                                            </Box>
                                        </Grid>
                                    )
                                })
                            }
                            {
                                (postDetails.likes.length === 0) ? <Box textAlign={"center"} marginY={4}>"No Any Likes"</Box> : ""
                            }
                        </Box>
                        :
                        <Box>
                            <Box maxHeight={320} overflow={"auto"}>
                                {
                                    postDetails.comments.map((user) => {
                                        return (
                                            <Grid item sm={12} key={user.id}>
                                                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                                    <Box padding={1} height={"100%"} display={"flex"} alignItems={"center"}>
                                                        <Box overflow={"hidden"} className="cursorPointer" onClick={() => { handleUserProfile(user.user.id) }}>
                                                            <img
                                                                src={
                                                                    user.user.avatar != null
                                                                        ? process.env.REACT_APP_BACKEND_URL + "/" + user.user.avatar
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
                                                        <Box paddingX={2} textAlign={"start"}>
                                                            <h6 className="cursorPointer" onClick={() => { handleUserProfile(user.user.id) }}>{user.user.fname + " " + user.user.lname}</h6>
                                                            <p>{user.message}</p>
                                                        </Box>
                                                    </Box>
                                                    <Box marginX={3}>
                                                        {
                                                            (currentUser[0]?.id === user.user.id)
                                                                ?
                                                                <DeleteIcon onClick={() => { removeCommentHandler(postDetails.id, user.id) }} />
                                                                :
                                                                ""
                                                        }
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        )
                                    })
                                }
                                {
                                    (postDetails.comments.length === 0) ? <Box textAlign={"center"} marginY={4}>"No Any Comments"</Box> : ""
                                }
                            </Box>
                            <Box color={"#FF0B4F"} position={"absolute"} bottom={0} width={"100%"} paddingX={3}>
                                <form onSubmit={formik.handleSubmit} autoComplete="off">
                                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingY={1}>
                                        <Box width={"50%"}>
                                            <Box>
                                                <Input
                                                    type="text"
                                                    name="comments"
                                                    id="comments"
                                                    placeholder="Add Comments"
                                                    fullWidth={true}
                                                    onChange={formik.handleChange}
                                                    value={formik.values.comments}
                                                />
                                            </Box>
                                            {formik.errors.comments && formik.touched.comments ? (
                                                <div>{formik.errors.comments}</div>
                                            ) : null}
                                        </Box>
                                        <Box
                                            display={"flex"}
                                            justifyContent={"center"}
                                        >
                                            <Button type="submit" variant="contained">
                                                Add Comment
                                            </Button>
                                        </Box>
                                    </Box>

                                </form>
                            </Box>
                        </Box>
                }
            </Box>
        </Box>
    )
}

export default LikeCommentModel
