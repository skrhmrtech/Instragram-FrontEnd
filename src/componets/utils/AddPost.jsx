import { Box, Button, Card, Grid, Input } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MuiFileInput } from "mui-file-input";
import { useDispatch, useSelector } from "react-redux";
import { CreatePost } from "../../features/post/PostCRUD";
import { getMe } from "../../features/user/UserProfile";
import { getPosts } from "../../features/post/FollowerFollowingPost";

function AddPost() {
  const dispatch = useDispatch();

  const totalNoOfPost = useSelector(state => state.followers.totalNoOfPost);

  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  const AddPostSchema = Yup.object().shape({
    title: Yup.string().required("Required").min(3, "Min 3 Characters."),
    description: Yup.string()
      .required("Required")
      .min(10, "Min 10 Characters."),
  });

  const formik = new useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: AddPostSchema,
    onSubmit: async (values) => {
      if (file != null) {
        values["image"] = file;

        var response = await dispatch(CreatePost(values));
        if (response.payload.error === false) {
          formik.handleReset();
          setFile(null);
        }

        await dispatch(getPosts({ skip: 0, limit: (totalNoOfPost)+1 }));
        await dispatch(getMe());
      } else {
        setError("Select File");
      }
    },
  });

  return (
    <Box padding={2} height={"100%"}>
      <Grid container height={"100%"}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          width={"100%"}
          alignItems={"center"}
        >
          <Grid item md={6} sm={9} xs={12}>
            <Box border={"dashed"} borderColor={"#FF00C6"} borderRadius={2}>
              <Card>
                <Box
                  margin={2}
                  fontFamily={"sans-serif"}
                  fontWeight={"bolder"}
                  color={"#FF0B4F"}
                >
                  <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                    {file === null ? <div>{error}</div> : null}
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
                        Add Post
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
  );
}

export default AddPost;
