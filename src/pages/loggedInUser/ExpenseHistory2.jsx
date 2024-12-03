import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import moment from "moment";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import ColumnFilter from "../../Components/ColumnFilter";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import { common_axios } from "../../App";
import { TableDynamic } from "../../Components/Tabledynamic";
import { setexpenseId } from "../../redux/features/expenseIdSlice";
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
export default function ExpenseHistory() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isData, setisData] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
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
  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 10,
  });
  useEffect(() => {
    setHideSkeleton(true);
    getAllAssigned();
  }, [request]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const history = useHistory();
  const viewDetail = (cell) => {
    dispatch(setexpenseId(cell.row.original.id));
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
  const getAllAssigned = async () => {
    let approverId = localStorage.getItem("UserId");
    // setRequest(...{ approverId })
    var res = await common_axios.post(`/expenseenc/history/v2/user`, request);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setisData(true);
      setTotalPages(res.data.totalPages);
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
  return (
    <Box sx={{ width: "100%" }}>
      {isData && (
        <TableDynamic
          columns={columns}
          data={data}
          isData={isData}
          hideSkeleton={hideSkeleton}
        />
      )}
    </Box>
  );
}
