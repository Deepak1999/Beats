import InfoIcon from "@mui/icons-material/Info";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Autocomplete,
  IconButton,
  InputAdornment,
  Menu,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Typography from "@mui/material/Typography";
import isAfter from "date-fns/isAfter";
import PropTypes from "prop-types";
import XLSX from "sheetjs-style";
import { utils, writeFile } from "xlsx";
import moment from "moment";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "rsuite";
import Swal from "sweetalert2";
import { common_axios } from "../../App";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import {
  setFilterData,
  setReleaseId,
  setexpenseId,
} from "../../redux/features/expenseIdSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TypeComp from "../../Components/TypeComp";
const { allowedRange, after, before, combine } = DateRangePicker;
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
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function ExpenseHistory(props) {
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
  const [status, setStatus] = useState(0);
  const [exportData, setExportData] = useState([]);

  const [isFilter, setIsFilter] = useState(false);
  const [filterDate, setFilterDate] = useState([]);
  const [detailArray, setDetailArray] = useState([]);
  const [filterData, setFilterRequest] = useState({
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
    expenseStatus: null,
    functionalStatus: null,
    type: null,
  });

  const history = useHistory();
  const [filterTableStatus, setfilterTableStatus] = useState({
    pageNo: 0,
    pageSize: 10,
  });

  const [filterCount, setFilterCount] = useState(0);

  const [pState, setpState] = useState([]);
  const [companyList, setCompanyList] = useState([]);
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
    expenseStatus: null,
    functionalStatus: null,
    type: null,
    companyId: null,
    typeList: [],
  });
  const letprojectList = useSelector(
    (state) => state.expenseIdSlice.projectList
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const reportTemplateRef = React.useRef(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // useEffect(() => {
  //   if (letprojectList.length > 0) {
  //     setProjectList(letprojectList);
  //   }
  // }, [letprojectList]);
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
      }
    }
  };
  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 10,
  });
  const [processType, setProcessType] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("aesKey") != null) {
      setHideSkeleton(true);
      getAllAssigned();
      getCompanies();
    }
  }, [request, localStorage.getItem("aesKey")]);
  useEffect(() => {
    setprojectId(0);
    setpState([]);
    getAllProjects();
  }, [processType]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const getCompanies = async () => {
    const res = await common_axios.post(`/project/companies`, {});
    if (res.data) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        setCompanyList(res.data.list);
      }
    }
  };
  const viewDetail = (cell) => {
    if (cell.row.original.type == 3) {
      dispatch(setReleaseId(cell.row.original.id));
      localStorage.setItem("releaseId", "" + cell.row.original.id);
      window.open(
        `${window.location.href.split("#")[0]}#/releaseDetail/${
          cell.row.original.id
        }`,
        "_blank"
      );
    } else {
      dispatch(setexpenseId(cell.row.original.id));
      localStorage.setItem("expenseId", "" + cell.row.original.id);
      window.open(`${window.location.href.split("#")[0]}#/detail`, "_blank");
    }
  };

  const getDataForExport1 = async (count, type) => {
    let formdata = { ...request };
    formdata["type"] = null;
    if (status == 1) {
      formdata["status"] = 2;
    }
    if (status == 2) {
      formdata["status"] = 0;
    }
    if (status == 3) {
      formdata["status"] = 1;
    }
    // formdata["userId"] = localStorage.getItem("userId");

    formdata["projectId"] = projectId;
    formdata["pageNo"] = 0;
    formdata["pageSize"] = totalCount;
    if (filterDate.length > 0) {
      formdata["startDate"] = moment(filterDate[0]).format("YYYY-MM-DD");
      formdata["endDate"] = moment(filterDate[1]).format("YYYY-MM-DD");
    } else {
      let today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);

      formdata["startDate"] = moment(oneYearAgo).format("YYYY-MM-DD");
      formdata["endDate"] = moment(new Date()).format("YYYY-MM-DD");
    }

    if (true) {
      let approverId = localStorage.getItem("userId");

      var req = {
        ...request,
      };
      formdata["pageNo"] = 0;
      formdata["pageSize"] = 15000;
      let res = await common_axios.post(
        `/expense/get/subapprovalReport`,
        formdata
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
            Project_Name: el.projectName,
            Status: "N/A",
            Initiator: el.generatorName,
            Category: el.category,
            SubCategory: el.subCategory,
            totalIncvat: el.totalIncVat,

            siteId: el.siteId,
            Pending_At: "N/A",
          };
          if (el.status == 2) {
            formdata["Status"] = "Approved";
          } else if (el.status == 1) {
            formdata.Status = "Rejected";
          } else {
            formdata.Status = "Pending";
          }
          formdata.AppliedAmount = el.expenseAppliedAmount;
          if (el.expenseApprovedAmount) {
            formdata.ApprovedAmount = el.expenseApprovedAmount;
          }

          if (el.pendingAt && el.status != 2) {
            formdata.Pending_At = el.pendingAt;
          } else {
            delete formdata.Pending_At;
          }
          arr.push(formdata);
        });
        setExportData(arr);
        exportExcel(arr);
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
      } else {
      }
    }
  };

  const getDataForExport = async (type, data, selType) => {
    dispatch(setLoader(true));

    if (type == 1) {
      let approverId = localStorage.getItem("UserId");
      var req = {
        ...request,
      };
      req["pageNo"] = 0;
      req["pageSize"] = totalCount;
      let res = {
        data: {},
      };

      if (filterDate.length > 0) {
        req["startDate"] = moment(filterDate[0]).format("YYYY-MM-DD");
        req["endDate"] = moment(filterDate[1]).format("YYYY-MM-DD");
      } else {
        let today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        req["startDate"] = moment(oneYearAgo).format("YYYY-MM-DD");
        req["endDate"] = moment(new Date()).format("YYYY-MM-DD");
      }

      // setRequest(...{ approverId })
      let encrypted = await common_axios.post(
        `/expenseenc/history/v2/user`,
        encryptBody(req, localStorage.getItem("aesKey"), 1)
      );
      res.data = decryptBody(
        encrypted.data.encryptedResponse,
        localStorage.getItem("aesKey")
      );
      if (encrypted.data.statusDescription.statusCode == 200) {
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
              Pending_At: "Settled",
              Project_Name: el.projectName,
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
            if (selType == 1) {
              arr.push(formdata);
            }
            if (selType == 2 && el.functionStatus != "100") {
              arr.push(formdata);
            }
            if (selType == 3 && el.functionStatus == "100") {
              formdata["queryStatus"] = "open";
              arr.push(formdata);
            }
          });
          await setExportData(arr);
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
    } else {
      if (filterDate.length > 0) {
        req["startDate"] = moment(filterDate[0]).format("YYYY-MM-DD");
        req["endDate"] = moment(filterDate[1]).format("YYYY-MM-DD");
      }

      let arr = [];
      data.forEach((el) => {
        let formdata = {
          ExpenseId: el.id,
          Title: el.title,
          Description: el.description,
          Amount: el.expenseAppliedAmount,
          Currency: el.currencyId,
          ApprovedAmount: 0,
          Date: el.created,
          Status: "N/A",
          Initiator: el.generatorName,
          Pending_At: "N/A",
          Project_Name: el.projectName,
        };
        if (el.status == 2) {
          formdata["Status"] = "Approved";
        } else if (el.status == 1) {
          formdata.Status = "Rejected";
        } else {
          formdata.Status = "Pending";
        }
        if (el.expenseApprovedAmount) {
          formdata.ApprovedAmount = el.expenseApprovedAmount;
        }
        if (el.pendingAt) {
          formdata.Pending_At = el.pendingAt;
        }
        if (el.expenseAttachedFiles?.length > 0) {
          el.expenseAttachedFiles?.forEach((element, index) => {
            if (element) {
              formdata[`file-${index + 1}`] = generateSingle(element);
            } else {
              formdata[`file-${index + 1}`] = "N/A";
            }
          });
        }
        if (selType == 1) {
          if (el.queryOpenStatus == 1) {
            formdata["queryStatus"] = "open";
          } else {
            formdata["queryStatus"] = "N/A";
          }
          arr.push(formdata);
        }
        if (selType == 2 && el.queryOpenStatus != 1) {
          arr.push(formdata);
        }
        if (selType == 3 && el.queryOpenStatus == 1) {
          formdata["queryStatus"] = "open";
          arr.push(formdata);
        }
      });
      await setExportData(arr);
      exportExcel(arr);
    }
  };

  const generateDynamicLink = (data) => {
    return `${data}`;
  };
  const generateSingle = (link) => {
    return {
      f: `=HYPERLINK("${generateDynamicLink(link)}", "${link.slice(
        link.lastIndexOf("/") + 1
      )}")`,
    };
  };
  const exportExcel = (arr) => {
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    /* export to XLSX */
    dispatch(setLoader(false));
    moment(new Date()).format("DD MM YYYY");
    let name = `Expense_report_${moment(new Date()).format("DD-MM-YYYY")}`;
    writeFile(wb, `${name}.xlsx`);
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
    let req = { ...request };

    let approverId = localStorage.getItem("UserId");
    let today = new Date();
    // console.log(req);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    req["startDate"] = moment(oneYearAgo).format("YYYY-MM-DD");
    req["endDate"] = moment(new Date()).format("YYYY-MM-DD");
    console.log(req);
    // console.log(req);
    let encrypted = await common_axios.post(
      `/expenseenc/history/v3/user`,
      encryptBody(req, localStorage.getItem("aesKey"), 1)
    );
    let res = {
      data: {},
    };

    res.data = decryptBody(
      encrypted.data.encryptedResponse,
      localStorage.getItem("aesKey")
    );
    if (encrypted.data.statusDescription.statusCode == 200) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        setisData(true);
        setTotalPages(res.data.totalPages);
        setData(res.data.expenseList);
        setHideSkeleton(false);
        setTotalCount(res.data.totalCount);
        setFilterCount(res.data.totalCount);

        // console.log(res.data.totalCount);
        dispatch(setLoader(false));
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
        setisData(false);
        setHideSkeleton(false);
      }
      dispatch(setLoader(false));
      setHideSkeleton(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Decryption Failed",
        text: res?.data?.statusDescription?.statusMessage,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  };
  const resetFilter = async () => {
    setStatus(0);
    setprojectId(0);
    setpState([]);
    await setRequest(filterData);
    dispatch(setFilterData({}));
    setFilterDate([]);
    setIsFilter(false);
  };
  const formik = useFormik({
    initialValues: {
      // templateType: "",
      projectId: 0,
      status: 0,
      searchDateArray: [],
      companyState: null,
      companyId: 0,
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    onSubmit: (values) => {
      let value = formik.values.status;
      dispatch(setLoader(true));
      setHideSkeleton(true);
      var req = { ...request };
      if (value == 1) {
        req.expenseStatus = 2;
      } else if (value == 2) {
        req.expenseStatus = 0;
      } else if (value == 3) {
        req.expenseStatus = 1;
      } else if (value == 4) {
        req.functionalStatus = 1;
      } else if (value == 5) {
        req.functionalStatus = 2;
      } else if (value == 6) {
        req.functionalStatus = 3;
      } else {
      }
      if (projectId != 0) {
        let projectList = [];
        projectList.push(projectId);
        req.projectIdList = projectList;
      }
      let formdata = {
        page: paginationPage,
      };
      if (req.projectIdList.length > 0) {
        formdata["projectList"] = req.projectIdList;
      }
      if (value != 0) {
        formdata["status"] = value;
      }
      if (values.companyId != 0) {
        formdata["companyId"] = values.companyId;
        req["companyId"] = values.companyId;
      }
      if (filterDate != null && filterDate.length > 0) {
        formdata["startDate"] = moment(filterDate[0]).format("YYYY-MM-DD");
        formdata["endDate"] = moment(filterDate[1]).format("YYYY-MM-DD");
        let startDate = moment(filterDate[0]).format("YYYY-MM-DD");
        let endDate = moment(filterDate[1]).format("YYYY-MM-DD");
        req["startDate"] = startDate;
        req["endDate"] = endDate;
        setRequest(req);
        setIsFilter(true);
      } else {
        formdata["startDate"] = null;
        formdata["endDate"] = null;
        req["startDate"] = null;
        req["endDate"] = null;
        setRequest(req);
        setIsFilter(true);
      }
      dispatch(setFilterData(formdata));
    },
  });
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
        // Cell: (cell) => {
        //     return (
        //         <>
        //             {cell.row.index + 1 + TableStatus?.pageNo * TableStatus?.pageSize}
        //         </>
        //     );
        // },
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
                        fontSize: "11px",
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
                      // document.getElementById("detail-moopen").click()
                      // getdetails(cell.row.original.id)
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
        Header: "Created ",
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
              <span className="mr-2" style={{ marginRight: "6px" }}>
                {cell.row.original.partialAmount
                  ? Intl.NumberFormat().format(
                      cell.row.original.expenseAppliedAmount
                    )
                  : Intl.NumberFormat().format(
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
                title="View Detail"
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
    [data, TableStatus]
  );
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
    <Box sx={{ width: "100%" }}>
      {true ? (
        <>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row ">
                {
                  <div className="col-md-2 lavel ">
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
                          <Autocomplete
                            id="controlled-demo"
                            value={pState}
                            size="small"
                            onChange={(e, newValue, reason) => {
                              if (reason == "clear") {
                                setprojectId(0);
                                setpState([]);
                                resetFilter();
                              }
                              setpState(newValue);
                              if (newValue) {
                                setprojectId(newValue?.id);
                              }
                              formik.handleChange(e);
                            }}
                            options={projectList}
                            getOptionLabel={(option) => option?.name || ""}
                            renderInput={(params) => (
                              <TextField {...params} label="Select Project" />
                            )}
                          />
                        </>
                      </>
                    )}
                  </div>
                }
                {
                  <div className="col-md-2 lavel">
                    {false ? (
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
                          sx={{
                            padding: "2px",
                            color: "grey",
                            font: "inherit",
                          }}
                          fullWidth
                        >
                          <InputLabel id="demo-simple-select-label">
                            Status
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.status}
                            required
                            name="status"
                            style={{
                              color: "grey",
                              font: "inherit",
                            }}
                            label="Status"
                            onChange={(e) => {
                              formik.handleChange(e);
                              setStatus(e.target.value);
                            }}
                          >
                            <MenuItem value={0}> Select Status</MenuItem>
                            <MenuItem value={1}> Approved</MenuItem>
                            <MenuItem value={2}> Pending</MenuItem>
                            <MenuItem value={3}> Rejected</MenuItem>
                          </Select>
                        </FormControl>
                      </>
                    )}
                  </div>
                }
                {
                  <div className="col-md-2">
                    <>
                      <Autocomplete
                        id="controlled-demo"
                        value={formik.values.companyState}
                        size="small"
                        onChange={(e, newValue, reason) => {
                          if (reason == "clear") {
                            setprojectId(0);
                            setpState([]);
                            resetFilter();
                          }
                          formik.setFieldValue("companyState", newValue);
                          if (newValue) {
                            formik.setFieldValue("companyId", newValue.id);
                          }
                        }}
                        options={companyList}
                        getOptionLabel={(option) => option?.name || ""}
                        renderInput={(params) => (
                          <TextField {...params} label="Company" />
                        )}
                      />
                    </>
                  </div>
                }
                <div className="col-md-3 lavel">
                  <DateRangePicker
                    placeholder="Select Date Range"
                    value={filterDate}
                    size="lg"
                    shouldDisableDate={before(
                      new Date().setMonth(new Date().getMonth() - 12)
                    )}
                    disabledDate={(date) => isAfter(date, new Date())}
                    onChange={(e) => {
                      setFilterDate(e);
                    }}
                  />
                </div>
                <div className="col-md-2 ">
                  <button
                    type="submit"
                    className="btn text-white blue"
                    style={{
                      backgroundColor: "orange",
                      marginRight: "15px",
                      width: "40px",
                      height: "31px",
                    }}
                    onClick={(e) => {
                      // getFiltered(status)
                    }}
                  >
                    <i
                      className="fa fa-filter"
                      style={{ fontSize: "17px", verticalAlign: "baseline" }}
                    ></i>{" "}
                  </button>
                  <button
                    className="btn bg-primary text-white"
                    style={{ fontSize: "11px", marginRight: "5px" }}
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
                        if (isFilter) {
                          getDataForExport(1, null, 1);
                        } else {
                          getDataForExport(1, data, 1);
                        }
                      }}
                    >
                      All
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        if (isFilter) {
                          getDataForExport(1, null, 2);
                        } else {
                          getDataForExport(1, data, 2);
                        }
                      }}
                    >
                      Without Queries
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        if (isFilter) {
                          getDataForExport(1, null, 3);
                        } else {
                          getDataForExport(1, data, 3);
                        }
                      }}
                    >
                      Queries
                    </MenuItem>{" "}
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        if (isFilter) {
                          getDataForExport1(1, 2);
                        } else {
                          getDataForExport1(1, 1);
                        }
                      }}
                    >
                      Sub Expensewise Report
                    </MenuItem>{" "}
                  </Menu>
                  <button
                    className="btn bg-danger text-white blue"
                    style={{ marginRight: "3px", fontSize: "11px" }}
                    onClick={(e) => {
                      resetFilter();
                      formik.handleReset();
                    }}
                  >
                    {" "}
                    Reset{" "}
                  </button>
                </div>
              </div>
            </form>
            {true ? (
              <>
                {" "}
                <div className="card shadow-none border bg_blue mt-4">
                  <span
                    className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 "
                    style={{ padding: "15px", fontSize: "large" }}
                  >
                    History
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
                            {[...new Set([10, 20, 25, 50, totalCount])]
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
                        <div className="table-responsive padd">
                          <table
                            {...getTableProps()}
                            id="example"
                            className="table table-striped message_table table-bordered dataTable table-sm  mytableClass "
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
                                              ? "text-right text-end mr-2"
                                              : "text-left update_td"
                                          } ${
                                            cell.column.Header == "Status" &&
                                            "widht_class  text-left update_td"
                                          }  ${
                                            cell.column.Header == "Title" &&
                                            "w_227"
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
              </>
            ) : (
              <></>
            )}
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
        className="btn btn-primary d-none"
        id="detail-moopen"
        data-bs-toggle="modal"
        data-bs-target="#detail-mo"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="detail-mo"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Sub Expenses Detail
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
                <div className="col-md-1"></div>
                <div className="col-md-3">Title</div>
                <div className="col-md-2">Amount</div>
                <div className="col-md-6">Attachments</div>
              </div>
              {detailArray?.length == 0 && <p> No Detail Found</p>}
              {detailArray?.map((data, index) => {
                return (
                  <>
                    <div className="row">
                      <div className="col-md-1">{index + 1}</div>
                      <div className="col-md-3">{data.expenseTitle}</div>
                      <div className="col-md-2">
                        {data.totalIncVat} {data.currencyId}
                      </div>
                      <div className="col-md-6">
                        {data.attachmentList?.map((e) => {
                          return (
                            <p
                              onClick={(ev) => {
                                window.open(e.url, "_blank");
                              }}
                              style={{ color: "blue", cursor: "pointer" }}
                            >
                              {e.fileName}
                            </p>
                          );
                        })}
                        {!data.attachmentList &&
                          data.attachmentList.length == 0 && <p>N/A</p>}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
