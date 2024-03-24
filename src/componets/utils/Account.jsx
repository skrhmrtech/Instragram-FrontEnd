import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import AccountTop from "./Account/AccountTop";
import AccountBottom from "./Account/AccountBottom";

function Account() {

  const data = useSelector((state) => state.userProfile.userProfile);

  return (
    <Box>
      {Array.isArray(data) && data.length ? (
        <Box margin={3}>
          <AccountTop userProfile={data[0]} />
          <AccountBottom userProfile={data[0]} />
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}

export default Account;
