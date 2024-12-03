import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import InfoIcon from "@mui/icons-material/Info";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
  Autocomplete,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import moment from "moment";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import XLSX from "sheetjs-style";
import Swal from "sweetalert2";
import { utils, writeFile } from "xlsx";
import "../../../src/assets/css1/expense.css";
import { common_axios } from "../../App";
import ColumnFilter from "../../Components/ColumnFilter";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import {
  setProjectList1,
  setRedirection,
  setRefreshqueries,
  setReleaseId,
  setTabIndex,
  setexpenseId,
} from "../../redux/features/expenseIdSlice";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
import "./main.css";
import TypeComp from "../../Components/TypeComp";

import * as yup from "yup";
import ChangePasswordModal from "../../Components/ChangePasswordModal";
import { toast } from "react-toastify";
const FormSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  cPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      "confirm password must be same as new password"
    ),
});
// import logoutFunction from "../../logout";
const LazyMyRaised = React.lazy(() => import("./raised"));
const Lazyhistory = React.lazy(() => import("../loggedInUser/ExpenseHistory"));
const LazyQueries = React.lazy(() => import("./OuterContainer"));
const LazyInvoice = React.lazy(() => import("./InvoiceRequests"));
const LazyTable = React.lazy(() => import("../../Components/Tabledynamic"));
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
export default function Expense() {
  const location = useLocation();
  const [projectId, setprojectId] = useState(0);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [hideSkeleton1, setHideSkeleton1] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isData, setisData] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [projectList, setProjectList] = useState([]);
  const [search, setSearch] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [selectBool, setSelectBool] = useState(false);
  const [isData1, setisData1] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [bulkArray, setBulkArray] = useState([]);
  const [bulkEArray, setBulkEArray] = useState([]);

  const [exportData, setExportData] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [detailArray, setDetailArray] = useState([]);
  const [pState, setpState] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [pendingReq, setpendingReq] = useState(null);
  const [data2, setData2] = useState([]);
  const [processType, setProcessType] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const reportTemplateRef = React.useRef(null);
  const [isData2, setisData2] = useState(false);
  const [hideSkeleton3, setHideSkeleton3] = useState(false);
  const [totalPages1, setTotalPages1] = useState(1);
  const [totalPages2, setTotalPages2] = useState(1);
  const [raiseCount, setRaiseCount] = useState(0);
  const [totalQueryCount, setTotalQueryCount] = useState(0);
  const [replyReadCount, setReplyReadCount] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [bulkUploadError, setBulkUploadError] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  var loginSelector = useSelector((state) => state.authSliceandSidebar.isLogin);
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
  const [columnArr2, setColumnArr2] = useState([
    {
      Header: "Expense Id",
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
  ]);
  const callParent2 = () => {};
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

  useEffect(() => {
    // if (localStorage.getItem("password") != null) {
    //   document.getElementById("confirm-button13").click();
    // }
  }, []);
  const tabIndex = useSelector((state) => state.expenseIdSlice.tabIndex);
  useEffect(() => {
    document.getElementById(`simple-tab-${tabIndex}`).click();
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
    type: null,
    // typeList: [],
  });
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  useEffect(() => {
    setHideSkeleton1(true);
    setHideSkeleton(true);
    if (location.pathname === "/expense") {
      if (
        localStorage.getItem("aesKey") != null &&
        localStorage.getItem("userId") != null &&
        localStorage.getItem("token") != null
      ) {
        getAllAssigned();
      }
    }
  }, [request]);
  useEffect(() => {
    if (location.pathname === "/expense") {
      setprojectId(0);
      setpState([]);

      getAllProjects();
    }
  }, [processType]);
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
  const TableStatusChange2 = async (data, paginationPage) => {
    await setRequest1({ ...request1, pageNo: paginationPage - 1 });
  };

  let refreshSelector = useSelector(
    (state) => state.expenseIdSlice.refreshQueries
  );

  useEffect(() => {
    if (refreshSelector) {
      getqueryData();
      dispatch(setRefreshqueries(false));
    }
  }, [refreshSelector]);

  const getAllProjects = async () => {
    let res = await common_axios.post("/project/get", {
      roleId: 0,
      typeId: processType,
    });
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
        if (processType) {
        } else {
          dispatch(setProjectList1(res.data.projects));
        }
      }
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

  const getDataForExport1 = async (count, type) => {
    let formdata = { ...request };
    formdata["type"] = null;
    // setRequest(...{ approverId })

    let res = await common_axios.post(
      `/expense/get/assignedsubexpense`,
      formdata
    );
    if (res?.data?.statusDescription?.statusCode == 200) {
      setisData(true);
      setHideSkeleton(false);
      setTotalCount(res.data.totalCount);
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
          Initiator: el.initiatorName,
          Category: el.category,
          SubCategory: el.subCategory,

          siteId: el.siteId,
          Account_Holder_Name: "N/A",
          Pending_At: "N/A",
          totalIncvat: el.totalIncVat,
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

        if (el.approverName) {
          formdata.Pending_At = el.approverName;
        }
        arr.push(formdata);
      });
      setExportData(arr);
      exportExcel(arr);
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
    setHideSkeleton1(false);
    setHideSkeleton(false);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(false);
  };
  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleMouseDownPassword1 = () => {
    setShowPassword1(false);
  };
  const handleClickShowPassword1 = () => {
    setShowPassword1(true);
  };
  // const getAllAssigned = async () => {
  //   // setRequest(...{ approverId })
  //   let req = encryptBody(request, localStorage.getItem("aesKey"), 1);
  //   let encrypted = await common_axios.post(`/expenseenc/get/v3/assigned`, req);
  //   let res = {
  //     data: {},
  //   };
  //   if (encrypted?.data?.statusDescription?.statusCode == 200) {
  //     res.data = decryptBody(
  //       encrypted.data.encryptedResponse,
  //       localStorage.getItem("aesKey")
  //     );
  //     if (res?.data?.statusDescription?.statusCode == 200) {
  //       setisData(true);
  //       setSelectBool(false);
  //       setTotalPages(res.data.totalPages);
  //       let myData = [];
  //       res.data.expenseList.forEach((element) => {
  //         element["checkStatus"] = false;
  //         myData.push(element);
  //       });
  //       getqueryData();
  //       setData(myData);
  //       setHideSkeleton(false);
  //       setTotalCount(res.data.totalCount);
  //       setRefresh(false);
  //       // getDataForExport(res.data.totalCount)
  //     } else if (res?.data?.statusDescription?.statusCode == 401) {
  //       setisData(false);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Session Expired",
  //         text: res?.data?.statusDescription?.statusMessage,
  //         // footer: '<a href="">Why do I have this issue?</a>'
  //       });
  //     } else if (res?.data?.statusDescription?.statusCode == 500) {
  //       setisData(false);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Internal server error",
  //         text: res?.data?.statusDescription?.statusMessage,
  //         // footer: '<a href="">Why do I have this issue?</a>'
  //       });
  //     } else {
  //       setisData(false);
  //     }
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Decryption failed",
  //       text: res?.data?.statusDescription?.statusMessage,
  //       // footer: '<a href="">Why do I have this issue?</a>'
  //     });
  //   }
  //   setHideSkeleton1(false);
  //   setHideSkeleton(false);
  // };
  const getDataForExport = async (count, type) => {
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
  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 10,
  });
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const viewDetail = (cell) => {
    // console.log(cell.row.original.type == 3);

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

  const getAllAssigned3 = async () => {
    let formdata = {
      approverId: 361,
      projectIdList: [],
      projectId: 253,
      pageNo: 0,
      pageSize: 20,
      orderBy: "DESC",
      orderInt: 1,
      priceSort: false,
      createdSort: false,
      modifiedSort: false,
      nameSort: false,
      projectSort: false,
      raisedByList: [],
      type: null,
    };
    // setRequest(...{ approverId })

    let res = await common_axios.post(
      `/expense/get/assignedsubexpense`,
      formdata
    );
    if (res?.data?.statusDescription?.statusCode == 200) {
      setisData(true);
      setSelectBool(false);
      setTotalPages(res.data.totalPages);
      // console.log(res.data);
      // let myData = [];
      // res.data.expenseList.forEach((element) => {
      //   element["checkStatus"] = false;
      //   myData.push(element);
      // });

      // setData(myData);
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
    setHideSkeleton1(false);
    setHideSkeleton(false);
  };
  const getAllAssigned = async () => {
    if (
      localStorage.getItem("userId") == null &&
      localStorage.getItem("token") == null &&
      localStorage.getItem("aesKey") == null
    ) {
      return;
    }
    let res = await common_axios.post(`/expense/get/v3/assigned`, request);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setisData(true);
      setSelectBool(false);
      setTotalPages(res.data.totalPages);
      setRaiseCount(res.data.raisedCount);
      let myData = [];
      res.data.expenseList.forEach((element) => {
        element["checkStatus"] = false;
        myData.push(element);
      });
      getqueryData();
      setData(myData);
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
      // logoutFunction();
      // localStorage.clear();
    } else if (res?.data?.statusDescription?.statusCode == 500) {
      setisData(false);
      Swal.fire({
        icon: "error",
        title: "Internal server error",
        text: res?.data?.statusDescription?.statusMessage,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    } else {
      setRaiseCount(res?.data?.raisedCount);
      setisData(false);
    }

    setHideSkeleton1(false);
    setHideSkeleton(false);
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
      {
        Header: "Select",
        accessor: "checkStatus",
        Cell: (cell) => {
          return (
            <>
              <span
                style={{ cursor: "pointer" }}
                className="d-flex justify-content-center"
              >
                <input
                  type="checkbox"
                  disabled={
                    cell.row.original.queryOpenStatus == 1 ||
                    cell.row.original.type == 1
                  }
                  defaultChecked={cell.row.original.checkStatus}
                  onClick={(e) => {
                    bulkApproveSelection(e, cell.row.original.id);
                  }}
                />
              </span>
            </>
          );
        },
      },
      {
        Header: "Id",
        accessor: "id",
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
                className="numbers d-flex justify-content-left"
              >
                {cell.row.original.id}
              </span>
            </>
          );
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
                    onClick={() => {
                      document.getElementById("detail-moopen").click();
                      getdetails(cell.row.original.id);
                    }}
                    style={{
                      fontSize: "13px",
                      fontFamily: "'open sans',sans-serif ",
                    }}
                  >
                    {cell.row.original.title?.slice(0, 20)}{" "}
                  </span>{" "}
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
        Header: "Modified",
        accessor: "modified",
        Cell: (cell) => {
          return (
            <>
              {moment(new Date(cell.row.original.modified))
                .add(5, "hours")
                .add(30, "minutes")
                .format("DD-MMM-YYYY h:mm a")}
            </>
          );
        }, // accessor is the "key" in the data
      },
      {
        Header: "Raised By",
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
      // {
      //     Header: "Status",
      //     accessor: "Status",
      //     Cell: (cell) => {
      //         return (
      //             <>
      //             <span className="badge bg-danger text-white" style={{ padding: "1px" }}>
      //                 <CloseIcon />
      //             </span>
      //             </>
      //         );
      //     },
      // },
      // {
      //     Header: "Status",
      //     columns: [
      //         {
      //             accessor: "status1",
      //             Cell: () => {
      //                 return (
      //                     <span className="badge bg-danger text-white" style={{ padding: "1px" }}>
      //                         <CloseIcon />
      //                     </span>
      //                 );
      //             }
      //         },
      //         {
      //             accessor: "status2",
      //             Cell: () => {
      //                 return (
      //                     <span className="badge bg-danger text-white" style={{ padding: "1px" }}>
      //                         <CloseIcon />
      //                     </span>
      //                 );
      //             }
      //         },
      //         {
      //             accessor: "status3",
      //             Cell: () => {
      //                 return (
      //                     <span className="badge bg-danger text-white" style={{ padding: "1px" }}>
      //                         <CloseIcon />
      //                     </span>
      //                 );
      //             }
      //         },
      //         {
      //             accessor: "status4",
      //             Cell: () => {
      //                 return (
      //                     <span className="badge bg-danger text-white" style={{ padding: "1px" }}>
      //                         <CloseIcon />
      //                     </span>
      //                 );
      //             }
      //         }
      //     ]
      // },
      // {
      //     Header: "Status",
      //     accessor: "status",
      //     columns: [
      //         {
      //             Cell: () => {
      //                 return (
      //                     <span className="badge bg-danger text-white" style={{ padding: "1px" }}>
      //                         <CloseIcon />
      //                     </span>
      //                 );
      //             }
      //         },
      //         {
      //             Cell: () => {
      //                 return (
      //                     <span className="badge bg-danger text-white" style={{ padding: "1px" }}>
      //                         <CloseIcon />
      //                     </span>
      //                 );
      //             }
      //         },
      //         {
      //             Cell: () => {
      //                 return (
      //                     <span className="badge bg-danger text-white" style={{ padding: "1px" }}>
      //                         <CloseIcon />
      //                     </span>
      //                 );
      //             }
      //         },
      //         {
      //             Cell: () => {
      //                 return (
      //                     <span className="badge bg-danger text-white" style={{ padding: "1px" }}>
      //                         <CloseIcon />
      //                     </span>
      //                 );
      //             }
      //         }
      //     ]
      // },
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
    ],
    [data, TableStatus]
  );
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    setprojectId(0);
    // getZipDetails();
    // getAllAssigned3();
  }, [value]);

  const getZipDetails = () => {
    let formdata = {
      expenseIds: ["18657", "18658"],
    };
    const res = common_axios.post(`/expense/attachment/download`, formdata);
    // console.log(res);
  };
  const getdetails = async (expenseId) => {
    const res = await common_axios.post(`/expense/outer/details/${expenseId}`);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setDetailArray(res.data.expenseDetailsList);
    } else {
      setDetailArray([]);
    }
  };
  const selectAll = () => {
    let values = [...data];
    let blkArray = bulkArray;
    if (selectBool) {
      let data = values.map((data) => {
        if (data.queryOpenStatus == 1) {
          return { ...data };
        } else {
          return { ...data, checkStatus: !data.checkStatus };
        }
      });
      setSelectBool(false);
      setData(data);
      setBulkArray([]);
    } else {
      setSelectBool(true);
      let data = values.map((data) => {
        if (data.queryOpenStatus == 1) {
          return { ...data };
        } else {
          blkArray.push(data.id);
          return { ...data, checkStatus: true };
        }
      });
      setBulkArray(blkArray);
      setData(data);
    }
  };
  const bulkApproveSelection = (event, id) => {
    let blkArray = [...bulkArray];
    let bulkEArray1 = [...bulkEArray];
    let changeData = [...data];

    console.log(bulkArray);
    const nextShapes = changeData.map((element) => {
      if (element.id === id) {
        console.log(element);
        if (element.checkStatus) {
          const index = blkArray.indexOf(element.id);

          if (index > -1) {
            // only splice array when item is found
            blkArray.splice(index, 1); // 2nd parameter means remove one item only
          }

          const bulkIndex = bulkEArray1.indexOf(element.id);
          if (bulkIndex > -1) {
            bulkEArray1.splice(bulkIndex, 1);
          }
          if (element.expenseAppliedAmount > 500000) {
            setBulkUploadError(false);
          }
        } else {
          if (element.expenseAppliedAmount > 500000) {
            setBulkUploadError(true);
            bulkEArray1.push(element.id);
          }
          blkArray.push(element.id);
        }
        return {
          ...element,
          checkStatus: !element.checkStatus,
        };
      } else {
        return element;
      }
    });
    setData(nextShapes);
    setBulkArray(blkArray);
    setBulkEArray(bulkEArray);
  };
  const BulkApproveLogic = async () => {
    if (bulkUploadError) {
      toast(
        "Please unselect request i.e above than 500000 "
      );
      return;
    }
    let formdata = {
      myList: bulkArray,
    };
    let approveCount = bulkArray.length;
    const res = await common_axios.post("/expense/bulk/approve", formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
      getAllAssigned();
      document.getElementById("confirm-close").click();
      resetCheckBoxes();
      changeTableData(0, 0);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: ` ${approveCount} selected expenses are approved successfully`,
      });
      setBulkArray([]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Something Wrong",
        text: res.data.statusDescription.statusMessage,
      });
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
    if (res?.data) {
      res.data = decryptBody(
        res.data.encryptedResponse,
        localStorage.getItem("aesKey")
      );
      if (res?.data?.statusDescription?.statusCode == 200) {
        setpendingReq(res?.data?.pendingReq);
        setPendingCount(res?.data?.pendingQueryCount);
        setReplyReadCount(res?.data?.readReplyCount);

        let totalQuery =
          Number(res?.data?.readReplyCount) +
          Number(res?.data?.pendingQueryCount);
        setTotalQueryCount(totalQuery);
        // replyReadCount(res.data.)
      } else {
        // console.log(res.data);
        setpendingReq(res?.data?.pendingReq);
        setReplyReadCount(res?.data?.readReplyCount);
        setPendingCount(res?.data?.pendingQueryCount);
        let totalQuery =
          Number(res?.data?.readReplyCount) +
          Number(res?.data?.pendingQueryCount);
        setTotalQueryCount(totalQuery);
      }
    }
  };
  useEffect(() => {
    if (projectId != 0 && value == 0) {
      // setHideSkeleton(true);
      getproejctIdFilter();
    } else {
      setRequest({ ...request, projectIdList: [] });
    }
  }, [projectId]);
  const getAllAssigned2 = async () => {
    // setRequest(...{ approverId })
    // let req = encryptBody(request, localStorage.getItem("aesKey"), 1);
    let res = await common_axios.post(`/payment/by/approver`, request1);
    if (res?.data?.statusDescription?.statusCode == 200) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        setisData2(true);
        setSelectBool(false);
        setTotalPages2(res.data.page.totalPages);
        setisData1(true);
        setData2(res.data.page.content);
        setHideSkeleton3(false);
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
    }
    setHideSkeleton3(false);
  };
  useEffect(() => {
    getAllAssigned2();
  }, [request1]);
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

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      cPassword: "",
    },
    validationSchema: FormSchema,
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      console.log(values);

      if (localStorage.getItem("userId") != null) {
      }
      let formdata = {
        userId: localStorage.getItem("userId"),
        newPassword: values.newPassword,
      };
      try {
        const encrypted = await common_axios.post(
          `/authenc/reset/v1/password`,
          encryptBody(formdata, localStorage.getItem("aesKey"))
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
            formik.handleReset();
            document.getElementById("close-change").click();
            localStorage.removeItem("password");
            Swal.fire({
              icon: "success",
              text: "Password changed successfully",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Something went wrong",
              text: res.data.statusDescription.statusMessage,
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            text: res.data.statusDescription.statusMessage,
          });
        }
      } catch (er) {
        Swal.fire({
          icon: "error",
          text: "Something went wrong",
        });
      }
    },
  });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    setPageSize,
    prepareRow,
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
              label="Assigned To Me"
              {...a11yProps(0)}
              onClick={() => {
                getAllAssigned();
                dispatch(setTabIndex(0));
              }}
            />
            <Tab
              label="My Requests"
              {...a11yProps(1)}
              onClick={() => {
                dispatch(setTabIndex(1));
              }}
            />
            <Tab
              label="Report"
              {...a11yProps(2)}
              onClick={() => {
                dispatch(setTabIndex(2));
              }}
            />
            <Tab
              label="My Queries"
              {...a11yProps(3)}
              onClick={() => {
                dispatch(setTabIndex(3));
              }}
            />
            <Tab
              label="Invoice Demands"
              {...a11yProps(4)}
              onClick={() => {
                dispatch(setTabIndex(4));
              }}
            />
          </Tabs>

          {raiseCount != 0 && raiseCount != null && (
            <span
              className="green_badge_3 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
              style={{
                fontSize: "x-small",
              }}
            >
              {" "}
              {raiseCount}
            </span>
          )}

          {totalCount != 0 && totalCount != null && (
            <span
              className="green_badge_2 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
              style={{
                fontSize: "x-small",
              }}
            >
              {" "}
              {totalCount}
            </span>
          )}
          {pendingReq != 0 && pendingReq != null && (
            <span
              className="green_badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
              style={{
                fontSize: "x-small",
              }}
            >
              {" "}
              {pendingReq}
            </span>
          )}
          {totalQueryCount !== 0 && totalQueryCount != null && (
            <span
              className="green_badge_1
             position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
              style={{
                fontSize: "x-small",
              }}
            >
              {totalQueryCount}
            </span>
          )}
          {/* {pendingCount !== 0 && (
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
          >
            <IconButton style={{ fontSize: "18px" }}>
              <NotificationsActiveIcon style={{ color: "#c30606" }} />
            </IconButton>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
              style={{ fontSize: "x-small" }}
            >
              {pendingCount}
            </span>
          </div>
        )} */}
        </Box>
        <CustomTabPanel value={value} index={0}>
          {true ? (
            <>
              <div className="card-body">
                <div className="row justify-content-between">
                  {/* <div className="col-md-1"></div> */}
                  {
                    <div className="col-md-6 lavel">
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
                          <div className="row">
                            <div className="col-md-6">
                              {" "}
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Process Type
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
                                id="controlled-demo1"
                                value={pState}
                                size="small"
                                onChange={(e, newValue, reason) => {
                                  if (reason == "clear") {
                                    setprojectId(0);
                                    setpState([]);
                                  }
                                  resetCheckBoxes();
                                  setSelectBool(false);
                                  setBulkArray([]);
                                  setpState(newValue);
                                  if (newValue) {
                                    setprojectId(newValue?.id);
                                  }
                                }}
                                options={projectList}
                                getOptionLabel={(option) => option?.name || ""}
                                renderInput={(params) => (
                                  <TextField
                                    style={{ fontSize: "11px" }}
                                    {...params}
                                    label="Select Project"
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  }
                  <div className="col-md-auto ">
                    <button
                      className="btn bg-primary text-white"
                      style={{ fontSize: "11px" }}
                      id="basic-button"
                      aria-controls={open1 ? "basic-menu" : undefined}
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
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open1}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
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

                      <MenuItem
                        onClick={(e) => {
                          handleClose(e);
                          getDataForExport1();
                        }}
                      >
                        Sub Expenses Report
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
                {true ? (
                  <div className="card shadow-none border bg_blue mt-4">
                    <span
                      className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 "
                      style={{ padding: "15px", fontSize: "large" }}
                    >
                      {/* Add Number */}
                      Assigned To Me
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
                    ) : isData ? (
                      <>
                        <div className="card-body ">
                          {/* <div className='d-flex justify-content-start ' > */}
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
                                  .map((value) => {
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
                              {/* </div> */}
                              {/* <div className='d-flex justify-content-start mt-1 '> */}
                              <Checkbox
                                checked={selectBool}
                                onChange={() => {
                                  selectAll();
                                }}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                              <p
                                style={{
                                  marginTop: "11px",
                                  marginBottom: "0px",
                                  fontSize: "11px",
                                  marginRight: "20px",
                                }}
                              >
                                Select All
                              </p>
                              {/* </div> */}
                              {/* <div className="d-flex justify-content-end mb-3"> */}
                            </div>
                            <div
                              className="d-flex  "
                              style={{ justifyContent: "flex-end !important" }}
                            >
                              <Tooltip title="Refresh">
                                <button
                                  type="submit"
                                  style={{ marginRight: "20px" }}
                                  className="btn bg-gradient-primary w_btn m-0 ms-3 me-3 search_1  "
                                  onClick={() => {
                                    getAllAssigned();
                                  }}
                                >
                                  <RefreshIcon />
                                </button>
                              </Tooltip>
                              <button
                                type="submit"
                                className="btn btn-primary"
                                style={{
                                  fontSize: "11px",
                                  marginRight: "20px",
                                  height: "28px",
                                  marginTop: "4%",
                                }}
                                // disabled={bulkArray.length == 0}
                                onClick={() => {
                                  document
                                    .getElementById("confirm-button")
                                    .click();
                                }}
                                disabled={bulkArray.length == 0}
                              >
                                {bulkArray.length != 0 ? (
                                  <span>
                                    {" "}
                                    Approve (
                                    {bulkArray.length != 0 && bulkArray.length})
                                  </span>
                                ) : (
                                  <span> Approve</span>
                                )}
                              </button>
                            </div>
                          </div>
                          <div
                            className=" small_1 table-responsive"
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
                                    {headerGroup.headers.map((column) => (
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
                                        {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                                      </th>
                                    ))}
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
                                                cell.column.Header ==
                                                  "Status" &&
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
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <LazyMyRaised projectId={projectId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Lazyhistory projectId={projectId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <LazyQueries
            projectId={projectId}
            queryCount={pendingCount}
            raiseReplyCount={replyReadCount}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <LazyInvoice projectId={projectId} type={1} />
        </CustomTabPanel>
        {/* <CustomTabPanel value={value} index={5}>
          {true ? (
            <>
              <div className="card-body">
                {true ? (
                  <div className="card shadow-none border bg_blue mt-4">
                    <span
                      className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 "
                      style={{ padding: "15px", fontSize: "large" }}
                    >
                      PR request
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
                        <LazyTable
                          clickParent={callParent2}
                          columns={columnArr2}
                          data={data2}
                          isData={isData2}
                          totalPages={totalPages2}
                          type={1}

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
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </CustomTabPanel> */}
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
                  Bulk Approve Confirmation
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to approve selected{" "}
                {<span>{bulkArray.length}</span>} expenses?
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
                  onClick={() => {
                    BulkApproveLogic();
                  }}
                  disabled={bulkArray.length == 0}
                >
                  {" "}
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary d-none"
          id="confirm-button1"
          data-bs-toggle="modal"
          data-bs-target="#confirm-modal1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="confirm-modal1"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-bs-keyboard="false"
          data-bs-backdrop="static"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Your password is too weak. Please change your password now:
                </h5>
                <button
                  type="button"
                  className="btn-close d-none"
                  id="close-change"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="modal-body">
                  <div className="row d-flex justify-content-center mb-3">
                    <div className="  col-md-12 m-2">
                      <TextField
                        required
                        className="w-100"
                        label="New Password"
                        name="newPassword"
                        type={showPassword1 ? "text" : "password"}
                        variant="outlined"
                        size="small"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.newPassword &&
                          Boolean(formik.errors.newPassword)
                        }
                        helperText={
                          formik.touched.newPassword &&
                          formik.errors.newPassword
                        }
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                title={
                                  showPassword1
                                    ? "hide password"
                                    : "show password"
                                }
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword1}
                                onMouseDown={handleMouseDownPassword1}
                              >
                                {showPassword1 ? (
                                  <VisibilityIcon sx={{ color: "#85CBF2" }} />
                                ) : (
                                  <VisibilityOffIcon
                                    sx={{ color: "#85CBF2" }}
                                  />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>

                    <div className="col-md-12 m-2">
                      <TextField
                        required
                        className="w-100"
                        label="Confirm Password"
                        name="cPassword"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        size="small"
                        value={formik.values.cPassword}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.cPassword &&
                          Boolean(formik.errors.cPassword)
                        }
                        helperText={
                          formik.touched.cPassword && formik.errors.cPassword
                        }
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                title={
                                  showPassword
                                    ? "hide password"
                                    : "show password"
                                }
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <VisibilityIcon sx={{ color: "#85CBF2" }} />
                                ) : (
                                  <VisibilityOffIcon
                                    sx={{ color: "#85CBF2" }}
                                  />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <small className="text-black mt-4 ml-3">
                      password should contain minimum 8 characters, atleast one
                      uppercase, one lowercase, one special characters
                    </small>
                  </div>
                </div>
                <div className="modal-footer  d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    {" "}
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
