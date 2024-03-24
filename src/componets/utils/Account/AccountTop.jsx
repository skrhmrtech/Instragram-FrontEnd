import { Box, Button, Grid, Modal } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import FollowerFollowings from "./FollowersFollowings";
import EditProfile from "./EditProfile";
import SettingOptions from "./SettingOptions";

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

function AccountTop({ userProfile }) {

  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState("followers");
  const [reason, setReason] = React.useState("");
  const handleOpen = (value, reason) => { setReason(reason); setOpenMenu(value); setOpen(true) };
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Grid
        container
        display={"flex"}
        justifyContent={"space-between"}
        textAlign={"center"}
      >
        <Grid item xs={12} textAlign={"start"}>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingBottom={1}>
            <Box>
              <h5>{userProfile.username}</h5>
            </Box>
            <Box marginX={"75px"}>
              <SettingOptions userProfileStatus={userProfile.isPublic} />
            </Box>
          </Box>
        </Grid>
        <Grid item md={2} sm={3} xs={4}>
          <Box borderRadius={"50%"} overflow={"hidden"}>
            <img
              src={
                userProfile.avatar != null
                  ? process.env.REACT_APP_BACKEND_URL + "/" + userProfile.avatar
                  : "https://www.vhv.rs/dpng/d/256-2569650_men-profile-icon-png-image-free-download-searchpng.png"
              }
              alt="Profile Pic."
              width={"100%"}
            />
          </Box>
          <Box paddingTop={2}>
            <h4>{userProfile.fname + " " + userProfile.lname}</h4>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
          >
            <Grid item md={4} sm={6} xs={12}>
              <Box textAlign={"center"}>
                <h1>{userProfile.posts.length}</h1>
                <h3>Posts</h3>
              </Box>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Box textAlign={"center"} onClick={() => { handleOpen("followers", "Follow") }} className="cursorPointer">
                <h1>{userProfile.followers.length}</h1>
                <h3>Followers</h3>
              </Box>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Box textAlign={"center"} onClick={() => { handleOpen("followings", "Follow") }} className="cursorPointer">
                <h1>{userProfile.following.length}</h1>
                <h3>Following</h3>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={5} xs={12}>
          <Box paddingBottom={2} textAlign={"justify"} textOverflow={"clip"} textTransform={"capitalize"} sx={{ wordBreak: "break-all" }}>
            <p>
              {userProfile.bio}
            </p>
          </Box>
        </Grid>
        <Grid item sm={7} xs={12}>
          <Box
            paddingBottom={2}
            textAlign={"justify"}
            width={"100%"}
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"end"}
          >
            <Box margin={2}>
              <Button variant="outlined" startIcon={<EditIcon />} onClick={() => { handleOpen("", "Profile") }}>
                Edit Profile
              </Button>
            </Box>
            <Box margin={2}>
              <Button
                variant="outlined"
                color="success"
                endIcon={<ShareIcon />}
              >
                Share Profile
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            (reason === "Follow")
              ?
              <FollowerFollowings userDetails={userProfile} openMenu={openMenu} />
              :
              <EditProfile userDetails={userProfile} />
          }
        </Box>
      </Modal>
    </Box>
  );
}

export default AccountTop;
