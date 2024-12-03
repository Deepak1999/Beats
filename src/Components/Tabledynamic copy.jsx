import InfoIcon from "@mui/icons-material/Info";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Autocomplete,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

import Typography from "@mui/material/Typography";
import moment from "moment";
import PropTypes from "prop-types";
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
import { Skeleton, Tooltip } from "@mui/material";
import ColumnFilter from "../Components/ColumnFilter";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
export default function TableDynamic2(props) {
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
  const [exportData, setExportData] = useState([]);
  const [pState, setpState] = useState([]);
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
  });

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // useEffect(() => {

  // }, [props]);

  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 10,
  });
  useEffect(() => {
    if (
      localStorage.getItem("aesKey") != null &&
      localStorage.getItem("userId") != null &&
      localStorage.getItem("token") != null
    ) {
      // setHideSkeleton(true);
    }
  }, [
    request,
    localStorage.getItem("aesKey") != null &&
      localStorage.getItem("userId") != null &&
      localStorage.getItem("token") != null,
  ]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const history = useHistory();
  const viewDetail = (cell) => {
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

  const generateDynamicLink = (data) => {
    // Replace this logic with your dynamic link generation based on 'data'
    // For example, if 'data' is an ID, you can construct a link dynamically
    return `${data}`;
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

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    statusChange1();
  }, [TableStatus, paginationPage]);
  useEffect(() => {
    setisData(props.isData);
    setData(props.data);
    setTotalPages(props.totalPages);
    setHideSkeleton(props.hideSkeleton);
  }, [props, props.data, props.isData, isData, data]);
  const statusChange1 = () => {
    props.statusChange(TableStatus, paginationPage);
  };
  const columns = useMemo(() => props.columns, [props.data, TableStatus]);
  const [anchorEl, setAnchorEl] = useState(null);
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
            <div className="row justify-content-between">
              {
                <div className="col-md-4 lavel">
                  {hideSkeleton1 == true ? (
                    <>
                      <Box sx={{ width: "100%" }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              }
            </div>
            <div className="card shadow-none border bg_blue mt-5">
              <span
                className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 "
                style={{ padding: "15px", fontSize: "large" }}
              >
                {/* Add Number */}
                Search Expense
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
                          onClick={(e) => {}}
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
                    {data?.length == 0 && (
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
    </Box>
  );
}
