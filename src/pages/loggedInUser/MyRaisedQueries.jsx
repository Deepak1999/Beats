import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoIcon from "@mui/icons-material/Info";
import Pagination from "@mui/material/Pagination";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import XLSX from "sheetjs-style";
import { utils, writeFile } from "xlsx";
import * as React from "react";
import moment from "moment";
import { useEffect, useState, useMemo } from "react";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
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
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  setQueryId,
  setRefreshqueries,
  setReleaseId,
  setexpenseId,
} from "../../redux/features/expenseIdSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setLoader } from "../../redux/features/authSliceandSidebar";
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
export default function MyRaisedQueries(props) {
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
    modifiedSort: true,
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
    getAllAssigned();
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
    if (cell.row.original.type == 3) {
      dispatch(setQueryId(cell.row.original.qid));
      dispatch(setReleaseId(cell.row.original.id));
      localStorage.setItem("releaseId", "" + cell.row.original.id);
      history.push("/releaseDetail/" + cell.row.original.id);
    } else {
      dispatch(setQueryId(cell.row.original.qid));
      dispatch(setexpenseId(cell.row.original.id));
      localStorage.setItem("expenseId", "" + cell.row.original.id);
      history.push("/detail");
    }
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
    let encrypted = await common_axios.post(
      `/expenseenc/queries/raised`,
      encryptBody(request, localStorage.getItem("aesKey"), 1)
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

        let arr = res.data.expenseList.filter((x) => {
          return x.status == 0;
        });

        // console.log(arr);
        setData(res.data.expenseList);
        setHideSkeleton(false);
        dispatch(setRefreshqueries(true));
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
    } else {
      Swal.fire({
        icon: "error",
        title: "Decryption Failed",
        text: res?.data?.statusDescription?.statusMessage,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
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
      },
      {
        Header: "Query",
        accessor: "query",
      },
      {
        Header: "Project Name",
        accessor: "projectName", // accessor is the "key" in the data
      },
      {
        Header: "Query To",
        accessor: "quname",
      },
      {
        Header: "Raised On ",
        accessor: "crDate",
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
        Header: "Replied On ",
        accessor: "replyDate",
        Cell: (cell) => {
          // // console.log(cell.row.original);
          return (
            <>
              {moment(new Date(cell.row.original.replyDate))
                .add(5, "hours")
                .add(30, "minutes")
                .format("DD-MMM-YYYY h:mm a")}
            </>
          );
        }, // accessor is the "key" in the data
      },
      {
        Header: "Response",
        accessor: "status",
        Cell: (cell) => {
          return (
            <>
              {cell.row.original.reply == null ? (
                <span className="badge  bg-danger text-white">Awaited</span>
              ) : (
                <Tooltip
                  itle={
                    cell.row.original.reply && (
                      <h6 style={{ color: "lightblue" }}>
                        {cell.row.original.reply}
                      </h6>
                    )
                  }
                  sx={{ cursor: "pointer" }}
                  arrow
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontFamily: "'open sans',sans-serif ",
                    }}
                  >
                    {cell.row.original.reply.slice(0, 15)}
                  </span>
                </Tooltip>
              )}
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
            {true ? (
              <>
                {" "}
                <div className="card shadow-none border bg_blue mt-4">
                  <span
                    className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 "
                    style={{ padding: "15px", fontSize: "large" }}
                  >
                    Raised by me
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
                              // onClick={() => RefreshBtn("Text to Copy")}
                            >
                              {/* <i className="material-icons opacity-10">refresh</i> */}
                              <RefreshIcon />
                            </button>
                          </Tooltip>
                        </div>
                        <div className=" small_1 table-responsive">
                          <table
                            {...getTableProps()}
                            id="example"
                            className="table table-striped message_table table-bordered dataTable table-sm  mytableClass  class_size"
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
                                        column?.Header == "Status"
                                          ? "text-center"
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
                                      {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                                    </th>
                                  ))}
                                </tr>
                              ))}
                            </thead>
                            <tbody {...getTableBodyProps()} id="svg_tbody">
                              {page.map((row) => {
                                prepareRow(row);
                                return (
                                  <tr
                                    style={{ lineHeight: "0.8" }}
                                    {...row.getRowProps()}
                                  >
                                    {row.cells.map((cell) => {
                                      return (
                                        <td
                                          {...cell.getCellProps()}
                                          // className="text-start"
                                          className={
                                            cell.column.Header == "Response"
                                              ? "text-left"
                                              : "text-left update_td w-36 "
                                          }
                                        >
                                          <div>{cell.render("Cell")}</div>
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
    </Box>
  );
}
