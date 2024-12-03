import InfoIcon from "@mui/icons-material/Info";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Autocomplete,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Typography from "@mui/material/Typography";
import moment from "moment";
import PropTypes from "prop-types";
import * as React from "react";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
import XLSX from "sheetjs-style";
import { utils, writeFile } from "xlsx";
import { useEffect, useMemo, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { Skeleton, Tooltip } from "@mui/material";
import ColumnFilter from "../../Components/ColumnFilter";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import { common_axios } from "../../App";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import {
  setexpenseId,
  setReleaseId,
} from "../../redux/features/expenseIdSlice";
import TypeComp from "../../Components/TypeComp";
import TableDynamic2 from "../../Components/Tabledynamic copy";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
export default function MyRaised(props) {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isData, setisData] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hideSkeleton1, sethideSkeleton1] = useState(false);
  const [projectId, setprojectId] = useState(0);
  const [projectList, setProjectList] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [pState, setpState] = useState([]);
  const dispatch = useDispatch();
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const reportTemplateRef = React.useRef(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const letprojectList = useSelector(
    (state) => state.expenseIdSlice.projectList
  );
  const [processType, setProcessType] = useState(null);
  useEffect(() => {
    setprojectId(0);
    setpState([]);
    getAllProjects();
  }, [processType]);
  useEffect(() => {
    if (projectId != 0) {
      setHideSkeleton(true);
      getproejctIdFilter();
    } else {
      setRequest({ ...request, projectIdList: [] });
    }
  }, [projectId]);
  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 10,
  });
  useEffect(() => {
    if (
      localStorage.getItem("aesKey") != null &&
      localStorage.getItem("userId") != null &&
      localStorage.getItem("token") != null
    ) {
      setHideSkeleton(true);
      getAllAssigned();
    }
  }, [request]);
  const getAllProjects = async () => {
    let res = await common_axios.post(
      "/project/get",

      {
        roleId: 0,
        typeId: processType,
      }
    );
    if (res?.data) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        res.data.projects = res.data.projects.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
        });
        setProjectList(res.data.projects);
      }
    }
  };
  const exportExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    /* export to XLSX */
    moment(new Date()).format("DD MM YYYY");
    let name = `Expense_report_${moment(new Date()).format("DD-MM-YYYY")}`;
    dispatch(setLoader(false));
    writeFile(wb, `${name}.xlsx`);
  };
  const getproejctIdFilter = async () => {
    let projectList = [];
    projectList.push(projectId);
    var myReq = { ...request, projectIdList: projectList };
    await setRequest(myReq);
  };
  const getDataForExport = async (count, type) => {
    let approverId = localStorage.getItem("UserId");
    dispatch(setLoader(true));
    var req = {
      ...request,
    };
    req["pageNo"] = 0;
    req["pageSize"] = count;
    // setRequest(...{ approverId })
    let encrypted = await common_axios.post(
      `/expenseenc/get/v3/assigned`,
      encryptBody(req, localStorage.getItem("aesKey"), 1)
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
        let arr = [];
        res.data.expenseList.forEach((el) => {
          let payment = el.payment;
          let formdata = {
            ExpenseId: el.id,
            Title: el.title,
            Description: el.description,
            Amount: el.expenseAppliedAmount,
            Currency: el.currencyId,
            AppliedAmount: 0,
            ApprovedAmount: 0,
            Date: el.created,
            Status: "N/A",
            Initiator: el.generatorName,
            Bank_Name: "N/A",
            Account_no: "N/A",
            IFSC_Code: "N/A",
            Account_Holder_Name: "N/A",
            Pending_At: "N/A",
          };
          if (el.expenseStatus == 2) {
            formdata["Status"] = "Approved";
          } else if (el.expenseStatus == 1) {
            formdata.Status = "Rejected";
          } else {
            formdata.Status = "Pending";
          }
          formdata.AppliedAmount = el.expenseAppliedAmount;
          if (el.expenseApprovedAmount) {
            formdata.ApprovedAmount = el.expenseApprovedAmount;
          }
          if (payment) {
            (formdata.Bank_Name = payment.payment),
              (formdata.Account_no = payment.warranty),
              (formdata.IFSC_Code = payment.delivery),
              (formdata.Account_Holder_Name = payment.holderName);
          }
          if (el.pendingAt) {
            formdata.Pending_At = el.pendingAt;
          }
          if (el.expenseAttachedFiles?.length > 0) {
            el.expenseAttachedFiles.forEach((element, index) => {
              if (element) {
                formdata[`file-${index + 1}`] = generateSingle(element);
              } else {
                formdata[`file-${index + 1}`] = "N/A";
              }
            });
          }
          if (type == 1) {
            if (el.queryOpenStatus == 1) {
              formdata["queryStatus"] = "open";
            } else {
              formdata["queryStatus"] = "N/A";
            }
            arr.push(formdata);
          }
          if (type == 2 && el.queryOpenStatus != 1) {
            arr.push(formdata);
          }
          if (type == 3 && el.queryOpenStatus == 1) {
            formdata["queryStatus"] = "open";
            arr.push(formdata);
          }
        });
        setExportData(arr);
        exportExcel(arr);
      } else if (res?.data?.statusDescription?.statusCode == 401) {
        setHideSkeleton(false);
        setisData(false);
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: res?.data?.statusDescription?.statusMessage,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      } else if (res?.data?.statusDescription?.statusCode == 500) {
        setisData(false);
        Swal.fire({
          icon: "error",
          title: "Internal server error",
          text: res?.data?.statusDescription?.statusMessage,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      } else {
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Decryption Failed",
        text: res?.data?.statusDescription?.statusMessage,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
    dispatch(setLoader(false));
  };

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const history = useHistory();
  const viewDetail = (cell) => {
    if (cell.row.original.type == 3) {
      dispatch(setReleaseId(cell.row.original.id));
      localStorage.setItem("releaseId", "" + cell.row.original.id);
      history.push("/releaseDetail/" + cell.row.original.id);
    } else {
      dispatch(setexpenseId(cell.row.original.id));
      localStorage.setItem("expenseId", "" + cell.row.original.id);
      history.push("/detail");
    }
  };
  const createExpense = () => {
    history.push("/navigation");
  };
  const generateSingle = (link) => {
    return {
      f: `=HYPERLINK("${generateDynamicLink(link)}", "${link.slice(
        link.lastIndexOf("/") + 1
      )}")`,
    };
  };
  const generateDynamicLink = (data) => {
    // Replace this logic with your dynamic link generation based on 'data'
    // For example, if 'data' is an ID, you can construct a link dynamically
    return `${data}`;
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
  const getAllAssigned = async () => {
    let approverId = localStorage.getItem("UserId");
    // setRequest(...{ approverId })
    let encryptedres = await common_axios.post(
      `/expenseenc/get/raised`,
      encryptBody(request, localStorage.getItem("aesKey"), 1)
    );
    let res = {
      data: {},
    };

    if (localStorage.getItem("aesKey") == null) {
      return;
    }
    res.data = decryptBody(
      encryptedres.data.encryptedResponse,
      localStorage.getItem("aesKey")
    );
    if (encryptedres?.data?.statusDescription?.statusCode == 200) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        setisData(true);
        setTotalPages(res.data.totalPages);
        setData(res.data.expenseList);
        setHideSkeleton(false);
        setTotalCount(res.data.totalCount);
      } else if (res?.data?.statusDescription?.statusCode == 401) {
        setisData(false);
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: res?.data?.statusDescription?.statusMessage,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      } else if (res?.data?.statusDescription?.statusCode == 500) {
        setisData(false);
        Swal.fire({
          icon: "error",
          title: "Internal server error",
          text: res?.data?.statusDescription?.statusMessage,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      } else {
        setisData(false);
        setHideSkeleton(false);
        // Swal.fire({
        //     icon: "error",
        //     title: "Something went wrong",
        //     text: res?.data?.statusDescription?.statusMessage,
        //     // footer: '<a href="">Why do I have this issue?</a>'
        // });
      }
    } else {
      setisData(false);
      setHideSkeleton(false);
      Swal.fire({
        icon: "error",
        title: "Decryption Failed",
        text: res?.data?.statusDescription?.statusMessage,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "P",
        accessor: "isImportant",
        Cell: (cell) => {
          return (
            <span
              className={
                cell.row.original.isImportant == 1
                  ? "text text-danger text-center"
                  : "text text-center"
              }
            >
              {cell.row.original.isImportant == "1" ? (
                <Tooltip
                  title={<h6 style={{ color: "lightblue" }}>High Priority</h6>}
                  sx={{ cursor: "pointer" }}
                  arrow
                >
                  <PriorityHighIcon />
                </Tooltip>
              ) : (
                <></>
              )}
            </span>
          );
        },
      },
      ,
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span
                style={{
                  cursor: "pointer",
                  fontSize: "13px",
                  fontFamily: "'open sans',sans-serif ",
                }}
              >
                <Tooltip
                  title={
                    <h6
                      style={{
                        color: "lightblue",
                        fontFamily: "'open sans',sans-serif ",
                        fontSize: "13px",
                      }}
                    >
                      {cell.row.original.title}
                    </h6>
                  }
                  sx={{ cursor: "pointer" }}
                  arrow
                >
                  {" "}
                  {cell.row.original.title?.slice(0, 20)}{" "}
                </Tooltip>
              </span>
            </>
          );
        },
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: (cell) => {
          return (
            <>
              <TypeComp type={cell.row.original.type} />
            </>
          );
        },
      },
      {
        Header: "Project Name",
        accessor: "projectName", // accessor is the "key" in the data
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
        }, // accessor is the "key" in the data
      },
      {
        Header: "Raised by",
        accessor: "generatorName", // accessor is the "key" in the data
      },
      {
        Header: "Amount",
        accessor: "expenseAppliedAmount",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-success">
                {cell.row.original.currencyId}
              </span>{" "}
              <span>
                {cell.row.original.partialAmount
                  ? new Intl.NumberFormat().format(
                      cell.row.original.expenseAppliedAmount
                    )
                  : new Intl.NumberFormat().format(
                      cell.row.original.expenseAppliedAmount
                    )}{" "}
              </span>{" "}
            </>
          );
        },
      },
      {
        Header: "Pending at",
        accessor: "pendingAt", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            <>
              {cell.row.original.pendingAt
                ? cell.row.original.pendingAt
                : "Settled"}
            </>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (cell) => {
          return (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "unset",
                  textAlign: "center",
                }}
              >
                {cell.row.original.status == 0 && (
                  <span
                    className="badge text-white mx-1 cursor_"
                    title="Pending"
                    style={{ padding: "1px", backgroundColor: "#ff8c00" }}
                  >
                    <AccessTimeIcon />
                  </span>
                )}
                {cell.row.original.status == 1 && (
                  <span
                    className="badge bg-danger text-white mx-1 cursor_"
                    title="Rejected"
                    style={{ padding: "1px" }}
                  >
                    <CloseIcon />
                  </span>
                )}
                {cell.row.original.status == 2 && (
                  <span
                    className="badge bg-success text-white mx-1 cursor_ "
                    title="Approved"
                    style={{ padding: "1px" }}
                  >
                    <DoneOutlineIcon />
                  </span>
                )}
                {cell.row.original.queryOpenStatus == 1 && (
                  <span
                    className="badge bg-primary text-white mx-1 cursor_"
                    title="Open Query"
                    style={{ padding: "1px" }}
                  >
                    <QuestionMarkIcon />
                  </span>
                )}
                {cell.row.original.functionStatus[1] == 1 && (
                  <span
                    className="badge text-white mx-1 cursor_"
                    title="Partially Rejected"
                    style={{ backgroundColor: "#4b2142", padding: "1px" }}
                  >
                    <HourglassBottomIcon />
                  </span>
                )}
                {cell.row.original.functionStatus[2] == 1 && (
                  <span
                    className="badge text-white mx-1 cursor_"
                    style={{ backgroundColor: "#2a8000", padding: "1px" }}
                  >
                    <ModeEditIcon />
                  </span>
                )}
              </div>
            </>
          );
        },
      },
      {
        Header: "View",
        Footer: "User-Action",
        accessor: "projectId",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <IconButton
                title="View detail"
                style={{ marginLeft: "19%" }}
                onClick={(e) => {
                  viewDetail(cell);
                }}
              >
                <VisibilityIcon style={{ color: "blue", fontSize: "19px" }} />
              </IconButton>
            </>
          );
        },
        disableFilters: true,
      },
    ],
    [data, TableStatus, props]
  );
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
    state,
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
    <Box sx={{ width: "100%" }}>
      {true ? (
        <>
          <div className="card-body">
            <div className="row justify-content-between">
              {
                <div className="col-md-4 lavel">
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
                      <>
                        <div className="row">
                          <div className="col-md-6">
                            {" "}
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Request Type
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={processType}
                                label="Age"
                                onChange={(e) => {
                                  setProcessType(e?.target?.value);
                                }}
                              >
                                <MenuItem value={null}>
                                  Select Process Type
                                </MenuItem>
                                <MenuItem value={3}>Advance</MenuItem>
                                <MenuItem value={2}>Utility</MenuItem>
                                <MenuItem value={1}>Routine</MenuItem>
                                <MenuItem value={4}>Purchase</MenuItem>
                                <MenuItem value={5}>Claims</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="col-md-6">
                            <Autocomplete
                              id="controlled-demo"
                              value={pState}
                              size="small"
                              onChange={(e, newValue, reason) => {
                                if (reason === "clear") {
                                  setprojectId(0);
                                  setpState([]);
                                  // resetFilter()
                                }
                                setpState(newValue);
                                if (newValue) {
                                  setprojectId(newValue?.id);
                                }
                              }}
                              options={projectList}
                              getOptionLabel={(option) => option?.name || ""}
                              renderInput={(params) => (
                                <TextField {...params} label="Select Project" />
                              )}
                            />
                          </div>
                        </div>
                      </>
                    </>
                  )}
                </div>
              }
              <div className="col-md-auto">
                <button
                  className="btn btn-success blue"
                  style={{ fontSize: "11px", marginRight: "15px" }}
                  onClick={(e) => {
                    createExpense();
                  }}
                >
                  Create New Request{" "}
                </button>
                <button
                  className="btn bg-primary text-white"
                  style={{ fontSize: "11px" }}
                  id="basic-button1"
                  aria-controls={open1 ? "basic-menu1" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? "true" : undefined}
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  {" "}
                  Export{" "}
                </button>
                <Menu
                  id="basic-menu1"
                  anchorEl={anchorEl}
                  open={open1}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button1",
                  }}
                >
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      getDataForExport(totalCount, 1);
                    }}
                  >
                    All
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      getDataForExport(totalCount, 2);
                    }}
                  >
                    Without Queries
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      getDataForExport(totalCount, 3);
                    }}
                  >
                    Queries
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div className="card shadow-none border bg_blue mt-5">
              <span
                className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 "
                style={{ padding: "15px", fontSize: "large" }}
              >
                My Raised Expenses
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
                  </Box>
                </>
              ) : isData ? (
                <>
                  {/* <TableDynamic2
                    hideSkeleton={hideSkeleton}
                    columns={columns}
                    isData={isData}
                    data={data}
                    totalPages={totalPages}
                    header={"Search Results "}
                    statusChange={(e) => {
                      if (true) {
                        setTableStatus(e);
                        let req = { ...request };
                        (req.pageNo = e.pageNo), (req.pageSize = e.pageSize);
                        setRequest(req);
                      }
                    }}
                  /> */}
                  <div className="card-body ">
                    <div
                      className="d-flex justify-content-between mb-3"
                      style={{ marginTop: "-2%" }}
                    >
                      <select
                        value={TableStatus.pageSize}
                        className="w-30 p-2"
                        style={{
                          fontSize: "11px",
                          marginRight: "20px",
                          height: "30px",
                          marginTop: "2.5%",
                        }}
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
                      <Tooltip title="Refresh">
                        <button
                          type="submit"
                          className="btn bg-gradient-primary w_btn m-0 ms-3 me-3 search_1  "
                          onClick={(e) => {
                            getAllAssigned();
                          }}
                        >
                          <RefreshIcon />
                        </button>
                      </Tooltip>
                    </div>
                    <div></div>
                    <div className=" small_1 table-responsive">
                      <table
                        {...getTableProps()}
                        id="example"
                        className="table table-striped message_table table-bordered dataTable table-sm mytableClass class_size"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
                                  className={
                                    column?.Header == "Message"
                                      ? "text-center width_2 update_th messageWidth"
                                      : column?.Header == "Camp Type"
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
                                  {column.Header == "Camp Type" ? (
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
                                          sx={{ color: "white" }}
                                        >
                                          <InfoIcon />
                                        </Tooltip>
                                      </InputAdornment>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody {...getTableBodyProps()} id="svg_tbody">
                          {page.map((row) => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                  return (
                                    <td
                                      {...cell.getCellProps()}
                                      className={` ${
                                        cell.column.Header == "Amount"
                                          ? "text-right text-end"
                                          : "text-left update_td"
                                      } ${
                                        cell.column.Header == "Status" &&
                                        "widht_class  text-left update_td"
                                      }  ${
                                        cell.column.Header == "Title" && "w_227"
                                      }  `}
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
                            {request.pageNo + 1} of {""}
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
                    {data?.length == 0 && open == true ? null : data?.length ==
                        0 && open == undefined ? null : (
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
          </div>
        </>
      ) : (
        <>
          <div className="text-center mt-4">
            {data?.length == 0 && open == true ? null : data?.length == 0 &&
              open == undefined ? null : (
              <div className="text-center " style={{ padding: "100px" }}>
                <h5>No Record Found..!!</h5>
              </div>
            )}
          </div>
        </>
      )}
    </Box>
  );
}
