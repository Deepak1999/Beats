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
// import { withStyles } from "@mui/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import VisibilityIcon from "@mui/icons-material/Visibility";
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
  setexpenseId,
  setMilestoneId,
  setProjectList1,
  setRedirection,
  setReleaseId,
  setTabIndex,
} from "../../redux/features/expenseIdSlice";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
import InvoiceRequests from "./InvoiceRequests";
import { DynamicTable } from "../../Components/Tabledynamic";
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
export default function PaymentReleaseRequest(props) {
  // const location = useLocation();
  const paperStyles = {
    root: {
      height: "54px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `0 50 0 50`,
      margin: "0 auto 7px auto",
    },
  };
  // const ColoredPaper = withStyles(paperStyles)(Paper);
  const [projectId, setprojectId] = useState("0");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [hideSkeleton1, setHideSkeleton1] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  const [open, setOpen] = useState(false);
  const fileRef = React.useRef(null);
  const [raiseAmount, setRaiseAmount] = useState(null);
  const [isData, setisData] = useState(false);
  const [isData1, setisData1] = useState(false);
  const [isData2, setisData2] = useState(false);
  const [hideSkeleton2, setHideSkeleton2] = useState(false);
  const [hideSkeleton3, setHideSkeleton3] = useState(false);
  const [files, setFiles] = useState({
    arr: [],
  });
  const [totalPages, setTotalPages] = useState(1);
  const [totalPages1, setTotalPages1] = useState(1);
  const [totalPages2, setTotalPages2] = useState(1);
  const [projectList, setProjectList] = useState([]);
  const [search, setSearch] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [fileat, setfileat] = useState(null);
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
  const [selectedRow, setSelectedRow] = useState(null);
  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 50,
  });
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  // const dispatch = useDispatch();
  const handleClose = () => {
    setAnchorEl(null);
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
  const viewDetail1 = (expenseId) => {
    dispatch(setexpenseId(expenseId));
    localStorage.setItem("expenseId", "" + expenseId);
    history.push("/detail");
  };
  const removeAttachments2 = async (name) => {
    let arr = [...files.arr];
    arr.splice(name, 1);
    await setFiles({
      arr: arr,
    });
    if (arr.length == 0) {
      setfileat(null);
      fileRef.current.value = null;
    }
  };
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setRequestData(row);
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
  const [request1, setRequest1] = useState({
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
  const [request, setRequest] = useState({
    approverId: "" + localStorage.getItem("userId"),
    projectIdList: [],
    pageNo: 0,
    pageSize: 30,
    orderBy: "DESC",
    orderInt: 1,
    priceSort: false,
    createdSort: false,
    modifiedSort: false,
    nameSort: false,
    projectSort: false,
    raisedByList: [],
  });
  const [request2, setRequest2] = useState({
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
    getAllAssigned();

    getAllAssigned1();
  }, [request]);
  // useEffect(() => {
  //   getAllAssigned1();
  //   getAllAssigned2();
  // }, [request1]);
  //   useEffect(() => {}, [TableStatus]);
  const callParent = (data1) => {};
  const callParent1 = (data) => {};
  const callParent2 = (data) => {};
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
  // useEffect(() => {
  //   if (search?.length > 3) {
  //     getSearch();
  //   } else {
  //   }
  // }, [search]);
  const getMilestonesApproved = async () => {
    const res = await common_axios.post(`/payment/milestone/approved`, {});
    if (res) {
      if (res?.data?.statusDescription?.statusCode == 200) {
      } else {
      }
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
    ],
    [data, TableStatus]
  );
  const handleReset = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };
  const resetRaise = () => {
    setRaiseAmount(null);
    setRaiseText("");
    setFiles({
      arr: [],
    });
    fileRef.current.value = null;
  };
  const viewDetail = (cell) => {
    localStorage.setItem("milestoneId", "" + cell.row.original.id);
    // console.log(cell.row.original.id);
    // dispatch(setMilestoneId(cell.row.original.id));
    history.push("/mDetail/" + cell.row.original.id);
  };
  const raiseRequest = async () => {
    if (raiseAmount && raiseText && files.arr.length > 0) {
      let formdata = new FormData();
      formdata.append("amount", raiseAmount);
      formdata.append("remark", raiseText);
      files.arr.forEach((element) => {
        formdata.append("files", element);
      });
      formdata.append("milestoneId", "1");
      formdata.append("expenseId", requestData.id);
      const res = await common_axios.post(
        `/expense/purchase/payment/request`,
        formdata
      );
      if (res?.data?.statusDescription?.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Raised Successfully",
        });
        resetRaise();
        document.getElementById("btn-close2").click();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something Wrong",
          text: res?.data?.statusDescription?.statusMessage,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "All fields required",
        text: "All fields are required for raising request",
      });
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
  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
      orientation: "landscape",
    });
    // Adding the fonts.
    doc.setFont("Inter-Regular", "normal");
    doc.setPage(10);
    // doc.table(500, 500);
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
      },
    });
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
  React.useEffect(() => {
    // setHideSkeleton(true);
    // getAllAssigned();
    setHideSkeleton1(true);
    getAllAssigned1();
    // getAllAssigned2();
  }, []);
  const getAllAssigned = async () => {
    let approverId = localStorage.getItem("UserId");
    const req = { ...request };
    // req["pageSize"] = 5;
    // setRequest(...{ approverId })

    dispatch(setLoader(true));
    let res = await common_axios.post(`/payment/by/unraised`, req);
    if (res?.data?.statusDescription?.statusCode == 200) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        setisData(true);
        setSelectBool(false);
        setTotalPages(res.data.totalPages);
        // getqueryData();
        setData(res.data.expenseList);
        setHideSkeleton(false);
        setTotalCount(res.data.totalCount);
        setRefresh(false);
        // getDataForExport(res.data.totalCount)
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
      }
    } else {
      setisData(false);
    }
    setHideSkeleton1(false);
    setHideSkeleton(false);
    dispatch(setLoader(false));
  };
  const getAllAssigned1 = async () => {
    let approverId = localStorage.getItem("UserId");
    let res = await common_axios.post(`/payment/by/closed`, request);
    if (res?.data?.statusDescription?.statusCode == 200) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        setisData1(true);
        setSelectBool(false);
        setTotalPages1(res.data.totalPages);
        setData1(res.data.expenseList);
        setHideSkeleton2(false);
      } else if (res?.data?.statusDescription?.statusCode == 401) {
        setisData1(false);
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: res?.data?.statusDescription?.statusMessage,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      } else if (res?.data?.statusDescription?.statusCode == 500) {
        setisData1(false);
        Swal.fire({
          icon: "error",
          title: "Internal server error",
          text: res?.data?.statusDescription?.statusMessage,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      } else {
        setisData1(false);
      }
    } else {
      setisData1(false);
    }
    setHideSkeleton1(false);
    setHideSkeleton(false);
  };
  const getAllAssigned2 = async () => {
    let approverId = localStorage.getItem("UserId");
    let res = await common_axios.post(`/payment/by/approver`, request);
    if (res?.data?.statusDescription?.statusCode == 200) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        setisData2(true);
        setSelectBool(false);
        setTotalPages2(res.data.page.totalPages);
        setData2(res.data.page.content);
        setHideSkeleton3(false);
      } else if (res?.data?.statusDescription?.statusCode == 401) {
        setisData2(false);
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: res?.data?.statusDescription?.statusMessage,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      } else if (res?.data?.statusDescription?.statusCode == 500) {
        setisData2(false);
        Swal.fire({
          icon: "error",
          title: "Internal server error",
          text: res?.data?.statusDescription?.statusMessage,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      } else {
        setisData2(false);
      }
    } else {
      setisData2(false);
    }
    setHideSkeleton3(false);
  };
  const [columnArr, setColumnArr] = useState([
    {
      Header: "Purchase Id",
      accessor: "id",
      Cell: (cell) => {
        return (
          <>
            {" "}
            <p
              style={{ color: "blue", cursor: "pointer" }}
              onClick={(e) => {
                localStorage.setItem("expenseId", "" + cell.row.original.id);
                window.open(
                  `${window.location.href.split("#")[0]}#/detail`,
                  "_blank"
                );
              }}
            >
              {" "}
              {cell.row.original.id}{" "}
            </p>{" "}
          </>
        );
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
      Header: "Total Amount",
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
                  )}
            </span>{" "}
          </>
        );
      },
    },
    {
      Header: "Created On",
      accessor: "created On",
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
      Header: "Final Approved On",
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
      Header: "Vendor Name",
      accessor: "approverName", // accessor is the "key" in the data
      Cell: (cell) => {
        return (
          <>
            {cell.row.original.approverName
              ? cell.row.original.approverName
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
              title="View Detail"
              style={{ marginLeft: "19%" }}
              onClick={() => {
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
  ]);

  const [columnArr1, setColumnArr1] = useState([
    {
      Header: "Purchase Id",
      accessor: "id",
      Cell: (cell) => {
        return (
          <>
            {" "}
            <p
              style={{ color: "blue", cursor: "pointer" }}
              onClick={(e) => {
                localStorage.setItem("expenseId", "" + cell.row.original.id);
                window.open(
                  `${window.location.href.split("#")[0]}#/detail`,
                  "_blank"
                );
              }}
            >
              {" "}
              {cell.row.original.id}{" "}
            </p>{" "}
          </>
        );
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
      Header: "Total Amount",
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
      accessor: "created On",
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
      Header: "Vendor Name",
      accessor: "approverName", // accessor is the "key" in the data
      Cell: (cell) => {
        return (
          <>
            {cell.row.original.approverName
              ? cell.row.original.approverName
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
              title="View Detail"
              style={{ marginLeft: "19%" }}
              onClick={() => {
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
  ]);
  // const [columnArr1, setColumnArr1] = useState([
  //   {
  //     Header: "Purchase Id",
  //     accessor: "id",
  //     Cell: (cell) => {
  //       return <>{cell.row.original?.expense?.id}</>;
  //     },
  //   },
  //   {
  //     Header: "Title",
  //     accessor: "title",
  //     Cell: (cell) => {
  //       return (
  //         <>
  //           {" "}
  //           <span
  //             style={{
  //               cursor: "pointer",
  //               fontFamily: "'open sans',sans-serif ",
  //             }}
  //           >
  //             <Tooltip
  //               title={
  //                 <h6
  //                   style={{
  //                     color: "lightblue",
  //                     fontSize: "13px",
  //                     fontFamily: "'open sans',sans-serif ",
  //                   }}
  //                 >
  //                   {cell.row.original?.expense?.title}
  //                 </h6>
  //               }
  //               sx={{ cursor: "pointer" }}
  //               arrow
  //             >
  //               {" "}
  //               <span
  //                 onClick={(e) => {
  //                   document.getElementById("detail-moopen").click();
  //                 }}
  //                 style={{
  //                   fontSize: "13px",
  //                   fontFamily: "'open sans',sans-serif ",
  //                 }}
  //               >
  //                 {cell.row.original?.expense?.title?.slice(0, 20)}{" "}
  //               </span>
  //             </Tooltip>
  //           </span>
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     Header: "Project Name",
  //     accessor: "projectName", // accessor is the "key" in the data
  //     Cell: (cell) => {
  //       return (
  //         <>
  //           <span> {cell.row.original?.project?.name} </span>
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     Header: "Raised Amount ",
  //     accessor: "amount",
  //     Cell: (cell) => {
  //       return (
  //         <>
  //           {" "}
  //           <span className="text-success">
  //             {cell.row.original?.expense?.currencyId}
  //           </span>{" "}
  //           <span>{cell.row.original.usedAmount}</span>{" "}
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     Header: "Created",
  //     accessor: "created",
  //     Cell: (cell) => {
  //       return (
  //         <>
  //           {moment(new Date(cell.row.original.createdDate))
  //             .add(5, "hours")
  //             .add(30, "minutes")
  //             .format("DD-MMM-YYYY h:mm a")}
  //         </>
  //       );
  //     }, // accessor is the "key" in the data
  //   },
  //   {
  //     Header: "Status",
  //     accessor: "status", // accessor is the "key" in the data
  //     Cell: (cell) => {
  //       return (
  //         <>
  //           {" "}
  //           {cell?.original?.status == 0 && (
  //             <span
  //               className="badge bg-warning text-white mx-1 cursor_"
  //               title="Pending"
  //               style={{ padding: "1px" }}
  //             >
  //               Pending at L1
  //             </span>
  //           )}{" "}
  //           {cell?.original?.status == 1 && (
  //             <span
  //               className="badge bg-success text-white mx-1 cursor_"
  //               title="First Level Approved"
  //               style={{ padding: "1px" }}
  //             >
  //               L1 Approved
  //             </span>
  //           )}{" "}
  //           {cell?.original?.status == 2 && (
  //             <span
  //               className="badge bg-success text-white mx-1 cursor_"
  //               title="L2 Level Approved"
  //               style={{ padding: "1px" }}
  //             >
  //               L2 Approved
  //             </span>
  //           )}{" "}
  //           {cell?.original?.status == 4 && (
  //             <span
  //               className="badge bg-danger text-white mx-1 cursor_"
  //               title="L2 Level Approved"
  //               style={{ padding: "1px" }}
  //             >
  //               L1 Rejection
  //             </span>
  //           )}{" "}
  //           {cell?.original?.status == 5 && (
  //             <span
  //               className="badge bg-danger text-white mx-1 cursor_"
  //               title="L2 Rejection"
  //               style={{ padding: "1px" }}
  //             >
  //               L2 Rejection
  //             </span>
  //           )}{" "}
  //         </>
  //       );
  //     },
  //   },
  //   // {
  //   //   Header: "Approved Date",
  //   //   accessor: "finalApproveDate",
  //   //   Cell: (cell) => {
  //   //     return (
  //   //       <>
  //   //         {moment(new Date(cell.row.original.finalApproveDate))
  //   //           .add(5, "hours")
  //   //           .add(30, "minutes")
  //   //           .format("DD-MMM-YYYY h:mm a")}
  //   //       </>
  //   //     );
  //   //   }, // accessor is the "key" in the data
  //   // },
  //   {
  //     Header: "Requested By",
  //     accessor: "generatorName", // accessor is the "key" in the data
  //     Cell: (cell) => {
  //       return (
  //         <>
  //           {cell.row.original?.initiator?.name
  //             ? cell.row.original?.initiator?.name.split(" ")[0]
  //             : "N/A"}
  //         </>
  //       );
  //     },
  //   },
  //   // {
  //   //   Header: "View",
  //   //   Footer: "User-Action",
  //   //   accessor: "action",
  //   //   Cell: (cell) => {
  //   //     return (
  //   //       <>
  //   //         <IconButton
  //   //           title="Raise Request"
  //   //           style={{ marginLeft: "19%" }}
  //   //           id="basic-button"
  //   //           onClick={(e) => {
  //   //             viewDetail(cell);
  //   //           }}
  //   //         >
  //   //           <VisibilityIcon style={{ color: "blue", fontSize: "19px" }} />
  //   //         </IconButton>
  //   //       </>
  //   //     );
  //   //   },
  //   //   disableFilters: true,
  //   // },
  // ]);
  const [columnArr2, setColumnArr2] = useState([
    {
      Header: "Purchase Id",
      accessor: "id",
      Cell: (cell) => {
        return <>{cell.row.original?.expense?.id}</>;
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
                    {cell.row.original?.expense?.title}
                  </h6>
                }
                sx={{ cursor: "pointer" }}
                arrow
              >
                {" "}
                <span
                  onClick={(e) => {
                    document.getElementById("detail-moopen").click();
                  }}
                  style={{
                    fontSize: "13px",
                    fontFamily: "'open sans',sans-serif ",
                  }}
                >
                  {cell.row.original?.expense?.title?.slice(0, 20)}{" "}
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
      Cell: (cell) => {
        return (
          <>
            <span> {cell.row.original?.project?.name} </span>
          </>
        );
      },
    },
    {
      Header: "Raised Amount ",
      accessor: "amount",
      Cell: (cell) => {
        return (
          <>
            {" "}
            <span className="text-success">
              {cell.row.original?.expense?.currencyId}
            </span>{" "}
            <span>{cell.row.original.usedAmount}</span>{" "}
          </>
        );
      },
    },
    {
      Header: "Total Amount ",
      accessor: "totalAmount",
      Cell: (cell) => {
        return (
          <>
            {" "}
            <span className="text-success">
              {cell.row.original?.expense?.currencyId}
            </span>{" "}
            <span>{cell.row.original.totalAmount}</span>{" "}
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
            {moment(new Date(cell.row.original.createdDate))
              .add(5, "hours")
              .add(30, "minutes")
              .format("DD-MMM-YYYY h:mm a")}
          </>
        );
      }, // accessor is the "key" in the data
    },
    // {
    //   Header: "Approved Date",
    //   accessor: "finalApproveDate",
    //   Cell: (cell) => {
    //     return (
    //       <>
    //         {moment(new Date(cell.row.original.finalApproveDate))
    //           .add(5, "hours")
    //           .add(30, "minutes")
    //           .format("DD-MMM-YYYY h:mm a")}
    //       </>
    //     );
    //   }, // accessor is the "key" in the data
    // },
    {
      Header: "Requested By",
      accessor: "generatorName", // accessor is the "key" in the data
      Cell: (cell) => {
        return (
          <>
            {cell.row.original?.initiator?.name
              ? cell.row.original?.initiator?.name.split(" ")[0]
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
  ]);
  const TableStatusChange = async (data, paginationPage) => {
    await setRequest({ ...request, pageNo: paginationPage - 1 });
  };
  const TableStatusChange1 = async (data, paginationPage) => {
    await setRequest1({ ...request1, pageNo: paginationPage - 1 });
  };
  const TableStatusChange2 = async (data, paginationPage) => {
    await setRequest1({ ...request1, pageNo: paginationPage - 1 });
  };
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
    // getqueryData();
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
          <Tab label="Raise Payment Request" {...a11yProps(0)} />
          {<Tab label="Closed Requests" {...a11yProps(1)} />}
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
                    Payment Release Request
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
                      <DynamicTable
                        clickParent={callParent}
                        columns={columnArr}
                        data={data}
                        isData={isData}
                        type={3}
                        totalPages={totalPages}
                        // heading={" Hsdfs gff"}
                        hideSkeleton={hideSkeleton}
                        statusChange={TableStatusChange}
                      />
                    </>
                  ) : (
                    <>
                      <div className="text-center mt-4  mb-3">
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
                    Closed Requests
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
                  ) : isData1 ? (
                    <>
                      <DynamicTable
                        clickParent={callParent1}
                        columns={columnArr1}
                        data={data1}
                        type={2}
                        isData={isData1}
                        totalPages={totalPages1}
                        // heading={" Hsdfs gff"}
                        hideSkeleton={hideSkeleton2}
                        statusChange={TableStatusChange1}
                      />
                    </>
                  ) : (
                    <>
                      <div className="text-center mt-4  mb-3">
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
      <CustomTabPanel value={value} index={2}>
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
                    Assigned Requests
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
                  ) : isData1 ? (
                    <>
                      <DynamicTable
                        clickParent={callParent2}
                        columns={columnArr2}
                        data={data2}
                        isData={isData2}
                        totalPages={totalPages2}
                        type={3}
                        // heading={" Hsdfs gff"}
                        hideSkeleton={hideSkeleton3}
                        statusChange={TableStatusChange2}
                      />
                    </>
                  ) : (
                    <>
                      <div className="text-center mt-4  mb-3">
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
                Raise Payment Request
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="btn-close2"
                // onClick={resetRaise()}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <label>
                    Remarks <span className="text text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="text"
                    value={raiseText || ""}
                    placeholder="Enter Remarks"
                    onChange={(e) => {
                      if (e.target.value?.length < 50) {
                        setRaiseText(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mt-3">
                  <label>
                    Amount <span className="text text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="text"
                    value={raiseAmount || ""}
                    placeholder="Enter Amount"
                    onChange={(e) => {
                      setRaiseAmount(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12 mt-3">
                <label>
                  Attach File <span className="text text-danger">*</span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="text"
                  ref={fileRef || ""}
                  multiple={true}
                  value={fileat}
                  onChange={(e) => {
                    uploadFiles(e);
                  }}
                />
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
