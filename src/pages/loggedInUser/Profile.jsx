import { useEffect, useState } from "react";
import "../../../src/assets/css1/profile1.css";
import { useSelector } from "react-redux";
import { common_axios } from "../../App";
import { useFormik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
import * as yup from "yup";
const FormSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  // newPassword: yup
  //   .string()
  //   .oneOf([yup.ref("pass"), null], 'Must match "password" field value'),
});
export default function Profile() {
  const [user, setUser] = useState({});
  const [approverProjects, setApproverProjects] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  var userProfile = useSelector((state) => state.authSliceandSidebar.user);
  useEffect(() => {
    if (userProfile != null) {
      setUser(userProfile);
      // gertApproverProjects();
      // getAllProjects()
    }
  }, [userProfile]);

  const getAllProjects = async () => {
    const res = await common_axios.post("/projectenc/get", {
      roleId: 0,
    });
    if (res?.data?.statusDescription?.statusCode == 200) {
      setProjectList(res.data.projects);
    }
  };
  const handleMouseDownPassword = () => {
    setShowPassword(false);
  };
  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleMouseDownPassword1 = () => {
    setShowPassword1(false);
  };
  const handleClickShowPassword1 = () => {
    setShowPassword1(true);
  };
  const gertApproverProjects = async () => {
    const res = await common_axios.post("/projectenc/approver");
    if (res?.data?.statusDescription?.statusCode == 200) {
      setApproverProjects(res.data.projectList);
    }
  };
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      cPassword: "",
    },
    validationSchema: FormSchema,
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      let formdata = {
        userId: user.id,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      try {
        const encrypted = await common_axios.post(
          `/authenc/reset/password`,
          encryptBody(formdata, localStorage.getItem("aesKey"))
        );
        let res = {
          data: {},
        };
        if (encrypted.data.statusDescription.statusCode == 200) {
          res.data = decryptBody(
            encrypted.data.encryptedResponse,
            localStorage.getItem("aesKey")
          );
          if (res?.data?.statusDescription?.statusCode == 200) {
            formik.handleReset();
            Swal.fire({
              icon: "success",
              text: "Password Reset Successfully",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Something went wrong",
              text: res.data.statusDescription.statusMessage,
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            text: res.data.statusDescription.statusMessage,
          });
        }
      } catch (er) {
        Swal.fire({
          icon: "error",
          text: "Something went wrong",
        });
      }
    },
  });
  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-xl-12 col-md-12">
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  {user && (
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          className="img-radius"
                          alt="User-Profile-Image"
                        />
                      </div>
                      <h6 className="f-w-600"> {user.name}</h6>
                      {/* <p>Web Designer</p> */}
                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  )}
                </div>
                {user && (
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                        Information
                      </h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Email</p>
                          <h6 className="text-muted f-w-400">{user.email}</h6>
                        </div>
                        {/* <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Phone</p>
                                                    <h6 className="text-muted f-w-400">98979989898</h6>
                                                </div> */}
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600 text-center">
                        Change Password
                      </h6>
                      <form onSubmit={formik.handleSubmit}>
                        <div className="row d-flex justify-content-center">
                          <div className="offset-md-3 col-md-6 m-2">
                            <TextField
                              required
                              className="w-100"
                              label="Enter Old Password"
                              name="oldPassword"
                              type={showPassword ? "text" : "password"}
                              variant="outlined"
                              size="small"
                              value={formik.values.oldPassword}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.oldPassword &&
                                Boolean(formik.errors.oldPassword)
                              }
                              helperText={
                                formik.touched.oldPassword &&
                                formik.errors.oldPassword
                              }
                              InputProps={{
                                // <-- This is where the toggle button is added.
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      title={
                                        showPassword
                                          ? "hide password"
                                          : "show password"
                                      }
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
                          <div className=" offset-md-3 col-md-6 m-2">
                            <TextField
                              required
                              className="w-100"
                              label="Enter New  Password"
                              name="newPassword"
                              type={showPassword1 ? "text" : "password"}
                              variant="outlined"
                              size="small"
                              value={formik.values.newPassword}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.newPassword &&
                                Boolean(formik.errors.newPassword)
                              }
                              helperText={
                                formik.touched.newPassword &&
                                formik.errors.newPassword
                              }
                              InputProps={{
                                // <-- This is where the toggle button is added.
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      title={
                                        showPassword1
                                          ? "hide password"
                                          : "show password"
                                      }
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
                          <div className="col-md-12  d-flex justify-content-evenly">
                            <button
                              className="btn  btn-danger mr-2"
                              type="button"
                              onClick={(e) => {
                                formik.handleReset();
                              }}
                            >
                              Reset{" "}
                            </button>
                            <button type="submit" className="btn btn-primary  ">
                              Submit{" "}
                            </button>
                          </div>
                        </div>
                      </form>
                      <ul className="social-link list-unstyled m-t-40 m-b-10">
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="facebook"
                            data-abc="true"
                          >
                            <i
                              className="mdi mdi-facebook feather icon-facebook facebook"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="twitter"
                            data-abc="true"
                          >
                            <i
                              className="mdi mdi-twitter feather icon-twitter twitter"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="instagram"
                            data-abc="true"
                          >
                            <i
                              className="mdi mdi-instagram feather icon-instagram instagram"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
