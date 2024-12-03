import { useFormik, validateYupSchema } from "formik";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import { useEffect } from "react";
import { common_axios } from "../App";
import Swal from "sweetalert2";
import { useState } from "react";
import { decryptBody, encryptBody } from "../utils/EncDecUtil";
export const PaymentTerm = (props) => {
  const [expenseId, setExpenseId] = useState(0);
  useEffect(() => {
    if (props.clicked) {
      formik3.handleSubmit();
    } else {
      formik3.handleReset();
    }
  }, [props.clicked]);
  useEffect(async () => {
    if (expenseId != 0) {
      await setExpenseId(props.id);
    }
  }, [props.id]);

  useEffect(async () => {
    if (props.userId && props.type == 2) {
      // getBankDetails();
    }
  }, [props.userId]);
  useEffect(() => {
    if (props.getData) {
      getPaymentDetails();
    }
  }, [props.getData]);

  const getBankDetails = async () => {
    let formdata = {};
    const res = await common_axios.post(`/expense/get/bank/data`, formdata);

    if (res?.data?.statusDescription?.statusCode == 200) {
      // console.log(res?.data);
      if (res.data.bankDetails) {
        formik3.setFieldValue("payment", res.data.bankDetails.bankName);
        formik3.setFieldValue("warranty", res.data.bankDetails.accountNo);
        formik3.setFieldValue("delivery", res.data.bankDetails.ifsc);
        if (props.type == 2) {
          formik3.setFieldValue("holderName", res.data.bankDetails.holderName);
        }
      }
    }
  };
  const getPaymentDetails = async () => {
    let formdata = {
      expenseId: props?.id,
    };
    const res = await common_axios.post(
      `/expenseenc/get/payment/data`,
      encryptBody(formdata, localStorage.getItem("aesKey"), 1)
    );
    res.data = decryptBody(
      res.data.encryptedResponse,
      localStorage.getItem("aesKey")
    );
    if (res?.data?.statusDescription?.statusCode == 200) {
      if (res.data.payment) {
        formik3.setFieldValue("payment", res.data.payment.payment);
        formik3.setFieldValue("warranty", res.data.payment.warranty);
        formik3.setFieldValue("delivery", res.data.payment.delivery);
        if (props.type == 0) {
          formik3.setFieldValue("holderName", res.data.payment.holderName);
        }
      }
    }
  };
  const formik3 = useFormik({
    initialValues: {
      payment: "",
      warranty: "",
      delivery: "",
      holderName: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      if (
        values.delivery == "" &&
        values.payment == "" &&
        values.warranty == "" &&
        values.holderName == ""
      ) {
        return;
      }
      values["expenseId"] = Number(props.id);
      if (props.type == 0) {
        values["type"] = 0;
      } else if (props.type == 2) {
        values["type"] = 2;
      } else {
        values["type"] = 1;
      }
      const res = await common_axios.post(
        "/expenseenc/payment/data",
        encryptBody(values, localStorage.getItem("aesKey"), 1)
      );
      if (res?.data?.statusDescription?.statusCode == 200) {
        getPaymentDetails();
        document.getElementById("update-close")?.click();
        props.closeDialog();
      } else {
        Swal.fire({
          icon: "error",
          title: res.data.statusDescription.statusMessage,
        });
      }
    },
  });
  return (
    <>
      <div className="card p-3">
        <form>
          <div className="row  ml-4">
            {props.type == 0 ? (
              <h5 style={{ fontSize: "14px", color: "#858585" }}>
                {props?.heading ? props?.heading : "Vendor Bank Details"}
              </h5>
            ) : (
              <h5>Bank Details</h5>
            )}
            {(props.type == 0 || props.type == 2) && (
              <div className="row mt-2">
                <div className="col-md-12" style={{ display: "flex" }}>
                  <div className="col-md-2">
                    {props.type == 0 ? (
                      <p style={{ marginTop: "4%", fontSize: "11px" }}>
                        Account Holder Name{" "}
                      </p>
                    ) : (
                      <p>Holder Name</p>
                    )}
                  </div>
                  {(props.type == 0 || props.type == 2) && (
                    <div className="col-md-4">
                      {props.notool && formik3.values.holderName != "" ? (
                        <Tooltip
                          title={
                            props.notool && (
                              <h6 style={{ color: "lightblue" }}>
                                {formik3.values.holderName}
                              </h6>
                            )
                          }
                          sx={{ cursor: "pointer" }}
                          arrow
                        >
                          <TextField
                            name="holderName"
                            label={
                              props.type == 0
                                ? "Account Holder Name"
                                : "Holder Name"
                            }
                            variant="outlined"
                            size="small"
                            type="text"
                            className="w-100 hey"
                            disabled={props.disabled}
                            value={formik3.values.holderName}
                            onChange={(event) => {
                              formik3.handleChange(event);
                            }}
                          />
                        </Tooltip>
                      ) : (
                        <TextField
                          name="holderName"
                          label={
                            props.type == 0
                              ? "Account Holder Name"
                              : "Account Holder Name"
                          }
                          variant="outlined"
                          size="small"
                          type="text"
                          className="w-100 hey"
                          disabled={props.disabled}
                          value={formik3.values.holderName}
                          onChange={(event) => {
                            formik3.handleChange(event);
                          }}
                        />
                      )}
                    </div>
                  )}
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <div className="col-md-1">
                    {props.type == 0 ? (
                      <p style={{ marginTop: "9%", fontSize: "11px" }}>
                        Bank Name{" "}
                      </p>
                    ) : (
                      <p>Bank Name </p>
                    )}
                  </div>
                  <div className="col-md-4">
                    {props.notool && formik3.values.payment != "" ? (
                      <Tooltip
                        title={
                          props.notool && (
                            <h6 style={{ color: "lightblue" }}>
                              {formik3.values.payment}
                            </h6>
                          )
                        }
                        sx={{ cursor: "pointer" }}
                        arrow
                      >
                        <TextField
                          name="payment"
                          label={props.type == 0 ? "Bank Name" : "Bank Name"}
                          variant="outlined"
                          size="small"
                          inputProps={{ style: { fontSize: "11px" } }}
                          disabled={props.disabled}
                          type="text"
                          className="w-100 hey"
                          value={formik3.values.payment}
                          onChange={(event) => {
                            formik3.handleChange(event);
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <TextField
                        name="payment"
                        label={props.type == 0 ? "Bank Name" : "Bank Name"}
                        variant="outlined"
                        size="small"
                        inputProps={{ style: { fontSize: "11px" } }}
                        disabled={props.disabled}
                        type="text"
                        className="w-100 hey"
                        value={formik3.values.payment}
                        onChange={(event) => {
                          formik3.handleChange(event);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="row mt-2">
              <div className="col-md-12" style={{ display: "flex" }}>
                <div className="col-md-2">
                  {props.type == 0 ? (
                    <p style={{ marginTop: "3%", fontSize: "11px" }}>
                      Account No.{" "}
                    </p>
                  ) : (
                    <p> Account No.</p>
                  )}
                </div>
                <div className="col-md-4">
                  {props.notool && formik3.values.warranty != "" ? (
                    <Tooltip
                      title={
                        props.notool && (
                          <h6 style={{ color: "lightblue" }}>
                            {formik3.values.warranty}
                          </h6>
                        )
                      }
                      sx={{ cursor: "pointer" }}
                      arrow
                    >
                      <TextField
                        name="warranty"
                        label={props.type == 0 ? "Account No." : "Account No."}
                        inputProps={{ style: { fontSize: "11px" } }}
                        variant="outlined"
                        size="small"
                        type="text"
                        disabled={props.disabled}
                        className="w-100 hey"
                        value={formik3.values.warranty}
                        onChange={(event) => {
                          formik3.handleChange(event);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <TextField
                      name="warranty"
                      label={props.type == 0 ? "Account No." : "Account no"}
                      inputProps={{ style: { fontSize: "11px" } }}
                      variant="outlined"
                      size="small"
                      type="text"
                      disabled={props.disabled}
                      className="w-100 hey"
                      value={formik3.values.warranty}
                      onChange={(event) => {
                        formik3.handleChange(event);
                      }}
                    />
                  )}
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <div className="col-md-1">
                  {props.type == 0 ? (
                    <p style={{ marginTop: "10%", fontSize: "11px" }}>
                      IFSC/IBAN{" "}
                    </p>
                  ) : (
                    <p>IFSC Code </p>
                  )}
                </div>
                <div className="col-md-4">
                  {props.notool && formik3.values.delivery != "" ? (
                    <Tooltip
                      title={
                        props.notool && (
                          <h6 style={{ color: "lightblue" }}>
                            {formik3.values.warranty}
                          </h6>
                        )
                      }
                      sx={{ cursor: "pointer" }}
                      arrow
                    >
                      <TextField
                        name="delivery"
                        disabled={props.disabled}
                        label={props.type == 0 ? "IFSC/IBAN" : "IFSC code"}
                        variant="outlined"
                        size="small"
                        inputProps={{ style: { fontSize: "11px" } }}
                        type="text"
                        className="w-100 hey"
                        maxLength={30}
                        value={formik3.values.delivery}
                        onChange={(event) => {
                          formik3.handleChange(event);
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <TextField
                      name="delivery"
                      disabled={props.disabled}
                      label={props.type == 0 ? "IFSC/IBAN" : "Ifsc code"}
                      variant="outlined"
                      size="small"
                      inputProps={{ style: { fontSize: "11px" } }}
                      type="text"
                      className="w-100 hey"
                      maxLength={30}
                      value={formik3.values.delivery}
                      onChange={(event) => {
                        formik3.handleChange(event);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {props.show && (
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    formik3.handleReset(e);
                  }}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    props.openDialog();
                  }}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
