import { Box, Skeleton, ThemeProvider } from "@mui/material";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
// import "./main.css";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
// import AccessLevel from "./AccessLevel";
import { createTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { common_axios } from "../../App";
// import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
// import ColumnFilter from "../../Reacttable/UserManagement/ReactTableFiles/ColumnFilter";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import ColumnFilter from "../../Components/ColumnFilter";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import { setexpenseId } from "../../redux/features/expenseIdSlice";
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
export default function ExpenseFiles() {
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
  const [defaultHitApi, setDefaultHitApi] = useState(false);
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
  const query = new URLSearchParams(useLocation().search);
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
  useEffect(() => {
    if (query.get("expenseId")) {
      setExpenseId(query.get("expenseId"));
      setexpenseId(query.get("expenseId"));
      expenseDtails(query.get("expenseId"));
    }
    if (expenseIdSelector != 0) {
      expenseDtails(expenseIdSelector);
    } else {
      if (localStorage.getItem("expenseId")) {
        setexpenseId(localStorage.getItem("expenseId"));
      }
    }
  }, []);
  const expenseDtails = async (expenseId) => {
    setExpenseId(expenseId);
    let formdata = {
      expenseId,
    };
    const res = await common_axios.post("/expense/details", formdata);
    if (res?.data?.statusDescription.statusCode === 200) {
    } else {
    }
  };
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
                .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
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
    let filesName = "";
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
        // dispatch(setLoader(true))
        const res = await common_axios.post(
          `/expenseenc/bulk/upload/utr`,
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
  const { globalFilter, pageIndex, pageSize } = state;
  const [globalSearchValue, setGlobalSearchValue] = useState(globalFilter);
  const handleChangeInput = (index, event) => {
    const values = [...inputfields];
    values[index][event.target?.name] = event.target?.value;
    if (event.target.name == "amount") {
    }
    setinputfields(values);
  };
  const handleChangeDate = (date, index) => {
    const values = [...inputfields];
    values[index]["expenseDate"] = date;
    setinputfields(values);
  };
  const handleAddFields = () => {
    setinputfields([
      ...inputfields,
      {
        expenseDate: new Date(),
        expensetitle: "",
        expenseAttachments: [],
        amount: null,
        expenseFiles: [],
      },
    ]);
  };
  const handleRemoveFields1 = () => {
    if (inputfields.length == 1) {
      return;
    }
    const values = [...inputfields];
    const length = values.length;
    values.pop();
    setinputfields(values);
  };
  const handleRemoveFields = (index) => {
    if (inputfields.length == 1) {
      return;
    }
    const values = [...inputfields];
    values.splice(index, 1);
    setinputfields(values);
  };
  const Tableinitialize = () => {};
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // footerGroups,
    rows,
    page,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    setGlobalFilter,
    selectedFlatRows,
    setColumnOrder,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
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
                    {/* Add Number */}
                    Files List Expense Id
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
                            <div className="col-md-8">
                              <div className="container px-0 mt-">
                                <div className="row">
                                  <div className="col-md-6">
                                    <p className="text text-primary">
                                      Files List{" "}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {detailView == false ? (
                        <>
                          <div className="text-end">
                            <button
                              type="submit"
                              className="btn btn-primary bg-gradient-primary m-0"
                            >
                              Submit
                            </button>
                            <button
                              style={{ marginLeft: "6px" }}
                              type="reset"
                              onClick={(e) => {
                                // formik.handleReset()
                                resetForm();
                              }}
                              className="btn bg-secondary m-0 ms-2 text-white"
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
