import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Logo from "../assets/images/logo_outer.webp";
import {
  IconButton,
  InputAdornment,
  ThemeProvider,
  createTheme,
  Backdrop,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setLoader,
  setUserData,
  setisLoginUser,
} from "../redux/features/authSliceandSidebar";
import { common_axios } from "../App";
import { decryptBody, encryptBody } from "../utils/EncDecUtil";
import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { HistoryEduTwoTone } from "@mui/icons-material";
const LoginPage = () => {
  const params = useParams();

  const history = useHistory();
  const sendOtp = () => {};
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setisLogin] = useState(false);

  const [expenseId, setExpenseId] = useState("");

  const location = useLocation();

  const myParam = new URLSearchParams(location.search).get("expenseId");

  // useEffect(() => {
  //   // console.log(window.location.hash.includes("detail/"));

  //   // console.log(params.expenseId);
  // }, []);

  useEffect(() => {
    if (myParam) {
      // console.log(myParam);
      setExpenseId(myParam);
    }
  }, [myParam]);
  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: { color: "red" },
        },
      },
    },
  });

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  useEffect(() => {
    redirectToDashboard();
    removeSidebar();
  }, [isLogin]);
  const redirectToDashboard = () => {
    if (localStorage.getItem("token") != null) {
      setisLogin(true);
      history.push("/expense");
    }
  };
  const removeSidebar = () => {
    if (localStorage.getItem("token") != null) {
      setisLogin(true);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleMouseDownPassword = () => {
    setShowPassword(false);
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      otp: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validationSchema: yup.object({
      username: yup
        .string()
        .required("UserName is required")
        .min(10, "User Name should be minimum  20 characters long"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password should be minimum  6 characters long"),
    }),
    onSubmit: async (values) => {
      dispatch(setLoader(true));
      // setOpen(true)
      let formdata = {
        userName: values.username,
        password: values.password,
      };

      try {
        let res = await common_axios.post(`/auth/v1/login`, formdata);
        common_axios.defaults.headers["source"] = "1";
        common_axios.defaults.headers["appVersion"] = "0";

        if (res?.data?.statusDescription?.statusCode == 200) {
          if (res?.data?.user?.isactive == 1) {
            setOpen(false);
            console.log(res?.data.user);
            dispatch(setLoader(false));
            let token = res?.data.user?.userTokenDetails?.jwtToken;
            let userId = res?.data.user?.id;
            let user = res?.data?.user;
            let aesToken = res?.data?.user?.userTokenDetails?.aesKey;
            localStorage?.setItem("token", token);
            localStorage?.setItem("userId", "" + userId);
            localStorage?.setItem("user", JSON.stringify(user));
            localStorage?.setItem("aesKey", aesToken);
            localStorage?.setItem("roleId", res?.data?.user.roleId);

            console.log(user);
            // if (
            //   res?.data?.user?.isPassword == 0 ||
            //   values.password == "Atpl@123"
            // ) {
            //   localStorage.setItem("password", 0);

            //   document.getElementById("confirm-button13").click();
            // }
            dispatch(setisLoginUser(true));
            dispatch(setUserData(user));
            dispatch(setLoader(false));
            if (!isEmpty(params)) {
              // localStorage.setItem("expenseId", "" + expenseId);
              dispatch(setLoader(true));

              setTimeout(() => {
                history.push(params[0]);
              }, 1000);

              // localStorage.getItem("expenseId", params.expenseId);
            } else {
              history.push("/expense");
            }
          } else {
            dispatch(setLoader(false));
            Swal.fire({
              icon: "error",
              title: "Account blocked",
              text: "Account blocked by the administrator",
            });
          }
        } else if (res?.data?.statusDescription?.statusCode == 450) {
          dispatch(setLoader(false));
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid username/email or password",
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        } else if (res?.data?.statusDescription?.statusCode != 200) {
          dispatch(setLoader(false));
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res?.data?.statusDescription?.statusMessage,
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        } else {
          dispatch(setLoader(false));
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.statusDescription.statusMessage,
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        }
      } catch (error) {
        dispatch(setLoader(false));
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      }
      dispatch(setLoader(false));
    },
  });
  const modalContact = useRef(null);
  return (
    <>
      <section className="g-sidenav-show login_8 bg-gray-200 bg_gradient">
        <ThemeProvider theme={theme}>
          <Backdrop
            sx={{
              transform: "translateZ(0)",
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
          >
            {/* <Loader /> */}
          </Backdrop>
          <main className="main-content my-aut lgin_cntnt position-relative w-auto border-radius-l">
            {true ? (
              <>
                <div className="container-fluid login_container_8 px-0">
                  <div className="row d-md-flex  h_vh align-items-cente mx-0">
                    <div
                      className="col-md-5  offset-md-3 d-flex align-items-center bg_8 "
                      style={{ padding: "3.5rem" }}
                    >
                      <div className="w-100">
                        {true && (
                          <form
                            className="form_hire p-0"
                            onSubmit={formik.handleSubmit}
                          >
                            <div className="" id="sign_in">
                              <div className="">
                                <div className="text-center">
                                  <img
                                    style={{ width: "100px", maxWidth: "100%" }}
                                    src={Logo}
                                    alt=""
                                    srcSet=""
                                  />
                                </div>
                                <div className="text-center mt-4">
                                  <span
                                    className="d-inline-block text-capitalize"
                                    style={{ fontSize: "large" }}
                                  >
                                    Log in
                                  </span>
                                </div>
                              </div>
                              <div className="my-4">
                                <div className="input-group input-group-outline input_field">
                                  {true ? (
                                    <>
                                      <div className="col-md-12 d-inline-flex">
                                        <div className="me-2 mt-3">
                                          {/* <PersonIcon /> */}
                                        </div>
                                        <TextField
                                          required
                                          className="w-100"
                                          label="Username"
                                          name="username"
                                          // type="email"
                                          variant="standard"
                                          autoComplete="on"
                                          size="small"
                                          value={formik.values.username}
                                          onChange={(e) => {
                                            setType(e.target.value);
                                            formik.handleChange(e);
                                          }}
                                          error={
                                            formik.touched.username &&
                                            Boolean(formik.errors.username)
                                          }
                                          helperText={
                                            formik.touched.username &&
                                            formik.errors.username
                                          }
                                        />
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="col-md-12 d-inline-flex">
                                        <div className="me-2 mt-3">
                                          {/* <PersonIcon /> */}
                                        </div>
                                        <TextField
                                          required
                                          className="w-100"
                                          label="Username/Mobile Number"
                                          name="username"
                                          // type="email"
                                          variant="standard"
                                          size="small"
                                          value={formik.values.username}
                                          onChange={(e) => {
                                            setType(e.target.value);
                                            formik.handleChange(e);
                                          }}
                                          error={
                                            formik.touched.username &&
                                            Boolean(formik.errors.username)
                                          }
                                          helperText={
                                            formik.touched.username &&
                                            formik.errors.username
                                          }
                                          onInput={(e) => {
                                            e.target.value =
                                              e.target.value.toString();
                                          }}
                                        />
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div className="input-group input-group-outline input_field mt-4">
                                  {true && (
                                    <div className="col-md-12 d-inline-flex">
                                      <div className="me-2 mt-3">
                                        {/* <LockIcon /> */}
                                      </div>
                                      <div className="input-group input-group-outline input_field">
                                        <TextField
                                          required
                                          className="w-100"
                                          label="Password"
                                          name="password"
                                          type={
                                            showPassword ? "text" : "password"
                                          }
                                          variant="standard"
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
                                                  onClick={
                                                    handleClickShowPassword
                                                  }
                                                  onMouseDown={
                                                    handleMouseDownPassword
                                                  }
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
                                    </div>
                                  )}
                                </div>
                                {/* <div className="input-group input-group-outline input_field mt-4 " style={{ marginLeft: "9px" }} >
                                                                    <Checkbox defaultChecked color="primary" />
                                                                </div> */}
                              </div>
                              {true && (
                                <button
                                  className="btn bg-primary register_grad d-block w-100 text-white"
                                  type="submit"
                                >
                                  Log in
                                </button>
                              )}
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <Link
                                  to="/forgotpassword"
                                  className="text-capitalize link-info fw-bold"
                                >
                                  Forgot Password
                                </Link>
                              </div>
                              <div className="col-md-6">
                                <div className="text-end">
                                  <a
                                    href="#"
                                    onClick={formik.handleReset}
                                    className="text-capitalize link-info fw-bold"
                                  >
                                    Reset
                                  </a>
                                </div>
                              </div>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <h1></h1>
            )}
            {/* ...............................................2 Factor Auth.............................................................. */}
          </main>
        </ThemeProvider>
      </section>
    </>
  );
};
export default LoginPage;
