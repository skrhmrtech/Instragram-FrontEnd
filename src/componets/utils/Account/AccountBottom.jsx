import { Box, Grid } from "@mui/material";
import React from "react";
import UserPosts from "./UserPosts";

function AccountBottom({ userProfile }) {

  const postData = userProfile.posts;

  return (
    <Box>
      <Grid container spacing={2}>
        {postData.map((post) => {

          const likeBtn = post.likes.find((l) => {
            return l?.user?.id === userProfile?.id;
          })

          return (
            <UserPosts post={post} likeBtn={likeBtn} key={post.id} />
          );
        })}
        {
          (!(postData.length))
            ?
            <Box textAlign={"center"} border={"dashed"} width={"100%"} marginY={5}>
              <h3>
                <b>
                  No any Post Uploaded.
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
