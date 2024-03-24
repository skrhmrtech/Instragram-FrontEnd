import { Box, Button, Card, Grid, Input } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MuiFileInput } from "mui-file-input";
import { useDispatch } from "react-redux";
import { RemoveProfile, UpdateUser, getMe } from "../../../features/user/UserProfile";
import CancelIcon from '@mui/icons-material/Cancel';

function EditProfile({ userDetails }) {
    const dispatch = useDispatch();

    const [file, setFile] = React.useState(null);

    const handleChange = (newFile) => {
        setFile(newFile);
    };

    const EditProfileSchema = Yup.object().shape({
        fname: Yup.string().required("Required").min(4, "Min 4 Characters."),
        lname: Yup.string().required("Required").min(4, "Min 4 Characters."),
        bio: Yup.string().required("Required").min(10, "Min 10 Characters."),
    });

    const formik = new useFormik({
        initialValues: {
            fname: userDetails.fname,
            lname: userDetails.lname,
            bio: userDetails.bio,
        },
        validationSchema: EditProfileSchema,
        onSubmit: async (values) => {
            values["image"] = file;
            var response = await dispatch(UpdateUser(values));
            if (response.payload.error === false) {
                setFile(null);
            }
            dispatch(getMe());
        },
    });

    const removeProfileHandler = async () => {
        dispatch(RemoveProfile());
        dispatch(getMe());
    }

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
                                                        name="userImage"
                                                        placeholder="Select User-Image"
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
                                                                userDetails.avatar != null
                                                                    ? process.env.REACT_APP_BACKEND_URL + "/" + userDetails.avatar
                                                                    : "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
                                                            }
                                                            alt="Profile Pic."
                                                            width={"100%"}
                                                        />
                                                    </Box>
                                                    {
                                                        (userDetails.avatar != null)
                                                            ?
                                                            <CancelIcon sx={{ "fontSize": "40px" }} onClick={removeProfileHandler} />
                                                            :
                                                            ""
                                                    }
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Box paddingY={1}>
                                            <Input
                                                type="text"
                                                name="fname"
                                                id="fname"
                                                placeholder="First Name"
                                                fullWidth={true}
                                                onChange={formik.handleChange}
                                                value={formik.values.fname}
                                            />
                                        </Box>
                                        {formik.errors.fname && formik.touched.fname ? (
                                            <div>{formik.errors.fname}</div>
                                        ) : null}
                                        <Box paddingY={1}>
                                            <Input
                                                type="text"
                                                name="lname"
                                                id="lname"
                                                placeholder="Last Name"
                                                fullWidth={true}
                                                onChange={formik.handleChange}
                                                value={formik.values.lname}
                                            />
                                        </Box>
                                        {formik.errors.lname && formik.touched.lname ? (
                                            <div>{formik.errors.lname}</div>
                                        ) : null}
                                        <Box paddingY={1}>
                                            <Input
                                                type="text"
                                                name="bio"
                                                id="bio"
                                                placeholder="Bio"
                                                fullWidth={true}
                                                onChange={formik.handleChange}
                                                value={formik.values.bio}
                                            />
                                        </Box>
                                        {formik.errors.bio && formik.touched.bio ? (
                                            <div>{formik.errors.bio}</div>
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

export default EditProfile
