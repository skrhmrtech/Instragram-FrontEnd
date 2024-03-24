import { Box, Button, Grid, Modal } from "@mui/material";
import React from "react";
import ChatIcon from '@mui/icons-material/Chat';
import FollowerFollowings from "../Account/FollowersFollowings";
import { useDispatch } from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { setNavigate } from "../../../features/navigation/Navigation";
import RenderPADBButton from "../RenderPADBButton";

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

function AccountTop({ userProfile, currentStatus, currentConnection }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState("followers");
  const handleOpen = (value, reason) => { setOpenMenu(value); setOpen(true) };
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
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box paddingBottom={2}>
              <ArrowBackIcon className="cursorPointer" onClick={() => { dispatch(setNavigate("home")); navigate(-1); }} />
            </Box>
            <Box paddingBottom={2}>
              <h5>{userProfile.username}</h5>
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
              <Box textAlign={"center"} className="cursorPointer" onClick={() => { handleOpen("followers", "Follow") }}>
                <h1>{userProfile.followers.length}</h1>
                <h3>Followers</h3>
              </Box>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Box textAlign={"center"} className="cursorPointer" onClick={() => { handleOpen("followings", "Follow") }}>
                <h1>{userProfile.following.length}</h1>
                <h3>Following</h3>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={5} xs={12}>
          <Box paddingBottom={2} textAlign={"justify"}>
            <h6>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium, neque. Tempore, ratione obcaecati unde mollitia
              repudiandae quos voluptatum omnis blanditiis error quaerat ipsa,
              facere ipsam!
            </h6>
          </Box>
        </Grid>
        <Grid item sm={7} xs={12}>
          <Box
            paddingBottom={2}
            textAlign={"justify"}
            width={"100%"}
            display={"flex"}
            justifyContent={"end"}
          >
            <Box margin={2}>
              <RenderPADBButton userID={userProfile.id} />
            </Box>
            <Box margin={2}>
              <Button
                variant="outlined"
                startIcon={<ChatIcon />}
              >
                Message
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
            ((currentStatus === "Followers" || currentStatus === "Following" || currentStatus === "Friends") && currentConnection.status === "accepted") || currentConnection?.receiver_user?.isPublic === true || currentConnection?.sender_user?.isPublic === true || currentConnection?.isPublic === true
              ?
              <FollowerFollowings userDetails={userProfile} openMenu={openMenu} />
              :
              <h5>
                <center>
                  <b>
                    This user account is Private.
                  </b>
                </center>
              </h5>
          }
        </Box>
      </Modal>
    </Box>
  );
}

export default AccountTop;
