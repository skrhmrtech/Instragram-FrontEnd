import React, { useEffect, useState } from "react";
import Header from "./utils/Header";
import Footer from "./utils/Footer";
import { Box, Button, Card, CircularProgress, Container, Input } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserLogin } from "../features/user/LoginRegistration";
import { useDispatch } from "react-redux";

function Login() {
  var dispatch = useDispatch();
  var navigate = useNavigate();

  const [loading,setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      localStorage.removeItem("jwtToken");
    }
  }, []);

  const SignupSchema = Yup.object().shape({
    userName: Yup.string().required("Required"),
    password: Yup.string()
      .min(7, "Min 7 Characters.")
      .max(15, "Max 15 Characters.")
      .required("Required"),
  });

  const formik = new useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setLoading(true);
      var response = await dispatch(UserLogin(values));
      setLoading(false);
      if (response.payload.error === false) {
        formik.handleReset();
        setTimeout(() => {
          navigate("/Dashboard");
        }, 1000);
      }
    },
  });

  return (
    <Box>
      <Header />

      <Container>
        <Grid2 container marginY={4} display={"flex"} justifyContent={"center"}>
          <Grid2 item md={6} sm={8} xs={12}>
            <Card variant="outlined">
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                border={"3px solid #2165AD"}
                borderRadius={2}
              >
                <Box
                  fontFamily={"sans-serif"}
                  fontWeight={"bolder"}
                  color={"#FF0B4F"}
                  padding={2}
                >
                  <h1>Login</h1>
                </Box>
                <Box border={"2px solid #2165AD"} width={"100%"} />
                <Box
                  fontFamily={"sans-serif"}
                  fontWeight={"bolder"}
                  color={"#FF0B4F"}
                  width={"100%"}
                  padding={3}
                >
                  <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <Box paddingY={1}>
                      <Input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="Username"
                        fullWidth={true}
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                      />
                    </Box>
                    {formik.errors.userName && formik.touched.userName ? (
                      <div>{formik.errors.userName}</div>
                    ) : null}
                    <Box paddingY={1}>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        fullWidth={true}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                    </Box>
                    {formik.errors.password && formik.touched.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                    <Box
                      paddingY={3}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Box color={"#A800EE"}>
                        Not Account ?{" "}
                        <Link
                          to={"/Registration"}
                          color={"blue"}
                          underline={"none"}
                        >
                          Sign up
                        </Link>
                      </Box>
                      <Button type="submit" variant="contained" disabled={loading}>
                        {
                          (loading)
                          ?<CircularProgress color="inherit" style={{ width: "15px", height: "15px" }} />
                          :""
                        }
                        <Box paddingLeft={(loading)?1:0}>
                          Login Now
                        </Box>
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Box>
            </Card>
          </Grid2>
        </Grid2>
      </Container>

      <Footer />
    </Box>
  );
}

export default Login;
