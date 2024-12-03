import { Box, ThemeProvider, TextField } from "@mui/material";
import { useFormik } from "formik";
import { createTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
import { common_axios } from "../../App";
import "./main.css";
export default function Feedback() {
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
  const formik = useFormik({
    initialValues: {
      text: "",
      email: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      const res = await common_axios.post(`/auth/feedback`, values);
      if (res.data) {
        if (res?.data?.statusDescription?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
          });
          formik.handleReset();
        } else {
          Swal.fire({
            icon: "error",
            title: res.data.statusDescription.statusMessage,
          });
        }
      }
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            alignContent: "center",
            margin: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="card-body m-0" style={{ marginRight: "-19px" }}>
            <div className="card shadow-none border bg_blue">
              {
                <span
                  className="badge rounded-pill bg-primary margin_top mt-n3 ms-5"
                  style={{
                    padding: "15px",
                    fontSize: "large",
                    borderRadius: "0",
                  }}
                >
                  Support & Feedback
                </span>
              }
              {false ? (
                <></>
              ) : (
                <>
                  <div className="card-body ">
                    <form
                      onSubmit={formik.handleSubmit}
                      className="row mt-3 my-0 g-3 needs-validation"
                    >
                      <div className="">
                        <div className="card p-3 ">
                          <div id="create_expense" className="row mt-3">
                            <div
                              className="col-md-8"
                              style={{ marginTop: "2%", marginBottom: "2%" }}
                            >
                              <div className="container px-0 mt-">
                                <div className="row">
                                  <div className="col-md-6">
                                    <TextField
                                      required
                                      multiline
                                      rows={2}
                                      className="w-100"
                                      label={`Feedback/Support`}
                                      name="text"
                                      variant="outlined"
                                      inputProps={{
                                        style: { fontSize: "11px" },
                                      }}
                                      size="small"
                                      type="text"
                                      onInput={(e) => {}}
                                      value={formik.values.text}
                                      onChange={(event) => {
                                        formik.handleChange(event);
                                      }}
                                      error={
                                        formik.touched.text &&
                                        Boolean(formik.errors.text)
                                      }
                                      helperText={
                                        formik.touched.text &&
                                        formik.errors.text
                                      }
                                    />
                                  </div>
                                  {/* <div className="col-md-6">
                                    <TextField
                                      required
                                      className="w-100"
                                      label="Email"
                                      name="email"
                                      variant="outlined"
                                      inputProps={{
                                        style: { fontSize: "11px" },
                                      }}
                                      size="small"
                                      type="text"
                                      onInput={(e) => {}}
                                      value={formik.values.email}
                                      onChange={(event) => {
                                        formik.handleChange(event);
                                      }}
                                      error={
                                        formik.touched.email &&
                                        Boolean(formik.errors.email)
                                      }
                                      helperText={
                                        formik.touched.email &&
                                        formik.errors.email
                                      }
                                    />
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {true ? (
                        <>
                          <div
                            className="text-center"
                            style={{ marginTop: "2%" }}
                          >
                            <button
                              type="submit"
                              className="btn btn-primary bg-gradient-primary m-0"
                              style={{ fontSize: "11px" }}
                            >
                              Submit
                            </button>
                            <button
                              style={{ marginLeft: "6px", fontSize: "11px" }}
                              type="reset"
                              onClick={(e) => {
                                formik.handleReset();
                                // resetForm();
                              }}
                              className="btn bg-danger m-0 ms-2 text-white"
                            >
                              Reset
                            </button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </Box>
      </ThemeProvider>
    </>
  );
}
