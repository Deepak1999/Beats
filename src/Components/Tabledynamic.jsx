import {
  Autocomplete,
  Avatar,
  Backdrop,
  BackdropRoot,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Stack,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
  Menu,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
import React, { useEffect, useMemo, useRef, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import ColumnFilter from "./ColumnFilter";
import { useDispatch } from "react-redux";
import {
  setexpenseId,
  setMilestoneId,
  setReleaseId,
} from "../redux/features/expenseIdSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import { common_axios } from "../App";
import { useFormik } from "formik";
export const DynamicTable = (props) => {
  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 20,
  });
  const [hideSkeleton, sethideSkeleton] = useState(false);
  const [isData, setisData] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationPage, setPaginationPage] = React.useState(1);
  const [type, setType] = useState(0);
  const [open, setopen] = useState(false);
  useEffect(() => {
    setisData(true);
    setData(props.data);
    setTotalPages(props.totalPages);
  }, [props]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const dispatch = useDispatch();
  const [files, setFiles] = useState({
    arr: [],
  });
  const fileRef = useRef(null);
  const [appReText, setAppReText] = useState(null);
  const history = useHistory();
  const [fileat, setfileat] = useState(null);
  const [raiseText, setRaiseText] = useState(null);
  const [raiseAmount, setRaiseAmount] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const [amountShow, setAmountShow] = useState(null);
  useEffect(() => {
    statusChange1();
  }, [TableStatus, paginationPage]);
  useEffect(() => {}, [props.data, props.isData, isData, data]);
  const statusChange1 = () => {
    props.statusChange(TableStatus, paginationPage);
  };
  const columns = useMemo(() => props.columns, [props.data, TableStatus]);
  const clickParent = () => {
    props.clickParent("sdf hsdvj fsdfbhsd vfsdfjsdhfsdf");
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
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const handleAction = (action) => {
    if (anchorEl) {
      handleClose();
    }
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
    localStorage.setItem("milestoneId", "" + expenseId);
    // dispatch(setReleaseId(params.id));
    dispatch(setMilestoneId(expenseId));
    history.push("/mDetail/" + expenseId);
  };
  const viewDetail3 = (expenseId) => {
    localStorage.setItem("milestoneId", "" + cell.row.original.id);
    dispatch(setReleaseId(cell.row.original.id));
    history.push("/mDetail");
  };
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setRequestData(row);
  };
  const rejectRequest = async () => {
    if (!appReText) {
      Swal.fire({
        icon: "warning",
        title: "Remarks Required",
        text: `${
          type == 1
            ? "Approve Remarks is required"
            : "Reject Remarks is required"
        } `,
      });
      return;
    }
    let formdata = {
      purchaseOrderId: requestData.original.id,
      remarks: appReText,
    };
    const res = await common_axios.post(
      "/expense/reject/PurchasePayment",
      formdata
    );
    if (res?.data) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Approved Successfully ",
        });
        document.getElementById("btn-close3").click();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something Went Wrong",
          text: res.data.statusDescription.statusMessage,
        });
        document.getElementById("btn-close3").click();
      }
      setAppReText(null);
    }
  };

  const formik = useFormik({
    initialValues: {
      text: "",
      showAmount: 0,
      actualAmount: 0,
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const approveRequest = async () => {
    if (!appReText) {
      Swal.fire({
        icon: "warning",
        title: "Remarks Required",
        text: `${
          type == 1
            ? "Approve Remarks is required"
            : "Reject Remarks is required"
        } `,
      });
      return;
    }
    let formdata = {
      purchaseOrderId: requestData.original.id,
      remark: appReText,
    };
    const res = await common_axios.post(
      "/expense/approve/PurchasePayment",
      formdata
    );
    if (res?.data) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Approved Successfully ",
        });
        document.getElementById("btn-close3").click();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something Went Wrong",
          text: res.data.statusDescription.statusMessage,
        });
        document.getElementById("btn-close3").click();
      }
      setAppReText(null);
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
  const raiseRequest = async () => {
    if (raiseAmount && raiseText && files.arr.length > 0) {
      let formdata = new FormData();
      formdata.append("amount", raiseAmount);
      formdata.append("remark", raiseText);
      files.arr.forEach((element) => {
        formdata.append("files", element);
      });
      formdata.append("expenseId", requestData.original.id);
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
    <>
      <Box sx={{ width: "100%" }}>
        <>
          <span
            className="badge  bg-primary mt-n3 "
            style={{ padding: "15px", fontSize: "large" }}
          >
            {props.heading && <>{props.heading}</>}
          </span>
          {props.hideSkeleton == true ? (
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
          ) : props.isData && isData ? (
            <>
              <div className="card-body ">
                <div className="d-flex justify-content-between mb-3">
                  {/* <select
                    value={TableStatus.pageSize}
                    className="dropdown"
                    onChange={(e) => {
                      setTableStatus({
                        ...TableStatus,
                        pageSize: e.target.value,
                        pageNo: 0,
                      });
                      props.statusChange();
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
                          Show {value}
                        </option>
                      );
                    })}
                  </select> */}
                  <Tooltip title="Refresh">
                    <button
                      type="submit"
                      className="btn bg-gradient-primary w_btn m-0 ms-3 me-3 search_1"
                    ></button>
                  </Tooltip>
                </div>
                {props.isData && isData && (
                  <>
                    {" "}
                    <div className="table-responsive">
                      <table
                        {...getTableProps()}
                        id="example"
                        className="table table-striped message_table table-bordered dataTable table-sm"
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
                              {/* <th>Action</th> */}
                            </tr>
                          ))}
                        </thead>
                        <tbody {...getTableBodyProps()} id="svg_tbody">
                          {page.map((row) => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                  // console.log(cell.column);
                                  return (
                                    <td
                                      {...cell.getCellProps()}
                                      className={
                                        cell.column.Header == "Total Amount"
                                          ? "text-end update_td  text-end"
                                          : "text-left update_td "
                                      }
                                    >
                                      {cell.render("Cell")}
                                    </td>
                                  );
                                })}
                                {props.type == 1 && (
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
                                            requestData?.original?.id
                                          );
                                          handleAction("Detail");
                                        }}
                                      >
                                        View Detail
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() => {
                                          viewDetail1(
                                            requestData?.original?.id
                                          );
                                          handleAction("Milestones Detail");
                                        }}
                                      >
                                        View Milestones Details
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() => {
                                          setType(1);
                                          document
                                            .getElementById("confirm-button1")
                                            .click();
                                          handleAction("Approve");
                                        }}
                                      >
                                        {" "}
                                        Approve
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() => {
                                          setType(2);
                                          document
                                            .getElementById("confirm-button1")
                                            .click();
                                          handleAction("Reject");
                                        }}
                                      >
                                        {" "}
                                        Reject
                                      </MenuItem>
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
                            {0 + 1} of {""}
                            {props.totalPages}
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
                          }}
                        >
                          Last
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="text-center mt-4">
                {props.data?.length == 0 && open == true ? null : props.data
                    ?.length == 0 && open == undefined ? null : (
                  <div className="text-center">
                    <h5>No Record Found..!!</h5>
                  </div>
                )}
              </div>
            </>
          )}
        </>
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
                  onClick={(e) => {
                    resetRaise();
                  }}
                ></button>
              </div>

              <form onSubmit={formik.handleSubmit}>
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
                        value={raiseText}
                        placeholder="Enter Remarks"
                        onChange={(e) => {
                          if (e.target.value?.length < 50) {
                            formik.handleChange(e);
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
                        name="showAmount"
                        value={amountShow}
                        placeholder="Enter Amount"
                        onChange={(e) => {
                          formik.handleChange(e);
                          setAmountShow(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label>
                        Actual Amount{" "}
                        <span className="text text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control mt-2"
                        name="text"
                        value={raiseAmount}
                        placeholder="Enter Amount"
                        onChange={(e) => {
                          formik.handleChange(e);
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
                      ref={fileRef}
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
                          <h6 key={i}>
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
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                      // raiseRequest();
                    }}
                  >
                    {" "}
                    Raise
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <button
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
                  onClick={(e) => {
                    resetRaise();
                  }}
                ></button>
              </div>

              <form onSubmit={formik.handleSubmit}>
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

                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label>
                        Amount <span className="text text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control mt-2"
                        name="text"
                        value={amountShow}
                        placeholder="Enter Amount"
                        onChange={(e) => {
                          setAmountShow(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label>
                        Actual Amount{" "}
                        <span className="text text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control mt-2"
                        name="text"
                        value={raiseAmount}
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
                      ref={fileRef}
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
                          <h6 key={i}>
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
                    Cancel
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
              </form>
            </div>
          </div>
        </div> */}
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
                  {type == 1 ? (
                    <span>Approve Confirmation </span>
                  ) : (
                    <span>Reject Confirmation</span>
                  )}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="btn-close3"
                  // onClick={resetRaise()}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    {type == 1 ? (
                      <label>
                        Approval Remarks{" "}
                        <span className="text text-danger">*</span>
                      </label>
                    ) : (
                      <label>
                        Reject Remarks{" "}
                        <span className="text text-danger">*</span>
                      </label>
                    )}
                    <input
                      type="text"
                      className="form-control mt-2"
                      name="text"
                      value={appReText}
                      placeholder="Enter Remarks"
                      onChange={(e) => {
                        if (e.target.value?.length < 50) {
                          setAppReText(e.target.value);
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
                >
                  cancel
                </button>
                {type == 1 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => {
                      approveRequest();
                    }}
                  >
                    {" "}
                    Approve
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => {
                      rejectRequest();
                    }}
                  >
                    {" "}
                    Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};
