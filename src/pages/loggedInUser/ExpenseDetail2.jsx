import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoIcon from "@mui/icons-material/Info";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import * as React from "react";
import moment from "moment";
import {
  Autocomplete,
  Backdrop,
  BackdropRoot,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  useAsyncDebounce,
  useBlockLayout,
  useColumnOrder,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import ColumnFilter from "../../Components/ColumnFilter";
import { Skeleton } from "@mui/material";
import { common_axios } from "../../App";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setexpenseId } from "../../redux/features/expenseIdSlice";
import { useFormik } from "formik";
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
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function ExpenseHistory2() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isData, setisData] = useState(true);
  const [data2, setdata2] = useState({});
  const [pageSize, setPageSize2] = useState(0);
  const dispatch = useDispatch();
  const [request, setRequest] = useState({
    approverId: "" + localStorage.getItem("userId"),
    projectIdList: [],
    pageNo: 0,
    pageSize: 50,
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
    setHideSkeleton(true);
    getAllAssigned();
  }, []);
  const formik = useFormik({
    selectValue: "",
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
    dispatch(setexpenseId(cell.row.original.id));
  };
  // React.useEffect = (() => {
  //     getAllAssigned()
  // }, [])
  const getAllAssigned = async () => {
    let approverId = localStorage.getItem("UserId");
    // setRequest(...{ approverId })
    var res = await common_axios.post(`/expenseenc/history/v2/user`, request);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setisData(true);
      setData(res.data.expenseList);
      setHideSkeleton(false);
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
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: res?.data?.statusDescription?.statusMessage,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
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
        Header: "Created Date Time",
        accessor: "created",
        Cell: (cell) => {
          return (
            <>
              {moment(
                new Date(cell.row.original.created).toLocaleDateString()
              ).format("DD-MM-YYYY HH:MM:SS")}
            </>
          );
        }, // accessor is the "key" in the data
      },
      {
        Header: "Raised By",
        accessor: "generatorName", // accessor is the "key" in the data
      },
      {
        Header: "Pending At",
        accessor: "pendingAt", // accessor is the "key" in the data
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (cell) => {
          return (
            <>
              {cell.row.original.status == 0 && (
                <span className="badge badge-primary text-primary">
                  Pending
                </span>
              )}
              {cell.row.original.status == 1 && (
                <span className="badge badge-primary text-primary">
                  Rejected
                </span>
              )}
              {cell.row.original.status == 2 && (
                <span className="badge badge-primary text-primary">
                  Verified
                </span>
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
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  viewDetail(cell);
                }}
              >
                View Detail
              </button>
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
    <Box sx={{ width: "100%" }}>
      {isData ? (
        <>
          <div className="card-body">
            <div className="card shadow-none border bg_blue mt-4">
              <span className="badge rounded-pill bg-primary margin_top mt-n3 ms-5">
                {/* Add Number */}
                Running
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
                    <div className="row mx-0">
                      {/* <div className="co px-0"> */}
                      <div
                        className="card card_scroll rounded-0"
                        style={{
                          borderRadius: "0",
                          // width: !sidebarState ? "750px" : "950px",
                          position: "fixed",
                          overflow: "auto",
                          bottom: "0",
                          top: "90px",
                          left: "0px",
                        }}
                      >
                        <div className="container-fluid mt-3">
                          <div className="bg-black">
                            <h6>SMS Template</h6>
                          </div>
                          <form
                            onSubmit={formik.handleSubmit}
                            className="row mt-2 g-3 needs-validation"
                            noValidate
                          ></form>
                        </div>
                        {data.length > 0 && (
                          <>
                            <div className="container-fluid mt-2">
                              <hr />
                              <h6>Recently Added</h6>
                              <div className="d-flex justify-content-between my-3">
                                <select
                                  value={pageSize}
                                  className="dropdown"
                                  onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                  }}
                                >
                                  {[10, 25, 50].map((value, i) => {
                                    return (
                                      <option
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                        value={value}
                                        key={value}
                                      >
                                        {" "}
                                        Show {value}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div></div>
                              <div className="table-responsive">
                                {columns && (
                                  <DynamicTable
                                    columns={columns}
                                    data={data}
                                    heading="Mys"
                                  />
                                )}
                              </div>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <span>
                                    Page:
                                    <strong>
                                      {/* {pageIndex + 1} of {pageOptions.length} */}
                                    </strong>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {/* </div> */}
                      <div
                        className="co p-4"
                        // style={{ marginLeft: !sidebarState ? "750px" : "950px" }}
                      ></div>
                    </div>
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
              <div className="text-center">
                <h5>No Record Found..!!</h5>
              </div>
            )}
          </div>
        </>
      )}
    </Box>
  );
}
