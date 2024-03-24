import { Box, Button, Card, Grid, Input } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MuiFileInput } from "mui-file-input";
import { useDispatch } from "react-redux";
import { getMe } from "../../../features/user/UserProfile";
import { UpdatePost } from "../../../features/post/PostCRUD";

function EditPost({ postDetails }) {
    const dispatch = useDispatch();

    const [file, setFile] = React.useState(null);

    const handleChange = (newFile) => {
        setFile(newFile);
    };

    const AddPostSchema = Yup.object().shape({
        title: Yup.string().required("Required").min(4, "Min 4 Characters."),
        description: Yup.string()
            .required("Required")
            .min(10, "Min 10 Characters."),
    });

    const formik = new useFormik({
        initialValues: {
            title: postDetails.title,
            description: postDetails.description + " #" + postDetails.hashTag.join(" #"),
        },
        validationSchema: AddPostSchema,
        onSubmit: async (values) => {
            values["image"] = file;
            values["postID"] = postDetails.id;
            var response = await dispatch(UpdatePost(values));
            if (response.payload.error === false) {
                setFile(null);
            }
            dispatch(getMe());
        },
    });

    return (
        <Box height={"100%"}>
            <Grid container height={"100%"}>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    width={"100%"}
                    alignItems={"center"}
                >
                    <Grid item xs={12}>
                        <Box border={"dashed"} borderColor={"#FF00C6"} borderRadius={2}>
                            <Card>
                                <Box
                                    margin={2}
                                    fontFamily={"sans-serif"}
                                    fontWeight={"bolder"}
                                    color={"#FF0B4F"}
                                >
                                    <form onSubmit={formik.handleSubmit} autoComplete="off">
                                        <Grid container spacing={1} display={"flex"} alignItems={"center"}>
                                            <Grid item xs={6}>
                                                <Box paddingY={1}>
                                                    <MuiFileInput
                                                        type="file"
                                                        value={file}
                                                        title="Select File"
                                                        name="postImage"
                                                        placeholder="Select Post-Image"
                                                        style={{ width: "100%" }}
                                                        onChange={handleChange}
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6} padding={2}>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                                    <Box borderRadius={5} overflow={"hidden"}>
                                                        <img
                                                            src={
                                                                postDetails.image != null
                                                                    ? process.env.REACT_APP_BACKEND_URL + "/" + postDetails.image
                                                                    : "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
                                                            }
                                                            alt="Profile Pic."
                                                            width={"100%"}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Box paddingY={1}>
                                            <Input
                                                type="text"
                                                name="title"
                                                id="title"
                                                placeholder="Title"
                                                fullWidth={true}
                                                onChange={formik.handleChange}
                                                value={formik.values.title}
                                            />
                                        </Box>
                                        {formik.errors.title && formik.touched.title ? (
                                            <div>{formik.errors.title}</div>
                                        ) : null}
                                        <Box paddingY={1}>
                                            <Input
                                                type="text"
                                                name="description"
                                                id="description"
                                                placeholder="Description"
                                                fullWidth={true}
                                                onChange={formik.handleChange}
                                                value={formik.values.description}
                                            />
                                        </Box>
                                        {formik.errors.description && formik.touched.description ? (
                                            <div>{formik.errors.description}</div>
                                        ) : null}
                                        <Box
                                            paddingY={3}
                                            display={"flex"}
                                            justifyContent={"center"}
                                        >
                                            <Button type="submit" variant="contained">
                                                Update
                                            </Button>
                                        </Box>
                                    </form>
                                </Box>
                            </Card>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
        </Box>
    )
}

export default EditPost
