import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import moment from "moment";
import PropTypes from "prop-types";
import * as React from "react";
// import '../../../src/assets/css1/expense.css'
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import { common_axios } from "../../App";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import {
  setReleaseId,
  setTabIndex,
  setexpenseId,
} from "../../redux/features/expenseIdSlice";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
import TableDynamic2 from "../../Components/Tabledynamic copy";

import { toast } from "react-toastify";
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
export default function SearchExpense() {
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
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [oneTime, setOneTime] = useState(false);

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

  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 10,
  });

  useEffect(() => {
    if (search.length != 0) {
      getSearch();
    }
  }, [request, TableStatus]);
  const getSearch = async () => {
    setHideSkeleton(true);
    if (search?.length == 0) {
      Swal.fire({
        icon: "error",
        text: "Search key is required",
        title: "Required",
      });
      return;
    }
    if (search?.length <= 3) {
      Swal.fire({
        icon: "error",
        text: "Please enter more than 3 characters",
        title: "Required",
      });
      return;
    }
    let formdata = {
      searchKey: search,
      pageNo: TableStatus.pageNo,
      pageSize: TableStatus.pageSize,
      orderInt: 0,
      priceSort: false,
      createdSort: false,
      modifiedSort: false,
      nameSort: false,
      projectSort: false,
      statusSort: 0,
      raisedSort: false,
    };

    // console.log(formdata);
    if (search?.length > 0) {
      setHideSkeleton(true);
      let encrypted = await common_axios.post(
        "/expenseenc/search",
        encryptBody(formdata, localStorage.getItem("aesKey"), 1)
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
          // console.log(res.data.expenseList);
          dispatch(setLoader(false));
          // console.log(res.data);
          setTotalPages(res.data.totalPages);
          // setOneTime(true);
          // if (res.data.totalPages == 0) {
          //   let count = Number(res.data.totalCount) / 10;
          //   setTotalPages(count);
          // }
          setData(res.data.expenseList);
          setHideSkeleton(false);
          setisData(true);
        } else {
          setisData(false);
          setHideSkeleton(false);

          toast(`${res.data.statusDescription.statusMessage}`);
          // Swal.fire({
          //   icon: "error",
          //   title: res?.data?.statusDescription.statusMessage,
          // });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: res?.data?.statusDescription.statusMessage,
        });
      }
      setHideSkeleton(false);
    }

    setHideSkeleton(false);
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

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const viewDetail = (cell) => {
    // dispatch(setexpenseId(cell.row.original.id));

    // localStorage.setItem("expenseId", "" + cell.row.original.id)
    // history.push("/detail")

    dispatch(setTabIndex(-1));

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
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
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
        Header: "Raised By",
        accessor: "generatorName", // accessor is the "key" in the data
      },
      {
        Header: "Pending At",
        accessor: "pendingAt", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            <>
              {" "}
              {cell?.row?.original?.pendingAt
                ? cell?.row?.original?.pendingAt
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
                {cell?.row?.original?.queryOpenStatus == 1 && (
                  <span
                    className="badge bg-primary text-white mx-1 cursor_"
                    title="Open Query"
                    style={{ padding: "1px" }}
                  >
                    <QuestionMarkIcon />
                  </span>
                )}
                {/* {cell?.row?.original?.functionStatus[1] == 1 && (
                  <span
                    className="badge text-white mx-1 cursor_"
                    title="Partially Rejected"
                    style={{ backgroundColor: "#4b2142", padding: "1px" }}
                  >
                    <HourglassBottomIcon />
                  </span>
                )}
                {cell?.row?.original?.functionStatus[2] == 1 && (
                  <span
                    className="badge text-white mx-1 cursor_"
                    style={{ backgroundColor: "#2a8000", padding: "1px" }}
                  >
                    <ModeEditIcon />
                  </span>
                )} */}
              </div>
            </>
          );
        },
      },
      {
        Header: "Action",
        Footer: "User-Action",
        accessor: "action",
        Cell: (cell) => {
          return (
            <IconButton
              title="View detail"
              style={{ marginLeft: "19%" }}
              onClick={(e) => {
                viewDetail(cell);
              }}
            >
              <VisibilityIcon style={{ color: "blue", fontSize: "19px" }} />
            </IconButton>
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
  useEffect(() => {
    // return () => {
    //     dispatch(setTabIndex(0))
    // }
  });
  const getproejctIdFilter = async () => {
    let projectList = [];
    projectList.push(projectId);
    var myReq = { ...request, projectIdList: projectList };
    await setRequest(myReq);
  };
  useEffect(() => {
    if (projectId != 0 && value == 0) {
      // setHideSkeleton(true);
      getproejctIdFilter();
    }
  }, [projectId]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const changeTableData = async (type, value) => {
    setHideSkeleton(true);
    if (type == 0) {
    } else if (type == 1) {
      value = value - 1;
    } else {
      value = value - 1;
    }
    await setRequest({ ...request, pageNo: value });

    // setTimeout(() => {
    //   getSearch();
    // }, 2000);
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
      <Box>
        <div className="row m-3">
          <div className="col-md-auto">
            <button
              className="btn btn-primary arrows_style"
              onClick={(e) => {
                dispatch(setTabIndex(0));
                history.push("/expense");
              }}
            >
              <ArrowBackIcon />
            </button>
          </div>
          {
            <div className="col-md-4">
              {hideSkeleton1 == true ? (
                <>
                  <Box sx={{ width: "100%" }}>
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    {/* <Skeleton animation={false} /> */}
                  </Box>
                </>
              ) : (
                <>
                  <TextField
                    required
                    className="w-100"
                    label="Search Expense"
                    name="search"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    size="small"
                    type="text"
                    placeholder="Search Expense By Title ,Raised By and ExpenseId"
                    autoComplete="off"
                    auto="off"
                    onInput={(e) => {
                      e.target.value = e.target.value.toString().slice(0, 50);
                    }}
                    value={search}
                    onChange={(e) => {
                      // setHideSkeleton(true)
                      setSearch(e.target.value);
                      setisData(false);
                    }}
                  />
                </>
              )}
            </div>
          }
          <div className="col-md-auto">
            <button
              className="btn btn-primary arrows_style"
              style={{ marginRight: "10px" }}
              onClick={(e) => {
                getSearch();
              }}
            >
              {" "}
              <SearchIcon />
            </button>
            <button
              className="btn btn-secondary mx-1 arrows_style"
              onClick={(e) => {
                setSearch("");
                setisData(false);
                setData([]);
              }}
            >
              <RestartAltIcon />
            </button>
          </div>
        </div>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {true ? (
          <TableDynamic2
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
          />
        ) : (
          <div className="card-body">
            <div className="text-center mt-4">
              {data?.length == 0 && (
                <div className="text-center">
                  <h5>No Record Found..!!</h5>
                </div>
              )}
            </div>
          </div>
        )}
      </CustomTabPanel>
    </Box>
  );
}
