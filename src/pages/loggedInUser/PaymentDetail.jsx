import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { DynamicTable } from "../../Components/Tabledynamic";
import { Box, createTheme, ThemeProvider } from "@mui/system";
import { IconButton, Skeleton, TextField } from "@mui/material";
import ReactDatePicker from "react-datepicker";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DoneIcon from "@mui/icons-material/Done";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { common_axios } from "../../App";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import moment from "moment";
export default function PaymentDetail() {
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
  const [isData, setisData] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [inputfields, setInputfields] = useState([]);
  const [expense, setExpense] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [data, setData] = useState([]);
  const [currencyId, setCurrencyId] = useState("");
  const [totalSum, setTotalSum] = useState(0);
  const [initialbool, setInitialBool] = useState(false);
  const [detailView, setDetailsView] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      openRead: "",
      closeRead: "",
      dueDate: "",
      totalAmount: "",
      billAmount: "",
      lateFee: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    onSubmit: async (values) => {},
  });
  useEffect(() => {
    dispatch(setLoader(true));
    getPurchaseDetail();
  }, []);
  const getPurchaseDetail = async () => {
    setPaymentDetail(null);
    const res = await common_axios.post(
      `/payment/detail/${localStorage.getItem("expenseId")}`
    );
    if (res?.data?.statusDescription?.statusCode == 200) {
      dispatch(setLoader(false));
      setExpense(res.data.paymentDetail.expense);
      setPaymentDetail(res.data.paymentDetail);
    } else {
    }
  };
  return (
    <ThemeProvider>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px !important",
        }}
      >
        <div className="card-body">
          <div role="presentation" onClick={(e) => {}}>
            {/* <Breadcrumbs aria-label="breadcrumb" className="ml-5">
              <Link
                style={{
                  color: "#1976d2",
                  fontSize: "23px",
                  textDecoration: "none",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  redirectExpense();
                }}
              >
                &#x2190;
              </Link>
            </Breadcrumbs> */}
          </div>
          <div
            className="card shadow-none border bg_blue m-4"
            style={{ marginTop: "20px !important" }}
          >
            {true ? (
              <>
                <span
                  className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 "
                  style={{
                    padding: "15px",
                    fontSize: "large",
                    borderRadius: "0",
                  }}
                >
                  {expense && expense.type == 0
                    ? "Payment Detail"
                    : "Payment Detail"}
                </span>
              </>
            ) : (
              <>
                <span
                  className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 "
                  style={{
                    padding: "15px",
                    fontSize: "large",
                    borderRadius: "0",
                  }}
                >
                  Edit Expense
                </span>
              </>
            )}
            {hideSkeleton == true ? (
              <>
                <Box sx={{ width: "100%" }}>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  {/* <Skeleton animation={false} /> */}
                </Box>
              </>
            ) : (
              <>
                <div className="card-body ">
                  <form
                    className="row expense_lable expense_row  g-3 needs-validation"
                    noValidate
                  >
                    <div>
                      <div className="row ">
                        {expense && (
                          <div className="col-md-auto">
                            <p style={{ fontSize: "small", margin: "0" }}>
                              {expense && expense.type == 0 ? (
                                <span>Expense Id </span>
                              ) : (
                                <span> Purchase Id </span>
                              )}
                              {expense && (
                                <span
                                  style={{
                                    fontSize: "small",
                                    margin: "0",
                                    color: "rgb(94, 93, 93",
                                  }}
                                >
                                  {" "}
                                  :<b>{expense.id}</b>{" "}
                                  {expense.isImportant == "1" && (
                                    <span
                                      className="text text-danger"
                                      style={{ fontWeight: "bold" }}
                                    >
                                      {" "}
                                      Important
                                    </span>
                                  )}
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                        <div className="col-md-auto">
                          {expense && (
                            <p style={{ fontSize: "small", margin: "0" }}>
                              Raised By{" "}
                              <span>
                                :{" "}
                                <b style={{ color: "rgb(94 93 93)" }}>
                                  {paymentDetail?.initiator?.name}
                                </b>{" "}
                              </span>
                            </p>
                          )}
                        </div>
                        {expense && (
                          <>
                            <div className="col-md-auto">
                              <p style={{ fontSize: "small", margin: "0" }}>
                                {" "}
                                Current status
                                <span>
                                  {expense.status == 0 && (
                                    <span
                                      className="text"
                                      style={{
                                        fontSize: "small",
                                        color: "#ff8c00",
                                      }}
                                    >
                                      <b> Pending </b>{" "}
                                    </span>
                                  )}
                                  {expense.status == 1 && (
                                    <span
                                      className="text text-danger"
                                      style={{ fontSize: "medium" }}
                                    >
                                      {" "}
                                      <b>Rejected </b>{" "}
                                    </span>
                                  )}
                                  {expense.status == 2 && (
                                    <span
                                      className="text text-success"
                                      style={{ fontSize: "medium" }}
                                    >
                                      {" "}
                                      <b>Approved </b>{" "}
                                    </span>
                                  )}
                                </span>
                              </p>
                            </div>
                            <div className="col-md-auto">
                              <p style={{ fontSize: "small", margin: "0" }}>
                                Project Name
                                {expense && (
                                  <span
                                    style={{ fontSize: "small", margin: "0" }}
                                  >
                                    {" "}
                                    :{" "}
                                    <b style={{ color: "rgb(94 93 93)" }}>
                                      {" "}
                                      {paymentDetail?.project.name}{" "}
                                    </b>
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="col-md-auto">
                              <p style={{ fontSize: "small", margin: "0" }}>
                                Total Amount
                                {expense && (
                                  <span
                                    style={{ fontSize: "small", margin: "0" }}
                                  >
                                    {" "}
                                    :{" "}
                                    <b className="text-success">
                                      {paymentDetail?.expense?.currencyId}{" "}
                                    </b>{" "}
                                    &nbsp;
                                    <b style={{ color: "rgb(94 93 93)" }}>
                                      {" "}
                                      {paymentDetail?.totalAmount}
                                    </b>{" "}
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="col-md-auto">
                              <p style={{ fontSize: "small", margin: "0" }}>
                                Raise Amount
                                {paymentDetail && (
                                  <span
                                    style={{ fontSize: "small", margin: "0" }}
                                  >
                                    {" "}
                                    :{" "}
                                    <b className="text-success">
                                      {paymentDetail?.expense?.currencyId}{" "}
                                    </b>{" "}
                                    &nbsp;
                                    <b style={{ color: "rgb(94 93 93)" }}>
                                      {" "}
                                      {paymentDetail?.usedAmount}
                                    </b>{" "}
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="col-md-auto">
                              <p style={{ fontSize: "small", margin: "0" }}>
                                Raised Date
                                {paymentDetail && (
                                  <span
                                    style={{ fontSize: "small", margin: "0" }}
                                  >
                                    {" "}
                                    : &nbsp;
                                    <b style={{ color: "rgb(94 93 93)" }}>
                                      {" "}
                                      {moment(
                                        paymentDetail?.createdDate
                                      ).format("DD-MM-YYYY")}
                                    </b>{" "}
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="col-md-auto">
                              <p style={{ fontSize: "small", margin: "0" }}>
                                Total Amount
                                {paymentDetail && (
                                  <span
                                    style={{ fontSize: "small", margin: "0" }}
                                  >
                                    :{" "}
                                    <b className="text-success">
                                      {paymentDetail?.expense?.currencyId}{" "}
                                    </b>{" "}
                                    : &nbsp;
                                    <b style={{ color: "rgb(94 93 93)" }}>
                                      {" "}
                                      {paymentDetail?.totalAmount}
                                    </b>{" "}
                                  </span>
                                )}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className="p-2 mb-1 mt-2"
                        id="hierarchy"
                        style={{ background: "none", padding: "0px" }}
                      >
                        <div className="position-relative">
                          <div
                            className="position-absolute"
                            style={{
                              top: "37px",
                              left: "8px",
                              right: "12px",
                              height: "2px",
                              background: "rgb(209, 209, 209, 1)",
                            }}
                          ></div>
                          <div
                            className="scrollbar py-2"
                            style={{ overflow: "auto" }}
                          >
                            <div
                              className="d-flex"
                              style={{
                                display: "flex",
                                whiteSpace: "nowrap",
                                width: "100%",
                                margin: "0px 0px",
                                justifyContent: "space-between",
                              }}
                            >
                              {/* {hierarchyList?.map((data, index) => {
                                return (
                                  <div className="d-block" key={index}>
                                    <div
                                      className={
                                        data.status == 0 &&
                                        expense &&
                                        data.userId == expense.approverId &&
                                        expense.saveStatus == 2
                                          ? getDesignFunc(5)
                                          : getDesignFunc(data.status)
                                      }
                                    >
                                      {data.status == 1 && (
                                        <p className="text text-danger">
                                          <CloseIcon
                                            style={{ color: "white" }}
                                          />{" "}
                                        </p>
                                      )}
                                      {data.status == 0 &&
                                        expense &&
                                        data.userId == expense.approverId &&
                                        expense.saveStatus == 2 && (
                                          <AccessTimeIcon
                                            style={{ color: "white" }}
                                          />
                                        )}
                                      {data.status == 2 && (
                                        <p className=" heavy_green text text-success">
                                          <DoneIcon
                                            style={{ color: "white" }}
                                          />{" "}
                                        </p>
                                      )}
                                      {data.status == 3 && (
                                        <p className="text text-info">
                                          <DoDisturbIcon
                                            style={{ color: "white" }}
                                          />{" "}
                                        </p>
                                      )}
                                    </div>
                                    <div className="para1">
                                  
                                      <p
                                        style={{
                                          fontSize: "smaller",
                                          color: "#000",
                                        }}
                                      >
                                        {data.userName}
                                      </p>
                                      {data.status == 0 &&
                                        expense &&
                                        data.userId == expense.approverId &&
                                        expense.saveStatus == 2}
                                    </div>
                                  </div>
                                );
                              })} */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 react_input_col">
                      {/* <input
                        type="text"
                        className="form-control"
                        value={moment(paymentDetail?.createdDate).format(
                          "DD-MM-YYYY"
                        )}
                      /> */}
                      {/* <TextField
                        required
                        className="w-100"
                        label="Raise Date"
                        name="expenseDate"
                        variant="outlined"
                        inputProps={{ style: { fontSize: "11px" } }}
                        size="small"
                        type="text"
                        onInput={(e) => {}}
                        value={moment(paymentDetail?.createdDate).format(
                          "DD-MM-YYYY"
                        )}
                        onChange={(event) => {}}
                      /> */}
                    </div>
                    {initialbool && (
                      <div className="col-md-3">
                        <Tooltip
                          title={
                            <h6 style={{ color: "lightblue" }}>
                              {expense.title}
                            </h6>
                          }
                          sx={{ cursor: "pointer" }}
                          arrow
                        >
                          <TextField
                            required
                            multiline
                            rows={2}
                            className="w-100"
                            label={
                              expense && expense.type == "0"
                                ? "Expense Description"
                                : "Purchase Description"
                            }
                            name="expenseTitle"
                            variant="outlined"
                            inputProps={{ style: { fontSize: "11px" } }}
                            size="small"
                            type="text"
                            onInput={(e) => {}}
                            value={expense.title}
                            onChange={(event) => {}}
                            error={
                              formik.touched.expenseTitle &&
                              Boolean(formik.errors.expenseTitle)
                            }
                            helperText={
                              formik.touched.expenseTitle &&
                              formik.errors.expenseTitle
                            }
                          />
                        </Tooltip>
                      </div>
                    )}
                    {expense.type == 1 && (
                      <div className="col-md-3 offset-md- data">
                        <FormControl>
                          <FormLabel
                            id="demo-row-radio-buttons-group-label"
                            style={{ fontSize: "13px" }}
                          >
                            Approval Type
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="0"
                              control={
                                <Radio
                                  checked={checked == "0"}
                                  value="0"
                                  name="radio-buttons"
                                />
                              }
                              label="Capex"
                              className="smallLabel"
                            />
                            <FormControlLabel
                              value="1"
                              control={
                                <Radio
                                  checked={checked == "1"}
                                  value="1"
                                  name="radio-buttons"
                                />
                              }
                              label="Opex"
                              className="smallLabel"
                              disabled
                            />
                            <FormControlLabel
                              value="2"
                              control={
                                <Radio
                                  checked={checked == "2"}
                                  value="2"
                                  name="radio-buttons"
                                />
                              }
                              label="Both"
                              className="smallLabel"
                              disabled
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    )}
                    <div className="">
                      <div className="card p-3">
                        {detailView == false && (
                          <div className="d-flex align-items-center justify-content-end"></div>
                        )}
                        <div
                          id="expense_details"
                          className={
                            data.status == 2
                              ? "row mt-4 label_root   reject_border"
                              : "row label_root mt-3 "
                          }
                          // key={index}
                        >
                          {expense.type == 0 && (
                            <div
                              className="col-md-1"
                              style={{ textAlign: "right" }}
                            >
                              <div className="position-relative">
                                <TextField
                                  name="expenseDate "
                                  label="Expense Date"
                                  variant="outlined"
                                  size="small"
                                  inputProps={{
                                    style: { fontSize: "11px" },
                                  }}
                                  type="text"
                                  className="w-100 fonts"
                                  required
                                  value={
                                    moment(data.expenseDate).format("DD-MM-YY")
                                      ? moment(data.expenseDate).format(
                                          "DD-MM-YY"
                                        )
                                      : "Other"
                                  }
                                />
                              </div>
                            </div>
                          )}
                          {/* <div
                            className="col-md-2"
                            title={data?.categoryState?.catTitle}
                            style={{ width: "15%" }}
                          >
                            {categories.length > 0 &&
                            expense.isFinalApproved != 1 &&
                            showButton &&
                            user &&
                            user.id == expense.approverId &&
                            expense &&
                            expense.saveStatus == 2 &&
                            data?.categoryState ? (
                              <FormControl fullWidth>
                                <Autocomplete
                                  id="controlled-dem22o"
                                  value={
                                    data?.categoryState
                                      ? data?.categoryState
                                      : null
                                  }
                                  size="small"
                                  inputProps={{
                                    style: { padding: "0px" },
                                  }}
                                  required
                                  // style={{ padding: "0px" }}
                                  onChange={(e, newValue) => {
                                    if (newValue) {
                                      getSubIds1(newValue.id, index);
                                      setinputfields((prevvv) => {
                                        prevvv[index].categoryState = newValue;
                                        return prevvv;
                                      });
                                      setShowSave(false);
                                      // setShowSave(true);
                                    }
                                  }}
                                  // defaultValue={categories.find((x) => x.id == data.categoryId)}
                                  options={categories}
                                  componentsProps={{
                                    popper: {
                                      style: { width: "fit-content" },
                                    },
                                  }}
                                  getOptionLabel={(option) =>
                                    option?.catTitle || ""
                                  }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select Categories"
                                    />
                                  )}
                                />
                              </FormControl>
                            ) : (
                              <Tooltip
                                title={
                                  data.categoryName && (
                                    <h6 style={{ color: "lightblue" }}>
                                      {data.categoryName}
                                    </h6>
                                  )
                                }
                                sx={{ cursor: "pointer" }}
                                arrow
                              >
                                <TextField
                                  name="categoryId "
                                  label="Cat"
                                  variant="outlined"
                                  size="small"
                                  inputProps={{
                                    style: { fontSize: "11px" },
                                  }}
                                  type="text"
                                  className="w-100 fonts"
                                  required
                                  value={
                                    data.categoryName
                                      ? data.categoryName
                                      : "Other"
                                  }
                                />
                              </Tooltip>
                            )}
                          </div>
                          <div
                            className="col-md-1"
                            title={`${data?.subCatState?.name}`}
                          >
                            {data?.subIdList?.length > 0 &&
                            expense.isFinalApproved != 1 &&
                            showButton &&
                            user &&
                            user.id == expense.approverId &&
                            expense &&
                            expense.saveStatus == 2 ? (
                              <FormControl fullWidth>
                                <Autocomplete
                                  id="controlled-dem2o"
                                  size="small"
                                  inputProps={{
                                    style: {
                                      padding: "0px",
                                      fontSize: "x-small",
                                    },
                                  }}
                                  required
                                  value={
                                    data?.subCatState ? data?.subCatState : null
                                  }
                                  onChange={(e, newValue) => {
                                    if (newValue) {
                                      setinputfields((prevvv) => {
                                        prevvv[index].subCatState = newValue;
                                        return prevvv;
                                      });
                                      setShowSave(true);
                                      setnewSubCat(index, newValue.id);
                                    }
                                  }}
                                  options={data?.subIdList}
                                  componentsProps={{
                                    popper: {
                                      style: { width: "fit-content" },
                                    },
                                  }}
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select SubCategories"
                                    />
                                  )}
                                />
                              </FormControl>
                            ) : (
                              <Tooltip
                                title={
                                  data?.subCategoryName && (
                                    <h6 style={{ color: "lightblue" }}>
                                      {data?.subCategoryName}
                                    </h6>
                                  )
                                }
                                sx={{ cursor: "pointer" }}
                                arrow
                              >
                                <TextField
                                  name="subCategoryId "
                                  label="S Cat"
                                  variant="outlined"
                                  size="small"
                                  inputProps={{
                                    style: { fontSize: "11px" },
                                  }}
                                  type="text"
                                  className="w-100 fonts"
                                  required
                                  value={
                                    data.subCategoryName
                                      ? data.subCategoryName
                                      : "N/A"
                                  }
                                />
                              </Tooltip>
                            )}
                          </div> */}
                          {/* <div className="col-md-auto " id="choose_file_label">
                            <div className="container px-0 mt-">
                              {detailView ? (
                                <>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <IconButton
                                      size="large"
                                      edge="start"
                                      color="inherit"
                                      title="View Attached Files"
                                      aria-label="menu"
                                      className={
                                        "btn btn-primary position-relative"
                                      }
                                      sx={{ mr: 2 }}
                                      onClick={(e) => {
                                        openModal2(index);
                                      }}
                                    >
                                      <span
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                                        style={{ fontSize: "x-small" }}
                                      >
                                        {data.expenseAttachments.length}
                                      </span>
                                      <img
                                        className="img-small"
                                        src={attachment}
                                        style={{
                                          width: "24px",
                                          marginTop: "-21% ",
                                        }}
                                      />
                                    </IconButton>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      fontSize: "1.2rem",
                                    }}
                                    className="small"
                                    onClick={(e) => {
                                      openModal(index);
                                    }}
                                  >
                                    <AttachFileIcon
                                      style={{
                                        padding: "6px",
                                        marginRight: "0px",
                                      }}
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          </div> */}
                          {/* {data.status != 2 &&
                            showButton &&
                            user &&
                            user.id == expense.approverId &&
                            expense &&
                            expense.saveStatus == 2 &&
                            expense.isFinalApproved != 1 && (
                              <>
                                {data.rejectstatus ? (
                                  <div className="col-md-auto">
                                    <IconButton
                                      className="text text-danger"
                                      title="Partially Rejected"
                                      onClick={(e) => {
                                        deleteSubExpense(index, data.id, 1);
                                        // setUnRejectStatus(index)
                                      }}
                                    >
                                      <HighlightOffIcon
                                        style={{ color: "red" }}
                                      />
                                    </IconButton>
                                  </div>
                                ) : (
                                  <div className="col-md-auto">
                                    <IconButton
                                      title="Partially Rejected"
                                      onClick={(e) => {
                                        deleteSubExpense(index, data.id, 0);
                                      }}
                                    >
                                      <HighlightOffIcon />
                                    </IconButton>
                                  </div>
                                )}
                              </>
                            )} */}
                        </div>
                      </div>
                    </div>
                    {/* {expense.type == 0 &&
                      !expenseDetails.find((x) => {
                        return x.scheduleName != null;
                      }) && (
                        <div className="">
                          {
                            <PaymentTerm
                              type={0}
                              show={false}
                              disabled={true}
                              notool={true}
                              openDialog={() => {}}
                              clicked={update}
                              closeDialog={() => {
                                getExpenseDetail(expenseId);
                              }}
                              id={expenseId}
                              getData={true}
                            />
                          }
                        </div>
                      )} */}
                    {false ? (
                      <>
                        <div className="text-end">
                          <button
                            type="submit"
                            className="btn btn-primary bg-gradient-primary m-0"
                          >
                            Submit
                            {/* <i className="material-icons opacity-10">
                                                    arrow_right_alt
                                                </i> */}
                          </button>
                          <button
                            style={{ marginLeft: "6px" }}
                            type="button"
                            onClick={(e) => {
                              formik.handleReset();
                              resetForm();
                            }}
                            className="btn bg-secondary m-0 ms-2 text-white"
                          >
                            Reset
                            {/* <i className="material-icons opacity-10">
                                                    settings_backup_restore
                                                </i> */}
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
  );
}
