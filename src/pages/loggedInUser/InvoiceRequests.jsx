import InfoIcon from "@mui/icons-material/Info";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import moment from "moment";
import PropTypes from "prop-types";
import * as React from "react";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
import XLSX from "sheetjs-style";
import { utils, writeFile } from "xlsx";
import { useEffect, useMemo, useState } from "react";
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
export default function InvoiceRequests(props) {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isData, setisData] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [hideSkeleton1, sethideSkeleton1] = useState(false);
  const [projectId, setprojectId] = useState(0);
  const [projectList, setProjectList] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [pState, setpState] = useState([]);
  const dispatch = useDispatch();
  const [fileat, setfileat] = useState(null);
  const [showReRaise, setShowReRaise] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [attList, setAttList] = useState([]);
  const [requestData, setRequestData] = useState(null);
  const [closeText, setCloseText] = useState("");
  const [raiseText, setRaiseText] = useState("");
  const [showResponsd, setShowRespond] = useState(false);
  const [showClose, setShowClose] = useState(false);
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
  const [files, setFiles] = useState({
    arr: [],
  });
  const removeAttachments2 = async (name) => {
    let arr = [...files.arr];
    arr.splice(name, 1);
    await setFiles({
      arr: arr,
    });
    if (arr.length == 0) {
      setfileat(null);
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const reportTemplateRef = React.useRef(null);
  const letprojectList = useSelector(
    (state) => state.expenseIdSlice.projectList
  );
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
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
    setRequestData(row);
    if (row?.original?.status == 0 || row?.original?.status == 4) {
      setShowReRaise(false);
    } else {
      setShowReRaise(true);
    }
    if (row?.original?.status == 4 || row?.original?.status == 1) {
      setShowRespond(false);
    } else {
      setShowRespond(true);
    }
    if (
      row?.original?.status == 4 ||
      row?.original?.status == 0 ||
      row?.original?.status == 2
    ) {
      setShowClose(false);
    } else {
      setShowClose(true);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const handleAction = (action) => {
    if (anchorEl) {
      handleClose();
    }
  };
  const respondRequest = async () => {
    let formdata = new FormData();
    if (!replyText) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Remarks are required",
      });
      return;
    }
    if (files?.arr?.length == 0) {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "File Required for attachment",
      });
      return;
    }
    files.arr.forEach((x) => {
      formdata.append("files", x);
    });
    formdata.append("replyText", replyText);
    formdata.append("expenseId", requestData?.original?.expenseId);
    const res = await common_axios.post(
      `/expense/expense_invoice_response`,
      formdata
    );
    if (res?.data) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Responded Successfully",
        });
        setFiles({
          arr: [],
        });
        setReplyText("");
        setRequestData(null);
        getAllAssigned();
      }
    }
    document.getElementById("respond-close").click();
  };
  const closeRequest = async () => {
    if (!closeText) {
      Swal.fire({
        icon: "warning",
        title: "Required field",
        title: "Remarks is required",
      });
      return;
    }
    if (requestData) {
      let formdata = {
        closeText: closeText,
      };
      const res = await common_axios.post(
        `/expense/close/invoice/${requestData.original?.id}`,
        formdata
      );
      if (res?.data) {
        if (res?.data?.statusDescription?.statusCode == 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            title: "Request closed successfully",
          });
          setCloseText("");
          getAllAssigned();
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            title: res?.data?.statusDescription?.statusMessage,
          });
        }
        setRequestData(null);
        document.getElementById("confirm-close3")?.click();
      }
    }
  };
  const raiseRequest = async () => {
    let formdata = {
      text: raiseText,
      requestedTo: requestData.original.requestedTo,
      expenseId: requestData.original.expenseId,
    };
    const res = await common_axios.post(
      `/expense/sendInvoiceRequest`,
      formdata
    );
    if (res?.data.statusDescription.statusCode == 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Raised Successfully",
      });
      setRaiseText("");
      document.getElementById("confirm-close").click();
    } else if (res?.data.statusDescription.statusCode == 201) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Re-Raised Successfully",
      });
      getAllAssigned();
      setRaiseText("");
      document.getElementById("confirm-close").click();
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: res?.data?.statusDescription?.statusMessage,
      });
    }
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
    pageSize: 50,
  });
  useEffect(() => {
    setHideSkeleton(true);
    getAllAssigned();
  }, [request]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const history = useHistory();
  const viewDetail = (cell) => {
    // dispatch(setexpenseId(cell?.row?.original?.id));
    // localStorage.setItem("expenseId", "" + cell?.row?.original?.id);
    // history.push("/detail");

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
  const viewDetail1 = (expenseId) => {
    dispatch(setexpenseId(expenseId));
    localStorage.setItem("expenseId", "" + expenseId);
    history.push("/detail");
  };
  const createExpense = () => {
    history.push("/create");
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
  const uploadFiles = async (e) => {
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
    let formdata = {};
    if (props.type == 1) {
      const res = await common_axios.post(
        `/expense/get_response_expense_invoice`,
        {}
      );
      if (res?.data) {
        if (res?.data?.statusDescription?.statusCode == 200) {
          setisData(true);
          setHideSkeleton(false);
          setData(res.data.requests);
        } else {
          setisData(false);
          setHideSkeleton(false);
        }
      } else {
      }
      setHideSkeleton(false);
    } else if (props.type == 2) {
      const res = await common_axios.post(
        `/expense/get_request_expense_invoice`,
        {}
      );
      if (res.data) {
        if (res?.data?.statusDescription?.statusCode == 200) {
          setisData(true);
          setHideSkeleton(false);
          setData(res.data.requests);
        } else {
          setisData(false);
          setHideSkeleton(false);
        }
      } else {
      }
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "Expense Id",
        accessor: "expenseId",
        Cell: (cell) => {
          return <>{cell?.row?.original?.expense?.id || "N/A"}</>;
        },
      },
      {
        Header: "Title",
        accessor: "expenseTitle",
        Cell: (cell) => {
          // return <>{cell?.row?.original?.expense?.title || "N/A"}</>;
          return (
            <>
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
                      {cell?.row?.original?.expense?.title}
                    </h6>
                  }
                  sx={{ cursor: "pointer" }}
                  arrow
                >
                  {" "}
                  {cell?.row?.original?.expense?.title
                    ? cell?.row?.original?.expense?.title?.slice(0, 30)
                    : "N/A"}{" "}
                </Tooltip>
              </span>
            </>
          );
        },
      },
      {
        Header: "Project Name",
        accessor: "projectName",
        Cell: (cell) => {
          return <>{cell?.row?.original?.projectName || "N/A"}</>;
        },
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (cell) => {
          return (
            <>{cell?.row?.original?.expense?.expenseApprovedAmount || "N/A"}</>
          );
        },
      },
      // {
      //   Header: "Requested To",
      //   accessor: "requestedToName",
      //   Cell: (cell) => {
      //     return <>{cell?.row?.original?.requestedToName}</>;
      //   },
      // },
      {
        Header: `${props.type == 1 ? "Raised By" : "Requested To"}`,
        accessor: `${props.type == 1 ? "requestedByName" : "requestedToName"}`,
        Cell: (cell) => {
          return (
            <>
              {props.type == 1
                ? cell?.row?.original?.requestedByName
                : cell?.row?.original?.requestedToName}
            </>
          );
        },
      },
      {
        Header: "Requested On",
        accessor: "raiseTime",
        Cell: (cell) => {
          return (
            <>
              {moment(new Date(cell?.row?.original?.raiseTime))
                .add(5, "hours")
                .add(30, "minutes")
                .format("DD-MMM-YYYY h:mm a")}
            </>
          );
        }, // accessor is the "key" in the data
      },
      // {
      //   Header: "Raised by",
      //   accessor: "generatorName", // accessor is the "key" in the data
      // },
      {
        Header: "Request Remarks",
        accessor: "text",
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
                      {cell?.row?.original?.text}
                    </h6>
                  }
                  sx={{ cursor: "pointer" }}
                  arrow
                >
                  {" "}
                  {cell?.row?.original?.text?.slice(0, 20)}{" "}
                </Tooltip>
              </span>
            </>
          );
        },
      },
      {
        Header: "Last Reply",
        accessor: "replyText", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            <>
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
                      {cell?.row?.original?.replyText
                        ? cell?.row?.original?.replyText
                        : "N/A"}
                    </h6>
                  }
                  sx={{ cursor: "pointer" }}
                  arrow
                >
                  {" "}
                  {cell?.row?.original?.replyText
                    ? cell?.row?.original?.replyText?.slice(0, 20)
                    : "N/A"}
                </Tooltip>
              </span>
            </>
          );
        },
      },
      {
        Header: "Closing remarks",
        accessor: "closeText", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            <>
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
                      {cell?.row?.original?.closeText
                        ? cell?.row?.original?.closeText
                        : "N/A"}
                    </h6>
                  }
                  sx={{ cursor: "pointer" }}
                  arrow
                >
                  {" "}
                  {cell?.row?.original?.closeText
                    ? cell?.row?.original?.closeText?.slice(0, 20)
                    : "N/A"}
                </Tooltip>
              </span>
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
              {props.type == 2 && cell?.row?.original?.status == 0 && (
                <span className="badge bg-warning"> Raised </span>
              )}
              {props.type == 1 && cell?.row?.original?.status == 0 && (
                <span className="badge bg-warning"> Pending </span>
              )}
              {props.type == 2 && cell?.row?.original?.status == 1 && (
                <span className="badge bg-success"> Replied </span>
              )}
              {props.type == 1 && cell?.row?.original?.status == 1 && (
                <span className="badge bg-success"> Replied </span>
              )}
              {cell?.row?.original?.status == 2 && (
                <span className="badge bg-primary"> Re-Raised </span>
              )}
              {cell?.row?.original?.status == 4 && (
                <span className="badge bg-danger"> Closed </span>
              )}
            </>
          );
        },
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
            <div className="card shadow-none border bg_blue mt-5">
              <span
                className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 "
                style={{ padding: "15px", fontSize: "large" }}
              >
                {props.type == 1 ? "Invoice Demands" : "Invoices Demand Raised"}
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
                              {props.type == 1}
                              <th>Action</th>
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
                                      // className="text-start"
                                      className={` ${
                                        cell.column.Header == "Amount"
                                          ? "text-right text-end"
                                          : "text-left update_td"
                                      } ${
                                        cell.column.Header == "Status" &&
                                        "widht_class  text-left update_td"
                                      }  ${
                                        cell.column.Header == "Title" && "w_227"
                                      }  
                                      ${
                                        cell.column.Header == "Expense Id" &&
                                        "text-right text-end  mr-4"
                                      } `}
                                    >
                                      {cell.render("Cell")}
                                    </td>
                                  );
                                })}
                                {props.type == 1 ? (
                                  <td>
                                    <IconButton
                                      onClick={(event) =>
                                        handleClick(event, row)
                                      }
                                    >
                                      <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                      anchorEl={anchorEl}
                                      open={Boolean(anchorEl)}
                                      onClose={handleClose}
                                    >
                                      <MenuItem
                                        onClick={() => {
                                          viewDetail1(
                                            requestData?.original?.expenseId
                                          );
                                        }}
                                      >
                                        View Expense
                                      </MenuItem>
                                      {showResponsd && (
                                        <MenuItem
                                          onClick={() => {
                                            document
                                              .getElementById("confirm-button1")
                                              ?.click();
                                          }}
                                        >
                                          Reply
                                        </MenuItem>
                                      )}
                                      {selectedRow?.original.status != 0 && (
                                        <MenuItem
                                          onClick={() => {
                                            document
                                              .getElementById("confirm-button4")
                                              ?.click();
                                            handleAction("Files");
                                            setAttList(
                                              requestData?.original?.attachments
                                            );
                                          }}
                                        >
                                          Invoice Files
                                        </MenuItem>
                                      )}
                                    </Menu>
                                  </td>
                                ) : (
                                  <td>
                                    <IconButton
                                      onClick={(event) =>
                                        handleClick(event, row)
                                      }
                                    >
                                      <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                      anchorEl={anchorEl}
                                      open={Boolean(anchorEl)}
                                      onClose={handleClose}
                                    >
                                      <MenuItem
                                        onClick={() => {
                                          viewDetail1(
                                            requestData?.original?.expenseId
                                          );
                                        }}
                                      >
                                        {" "}
                                        View Expense
                                      </MenuItem>
                                      {showReRaise && (
                                        <MenuItem
                                          onClick={() => {
                                            if (
                                              requestData?.original?.status == 4
                                            ) {
                                            } else {
                                              handleAction("Re-Raise");
                                              document
                                                .getElementById(
                                                  "confirm-button2"
                                                )
                                                ?.click();
                                            }
                                          }}
                                        >
                                          Re-raise
                                        </MenuItem>
                                      )}
                                      {requestData?.original.status != 0 && (
                                        <MenuItem
                                          onClick={() => {
                                            document
                                              .getElementById("confirm-button4")
                                              ?.click();
                                            setAttList(
                                              requestData?.original?.attachments
                                            );
                                            handleAction("Close");
                                          }}
                                        >
                                          Invoice Files
                                        </MenuItem>
                                      )}
                                      {showClose && (
                                        <MenuItem
                                          onClick={() => {
                                            document
                                              .getElementById("confirm-button3")
                                              ?.click();
                                            handleAction("Close");
                                          }}
                                        >
                                          Close Demand
                                        </MenuItem>
                                      )}
                                    </Menu>
                                  </td>
                                )}
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
                          // style={{ background: "#2C97D4" }}
                          //  disabled={data1?.pageable?.pageNumber == 0}
                          onClick={() => {
                            setTableStatus({
                              ...TableStatus,
                              pageNo: 0,
                            });
                            setPaginationPage(1);
                            changeTableData(0, 0);
                            // setrunningStateFun(false);
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
      <button
        type="button"
        className="btn btn-primary d-none "
        id="confirm-button1"
        data-bs-toggle="modal"
        data-bs-target="#confirm-modal1"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="confirm-modal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Reply invoice request
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
                <div className="col-md-12">
                  <label>
                    Remarks <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="text"
                    placeholder="Enter Remarks"
                    value={replyText}
                    onChange={(e) => {
                      if (e.target.value?.length < 50) {
                        setReplyText(e.target.value);
                      }
                    }}
                  />
                </div>
                <div className="col-md-12 mt-1">
                  <label>
                    Attach File <span className="text text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="text"
                    multiple={true}
                    value={fileat}
                    onChange={(e) => {
                      uploadFiles(e);
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <hr></hr>
                  {files?.arr?.map((data, i) => {
                    return (
                      <h6>
                        {data?.name}
                        <span
                          className="text-danger "
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            removeAttachments2(data.name);
                          }}
                        >
                          x
                        </span>
                      </h6>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="respond-close"
                onClick={(e) => {
                  setRequestData(null);
                  setFiles({
                    arr: [],
                  });
                }}
              >
                cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  respondRequest();
                }}
              >
                {" "}
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary d-none "
        id="confirm-button2"
        data-bs-toggle="modal"
        data-bs-target="#confirm-modal2"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="confirm-modal2"
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="confirm-close"
                onClick={(e) => {
                  setRequestData(null);
                }}
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
                Re-Raise
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary d-none "
        id="confirm-button3"
        data-bs-toggle="modal"
        data-bs-target="#confirm-modal3"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="confirm-modal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Close invoice demand
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
                <p>Are you sure you want to close the request ?</p>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label>
                    Booking ledger name{" "}
                    <span className="text text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="text"
                    value={closeText}
                    placeholder="Enter booking ledger name"
                    onChange={(e) => {
                      if (e.target.value?.length < 50) {
                        setCloseText(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="confirm-close3"
                onClick={(e) => {
                  setRequestData(null);
                }}
              >
                cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  closeRequest();
                }}
              >
                {" "}
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary d-none "
        id="confirm-button4"
        data-bs-toggle="modal"
        data-bs-target="#confirm-modal4"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="confirm-modal4"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Invoices List
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
                <div>
                  {attList?.length > 0 &&
                    attList?.map((x) => {
                      return (
                        <>
                          <a href={x.url} target="_blank">
                            {x.fileNewName}
                          </a>{" "}
                          <br />
                        </>
                      );
                    })}
                  {attList?.length == 0 && (
                    <h6 className="text-center"> No files available</h6>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
