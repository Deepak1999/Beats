import { Box, Button, Skeleton, ThemeProvider } from "@mui/material";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import CloseIcon from "@mui/icons-material/Close";
// import "./main.css";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
// import AccessLevel from "./AccessLevel";
import { createTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
import { common_axios } from "../../App";
// import { toast } from "react-toastify";
import moment from "moment";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ColumnFilter from "../../Components/ColumnFilter";
import { setLoader } from "../../redux/features/authSliceandSidebar";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
const useStyles = makeStyles((theme) => ({
  input: {
    "& .MuiInputBase-inputMultiline": {
      paddingBottom: "30px",
      position: "relative", // Adjust the padding for the InputAdornment
    },
    "& .MuiInputAdornment-positionEnd": {
      position: "absolute",
      bottom: "0",
      right: "0",
    },
  },
}));
export default function BulkUpload() {
  const classes = useStyles();
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
  const [totalPages, setTotalPages] = useState(0);
  const [dataSenderid, setDataSenderid] = useState([]);
  const [hideSkeleton, setHideSkeleton] = useState();
  const [tableShow, setTableShow] = useState(false);
  const [defaultHitPartialSearch, setDefaultHitPartialSearch] = useState(false);
  const [MoreFilters, setMoreFilters] = useState(false);
  const [hideSkeleton1, setHideSkeleton1] = useState();
  const [MenuItemChange, setMenuItemChange] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [viewUploadFiles, setviewUploadFiles] = useState([]);
  const [accountcountryid, setAccountCountryId] = useState("");
  const [accountidvalue, setAccountIdValue] = useState([]);
  const [userState, setUserState] = React.useState([]);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const modalContact = useRef(null);
  const modalContact1 = useRef(null);
  const modalContactClose = useRef(null);
  const [expenseId, setExpenseId] = useState(0);
  const [Pagination, setPagination] = useState(0);
  const [projects, setprojects] = useState([]);
  const [fileNames, setfileNames] = useState("");
  const [detailView, setDetailView] = useState(false);
  const [state, setState] = useState({});
  const [successArray, setSuccessArray] = useState([]);
  const [failedArray, setFailedArray] = useState([]);
  const [resp, setResp] = useState(false);
  const [isData1, setisData1] = useState(false);
  const [user, setUser] = useState({});
  const [viewFiles, setviewFiles] = useState([]);
  const modalContact2 = useRef(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [initialValues, setInitialValues] = useState({
    // templateType: "",
    expenseTitle: "",
    expenseDate: "",
    projectId: 0,
  });
  const [initialbool, setinitialBool] = useState(false);
  const [title, settitle] = useState("");
  const [approver1, setapprover1] = useState("");
  var expenseIdSelector = useSelector(
    (state) => state.expenseIdSlice.expenseId
  );
  const getHierarchy = async (projectId) => {
    const res = await common_axios.post(`/projectenc/hierarchy/${projectId}`);
    let { statusDescription } = res.data;
    if (statusDescription.statusCode == 200) {
      let name = res.data.projects[0].name;
      setapprover1(name);
    }
  };
  const removeAttachment = (id) => {
    let length = inputfields.length;
    let values = [...inputfields];
    let arr = values[apiindex].expenseFiles.filter((X) => {
      return X.id != id;
    });
    let expenseAttachments = values[apiindex].expenseAttachments.filter((X) => {
      return X != id;
    });
    values[apiindex].expenseAttachments = expenseAttachments;
    values[apiindex].expenseFiles = arr;
    setinputfields(values);
    setviewFiles(arr);
  };
  const removeAttachments2 = async (name) => {
    let arr = [...files.arr];
    arr.splice(name, 1);
    await setFiles({
      arr: arr,
    });
  };
  const userSelector = useSelector((state) => state.authSliceandSidebar.user);
  useEffect(() => {
    if (expenseIdSelector != 0) {
    }
  }, [expenseIdSelector]);
  useEffect(async () => {
    if (userSelector) {
      await setUser(userSelector);
    }
  }, [userSelector]);
  const [hierarchyList, sethierarchyList] = useState([]);
  const [inputfields, setinputfields] = useState([
    {
      expenseDate: new Date(),
      expensetitle: "",
      expenseAttachments: [],
      amount: null,
      expenseFiles: [],
    },
  ]);
  const initalValue = {
    language: "",
    templateName: `WHATSAPP_${Math.floor(Math.random() * 10000000000)}`,
    templateType: "",
    languageList: [],
    templateTypeList: [],
    headerContentType: "None",
    headerMediaType: "",
    headerText: "",
    bodyText: ``,
    bodyTextVariable: [],
    bodyTextVariableText: {},
    footerText: "",
    buttons: [],
    showPicker: false,
  };
  const [stateee, setStateee] = React.useState(initalValue);
  const [files, setFiles] = useState({
    arr: [],
  });
  const [data, setData] = useState([]);
  const [data3, setData3] = useState([]);
  const [activities, setactivities] = useState(false);
  const [data1, setData1] = useState([]);
  const onKeyDown = (e) => {
    e.preventDefault();
  };
  const [paginationPage, setPaginationPage] = React.useState(0);
  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 10,
  });
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Activity",
        accessor: "activity",
      },
      {
        Header: "UserId",
        accessor: "userId", // accessor is the "key" in the data
      },
      {
        Header: "Created Date Time",
        accessor: "created",
        Cell: (cell) => {
          return (
            <>
              {moment(new Date(cell.row.original.created))
                .add(5, "hours")
                .add(30, "minutes")
                .format("DD-MMM-YYYY h:mm a")}
            </>
          );
        }, // accessor is the "key" in the data
      },
    ],
    [data, TableStatus]
  );
  const columns1 = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Activity",
        accessor: "activity",
      },
      {
        Header: "UserId",
        accessor: "userId", // accessor is the "key" in the data
      },
      {
        Header: "Created Date Time",
        accessor: "created",
        Cell: (cell) => {
          return (
            <>
              {moment(new Date(cell.row.original.created))
                .add(5, "hours")
                .add(30, "minutes")
                .format("DD-MMM-YYYY h:mm a")}
            </>
          );
        }, // accessor is the "key" in the data
      },
    ],
    [data, TableStatus]
  );
  const [projectId, setprojectId] = useState(0);
  const [projectName, setprojectName] = useState("");
  const [apiindex, setapiindex] = useState(0);
  const [apiindex1, setapiindex1] = useState(0);
  const openModal = async (data, e) => {
    setapiindex(e);
    await modalContact.current.click();
  };
  const openModal2 = async (e) => {
    setapiindex1(e);
    await modalContact1.current.click();
  };
  const openModal3 = async (data, index) => {
    setapiindex(index);
    setviewFiles(data.expenseFiles);
    await modalContact2.current.click();
  };
  const uploadApi = async () => {
    let arr = [];
    let fileArry = [];
    dispatch(setLoader(true));
    files.arr.forEach((data) => {
      const formdata = new FormData();
      formdata.append("file", data);
      setTimeout(async () => {
        var res = await common_axios.post(`/expenseenc/upload/file`, formdata);
        if (res?.data?.statusDescription?.statusCode == 200) {
          let obj = {
            id: res?.data?.expenseAttachments?.id,
            name: data.name,
          };
          await arr.push(res?.data?.expenseAttachments?.id);
          await fileArry.push(obj);
        } else if (res?.data?.statusDescription?.statusCode == 401) {
          Swal.fire({
            icon: "error",
            title: "Session Expired",
            text: res?.data?.statusDescription?.statusMessage,
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        } else if (res?.data?.statusDescription?.statusCode == 500) {
          Swal.fire({
            icon: "error",
            title: "Internal server error",
            text: res?.data?.statusDescription?.statusMessage,
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: res?.data?.statusDescription?.statusMessage,
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        }
      }, 1000);
    });
    setfileNames("");
    setFiles({
      arr: [],
    });
    setTimeout(() => {
      setting(arr, fileArry);
    }, 1500);
    //       const formdata = new FormData();
    //     //   formdata.append("file",)
    // uploadFile(formdata)
  };
  const setting = async (arr, fileArry) => {
    let values = [...inputfields];
    if (values[apiindex]["expenseFiles"]?.length > 0) {
      let myarr = [];
      myarr = values[apiindex]["expenseFiles"];
      fileArry.forEach((data) => {
        myarr.push(data);
      });
      setTimeout(() => {
        values[apiindex]["expenseFiles"] = myarr;
      }, 1000);
    } else {
      values[apiindex]["expenseFiles"] = fileArry;
    }
    if (values[apiindex]["expenseAttachments"].length > 0) {
      let myarr = [];
      myarr = values[apiindex]["expenseAttachments"];
      arr.forEach((data) => {
        myarr.push(data);
      });
      setTimeout(() => {
        values[apiindex]["expenseAttachments"] = myarr;
      }, 1000);
    } else {
      values[apiindex]["expenseAttachments"] = arr;
    }
    await setinputfields(values);
    dispatch(setLoader(false));
    await modalContactClose.current.click();
  };
  const uploadExcel = async (e) => {
    let file = e.target.files[[0]];
    let fileArray = Array.from(e.target.files);
    let arrr = files.arr?.length > 0 ? [...files.arr] : [];
    for (let index = 0; index < fileArray.length; index++) {
      const element = fileArray[index];
      arrr.push(element);
    }
    await setFiles({
      arr: arrr,
    });
  };
  const UploadFile = (e) => {
    const file = e.target.files[0];
    let arr = [];
    let fileArray = Array.from(e.target.files);
    let filesName = "";
    let arrr = files.arr?.length > 0 ? [...files.arr] : [];
    for (let index = 0; index < fileArray.length; index++) {
      const element = fileArray[index];
      arrr.push(element);
    }
    arrr.forEach((data) => {
      if (fileNames == "") {
        filesName = filesName + " " + data?.name;
      } else {
        filesName = fileNames;
        filesName = filesName + " " + data?.name;
      }
      setfileNames(filesName);
    });
    arrr.concat(Array.from(e.target.files));
    setFiles({
      arr: arrr,
    });
    setviewUploadFiles(arrr);
    setfileNames(filesName);
  };
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    exactMatch: true,
    messageId: "",
    msidn: "",
    viewMore: true,
    selector1: "",
    startDate: null,
    endDate: null,
    statusCheckbox: null,
    toDestination: "",
    fromDestination: [],
    showMoreFilters: false,
    searchlog: "",
  });
  const [request, setRequest] = useState({
    approverId: "" + localStorage.getItem("userId"),
    projectIdList: [],
    pageNo: 0,
    pageSize: 10,
    orderBy: "DESC",
    orderInt: 1,
    priceSort: false,
    createdSort: false,
    modifiedSort: false,
    nameSort: false,
    projectSort: false,
    raisedByList: [],
  });
  // ....................................Sender Id GetApi............................................................//
  // .........................Partial Search API....................................................................//
  // ...............................................................................................//
  // useEffect(() => {
  //   GetSenderIddetails();
  // }, []);
  // .........................................Export Data.......................................................//
  // ............................................................................................//
  useEffect(() => {
    // getUserProjects();
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const getUserProjects = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // setUser(user)
    if (user != null) {
      const formdata = {
        roleId: user.roleId,
        userId: user.id,
      };
      try {
        let res = await common_axios.post(`/projectenc/get`, formdata);
        if (res?.data?.statusDescription?.statusCode == 200) {
          setprojects(res.data.projects);
        } else {
        }
      } catch (error) {}
    }
  };
  // const sidebarState = useSelector(
  //     (state) => state.sidebarReducer.sectionClass
  // );
  const history = useHistory();
  const dispatch = useDispatch();
  const [data2, setData2] = useState([]);
  const validationSchema = yup.object({
    // templateType: yup.string().required("templateType is required!"),
    // selectValue: yup.string().required("selectValue is required!"),
    // selectLang: yup.string().required("selectLang is required!"),
    // dltId: yup
    //   .string("Enter your DLT PE Id")
    //   .min(3, "DLT PE Id should be of minimum 3 characters length")
    //   .max(20, "DLT PE Id should be of maximum 20 characters length"),
  });
  const formik = useFormik({
    initialValues: {
      // templateType: "",
      expenseTitle: "",
      expenseDate: "",
      projectId: 0,
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
      dispatch(setLoader(true));
      if (
        files.arr[0].name.split(["."])[1] == "xlsx" ||
        files.arr[0].name.split(["."])[1] == "xls" ||
        files.arr[0].name.split(["."])[1] == "csv"
      ) {
        let formdata = new FormData();
        formdata.append("file", files.arr[0]);
        const res = await common_axios.post(
          `/expense/V2/bulk/upload/utr`,
          formdata
        );
        if (res?.data?.statusDescription?.statusCode == 200) {
          let arr = [];
          arr.push(444);
          setData(arr);
          setSuccessArray(res.data.successList);
          setFailedArray(res.data.failedList);
          setResp(true);
          dispatch(setLoader(false));
          Swal.fire({
            icon: "success",
            title: "Done",
            text: "File Upload Success",
          });
        } else {
          dispatch(setLoader(false));
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.statusDescription.statusMessage,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Attach Only xlsx ,xls ,csv files",
        });
      }
    },
  });
  const resetForm1 = () => {
    setprojectName("");
    setinputfields([
      {
        expenseDate: new Date(),
        expensetitle: "",
        expenseAttachments: [],
        amount: null,
        expenseFiles: [],
      },
    ]);
    setfileNames("");
    setFiles({
      arr: [],
    });
  };
  const resetForm = async () => {
    await setResp(false);
    await setfileNames("");
    let formdata = {
      arr: [],
    };
    await setFiles(formdata);
    await setSuccessArray([]);
    await setFailedArray([]);
  };
  // ....................................KeywordCheckApi......................................................//
  const formik1 = useFormik({
    initialValues: {
      // templateType: "",
      expenseTitle: "",
      expenseDate: "",
    },
    onReset: (initialValues) => (
      {
        values: { initialValues },
      },
      resetForm()
    ),
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });
  const textareaRef = useRef();
  const { globalFilter } = state;
  const [globalSearchValue, setGlobalSearchValue] = useState(globalFilter);
  const {} = useTable(
    {
      columns,
      data,
      defaultColumn,
      // initialState: { pageIndex: 1 }
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
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
              {detailView ? (
                <>
                  <span
                    className="badge  bg-primary mt-1 "
                    style={{
                      padding: "15px",
                      fontSize: "large",
                      borderRadius: "0",
                    }}
                  >
                    {/* Add Number */}
                    Expense Detail
                    {/* <div className='d-flex justify-content-end'>
                                    Download
                                </div> */}
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
                    Bulk Upload UTR
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
                      onSubmit={formik.handleSubmit}
                      className="row mt- my-0 g-3 needs-validation"
                    >
                      <div className="">
                        <div className="card p-3">
                          <div id="create_expense" className="row mt-3">
                            {/* <label>Expense Date</label> */}
                            <div
                              className="col-md-8"
                              style={{ marginTop: "-2%" }}
                            >
                              <div className="container px-0 mt-">
                                <div className="row">
                                  <div className="col-md-12">
                                    <p>
                                      Supported format:&nbsp;{" "}
                                      <b>xlsx ,xls ,csv</b>
                                      {/* <span className="text-warning"> Max. size 20MB</span> */}
                                    </p>
                                  </div>
                                  <div className="col-md-6">
                                    <p className="text text-primary">
                                      {" "}
                                      <a
                                        href="https://beatsapi.altruistindia.com/sample.xlsx"
                                        download={"sample.xlsx"}
                                      >
                                        {" "}
                                        Sample Excel
                                      </a>{" "}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <Button
                                    className="position-relative"
                                    variant="contained"
                                    component="label"
                                    style={{
                                      backgroundColor: "white",
                                      boxShadow: "none",
                                      height: "40px",
                                      border: "1px solid #d2d6da",
                                      padding: "0px 0px 0px 0px",
                                      // margin:
                                      //   "0px -3px 0px 0px",
                                    }}
                                  >
                                    <input
                                      className="w-100 p-0 form-control form-control-lg"
                                      style={{
                                        // display: "none",
                                        opacity: "0",
                                        height: "35px",
                                      }}
                                      accept=".xlsx ,.xls"
                                      //   value={state}
                                      onChange={(e) => {
                                        uploadExcel(e);
                                      }}
                                      id="formFileLg"
                                      type="file"
                                    />
                                    <div
                                      className="p-2"
                                      style={{
                                        position: "absolute",
                                        left: "0",
                                        right: "0",
                                        top: "0",
                                        bottom: "0",
                                        display: "flex",
                                        alignItems: "center",
                                        color: "black",
                                      }}
                                    >
                                      {files?.arr?.length == 0 && (
                                        <button
                                          style={{
                                            lineHeight: "normal",
                                            borderRadius: "0",
                                            background: "#efefef",
                                            border: "1px solid #000",
                                            display: "block",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            flex: "0 0 auto",
                                            fontSize: "11px",
                                          }}
                                          className="btn py-0 px-1 text-dark m-0"
                                          type="button"
                                          onClick={() =>
                                            document
                                              .getElementById("formFileLg")
                                              ?.click()
                                          }
                                        >
                                          {files?.arr?.length == 0 && (
                                            <>Choose Files </>
                                          )}
                                        </button>
                                      )}
                                      {files?.arr?.length != 0 && (
                                        <> {files.arr[0].name} </>
                                      )}
                                    </div>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {detailView == false ? (
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
                              {/* <i className="material-icons opacity-10">
                                                        arrow_right_alt
                                                    </i> */}
                            </button>
                            <button
                              style={{ marginLeft: "6px", fontSize: "11px" }}
                              type="reset"
                              onClick={(e) => {
                                // formik.handleReset()
                                resetForm();
                              }}
                              className="btn bg-danger m-0 ms-2 text-white"
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
                    {resp && (
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card shadow-none border bg_blue mt-4">
                            <span
                              className="badge rounded-pill bg-primary margin_top w_50 mt-n3 ms-5 "
                              style={{ padding: "15px", fontSize: "large" }}
                            >
                              Response
                            </span>
                            <>
                              {data?.length == 0 ? (
                                <div className="text-center mt-4">
                                  {data?.length == 0 &&
                                  open == true ? null : data?.length == 0 &&
                                    open == undefined ? null : (
                                    <div className="text-center">
                                      <h5 style={{ fontSize: "13px" }}>
                                        No Record Found..!!
                                      </h5>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="">
                                  <p className="text-center">
                                    {" "}
                                    Success :{" "}
                                    {successArray.length
                                      ? successArray.length
                                      : 0}{" "}
                                    &nbsp; Failed :{" "}
                                    {failedArray.length
                                      ? failedArray.length
                                      : 0}
                                  </p>
                                  <p className="text-center">
                                    {" "}
                                    Success :{" "}
                                    {successArray?.length > 0 ? (
                                      <span> {successArray?.toString()}</span>
                                    ) : (
                                      <span>No Success Ids</span>
                                    )}{" "}
                                  </p>
                                  <p className="text-center">
                                    Failed :{" "}
                                    {failedArray?.length > 0 ? (
                                      <span> {failedArray?.toString()}</span>
                                    ) : (
                                      <span>No Failed Ids</span>
                                    )}{" "}
                                  </p>
                                </div>
                              )}
                            </>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </Box>
      </ThemeProvider>
      <button
        type="button"
        ref={modalContact}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Upload Attachments
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <form>
                  <div className="container px-0 mt-">
                    <p>
                      Supported format: &nbsp;
                      <b>doc(x) , pdf , xls(x) , jpeg , png , zip</b>
                      {/* <span className="text-warning"> Max. size 20MB</span> */}
                    </p>
                    <hr />
                    <div>
                      {/* {viewFiles?.length == 0 && <p> No files Found</p>} */}
                      <ul>
                        {files.arr.length != 0 &&
                          files.arr?.map((data, index) => {
                            return (
                              <>
                                <div className="row">
                                  <div className="col-md-auto">
                                    <li> {data.name}</li>
                                  </div>{" "}
                                  <div className="col-md-auto">
                                    <span
                                      className="text text-danger"
                                      onClick={(e) => {
                                        removeAttachments2(index);
                                      }}
                                    >
                                      {" "}
                                      <CloseIcon style={{ color: "red" }} />
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </ul>
                    </div>
                    <div>
                      <Button
                        className="position-relative"
                        variant="contained"
                        component="label"
                        style={{
                          backgroundColor: "white",
                          boxShadow: "none",
                          height: "40px",
                          border: "1px solid #d2d6da",
                          padding: "0px 0px 0px 0px",
                          // margin:
                          //   "0px -3px 0px 0px",
                        }}
                      >
                        <input
                          className="w-100 p-0 form-control form-control-lg"
                          multiple
                          style={{
                            // display: "none",
                            opacity: "0",
                            height: "35px",
                          }}
                          accept=".png,.jpg,.jpeg,.pdf,.docx,.xlsx ,.zip,.csv,.doc,.rar"
                          //   value={state}
                          onChange={(e) => {
                            UploadFile(e);
                          }}
                          id="formFileLg"
                          type="file"
                        />
                        <div
                          className="p-2"
                          style={{
                            position: "absolute",
                            left: "0",
                            right: "0",
                            top: "0",
                            bottom: "0",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <button
                            style={{
                              lineHeight: "normal",
                              borderRadius: "0",
                              background: "#efefef",
                              border: "1px solid #000",
                              display: "block",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              flex: "0 0 auto",
                            }}
                            className="btn py-0 px-1 text-dark m-0"
                            type="button"
                            onClick={() =>
                              document.getElementById("formFileLg")?.click()
                            }
                          >
                            {files?.arr?.length == 0 && <>Choose Files </>}
                            {files?.arr?.length != 0 && <>Choose More Files </>}
                          </button>
                        </div>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={modalContactClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => {
                  uploadApi();
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        ref={modalContact2}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#view-modal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="view-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                View Attachments
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <form>
                  <div className="container px-0 mt-">
                    <div>
                      {viewFiles?.length == 0 && <p> No files Found</p>}
                      <ul>
                        {viewFiles &&
                          viewFiles?.map((data) => {
                            return (
                              <>
                                <div className="row">
                                  <div className="col-md-auto">
                                    <li> {data.name}</li>
                                  </div>{" "}
                                  <div className="col-md-auto">
                                    <span
                                      className="text text-danger"
                                      onClick={(e) => {
                                        removeAttachment(data.id);
                                      }}
                                    >
                                      {" "}
                                      <CloseIcon style={{ color: "red" }} />
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
