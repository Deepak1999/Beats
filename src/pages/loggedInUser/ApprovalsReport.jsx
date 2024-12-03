import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Pagination from "@mui/material/Pagination";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { createTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
import { common_axios } from "../../App";
import moment from "moment";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ColumnFilter from "../../Components/ColumnFilter";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import { setexpenseId } from "../../redux/features/expenseIdSlice";
const useStyles = makeStyles((theme) => ({
  input: {
    "& .MuiInputBase-inputMultiline": {
      paddingBottom: "30px",
      position: "relative",
    },
    "& .MuiInputAdornment-positionEnd": {
      position: "absolute",
      bottom: "0",
      right: "0",
    },
  },
}));
export default function ApprovalsReport() {
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
  const [hideSkeleton1, setHideSkeleton1] = useState(false);
  const modalContact = useRef(null);
  const modalContact1 = useRef(null);
  const modalContactClose = useRef(null);
  const [expenseId, setExpenseId] = useState(0);
  const [Paginationpage, setPaginationPge] = useState(0);
  const [projects, setprojects] = useState([]);
  const [fileNames, setfileNames] = useState("");
  const [detailView, setDetailView] = useState(false);
  const [state, setState] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [successArray, setSuccessArray] = useState([]);
  const [failedArray, setFailedArray] = useState([]);
  const [resp, setResp] = useState(false);
  const [isData1, setisData1] = useState(false);
  const [user, setUser] = useState({});
  const [viewFiles, setviewFiles] = useState([]);
  const modalContact2 = useRef(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [initialValues, setInitialValues] = useState({
    expenseTitle: "",
    expenseDate: "",
    projectId: 0,
  });
  const [projectList, setProjectList] = useState([]);
  var expenseIdSelector = useSelector(
    (state) => state.expenseIdSlice.expenseId
  );
  const getAllProjects = async () => {
    const res = await common_axios.post("/project/get", {
      roleId: 0,
    });
    if (res?.data?.statusDescription?.statusCode == 200) {
      setProjectList(res.data.projects);
    }
  };
  const viewDetail = (cell) => {
    dispatch(setexpenseId(cell.row.original.id));
    localStorage.setItem("expenseId", "" + cell.row.original.id);
    history.push("/detail");
  };
  const changeTableData = async (type, value) => {
    if (type == 0) {
    } else if (type == 1) {
      value = value - 1;
    } else {
      value = value - 1;
    }
    await setRequest({ ...request, pageNo: value });
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
    getAllProjects();
  }, []);
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
        Header: "Type ",
        accessor: "type",
        Cell: (cell) => {
          return <>{cell.row.original.type == 0 ? "Expense" : "Purchase"}</>;
        },
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Amount",
        accessor: "expenseAppliedAmount",
        Cell: (cell) => {
          return (
            <>
              {cell.row.original.partialAmount
                ? cell.row.original.expenseAppliedAmount
                : cell.row.original.expenseAppliedAmount}
            </>
          );
        },
      },
      {
        Header: "Raised By",
        accessor: "generatorName",
        Cell: (cell) => {
          return (
            <>
              {cell.row.original.generatorName
                ? cell.row.original.generatorName.split(" ")[0]
                : "N/A"}
            </>
          );
        },
      },
      {
        Header: "Project Name",
        accessor: "projectName",
      },
      {
        Header: "Approved Date",
        accessor: "approvedDate",
        Cell: (cell) => {
          return (
            <>
              {moment(new Date(cell.row.original.crDate))
                .add(5, "hours")
                .add(30, "minutes")
                .format("DD-MMM-YYYY h:mm a")}
            </>
          );
        },
      },
      {
        Header: "Created",
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
        },
      },
      {
        Header: "Final Approved Date",
        accessor: "finalApprovedDate",
        Cell: (cell) => {
          return (
            <>
              {cell.row.original.finalApproveDate ? (
                <>
                  <span>
                    {moment(new Date(cell.row.original.finalApproveDate))
                      .add(5, "hours")
                      .add(30, "minutes")
                      .format("DD-MMM-YYYY h:mm a")}
                  </span>
                </>
              ) : (
                <span className="text-center"> N/A </span>
              )}
            </>
          );
        },
      },
      {
        Header: "Pending At",
        accessor: "pendingAt",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (cell) => {
          return (
            <>
              <div>
                {cell.row.original.status == 0 && (
                  <span className="badge  bg-warning text-white">
                    {" "}
                    <AccessTimeIcon />{" "}
                  </span>
                )}
                {cell.row.original.status == 1 && (
                  <span className="badge bg-danger text-white">Rejected </span>
                )}
                {cell.row.original.status == 2 && (
                  <span className="badge bg-success text-white">Approved </span>
                )}
              </div>
              <div>
                &nbsp;{" "}
                {cell.row.original.queryOpenStatus == 1 && (
                  <span className="badge bg-primary text-white">Query</span>
                )}
                {(cell.row.original.functionStatus == 1 ||
                  cell.row.original.partialAmount) && (
                  <span className="badge bg-primary text-white">Partial</span>
                )}
              </div>
            </>
          );
        },
      },
      {
        Header: "View",
        Footer: "User-Action",
        accessor: "action",
        Cell: (cell) => {
          return (
            <>
              <IconButton
                title="View Detail"
                onClick={(e) => {
                  viewDetail(cell);
                }}
              >
                <VisibilityIcon style={{ color: "blue" }} />
              </IconButton>
            </>
          );
        },
        disableFilters: true,
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
          });
        } else if (res?.data?.statusDescription?.statusCode == 500) {
          Swal.fire({
            icon: "error",
            title: "Internal server error",
            text: res?.data?.statusDescription?.statusMessage,
          });
        } else if (res?.data?.statusDescription?.statusCode == 450) {
          Swal.fire({
            icon: "warning",
            title: "No Data Available",
            text: res?.data?.statusDescription?.statusMessage,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: res?.data?.statusDescription?.statusMessage,
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
    setfileNames(filesName);
  };
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = React.useState(0);
  const [userslist, setUsersList] = useState([]);
  const [request, setRequest] = useState({
    approverId: 361,
    userId: 361,
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
  useEffect(() => {
    if (userId && projectId) {
      formik.handleSubmit();
    }
  }, [request]);
  useEffect(() => {
    getUserProjects();
    getusers();
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const getUserProjects = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      const formdata = {
        roleId: user.roleId,
        userId: user.id,
      };
      try {
        let res = await common_axios.post(`/project/get`, formdata);
        if (res?.data?.statusDescription?.statusCode == 200) {
          setprojects(res.data.projects);
        } else {
        }
      } catch (error) {}
    }
  };
  const getusers = async () => {
    try {
      let res = await common_axios.post(`/authenc/users/get`);
      if (res?.data?.statusDescription?.statusCode == 200) {
        setUsersList(res.data.userList);
      } else {
      }
    } catch (error) {}
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      userId: "0",
      projectId: "0",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      let value = { ...request };
      if (userId == 0 || projectId == 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "All Fields are  required ",
        });
        return;
      }
      dispatch(setLoader(true));
      const user = JSON.parse(localStorage.getItem("user"));
      if (userId != 0 && projectId != 0) {
        (value["userId"] = "" + userId), (value["projectId"] = "" + projectId);
        value["approverId"] = "" + userId;
        const res = await common_axios.post(`/expense/approval/report`, value);
        if (res?.data?.statusDescription?.statusCode == 200) {
          setData(res.data.expenseList);
          setTotalCount(res.data.totalCount);
          setTotalPages(res.data.totalPages);
          setResp(true);
          setPaginationPage(TableStatus.pageNo + 1);
          dispatch(setLoader(false));
        } else {
          dispatch(setLoader(false));
          Swal.fire({
            icon: "error",
            title: "Error",
            text: res.data.statusDescription.statusMessage,
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Fields Required",
          text: "ProjectId/ApproverId is required",
        });
      }
    },
  });
  const resetForm = async () => {
    await setResp(false);
    setprojectId(0);
    setUserId(0);
  };
  const { globalFilter, pageIndex, pageSize } = state;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
              <span
                className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 "
                style={{
                  padding: "15px",
                  fontSize: "large",
                  borderRadius: "0",
                }}
              >
                {/* Add Number */}
                Approvals Report
                {/* <div className='d-flex justify-content-end'>
                                    Download
                                </div> */}
              </span>
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
                        <div className="card p-5">
                          <div className="row justify-content-start">
                            {
                              <div className="col-md-4 ">
                                {hideSkeleton1 == true ? (
                                  <>
                                    <Box sx={{ width: "100%" }}>
                                      <Skeleton />
                                      <Skeleton animation="wave" />
                                      <Skeleton animation="wave" />
                                    </Box>
                                  </>
                                ) : (
                                  <>
                                    <FormControl
                                      sx={{ padding: "2px" }}
                                      fullWidth
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Projects{" "}
                                        <span className="text text-danger">
                                          *{" "}
                                        </span>
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={projectId}
                                        required
                                        name="projectId"
                                        label="Projects"
                                        onChange={(e) => {
                                          setprojectId(e.target.value);
                                        }}
                                      >
                                        <MenuItem
                                          value={0}
                                          style={{ fontSize: "12px" }}
                                        >
                                          {" "}
                                          Select Project
                                        </MenuItem>
                                        {projectList.map((data) => {
                                          return (
                                            <MenuItem
                                              key={data.id}
                                              value={data.id}
                                              style={{ fontSize: "11px" }}
                                            >
                                              {" "}
                                              {data.name}
                                            </MenuItem>
                                          );
                                        })}
                                      </Select>
                                    </FormControl>
                                  </>
                                )}
                              </div>
                            }
                            {
                              <div className="col-md-4 ">
                                {hideSkeleton1 == true ? (
                                  <>
                                    <Box sx={{ width: "100%" }}>
                                      <Skeleton />
                                      <Skeleton animation="wave" />
                                      <Skeleton animation="wave" />
                                    </Box>
                                  </>
                                ) : (
                                  <>
                                    <FormControl
                                      sx={{ padding: "2px" }}
                                      fullWidth
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Approver{" "}
                                        <span className="text text-danger">
                                          *{" "}
                                        </span>
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={userId}
                                        required
                                        name="userId"
                                        label="Users"
                                        onChange={(e) => {
                                          setUserId(e.target.value);
                                        }}
                                      >
                                        <MenuItem
                                          value={0}
                                          style={{ fontSize: "12px" }}
                                        >
                                          {" "}
                                          Select Approver
                                        </MenuItem>
                                        {userslist.map((data) => {
                                          return (
                                            <MenuItem
                                              key={data.id}
                                              value={data.id}
                                              style={{ fontSize: "11px" }}
                                            >
                                              {" "}
                                              {data.name}
                                            </MenuItem>
                                          );
                                        })}
                                      </Select>
                                    </FormControl>
                                  </>
                                )}
                              </div>
                            }
                            {/* <div className='col-md-auto '>
                                                            <button className='btn bg-primary text-white' onClick={(e) => {
                                                                getDataForExport(totalCount)
                                                            }} > Export </button>
                                                        </div> */}
                          </div>
                        </div>
                      </div>{" "}
                      {detailView == false ? (
                        <>
                          <div
                            className="text-center"
                            style={{ marginTop: "0%" }}
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
                      <div className="card-body">
                        <div className="row justify-content-between"></div>
                        {true ? (
                          <div className="card shadow-none border bg_blue mt-4">
                            <span
                              className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 "
                              style={{ padding: "15px", fontSize: "large" }}
                            >
                              {/* Add Number */}
                              Approvals Report
                            </span>
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
                            ) : true ? (
                              <>
                                <div className="card-body ">
                                  <div className="d-flex justify-content-between mb-3">
                                    <select
                                      value={TableStatus.pageSize}
                                      className="w-30 p-2"
                                      onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                        setTableStatus({
                                          ...TableStatus,
                                          pageSize: e.target.value,
                                          pageNo: 0,
                                        });
                                        setRequest({
                                          ...request,
                                          pageSize: e.target.value,
                                        });
                                      }}
                                    >
                                      {[...new Set([10, 25, 50, totalCount])]
                                        .sort((a, b) => {
                                          return a - b;
                                        })
                                        .map((value, i) => {
                                          return (
                                            <option
                                              aria-labelledby="dropdownMenuButton1"
                                              value={value}
                                              key={value}
                                            >
                                              Show {value}
                                            </option>
                                          );
                                        })}
                                    </select>
                                  </div>
                                  <div className="table-responsive">
                                    <table
                                      {...getTableProps()}
                                      id="example"
                                      className="table table-striped message_table table-bordered mytableClass dataTable table-sm"
                                      style={{ width: "100%" }}
                                    >
                                      <thead>
                                        {headerGroups.map((headerGroup) => (
                                          <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                          >
                                            {headerGroup.headers.map(
                                              (column) => (
                                                <th
                                                  {...column.getHeaderProps(
                                                    column.getSortByToggleProps()
                                                  )}
                                                  className={
                                                    column?.Header ==
                                                    "Final Approved Date"
                                                      ? "text-center "
                                                      : column?.Header ==
                                                        "Camp Type"
                                                      ? "text-center width_2 update_th_sp d-flex border-start-0"
                                                      : "text-center width_2 update_th_sp "
                                                  }
                                                >
                                                  {column.render("Header")}
                                                  <span>
                                                    {column.isSorted
                                                      ? column.isSortedDesc
                                                        ? "↑"
                                                        : "↓"
                                                      : ""}
                                                  </span>
                                                  {column.Header ==
                                                  "Camp Type" ? (
                                                    <>
                                                      <InputAdornment
                                                        position="end"
                                                        className="my-auto"
                                                      >
                                                        <Tooltip
                                                          title={"P-Promotional T-Transactional"
                                                            .split(" ")
                                                            .map((arg) => {
                                                              return (
                                                                <>
                                                                  {arg}
                                                                  <br />
                                                                </>
                                                              );
                                                            })}
                                                          id="toolTipId"
                                                          placement="top"
                                                          arrow
                                                          sx={{
                                                            color: "white",
                                                          }}
                                                        >
                                                          <InfoIcon />
                                                        </Tooltip>
                                                      </InputAdornment>
                                                    </>
                                                  ) : (
                                                    <></>
                                                  )}
                                                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                                                </th>
                                              )
                                            )}
                                          </tr>
                                        ))}
                                      </thead>
                                      <tbody
                                        {...getTableBodyProps()}
                                        id="svg_tbody"
                                      >
                                        {page.map((row) => {
                                          prepareRow(row);
                                          return (
                                            <tr {...row.getRowProps()}>
                                              {row.cells.map((cell) => {
                                                return (
                                                  <td
                                                    {...cell.getCellProps()}
                                                    className={
                                                      (`${
                                                        cell.column.Header ==
                                                          "Final Approved Date" &&
                                                        "text-center"
                                                      }`,
                                                      `${
                                                        cell.column.Header ==
                                                        "Amount"
                                                          ? "text-right text-end"
                                                          : cell.column
                                                              .Header !=
                                                            "Final Approved Date"
                                                          ? "text-left update_td"
                                                          : "text-center"
                                                      }`)
                                                    }
                                                  >
                                                    {cell.render("Cell")}
                                                  </td>
                                                );
                                              })}
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="d-flex justify-content-between mt-3">
                                    <div>
                                      <span>
                                        Page:
                                        <strong>
                                          {0 + paginationPage} of {""}
                                          {totalPages}
                                        </strong>
                                      </span>
                                    </div>
                                    <div className="prev_next d-flex align-items-center">
                                      <button
                                        className=" css-21ve8j css-r93niq-MuiButtonBase-root-MuiPaginationItem-root m-0"
                                        type="button"
                                        onClick={() => {
                                          setTableStatus({
                                            ...TableStatus,
                                            pageNo: 0,
                                          });
                                          setPaginationPage(1);
                                          changeTableData(0, 0);
                                        }}
                                      >
                                        First
                                      </button>
                                      <Stack spacing={2}>
                                        {/* <Pagination count={1} shape="rounded" /> */}
                                        <Pagination
                                          onChange={(event, value) => {
                                            setTableStatus({
                                              ...TableStatus,
                                              pageNo: Number(value) - 1,
                                            });
                                            setPaginationPage(value);
                                            changeTableData(1, value);
                                          }}
                                          page={paginationPage}
                                          count={totalPages ? totalPages : ""}
                                          variant="outlined"
                                          shape="rounded"
                                          color="primary"
                                        />
                                      </Stack>
                                      {/* <Stack spacing={2}>
                                                                                <Pagination
                                                                                    onChange={(event, value) => {
                                                                                        
                                                                                        
                                                                                        
                                                                                        
                                                                                        
                                                                                        
                                                                                        
                                                                                    }}
                                                                                    page={paginationPage}
                                                                                    count={totalPages ? totalPages : ""}
                                                                                    variant="outlined"
                                                                                    shape="rounded"
                                                                                    color="primary"
                                                                                />
                                                                            </Stack> */}
                                      <button
                                        className="css-21ve8j css-r93niq-MuiButtonBase-root-MuiPaginationItem-root ms-2"
                                        type="button"
                                        onClick={() => {
                                          let totalPage = totalPages;
                                          totalPage = totalPage - 1;
                                          setTableStatus({
                                            ...TableStatus,
                                            pageNo: totalPage,
                                          });
                                          setPaginationPage(totalPages);
                                          changeTableData(3, totalPages);
                                        }}
                                      >
                                        Last
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="text-center mt-4">
                                  {data?.length == 0 &&
                                  open == true ? null : data?.length == 0 &&
                                    open == undefined ? null : (
                                    <div
                                      className="text-center "
                                      style={{ padding: "100px" }}
                                    >
                                      <h5>No Record Found..!!</h5>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="text-center mt-4">
                            {data?.length == 0 &&
                            open == true ? null : data?.length == 0 &&
                              open == undefined ? null : (
                              <div
                                className="text-center "
                                style={{ padding: "100px" }}
                              >
                                <h5>No Record Found..!!</h5>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </Box>
      </ThemeProvider>
      {/* 
            <button type="button" ref={modalContact2} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#view-modal">
                Launch demo modal
            </button>
            <div className="modal fade" id="view-modal" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">View Attachments</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  ></button>
                        </div>
                        <div className="modal-body">
                            <div >
                                <form>
                                    <div className="container px-0 mt-">
                                        <div >
                                            {viewFiles?.length == 0 && <p> No files Found</p>}
                                            <ul>
                                                {
                                                    viewFiles && viewFiles?.map((data) => {
                                                        return <><div className="row"><div className="col-md-auto">
                                                            <li> {data.name}</li>
                                                        </div> <div className="col-md-auto">
                                                                <span className="text text-danger" onClick={(e) => {
                                                                    removeAttachment(data.id)
                                                                }}> <CloseIcon style={{ color: "red" }} /></span>
                                                            </div></div></>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
    </>
  );
}
