import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import XLSX from "sheetjs-style";
import { utils, writeFile } from "xlsx";
import moment from "moment";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import ColumnFilter from "../../Components/ColumnFilter";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import { common_axios } from "../../App";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import { setQueryId, setexpenseId } from "../../redux/features/expenseIdSlice";
import ExpenseQueries from "./MyQueries";
import MyRaisedQueries from "./MyRaisedQueries";
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
export default function OuterContainer(props) {
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
  const [filterCount, setFilterCount] = useState(0);
  const [filterPages, setFilterPages] = useState(0);
  const [type, setType] = useState(false);
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
  const [filterTableStatus, setfilterTableStatus] = useState({
    pageNo: 0,
    pageSize: 10,
  });
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
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
  });
  const letprojectList = useSelector(
    (state) => state.expenseIdSlice.projectList
  );
  useEffect(() => {
    if (letprojectList.length > 0) {
      setProjectList(letprojectList);
    }
  }, [letprojectList]);
  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 10,
  });
  const getproejctIdFilter = async () => {
    let projectList = [];
    projectList.push(projectId);
    var myReq = { ...request, projectIdList: projectList };
    await setRequest(myReq);
  };
  const getFiltered = async (value) => {
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
    if (filterDate.length > 0) {
      let startDate = moment(filterDate[0]).format("YYYY-MM-DD");
      let endDate = moment(filterDate[1]).format("YYYY-MM-DD");
      req["startDate"] = startDate;
      req["endDate"] = endDate;
    }
    setRequest(req);
    setIsFilter(true);
    // getAllForFilter(value)
  };
  useEffect(() => {
    if (projectId != 0) {
      setHideSkeleton(true);
      getproejctIdFilter();
    }
  }, [projectId]);
  useEffect(() => {
    setHideSkeleton(true);
    // getAllAssigned()
  }, [request]);
  useEffect(() => {
    if (projectId != 0 && value == 0) {
      setHideSkeleton(true);
      getproejctIdFilter();
    } else {
      setRequest({ ...request, projectIdList: [] });
    }
  }, [projectId]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const history = useHistory();
  const viewDetail = (cell) => {
    dispatch(setexpenseId(cell.row.original.id));
    dispatch(setQueryId(cell.row.original.qid));
    localStorage.setItem("expenseId", "" + cell.row.original.id);
    history.push("/detail");
  };
  const getDataForExport = async (type, data) => {
    dispatch(setLoader(true));
    if (type == 1) {
      let approverId = localStorage.getItem("UserId");
      var req = {
        ...request,
      };
      req["pageNo"] = 0;
      req["pageSize"] = totalCount;
      var res = await common_axios.post(`/expenseenc/history/v2/user`, req);
      if (res?.data?.statusDescription?.statusCode == 200) {
        let arr = [];
        res.data.expenseList.forEach((el) => {
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
          };
          if (el.expenseStatus == 2) {
            formdata["Status"] = "Approved";
          } else if (el.expenseStatus == 1) {
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
          arr.push(formdata);
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
        arr.push(formdata);
      });
      await setExportData(arr);
      exportExcel(arr);
    }
  };
  const exportExcel = (arr) => {
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
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
    let approverId = localStorage.getItem("UserId");
    // setRequest(...{ approverId })
    var res = await common_axios.post(`/expenseenc/myqueries`, request);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setisData(true);
      setTotalPages(res.data.totalPages);
      setData(res.data.expenseList);
      setHideSkeleton(false);
      setTotalCount(res.data.totalCount);
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
      // Swal.fire({
      //     icon: "error",
      //     title: "Something went wrong",
      //     text: res?.data?.statusDescription?.statusMessage,
      //     // footer: '<a href="">Why do I have this issue?</a>'
      // });
    }
    setHideSkeleton(false);
  };
  const resetFilter = async () => {
    setStatus(0);
    setprojectId(0);
    await setRequest(filterData);
    setFilterDate(null);
    setIsFilter(false);
  };
  const getAllForFilter = async (value) => {
    let approverId = localStorage.getItem("UserId");
    setHideSkeleton(true);
    let reqObj = request;
    reqObj["pageSize"] = totalCount;
    // setRequest(...{ approverId })
    var res = await common_axios.post(`/expenseenc/history/v2/user`, reqObj);
    if (res?.data?.statusDescription?.statusCode == 200) {
      let filtered = [];
      if (value == 1) {
        filtered = res.data.expenseList.filter((x) => {
          return x.status == 2;
        });
      } else if (value == 2) {
        filtered = res.data.expenseList.filter((x) => {
          return x.status == 0;
        });
      } else if (value == 3) {
        filtered = res.data.expenseList.filter((x) => {
          return x.status == 1;
        });
      } else if (value == 4) {
        filtered = res.data.expenseList.filter((x) => {
          return x.functionStatus == 1;
        });
      } else if (value == 5) {
        filtered = res.data.expenseList.filter((x) => {
          return x.functionStatus == 2;
        });
      } else if (value == 6) {
        filtered = res.data.expenseList.filter((x) => {
          return x.functionStatus == 3;
        });
      } else {
        filtered = res.data.expenseList;
      }
      setisData(true);
      setData(filtered);
      setHideSkeleton(false);
      setTotalCount(filtered.length);
    }
  };
  const columns = useMemo(
    () => [
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
                .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
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
      },
      {
        Header: "Pending at",
        accessor: "pendingAt", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            <>
              {cell.row.original.pendingAt
                ? cell.row.original.pendingAt
                : "N/A"}
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
              {cell.row.original.status == 0 && (
                <span className="badge  bg-warning text-white">Pending</span>
              )}
              {cell.row.original.status == 1 && (
                <span className="badge bg-danger text-white">Rejected</span>
              )}
              {cell.row.original.status == 2 && (
                <span className="badge bg-success text-white">Approved</span>
              )}
            </>
          );
        },
      },
      {
        Header: "Action",
        Footer: "User-Action",
        accessor: "projectId",
        Cell: (cell) => {
          return (
            <>
              {" "}
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
            <Tab label="Query Inbox" {...a11yProps(0)} />
            <Tab label="Raised by me " {...a11yProps(1)} />
            {/* <Tab label="Project Expense Report" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ExpenseQueries new={type} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MyRaisedQueries />
        </CustomTabPanel>
      </Box>
      {props.raiseReplyCount != 0 && (
        <span
          className="green_badge_4 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
          style={{
            fontSize: "x-small",
          }}
        >
          {" "}
          {props.raiseReplyCount}
        </span>
      )}

      {props.queryCount != 0 && (
        <span
          className="green_badge_5 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
          style={{
            fontSize: "x-small",
          }}
        >
          {" "}
          {props.queryCount}
        </span>
      )}
    </>
  );
}
