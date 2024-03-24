import { Box, Container, Link } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Box paddingY={2}>
      <Container>
        <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"} >
          <Box textAlign={"center"} width={"100%"} fontWeight={"bold"} color={"#FF00C6"}>
            © 2024 All Rights Reserved by Instragram.
          </Box>
          <Box textAlign={"center"} fontWeight={"bold"} width={"100%"} display={"flex"} justifyContent={"center"} flexWrap={"wrap"}>
            <Box>
              <Link href="https://www.instagram.com" underline="none" color={"#A800EE"} paddingX={1}>
                Privacy Policy
              </Link>
            </Box>
            <Box>
              <Link href="https://www.instagram.com" underline="none" color={"#A800EE"} paddingX={1}>
                Contact US
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
