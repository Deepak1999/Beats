import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import Box from "@mui/material/Box";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import "./main.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoIcon from "@mui/icons-material/Info";
import Pagination from "@mui/material/Pagination";
import SettingsIcon from "@mui/icons-material/Settings";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {
  Autocomplete,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import * as React from "react";
import moment from "moment";
import "../../../src/assets/css1/expense.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import XLSX from "sheetjs-style";
import { useEffect, useState, useMemo } from "react";
import { utils, writeFile } from "xlsx";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import ColumnFilter from "../../Components/ColumnFilter";
import { Skeleton, Tooltip } from "@mui/material";
import { common_axios } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import {
  setProjectList1,
  setRedirection,
  setTabIndex,
} from "../../redux/features/expenseIdSlice";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
import InvoiceRequests from "./InvoiceRequests";
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
export default function DemandInvoice() {
  const location = useLocation();
  const [projectId, setprojectId] = useState(0);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [hideSkeleton1, setHideSkeleton1] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isData, setisData] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [projectList, setProjectList] = useState([]);
  const [search, setSearch] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [selectBool, setSelectBool] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [bulkArray, setBulkArray] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [detailArray, setDetailArray] = useState([]);
  const [pState, setpState] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const [raiseText, setRaiseText] = useState("");
  const reportTemplateRef = React.useRef(null);
  const [requestData, setRequestData] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const redirection = useSelector((state) => state.expenseIdSlice.redirection);
  useEffect(() => {
    if (redirection) {
      dispatch(setRedirection(false));
      document.getElementById("simple-tab-1").click();
    }
  }, [redirection]);
  const tabIndex = useSelector((state) => state.expenseIdSlice.tabIndex);
  useEffect(() => {
    document.getElementById(`simple-tab-${tabIndex}`)?.click();
  }, [tabIndex]);
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
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  useEffect(() => {
    // setHideSkeleton1(true);
    // setHideSkeleton(true);
    // if (location.pathname === "/expense") {
    //   getAllAssigned();
    //   getAllProjects();
    // }
  }, [request]);
  const getSearch = async () => {
    let formdata = {
      searchKey: search,
      pageNo: 0,
      pageSize: 10,
      orderInt: 0,
      priceSort: false,
      createdSort: false,
      modifiedSort: false,
      nameSort: false,
      projectSort: false,
      statusSort: 0,
      raisedSort: true,
    };
    const res = await common_axios.post("/expenseenc/v2/search", formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
    }
  };
  useEffect(() => {
    if (search?.length > 3) {
      getSearch();
    } else {
    }
  }, [search]);
  const raiseRequest = async () => {
    let formdata = {
      text: raiseText,
      requestedTo: requestData.userId,
      expenseId: requestData.id,
    };
    const res = await common_axios.post(
      `/expense/sendInvoiceRequest`,
      formdata
    );
    if (res?.data?.statusDescription?.statusCode == 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Invoice demand raised successfully",
      });
      getAllAssigned();
      setRaiseText("");
      document.getElementById("confirm-close").click();
    } else if (res?.data?.statusDescription?.statusCode == 201) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Re-Raised Successfully",
      });
      getAllAssigned();
      setRaiseText("");
      document.getElementById("confirm-close").click();
    }
  };
  const exportExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    moment(new Date()).format("DD MM YYYY");
    let name = `Expense_assigned_report_${moment(new Date()).format(
      "DD-MM-YYYY"
    )}`;
    dispatch(setLoader(false));
    writeFile(wb, `${name}.xlsx`);
  };
  const getAllProjects = async () => {
    let res = await common_axios.post(
      "/projectenc/get",
      encryptBody(
        {
          roleId: 0,
        },
        localStorage.getItem("aesKey"),
        1
      )
    );
    res.data = decryptBody(
      res.data.encryptedResponse,
      localStorage.getItem("aesKey")
    );
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
      dispatch(setProjectList1(res.data.projects));
    }
  };
  const resetCheckBoxes = () => {
    let myData = [...data];
    let newData = myData.map((element) => {
      element.checkStatus = false;
      return element;
    });
    setSelectBool(false);
    setData(newData);
    setBulkArray([]);
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
  const generateMultipleLinks = (data) => {
    if (data) {
      if (data?.length > 0) {
        let links = [...data];
        const hyperlinks = links.map(
          (link) =>
            `=HYPERLINK("${generateDynamicLink(link)}", "${link.slice(
              link.lastIndexOf("/")
            )}")`
        );
        return { f: hyperlinks.join(" , ") };
      }
    }
  };
  const generateSingle = (link) => {
    return {
      f: `=HYPERLINK("${generateDynamicLink(link)}", "${link.slice(
        link.lastIndexOf("/") + 1
      )}")`,
    };
  };
  // Function to generate dynamic links based on some data
  const generateDynamicLink = (data) => {
    // Replace this logic with your dynamic link generation based on 'data'
    // For example, if 'data' is an ID, you can construct a link dynamically
    return `${data}`;
  };
  const formik1 = useFormik({
    initialValues: {
      search: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    // validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });
  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 50,
  });
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const viewDetail = (cell) => {
    // dispatch(setexpenseId(cell.row.original.id));
    // localStorage.setItem("expenseId", "" + cell.row.original.id);
    // history.push("/detail");
  };
  React.useEffect(() => {
    setHideSkeleton(true);
    getAllAssigned();
  }, []);
  const getAllAssigned = async () => {
    let approverId = localStorage.getItem("UserId");
    const res = await common_axios.post(`/expense/advance_approve`, {});
    if (res?.data?.statusDescription?.statusCode == 200) {
      setData(res.data.expenseList);
      setHideSkeleton1(false);
      setHideSkeleton(false);
      setisData(true);
    } else {
      setHideSkeleton1(false);
      setHideSkeleton(false);
      setisData(false);
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "Expense Id",
        accessor: "id",
        Cell: (cell) => {
          return <>{cell.row.original.id}</>;
        },
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
                  fontFamily: "'open sans',sans-serif ",
                }}
              >
                <Tooltip
                  title={
                    <h6
                      style={{
                        color: "lightblue",
                        fontSize: "13px",
                        fontFamily: "'open sans',sans-serif ",
                      }}
                    >
                      {cell.row.original.title}
                    </h6>
                  }
                  sx={{ cursor: "pointer" }}
                  arrow
                >
                  {" "}
                  <span
                    onClick={(e) => {
                      document.getElementById("detail-moopen").click();
                      getdetails(cell.row.original.title);
                    }}
                    style={{
                      fontSize: "13px",
                      fontFamily: "'open sans',sans-serif ",
                    }}
                  >
                    {cell.row.original.title?.slice(0, 20)}{" "}
                  </span>
                </Tooltip>
              </span>
            </>
          );
        },
      },
      {
        Header: "Project Name",
        accessor: "projectName", // accessor is the "key" in the data
      },
      {
        Header: "Advance Amount ",
        accessor: "expenseAppliedAmount",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-success">
                {cell.row.original.currencyId}
              </span>{" "}
              <span>
                {cell.row.original.expenseApprovedAmount
                  ? new Intl.NumberFormat().format(
                      cell.row.original.expenseApprovedAmount
                    )
                  : new Intl.NumberFormat().format(
                      cell.row.original.expenseApprovedAmount
                    )}{" "}
              </span>{" "}
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
        }, // accessor is the "key" in the data
      },
      {
        Header: "Approved Date",
        accessor: "finalApproveDate",
        Cell: (cell) => {
          return (
            <>
              {moment(new Date(cell.row.original.finalApproveDate))
                .add(5, "hours")
                .add(30, "minutes")
                .format("DD-MMM-YYYY h:mm a")}
            </>
          );
        }, // accessor is the "key" in the data
      },
      {
        Header: "Advance Receiver",
        accessor: "generatorName", // accessor is the "key" in the data
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
        Header: "View",
        Footer: "User-Action",
        accessor: "action",
        Cell: (cell) => {
          return (
            <>
              <IconButton
                title="Raise Request"
                style={{ marginLeft: "19%" }}
                id="basic-button"
                aria-controls={open1 ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open1 ? "true" : undefined}
                onClick={(e) => {
                  document.getElementById("confirm-button").click();
                  setRequestData(cell.row.original);
                }}
              >
                <PlaylistAddIcon style={{ color: "blue", fontSize: "19px" }} />
              </IconButton>
            </>
          );
        },
        disableFilters: true,
      },
    ],
    [data, TableStatus]
  );
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    setprojectId(0);
  }, [value]);
  const getdetails = async (expenseId) => {
    const res = await common_axios.post(`/expense/outer/details/${expenseId}`);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setDetailArray(res.data.expenseDetailsList);
    } else {
      setDetailArray([]);
    }
  };
  const getproejctIdFilter = async () => {
    let projectList = [];
    projectList.push(projectId);
    var myReq = { ...request, projectIdList: projectList };
    await setRequest(myReq);
  };
  const getqueryData = async (expenseId) => {
    let formdata = {
      expenseId: expenseId,
    };
    formdata = encryptBody(formdata, localStorage.getItem("aesKey"), 1);
    let res = await common_axios.post(`/expenseenc/queries/check2`, formdata);
    res.data = decryptBody(
      res.data.encryptedResponse,
      localStorage.getItem("aesKey")
    );
    if (res?.data?.statusDescription?.statusCode == 200) {
      setPendingCount(res.data.pendingQueryCount);
    } else {
      setPendingCount(res.data.pendingQueryCount);
    }
  };
  useEffect(() => {
    getqueryData();
    if (projectId != 0 && value == 0) {
      // setHideSkeleton(true);
      getproejctIdFilter();
    } else {
      setRequest({ ...request, projectIdList: [] });
    }
  }, [projectId]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      <Box
        className="tabs_8"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          alignContent: "left",
          margin: "10px",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Invoice Due Demands"
            {...a11yProps(0)}
            onClick={(e) => {
              getAllAssigned();
              dispatch(setTabIndex(0));
            }}
          />
          <Tab
            label="Invoice Demand Raised"
            {...a11yProps(1)}
            onClick={(e) => {
              dispatch(setTabIndex(1));
            }}
          />
        </Tabs>
        {pendingCount !== 0 && (
          <div
            style={{
              position: "relative",
              display: "inline-block",
              marginTop: "0.5%",
            }}
            title={`There  is ${pendingCount} pending queries at your end`}
            onClick={(e) => {
              // a11yProps(3)
              dispatch(setTabIndex(3));
            }}
          ></div>
        )}
      </Box>
      <CustomTabPanel value={value} index={0}>
        {true ? (
          <>
            <div className="card-body">
              {true ? (
                <div className="card shadow-none border bg_blue mt-4">
                  <span
                    className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 "
                    style={{ padding: "15px", fontSize: "large" }}
                  >
                    {/* Add Number */}
                    Invoice Due Demands
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
                      <div className="card-body ">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex justify-content-start">
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
                          </div>
                          <div
                            className="d-flex  "
                            style={{ justifyContent: "flex-end !important" }}
                          ></div>
                        </div>
                        <div
                          className="small_1 table-responsive"
                          style={{ marginTop: "2%" }}
                        >
                          <table
                            {...getTableProps()}
                            id="example"
                            className="table table-striped message_table table-bordered mytableClass dataTable table-sm  class_size "
                            style={{ width: "100%" }}
                          >
                            <thead>
                              {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                  {headerGroup.headers.map(
                                    (column, columnIndex) => (
                                      <th
                                        {...column.getHeaderProps(
                                          column.getSortByToggleProps()
                                        )}
                                        className={
                                          column?.Header == "status"
                                            ? "widht_class"
                                            : "text-center width_2 update_th_sp "
                                        }
                                        // colSpan={columnIndex  === 9 ? 4 : 1}
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
                                    )
                                  )}
                                </tr>
                              ))}
                            </thead>
                            <tbody
                              className="unique_spacing"
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
                                          // className="text-start"
                                          className={
                                            ` ${
                                              cell.column.Header == "Amount"
                                                ? "text-right text-end"
                                                : "text-left update_td"
                                            } ${
                                              cell.column.Header == "Status" &&
                                              "widht_class  text-left update_td"
                                            }  ${
                                              cell.column.Header == "Title" &&
                                              "w_227"
                                            }  `
                                            // [cell.column.Header == "Amount" ? "text-right text-end" : "text-left update_td" ,
                                            // cell.column.Header == "Status" && "widht_class" ]
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
                                {0 + 1} of {""}
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
                                resetCheckBoxes();
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
                                  resetCheckBoxes();
                                  // setrunningStateFun(false);
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
                              // style={{ background: "#2C97D4" }}
                              // disabled={
                              //   data1?.totalPages == data1?.pageable?.pageNumber + 1
                              //  }
                              onClick={() => {
                                let totalPage = totalPages;
                                totalPage = totalPage - 1;
                                setTableStatus({
                                  ...TableStatus,
                                  pageNo: totalPage,
                                });
                                setPaginationPage(totalPages);
                                resetCheckBoxes();
                                // alert("gg")
                                changeTableData(3, totalPages);
                                // setrunningStateFun(false);
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
                            <h5 style={{ fontSize: "13px" }}>
                              No Record Found..!!
                            </h5>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center mt-4">
                  {data?.length == 0 && open == true ? null : data?.length ==
                      0 && open == undefined ? null : (
                    <div className="text-center " style={{ padding: "100px" }}>
                      <h5 style={{ fontSize: "13px" }}>No Record Found..!!</h5>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <InvoiceRequests projectId={projectId} type={2} />
      </CustomTabPanel>
      <button
        type="button"
        className="btn btn-primary d-none "
        id="confirm-button"
        data-bs-toggle="modal"
        data-bs-target="#confirm-modal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="confirm-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Raise invoice demand
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <label>
                    Remarks <span className="text text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="text"
                    value={raiseText}
                    placeholder="Enter Remarks"
                    onChange={(e) => {
                      if (e.target.value?.length < 50) {
                        setRaiseText(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
              {/* Are you sure you want to approve selected{" "}
              {<span>{bulkArray.length}</span>} expenses? */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="confirm-close"
              >
                cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  raiseRequest();
                }}
              >
                {" "}
                Raise
              </button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
