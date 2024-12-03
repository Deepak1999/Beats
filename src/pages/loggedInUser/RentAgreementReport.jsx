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
export default function RentAgreementReport() {
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
  const [projectList, setProjectList] = useState([]);

  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    getAllAgreements();
  }, []);

  const getAllAgreements = async () => {
    const res = await common_axios.post(
      `/payment/rent/agreeements/${TableStatus.pageNo}/${TableStatus.pageSize}`,
      {}
    );
    if (res?.data) {
      if (res?.data.statusDescription.statusCode == 200) {
        // console.log(res.data);
        setData(res.data.agreementsList);
        setResp(true);
      } else {
        // console.log(res.data);
      }
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

  const userSelector = useSelector((state) => state.authSliceandSidebar.user);
  useEffect(async () => {
    if (userSelector) {
      await setUser(userSelector);
    }
  }, [userSelector]);

  const [files, setFiles] = useState({
    arr: [],
  });
  const [data, setData] = useState([]);

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
                Rent Agreements Report
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
    </>
  );
}
