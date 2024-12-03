import { Box, InputAdornment, Skeleton, Tooltip } from "@mui/material";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import React, { useEffect, useMemo, useRef, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment";
import "./../pages/loggedInUser/main.css";
import ColumnFilter from "./ColumnFilter";
import { decryptBody, encryptBody } from "../utils/EncDecUtil";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/features/authSliceandSidebar";
import { common_axios } from "../App";
export const ExpenseDetailTable = (props) => {
  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 10,
  });
  const [hideSkeleton, sethideSkeleton] = useState(false);
  const [isData, setisData] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationPage, setPaginationPage] = React.useState(0);
  const [detailHistory, setDetailHistory] = useState([]);
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.id) {
      getHistory();
    }
  }, [props.id]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "Modified Date",
        accessor: "created",
        Cell: (cell) => {
          return (
            <>
              {moment(new Date(cell.row.original.modified))
                .add(5, "hours")
                .add(30, "minutes")
                .format("DD-MMM-YYYY ")}
            </>
          );
        },
      },
      {
        Header: "Modified By ",
        accessor: "modifiedBy", // accessor is the "key" in the data
      },
      {
        Header: "Vendor Name",
        accessor: "vendorName", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            <>
              {cell.row.original?.vendorDetails1?.vendorName
                ? cell.row.original?.vendorDetails1?.vendorName
                : "N/A"}
            </>
          );
        },
      },
      {
        Header: "Category",
        accessor: "category", // accessor is the "key" in the data
        Cell: (cell) => {
          return <>{props.category}</>;
        },
      },
      {
        Header: "SubCategory",
        accessor: "subCat", // accessor is the "key" in the data
        Cell: (cell) => {
          return <>{props.subCategory}</>;
        },
      },
      {
        Header: "Unit Price",
        accessor: "unitPrice", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-success">
                {" "}
                {cell.row.original?.currencyId}{" "}
              </span>{" "}
              {cell.row.original?.unitPrice}
            </>
          );
        },
      },
      {
        Header: "Quantity",
        accessor: "quantity", // accessor is the "key" in the data
        Cell: (cell) => {
          return <>{cell.row.original?.quantity}</>;
        },
      },
      {
        Header: "Basic Amount",
        accessor: "oldBasicAmount", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-success">
                {" "}
                {cell.row.original?.currencyId}{" "}
              </span>{" "}
              {cell.row.original?.oldBasicAmount}
            </>
          );
        },
      },
      {
        Header: "GST Amount",
        accessor: "gstAmount", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-success">
                {" "}
                {cell.row.original?.currencyId}{" "}
              </span>{" "}
              {cell.row.original?.gstAmount}
            </>
          );
        },
      },
      {
        Header: "Freight Amount",
        accessor: "freightAmount", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-success">
                {" "}
                {cell.row.original?.currencyId}{" "}
              </span>{" "}
              {cell.row.original?.freightAmount}
            </>
          );
        },
      },
      {
        Header: "Freight Remarks",
        accessor: "remarks", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            <>
              {cell.row.original?.remarks ? cell.row.original?.remarks : "N/A"}
            </>
          );
        },
      },
      {
        Header: "Total Amount",
        accessor: "totalAmount", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="text-success">
                {" "}
                {cell.row.original?.currencyId}{" "}
              </span>{" "}
              {cell.row.original?.totalAmount}
            </>
          );
        },
      },
      {
        Header: "Attachments",
        accessor: "attachments", // accessor is the "key" in the data
        Cell: (cell) => {
          return (
            // className="d-flex flex-column align-items-start my-auto"
            <div>
              {cell.row.original?.attachments.length > 0 &&
                cell.row.original?.attachments?.map((at) => {
                  return (
                    <div className="col-md-auto" key={at.id}>
                      <a
                        className="my-1"
                        style={{ lineBreak: "anywhere" }}
                        href={
                          "https://beatsapi.altruistindia.com/" +
                          at.saveFileName
                        }
                        target="_blank "
                      >
                        {at.attachmentFileName}
                      </a>
                    </div>
                  );
                })}
              {cell.row.original.attachments.length == 0 && <>N/A</>}
            </div>
          );
        },
      },
    ],
    [data, TableStatus]
  );
  const getHistory = async (e) => {
    try {
      //   modalRef5.current.click();
      dispatch(setLoader(true));
      let formdata = {
        expenseId: props.id,
      };
      const encrypted = await common_axios.post(
        `/expenseenc/modify/history`,
        encryptBody(formdata, localStorage.getItem("aesKey")),
        1
      );
      let res = { data: {} };
      res.data = decryptBody(
        encrypted.data.encryptedResponse,
        localStorage.getItem("aesKey")
      );
      if (encrypted.data.statusDescription.statusCode == 200) {
        if (res?.data.statusDescription?.statusCode == 200) {
          setTableStatus({
            pageNo: 0,
            pageSize: res.data.detailHistory.length,
          });
          setData(res.data.detailHistory.reverse());
          setTable(res.data.detailHistory, res.data.detailHistory.length);
        } else {
        }
      }
    } catch (err) {
    } finally {
      dispatch(setLoader(false));
    }
  };
  const setTable = async (data, length) => {
    await setDetailHistory(data);
    await dispatch(setLoader(false));
    await setisData(true);
    await sethideSkeleton(false);
  };
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
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
      <Box sx={{ width: "100%", height: "100%" }}>
        <>
          <div className="card-body h-100 p-0">
            <div className="card shadow-none border bg_blue mt- m-0">
              {/* <span
                className="badge rounded-pill bg-primary margin_top w_50 mt-n3 ms-5 "
                style={{ padding: "15px", fontSize: "large" }}
              >
                {props.heading && <>{props.heading}</>}
              </span> */}
              {hideSkeleton === true ? (
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
                  <div className="card-body box_with ">
                    <div className="d-flex justify-content-between mb-3">
                      <Tooltip title="Refresh">
                        <button
                          type="submit"
                          className="btn bg-gradient-primary w_btn m-0 ms-3 me-3 search_1  "
                        ></button>
                      </Tooltip>
                    </div>
                    <div
                      className="table-responsive"
                      style={{ maxHeight: "318px" }}
                    >
                      <table
                        {...getTableProps()}
                        id="example"
                        className="table table-striped message_table table-bordered dataTable table-sm"
                        style={{ width: "100%" }}
                      >
                        <thead style={{ position: "sticky", top: "0" }}>
                          {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th
                                  style={{ whiteSpace: "nowrap" }}
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
                                  className={
                                    column?.Header === "Message"
                                      ? "text-center width_2 update_th messageWidth text-nowrap"
                                      : column?.Header === "Camp Type"
                                      ? "text-center width_2 update_th_sp d-flex border-start-0 text-nowrap"
                                      : "text-center width_2 update_th_sp text-nowrap "
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
                          {rows.map((row) => {
                            prepareRow(row);
                            return (
                              <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                  return (
                                    <td
                                      style={{ whiteSpace: "nowrap" }}
                                      {...cell.getCellProps()}
                                      className={` ${
                                        cell.column.Header ==
                                          "Old Basic Amount" ||
                                        cell.column.Header == "GST Amount" ||
                                        cell.column.Header == "Total Amount" ||
                                        cell.column.Header == "Unit Price" ||
                                        cell.column.Header == "Quantity"
                                          ? "text-left text-end"
                                          : "text-right update_td"
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
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center m-auto mt-">
                    {data?.length == 0 && open == true ? null : data?.length ==
                        0 && open == undefined ? null : (
                      <div className="text-center">
                        <h5 style={{ fontSize: "0.9rem" }}>
                          No Record Found..!!
                        </h5>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      </Box>
    </>
  );
};
