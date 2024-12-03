import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Backdrop,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import * as yup from "yup";
import { common_axios } from "../../App";
import Loader from "../../Components/Loader";
export default function ForgotPage() {
  const [queryString, setQueryString] = useState("");
  const location = useLocation();
  const myParam = new URLSearchParams(location.search).get("qStr");
  useEffect(() => {
    setQueryString(location.search.slice(location.search.indexOf("=") + 1));
  }, [myParam]);
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState("d-none");
  // const [timer, setTimer] = useState(60);
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const history = useHistory();
  const theme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          asterisk: {
            color: "red",
          },
        },
      },
    },
  });
  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );
  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);
  const resetTimer = function () {
    if (!timer) {
      setTimer(29);
    }
  };
  // const timeOutCallback = useCallback(
  //   () => setTimer((currTimer) => currTimer - 1),
  //   []
  // );
  // useEffect(() => {
  //   timer > 0 && setTimeout(timeOutCallback, 1000);
  // }, [timer, timeOutCallback]);
  // const resetTimer = function () {
  //   if (!timer) {
  //     setTimer(59);
  //   }
  // };
  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(false);
  };
  const handleClickShowPassword1 = () => {
    setShowPassword1(true);
  };
  const handleMouseDownPassword1 = () => {
    setShowPassword1(false);
  };
  const FormSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], 'Must match "password" field value'),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      if (values.confirmPassword != values.password) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Password and confirm password must be same",
        });
        return;
      }
      let formdata = {
        password: values.password,
        confirmPassword: values.confirmPassword,
        queryString: queryString,
      };
      try {
        const res = await common_axios.post(
          "/authenc/password/change/verify",
          formdata
        );
        if (res?.data?.statusDescription?.statusCode == 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Password Changed Successfully",
          }).then(() => {
            history.push("/");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res?.data?.statusDescription?.statusMessage,
          });
        }
      } catch (Error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: Error,
        });
      }
    },
  });
  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Backdrop
          sx={{
            transform: "translateZ(0)",
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
          // onClick={handleClose}
        >
          <Loader />
        </Backdrop>
        <ToastContainer autoClose={4000} />
        <ThemeProvider theme={theme}>
          <div className="container-fluid px-0">
            <div
              className="row d-md-flex  h_vh align-items-cente mx-0"
              style={{ marginTop: "100px" }}
            >
              <div
                className="col-md-5 offset-md-3 d-flex align-items-center bg_8 p-4"
                style={{ padding: "3.5rem" }}
              >
                <div className="w-100">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="" id="sign_in">
                      <div className="">
                        <div className="text-center">
                          <KeyIcon
                            style={{
                              fontSize: "25px",
                              color: "white",
                              border: "0.5px solid #0083AD",
                              borderRadius: "30px",
                              backgroundColor: "#0083AD",
                            }}
                          />
                        </div>
                        <div className="text-center mt-2">
                          <span className="d-inline-block text-capitalize">
                            Forgot Password
                          </span>
                        </div>
                      </div>
                      <div className="my-4">
                        <div className="input-group input-group-outline input_field">
                          <div className="col-md-12 d-inline-flex">
                            <div className="me-2 mt-3">
                              {/* <LocalPhoneIcon style={{ fontSize: "17px" }} /> */}
                            </div>
                            <TextField
                              required
                              className="w-100"
                              label="Password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              // variant="standard"
                              size="small"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                              }
                              helperText={
                                formik.touched.password &&
                                formik.errors.password
                              }
                              InputProps={{
                                // <-- This is where the toggle button is added.
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPassword ? (
                                        <VisibilityIcon
                                          sx={{ color: "#85CBF2" }}
                                        />
                                      ) : (
                                        <VisibilityOffIcon
                                          sx={{ color: "#85CBF2" }}
                                        />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                          <div className="col-md-12 d-inline-flex mt-3">
                            <div className="me-2 mt-3">
                              {/* <LocalPhoneIcon style={{ fontSize: "17px" }} /> */}
                            </div>
                            <TextField
                              required
                              size="small"
                              className="w-100"
                              label="Confirm Password"
                              name="confirmPassword"
                              type={showPassword1 ? "text" : "password"}
                              value={formik.values.confirmPassword}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.confirmPassword &&
                                Boolean(formik.errors.confirmPassword)
                              }
                              helperText={
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword
                              }
                              InputProps={{
                                // <-- This is where the toggle button is added.
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword1}
                                      onMouseDown={handleMouseDownPassword1}
                                    >
                                      {showPassword1 ? (
                                        <VisibilityIcon
                                          sx={{ color: "#85CBF2" }}
                                        />
                                      ) : (
                                        <VisibilityOffIcon
                                          sx={{ color: "#85CBF2" }}
                                        />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn bg-primary text-white bg-gradient-primary register_grad d-block w-100 m-0"
                      >
                        Submit
                      </button>
                      <div className="row my-3">
                        <div className="col-md-6">
                          {/* <div className="text-start fw-bold">
                                                        <a
                                                            href="#"
                                                            onClick={formik.handleReset}
                                                            className="text-capitalize link-info"
                                                        >
                                                            Reset
                                                        </a>
                                                    </div> */}
                        </div>
                        <div className="col-md-6">
                          <div
                            className="text-end  fw-bold link-info"
                            id="sign_up_in"
                          >
                            <Link
                              to="/"
                              className="text-capitalize"
                              onClick={() => {
                                localStorage.clear();
                              }}
                            >
                              Log In
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </main>
    </>
  );
}
