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
export const NotesTable = (props) => {
  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 10,
  });
  const [hideSkeleton, sethideSkeleton] = useState(false);
  const [isData, setisData] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationPage, setPaginationPage] = React.useState(0);
  const [open, setopen] = useState(false);
  useEffect(() => {
    getNotes();
  }, [props]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const getNotes = () => {
    if (props.data.length > 0) {
      setisData(true);
      setData(props.data);
      sethideSkeleton(false);
    } else {
      sethideSkeleton(false);
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "Notes Description",
        accessor: "noteDesc", // accessor is the "key" in the data
      },
      {
        Header: "Date Time",
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
    ],
    [data, TableStatus]
  );
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
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
      <Box sx={{ width: "100%", height: "100%" }}>
        <>
          <div className="card-body h-100 p-0">
            <div className="card shadow-none border bg_blue mt- m-0">
              <span
                className="badge rounded-pill bg-primary margin_top w_50 mt-n3 ms-5 "
                style={{ padding: "15px", fontSize: "large" }}
              >
                {props.heading && <>{props.heading}</>}
              </span>
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
                  </Box>
                </>
              ) : isData ? (
                <>
                  <div className="card-body box_withd ">
                    <div className="d-flex justify-content-between mb-3">
                      <Tooltip title="Refresh">
                        <button
                          type="submit"
                          className="btn bg-gradient-primary w_btn m-0 ms-3 me-3 search_1  "
                        ></button>
                      </Tooltip>
                    </div>
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
                                    column?.Header === "Message"
                                      ? "text-center width_2 update_th messageWidth"
                                      : column?.Header === "Camp Type"
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
                                      // className="text-start"
                                      className={"text-left update_td "}
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
