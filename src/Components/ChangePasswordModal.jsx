import {
  Autocomplete,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import Box from "@mui/material/Box";

import VisibilityIcon from "@mui/icons-material/Visibility";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import * as yup from "yup";
import { common_axios } from "../App";
import { decryptBody, encryptBody } from "../utils/EncDecUtil";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const FormSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  cPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      "confirm password must be same as new password"
    ),
});

export default function ChangePasswordModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  // useEffect(() => {
  //   if (localStorage.getItem("password") == 0) {
  //     document.getElementById("confirm-button13").click();
  //   }
  // }, []);

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
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      cPassword: "",
    },
    validationSchema: FormSchema,
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      console.log(values);

      if (localStorage.getItem("userId") != null) {
      }

      if (values.newPassword == "Atpl@123") {
        Swal.fire({
          icon: "warning",
          title: "Password Error",
          text: "Password must not be Atpl@123",
        });
        return;
      }
      let formdata = {
        userId: localStorage.getItem("userId"),
        newPassword: values.newPassword,
      };
      try {
        const encrypted = await common_axios.post(
          `/authenc/reset/v1/password`,
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
            document.getElementById("close-change").click();
            localStorage.removeItem("password");
            Swal.fire({
              icon: "success",
              text: "Password changed successfully",
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
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        id="confirm-button13"
        data-bs-toggle="modal"
        data-bs-target="#confirm-modal1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="confirm-modal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Your password is too weak. Please change your password now:
              </h5>
              <button
                type="button"
                className="btn-close d-none"
                id="close-change"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="modal-body">
                <div className="row d-flex justify-content-center mb-3">
                  <div className="  col-md-12 m-2">
                    <TextField
                      required
                      className="w-100"
                      label="New Password"
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
                        formik.touched.newPassword && formik.errors.newPassword
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
                                <VisibilityIcon sx={{ color: "#85CBF2" }} />
                              ) : (
                                <VisibilityOffIcon sx={{ color: "#85CBF2" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>

                  <div className="col-md-12 m-2">
                    <TextField
                      required
                      className="w-100"
                      label="Confirm Password"
                      name="cPassword"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      size="small"
                      value={formik.values.cPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.cPassword &&
                        Boolean(formik.errors.cPassword)
                      }
                      helperText={
                        formik.touched.cPassword && formik.errors.cPassword
                      }
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              title={
                                showPassword ? "hide password" : "show password"
                              }
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityIcon sx={{ color: "#85CBF2" }} />
                              ) : (
                                <VisibilityOffIcon sx={{ color: "#85CBF2" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>

                <div>
                  <small className="text-black mt-4 ml-3">
                    password should contain minimum 8 characters, atleast one
                    uppercase, one lowercase, one special characters
                  </small>
                </div>
              </div>
              <div className="modal-footer  d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  {" "}
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
