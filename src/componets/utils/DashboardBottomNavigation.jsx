import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { setNavigate } from "../../features/navigation/Navigation";

function DashboardBottomNavigation({
  currentNavigation,
}) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(currentNavigation);

  const handleChange = (event, newValue) => {
    dispatch(setNavigate(newValue));
    setValue(newValue);
  };

  return (
    <Box
      width={"100%"}      
      borderRadius={"0px 0px 50px 50px"}
      overflow={"hidden"}
      border={"3px solid #E73B6E"}
    >
      <BottomNavigation
        sx={{ width: "100%" }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Add Post" value="addpost" icon={<AddBoxIcon />} />
        <BottomNavigationAction label="Notification" value="notification" icon={<NotificationsActiveIcon />} />
        <BottomNavigationAction label="Account" value="account" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default DashboardBottomNavigation;
