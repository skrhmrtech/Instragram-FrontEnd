import React, { useEffect, useState } from "react";
import Header from "./utils/Header";
import Footer from "./utils/Footer";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { UserRegistration } from "../features/user/LoginRegistration";

function Registration() {
  var dispatch = useDispatch();
  var navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      localStorage.removeItem("jwtToken");
    }
  }, []);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("Required").min(3, "Min 3 Characters."),
    lastName: Yup.string().required("Required").min(3, "Min 3 Characters."),
    gender: Yup.string().required("Required"),
    bio: Yup.string().required("Required").min(10, "Min 10 Characters."),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(7, "Min 7 Characters.")
      .max(15, "Max 15 Characters.")
      .required("Required"),
  });

  const formik = new useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      bio: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setLoading(true);
      var response = await dispatch(UserRegistration(values));
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
                  <h1>Registration</h1>
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
                    <Grid container>
                      <Grid item xs={6}>
                        <Box paddingY={1} paddingRight={1}>
                          <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            fullWidth={true}
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                          />
                        </Box>
                        {formik.errors.firstName && formik.touched.firstName ? (
                          <div>{formik.errors.firstName}</div>
                        ) : null}
                      </Grid>
                      <Grid item xs={6}>
                        <Box paddingY={1} paddingLeft={1}>
                          <Input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Last Name"
                            fullWidth={true}
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                          />
                        </Box>
                        {formik.errors.lastName && formik.touched.lastName ? (
                          <div>{formik.errors.lastName}</div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Box paddingY={1} color={"#000"}>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Gender
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                            name="gender"
                            onChange={formik.handleChange}
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                            name="gender"
                            onChange={formik.handleChange}
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Other"
                            name="gender"
                            onChange={formik.handleChange}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                    {formik.errors.gender && formik.touched.gender ? (
                      <div>{formik.errors.gender}</div>
                    ) : null}
                    <Box paddingY={1}>
                      <Input
                        type="text"
                        name="bio"
                        id="bio"
                        placeholder="Bio"
                        fullWidth={true}
                        onChange={formik.handleChange}
                        value={formik.values.bio}
                      />
                    </Box>
                    {formik.errors.bio && formik.touched.bio ? (
                      <div>{formik.errors.bio}</div>
                    ) : null}
                    <Box paddingY={1}>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        fullWidth={true}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                    </Box>
                    {formik.errors.email && formik.touched.email ? (
                      <div>{formik.errors.email}</div>
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
                        Already Account ?{" "}
                        <Link to={"/"} color={"blue"} underline={"none"}>
                          Sign in
                        </Link>
                      </Box>
                      <Button type="submit" variant="contained" disabled={loading}>
                        {
                          (loading)
                            ? <CircularProgress color="inherit" style={{ width: "15px", height: "15px" }} />
                            : ""
                        }
                        <Box paddingLeft={(loading) ? 1 : 0}>
                          Register
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

export default Registration;
