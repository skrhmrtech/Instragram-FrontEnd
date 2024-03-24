import { Box, Grid } from "@mui/material";
import React from "react";
import UserPosts from "./UserPosts";
import { useSelector } from "react-redux";

function AccountBottom({ userProfile, updateProfile }) {

  const postData = userProfile.posts;
  const currentUser = useSelector((state) => state.userProfile.userProfile);

  return (
    <Box>
      <Grid container spacing={2}>
        {postData.map((post) => {
          const likeBtn = post.likes.find((l) => {
            return l?.user?.id === currentUser[0]?.id;
          })

          return (
            <UserPosts post={post} likeBtn={likeBtn} key={post.id} updateProfile={updateProfile} />
          );
        })}
        {
          (!(postData.length))
            ?
            <Box textAlign={"center"} border={"dashed"} width={"100%"} marginY={5}>
              <h3>
                <b>
                  No any Post Found.
                </b>
              </h3>
            </Box>
            :
            ""
        }
      </Grid>
    </Box>
  );
}

export default AccountBottom;
