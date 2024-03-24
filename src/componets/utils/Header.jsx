import { Box, Container, Grid } from "@mui/material";
import React from "react";

function Header() {
  return (
    <Box margin={"15px"}>
      <Container>
        <Grid container display={"flex"} justifyContent={"space-between"}>
          <Grid item md={1} sm={2} xs={4}>
            <img
              src={require("../../images/Instragram-Logo.png")}
              alt=""
              srcSet=""
              width={"100%"}
            />
          </Grid>
          <Grid item md={11} sm={10} xs={8} display={"flex"} alignItems={"center"}>
            <Box textAlign={"end"} width={"100%"} fontFamily={"system-ui"} color={"#FF0B4F"}>
              <h1>Instragram</h1>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Header;
