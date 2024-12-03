import { makeStyles } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import Swal from "sweetalert2";
import * as yup from "yup";
import { common_axios } from "../../App";
import ColumnFilter from "../../Components/ColumnFilter";
import { PaymentTerm } from "../../Components/PaymentTerm";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import { setRedirection } from "../../redux/features/expenseIdSlice";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
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
export default function CreatedExpense() {
  const classes = useStyles();
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
  const [viewUploadFiles, setviewUploadFiles] = useState([]);
  const [userState, setUserState] = React.useState([]);
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const modalContact = useRef(null);
  const modalContact1 = useRef(null);
  const modalContactClose = useRef(null);
  const [projectState, setProjectState] = useState([]);
  const [expenseId, setExpenseId] = useState(0);
  const [Pagination, setPagination] = useState(0);
  const [projects, setprojects] = useState([]);
  const [fileNames, setfileNames] = useState("");
  const [hideP, setHideP] = useState(false);
  const [revenue, setRevenue] = useState("");
  const [terms, setTerms] = useState("");
  const [detailView, setDetailView] = useState(false);
  const [state, setState] = useState({});
  const [subIdList, setsubIdList] = useState([]);
  const [option, setOption] = useState(false);
  const [isData1, setisData1] = useState(false);
  const [user, setUser] = useState({});
  const [viewFiles, setviewFiles] = useState([]);
  const [sum, setSum] = useState(0);
  const [update, setUpdate] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [currencyId, setCurrencyId] = useState("INR");
  const [siteId, setSiteId] = useState(0);
  const modalContact2 = useRef(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [initialValues, setInitialValues] = useState({
    expenseTitle: "",
    expenseDate: "",
    projectId: 0,
  });
  const [initialbool, setinitialBool] = useState(false);
  const [title, settitle] = useState("");
  const [approver1, setapprover1] = useState("");
  const [categories, setCategories] = useState([]);
  const [siteIdA, setsiteIdA] = useState(false);
  const [siteIdList, setSiteIdList] = useState([]);
  var expenseIdSelector = useSelector(
    (state) => state.expenseIdSlice.expenseId
  );
  const defaultProps = {
    options: projects,
    getOptionLabel: (option) => option.name,
  };
  const calculateSum = () => {
    let values = [...inputfields];
    let sum = 0;
    values.forEach((data) => {
      sum = sum + Number(data.amount);
    });
    setSum(sum);
  };
  const getSiteIds = async (projectId) => {
    const res = await common_axios.post(`/project/get/siteIds/${projectId}`);
    let { statusDescription } = res.data;
    if (statusDescription.statusCode == 200) {
      res.data.siteIds = res.data.siteIds.sort(function (a, b) {
        if (a.siteId < b.siteId) {
          return -1;
        }
        if (a.siteId > b.siteId) {
          return 1;
        }
        return 0;
      });
      if (res.data.siteIds) {
        setSiteIdList(res.data.siteIds);
      } else {
      }
      setsiteIdA(true);
    } else {
      setsiteIdA(false);
      let projectName = "";
      projects.forEach((data) => {
        if (data.id == projectId) {
          projectName = data.name;
        }
      });
      let arr = [];
      let formdata = {
        id: 0,
        siteId: projectName,
      };
      arr.push(formdata);
      setSiteIdList(arr);
    }
  };
  const getHierarchy = async (projectId) => {
    const res = await common_axios.post(`/projectenc/hierarchy/${projectId}`);
    let { statusDescription } = res.data;
    if (statusDescription.statusCode == 200) {
      let name = res.data.projects[0].name;
      setapprover1(name);
    } else {
      setapprover1("");
    }
    if (projectId != 0) {
      getSiteIds(projectId);
      getCategories(projectId);
    } else {
      setsiteIdA(false);
      let values = inputfields.map((data) => {
        return { ...data, siteId: "" };
      });
      setprojectName("");
      setinputfields(values);
      setCategories([]);
    }
  };
  const getSubIds = async (value, idnex) => {
    const res = await common_axios.post(`/project/sub/categories/${value}`);
    if (res.data.statusDescription.statusCode == 200) {
      setsubIdList(res.data.subCategoriesList);
      const values = [...inputfields];
      values[idnex].subIdList = res.data.subCategoriesList.sort(function (
        a,
        b
      ) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setinputfields(values);
    } else {
      setsubIdList([]);
    }
  };
  const getCategories = async (projectId) => {
    const res = await common_axios.post(`/projectenc/categories/0`);
    let { statusDescription } = res.data;
    projects.forEach((data) => {
      if (data.id == projectId) {
        setprojectName(data.name);
      }
    });
    if (statusDescription.statusCode == 200) {
      let categories = [];
      res.data.categories = res.data.categories.sort(function (a, b) {
        if (a.catTitle < b.catTitle) {
          return -1;
        }
        if (a.catTitle > b.catTitle) {
          return 1;
        }
        return 0;
      });
      if (
        projectId == 1133 ||
        projectId == 1141 ||
        projectId == 1135 ||
        projectId == 1134
      ) {
        let categories = [];
        res.data.categories.forEach((data) => {
          if (data.catTitle == "Tawseel") {
            categories.push(data);
          }
        });
        setCategories(categories);
      } else {
        let categories = [];
        res.data.categories.forEach((data) => {
          if (data.catTitle != "Tawseel") {
            categories.push(data);
          }
        });
        setCategories(categories);
      }
    }
  };
  const removeAttachment = (id) => {
    let length = inputfields.length;
    let values = [...inputfields];
    let arr = values[apiindex].expenseFiles.filter((X) => {
      return X.id != id;
    });
    let expenseAttachments = values[apiindex].expenseAttachments.filter((X) => {
      return X != id;
    });
    values[apiindex].expenseAttachments = expenseAttachments;
    values[apiindex].expenseFiles = arr;
    setinputfields(values);
    setviewFiles(arr);
  };
  const removeAttachments2 = async (name) => {
    let arr = [...files.arr];
    arr.splice(name, 1);
    await setFiles({
      arr: arr,
    });
  };
  const changeAll = (event) => {
    const values = [...inputfields];
    if ((event.target.name = "currencyId")) {
      for (let i = 0; i < values.length; i++) {
        values[i][event.target?.name] = event.target?.value;
      }
      setCurrencyId(event.target?.value);
    }
    setinputfields(values);
  };
  const userSelector = useSelector((state) => state.authSliceandSidebar.user);
  useEffect(() => {
    if (expenseIdSelector != 0) {
    }
  }, [expenseIdSelector]);
  useEffect(async () => {
    if (userSelector) {
      await setUser(userSelector);
    }
  }, [userSelector]);
  const [hierarchyList, sethierarchyList] = useState([]);
  const [inputfields, setinputfields] = useState([
    {
      expenseDate: null,
      expensetitle: "",
      expenseAttachments: [],
      amount: null,
      expenseFiles: [],
      categoryId: null,
      currencyId: "INR",
      subCategoryId: null,
      siteId: "",
      subIdList: [],
    },
  ]);
  const initalValue = {
    language: "",
    templateName: `WHATSAPP_${Math.floor(Math.random() * 10000000000)}`,
    templateType: "",
    languageList: [],
    templateTypeList: [],
    headerContentType: "None",
    headerMediaType: "",
    headerText: "",
    bodyText: ``,
    bodyTextVariable: [],
    bodyTextVariableText: {},
    footerText: "",
    buttons: [],
    showPicker: false,
  };
  const [stateee, setStateee] = React.useState(initalValue);
  const [files, setFiles] = useState({
    arr: [],
  });
  const [data, setData] = useState([]);
  const [data3, setData3] = useState([]);
  const [activities, setactivities] = useState(false);
  const [data1, setData1] = useState([]);
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
        Header: "Activity",
        accessor: "activity",
      },
      {
        Header: "UserId",
        accessor: "userId",
      },
      {
        Header: "Created Date Time",
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
    ],
    [data, TableStatus]
  );
  const [projectId, setprojectId] = useState(0);
  const [projectName, setprojectName] = useState("");
  const [apiindex, setapiindex] = useState(0);
  const [apiindex1, setapiindex1] = useState(0);
  const openModal = async (data, e) => {
    setapiindex(e);
    await modalContact.current.click();
  };
  const openModal2 = async (e) => {
    setapiindex1(e);
    await modalContact1.current.click();
  };
  const openModal3 = async (data, index) => {
    setapiindex(index);
    setviewFiles(data.expenseFiles);
    await modalContact2.current.click();
  };
  const uploadApi = async () => {
    let arr = [];
    let fileArry = [];
    dispatch(setLoader(true));
    files.arr.forEach((data) => {
      const formdata = new FormData();
      formdata.append("file", data);
      setTimeout(async () => {
        var res = await common_axios.post(`/expenseenc/upload/file`, formdata);
        if (res?.data?.statusDescription?.statusCode == 200) {
          let obj = {
            id: res?.data?.expenseAttachments?.id,
            name: data.name,
          };
          await arr.push(res?.data?.expenseAttachments?.id);
          await fileArry.push(obj);
        } else if (res?.data?.statusDescription?.statusCode == 401) {
          Swal.fire({
            icon: "error",
            title: "Session Expired",
            text: res?.data?.statusDescription?.statusMessage,
          });
        } else if (res?.data?.statusDescription?.statusCode == 500) {
          Swal.fire({
            icon: "error",
            title: "Internal server error",
            text: res?.data?.statusDescription?.statusMessage,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: res?.data?.statusDescription?.statusMessage,
          });
        }
      }, 1000);
    });
    setfileNames("");
    setFiles({
      arr: [],
    });
    setTimeout(() => {
      setting(arr, fileArry);
    }, 1500);
  };
  const uploadFile = async (formdata) => {};
  const setting = async (arr, fileArry) => {
    let values = [...inputfields];
    if (values[apiindex]["expenseFiles"]?.length > 0) {
      let myarr = [];
      myarr = values[apiindex]["expenseFiles"];
      fileArry.forEach((data) => {
        myarr.push(data);
      });
      setTimeout(() => {
        values[apiindex]["expenseFiles"] = myarr;
      }, 1000);
    } else {
      values[apiindex]["expenseFiles"] = fileArry;
    }
    if (values[apiindex]["expenseAttachments"].length > 0) {
      let myarr = [];
      myarr = values[apiindex]["expenseAttachments"];
      arr.forEach((data) => {
        myarr.push(data);
      });
      setTimeout(() => {
        values[apiindex]["expenseAttachments"] = myarr;
      }, 1000);
    } else {
      values[apiindex]["expenseAttachments"] = arr;
    }
    await setinputfields(values);
    dispatch(setLoader(false));
    await modalContactClose.current.click();
  };
  const UploadFile = (e) => {
    const file = e.target.files[0];
    let arr = [];
    let fileArray = Array.from(e.target.files);
    let filesName = "";
    let arrr = files.arr?.length > 0 ? [...files.arr] : [];
    for (let index = 0; index < fileArray.length; index++) {
      const element = fileArray[index];
      arrr.push(element);
    }
    arrr.forEach((data) => {
      if (fileNames == "") {
        filesName = filesName + " " + data?.name;
      } else {
        filesName = fileNames;
        filesName = filesName + " " + data?.name;
      }
      setfileNames(filesName);
    });
    arrr.concat(Array.from(e.target.files));
    setFiles({
      arr: arrr,
    });
    setviewUploadFiles(arrr);
    setfileNames(filesName);
  };
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    exactMatch: true,
    messageId: "",
    msidn: "",
    viewMore: true,
    selector1: "",
    startDate: null,
    endDate: null,
    statusCheckbox: null,
    toDestination: "",
    fromDestination: [],
    showMoreFilters: false,
    searchlog: "",
  });
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
  useEffect(() => {
    getUserProjects();
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const getUserProjects = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      const formdata = {
        roleId: user.roleId,
      };
      try {
        let res = await common_axios.post(
          `/projectenc/get`,
          encryptBody(formdata, localStorage.getItem("aesKey"), 1)
        );
        res.data = decryptBody(
          res.data.encryptedResponse,
          localStorage.getItem("aesKey")
        );
        if (res?.data?.statusDescription?.statusCode == 200) {
          setprojects(res.data.projects);
        } else {
        }
      } catch (error) {}
    }
  };
  const history = useHistory();
  const dispatch = useDispatch();
  const [data2, setData2] = useState([]);
  const validationSchema = yup.object({});
  const formik = useFormik({
    initialValues: {
      expenseTitle: "",
      expenseDate: "",
      projectId: 0,
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    validationSchema: yup.object({
      expenseTitle: yup.string().required("expenseTitle is required"),
    }),
    onSubmit: async (values) => {
      if (projectId == 0) {
        Swal.fire({
          icon: "warning",
          title: "Project Required",
          text: "Please Select a  Project",
        });
        return;
      }
      let formdata = {
        projectId: projectId,
        projectName: projectName,
        details: [],
        title: values.expenseTitle,
        description: values.expenseTitle,
        currencyId: inputfields[0].currencyId,
        type: 0,
      };
      projects.forEach((data) => {
        if (data.id == projectId) {
          setprojectName(data.name);
          formdata["projectName"] = data.name;
        }
      });
      let sum = 0;
      inputfields.forEach((data) => {
        let obj = {
          expenseDate: moment(data.expenseDate).format("YYYY-MM-DD"),
          expenseTitle: data.expensetitle,
          totalIncVat: data.amount,
          attachmentIdList: data.expenseAttachments,
          categoryId: data.categoryId,
          currencyId: data.currencyId,
          subCategoryId: data.subCategoryId,
        };
        if (siteIdA) {
          obj["siteId"] = data.siteId;
        } else {
          obj["siteId"] = projectName.substr(0, projectName.lastIndexOf("_"));
        }
        sum = sum + Number(data.amount);
        formdata.details.push(obj);
      });
      const userId = localStorage.getItem("userId");
      formdata["userId"] = userId;
      formdata["expenseAppliedAmount"] = sum;
      dispatch(setLoader(true));
      encryptBody(formdata, localStorage.getItem("aesKey"), 1);
      let res = await common_axios.post(`/expense/add`, formdata);
      if (res?.data?.statusDescription?.statusCode == 200) {
        resetForm();
        setExpenseId(res.data.expenseId);
        detailAdd();
        formik.handleReset();
        dispatch(setRedirection(true));
        dispatch(setLoader(false));
        if (projectId == 250 || projectId == 258) {
          addRevenueData(res.data.expenseId);
        }
        Swal.fire({
          icon: "success",
          title: "Done",
          text: "Expense created successfully ",
        }).then(() => {
          history.push("/expense");
        });
      } else {
        dispatch(setLoader(false));
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.statusDescription.statusMessage,
        });
      }
    },
  });
  const addRevenueData = (expenseId) => {
    let formdata = {
      userId: user.id,
      expenseId: expenseId,
      revenue: revenue,
      terms: terms,
    };
    const res = common_axios.post(
      "/expenseenc/add/revenue",
      encryptBody(formdata, localStorage.getItem("aesKey"), 1)
    );
    if (res.data.statusDescription.statusCode == 200) {
    } else {
    }
  };
  const resetForm1 = () => {
    setprojectName("");
    setinputfields([
      {
        expenseDate: null,
        expensetitle: "",
        expenseAttachments: [],
        amount: null,
        expenseFiles: [],
      },
    ]);
    setfileNames("");
    setFiles({
      arr: [],
    });
  };
  const detailAdd = async () => {
    await setUpdate(true);
  };
  const resetForm = async () => {
    setprojectId(0);
    setprojectName("");
    await setinputfields([
      {
        expenseDate: null,
        expensetitle: "",
        expenseAttachments: [],
        amount: null,
        expenseFiles: [],
        categoryId: null,
        currencyId: "INR",
        siteId: null,
        subCategoryId: null,
        subIdList: [],
      },
    ]);
    setfileNames("");
    setFiles({
      arr: [],
    });
    setSum(0);
  };
  const formik1 = useFormik({
    initialValues: {
      expenseTitle: "",
      expenseDate: "",
    },
    onReset: (initialValues) => (
      {
        values: { initialValues },
      },
      resetForm()
    ),
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });
  const textareaRef = useRef();
  const { globalFilter, pageIndex, pageSize } = state;
  const [globalSearchValue, setGlobalSearchValue] = useState(globalFilter);
  const handleChangeInput = (index, event) => {
    const values = [...inputfields];
    values[index][event.target?.name] = event.target?.value;
    if (event.target.name == "amount") {
    }
    setinputfields(values);
  };
  const expenseDescriptionUpdate = async (event, index, data) => {
    const values = [...inputfields];
    let category = "";
    categories.forEach((data) => {
      if (data.id == event.target?.value) {
        category = data.catTitle;
      }
    });
    values[index]["expensetitle"] = category;
    await setinputfields(values);
  };
  const handleChangeInput3 = (index, data) => {
    const values = [...inputfields];
    values[index]["categoryId"] = data.id;
    setinputfields(values);
  };
  const handleChangeDate = (date, index) => {
    const values = [...inputfields];
    values[index]["expenseDate"] = date;
    setinputfields(values);
  };
  const handleChangeInput5 = (index, date) => {
    const values = [...inputfields];
    values[index]["expenseDate"] = date;
    setinputfields(values);
  };
  const handleAddFields = () => {
    setinputfields([
      ...inputfields,
      {
        expenseDate: null,
        expensetitle: "",
        expenseAttachments: [],
        amount: null,
        expenseFiles: [],
        categoryId: null,
        currencyId: inputfields[0].currencyId,
        siteId: null,
      },
    ]);
  };
  const handleRemoveFields1 = () => {
    if (inputfields.length == 1) {
      return;
    }
    const values = [...inputfields];
    const length = values.length;
    values.pop();
    let sum = 0;
    values.forEach((data) => {
      sum = sum + Number(data.amount);
    });
    setSum(sum);
    setinputfields(values);
  };
  const handleRemoveFields = (index) => {
    if (inputfields.length == 1) {
      return;
    }
    const values = [...inputfields];
    values.splice(index, 1);
    setinputfields(values);
  };
  const Tableinitialize = () => {};
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
              {detailView ? (
                <>
                  <span
                    className="badge  bg-primary mt-1 "
                    style={{
                      padding: "15px",
                      fontSize: "large",
                      borderRadius: "0",
                    }}
                  >
                    {/* Add Number */}
                    Expense Detail
                    {/* <div className='d-flex justify-content-end'>
                                    Download
                                </div> */}
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="badge rounded-pill bg-primary margin_top mt-n3 ms-5 "
                    style={{
                      padding: "15px",
                      fontSize: "large",
                      borderRadius: "0",
                    }}
                  >
                    {/* Add Number */}
                    Create Expense
                    {/* <div className='d-flex justify-content-end'>
                                    Download
                                </div> */}
                  </span>
                </>
              )}
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
                      <div className="my-0 mb-1">
                        <div className="row">
                          <div className="col-md-6">
                            <span>
                              {" "}
                              <b>Raised By :</b> {user && user.name}
                            </span>{" "}
                            &nbsp;{" "}
                            <span>
                              {" "}
                              <b>Total Sum :</b> {sum}{" "}
                              <b className="ml-1 text-success">{currencyId}</b>
                            </span>
                          </div>
                          {approver1 && (
                            <div className="col-md-6 d-flex justify-content-end">
                              <span>
                                {" "}
                                <b>Approver(Level 1) :</b>{" "}
                                {approver1 && <span>{approver1}</span>}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {
                        <div className="col-md-3">
                          {hideSkeleton == true ? (
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
                              <FormControl fullWidth>
                                <Autocomplete
                                  id="controlled-demo"
                                  value={projectState}
                                  size="small"
                                  onChange={(e, newValue) => {
                                    getHierarchy(newValue.id);
                                    setProjectState(newValue);
                                    setprojectId(newValue.id);
                                    if (
                                      projectId == "1133" ||
                                      projectId == "1134" ||
                                      projectId == "1135"
                                    ) {
                                      setHideP(true);
                                    } else {
                                      setHideP(false);
                                    }
                                  }}
                                  options={projects.sort(function (a, b) {
                                    if (a.name < b.name) {
                                      return -1;
                                    }
                                    if (a.name > b.name) {
                                      return 1;
                                    }
                                    return 0;
                                  })}
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select Project"
                                    />
                                  )}
                                />
                                {/* <InputLabel id="demo-simple-select-label">Projects</InputLabel> */}
                                {/* <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={projectId}
                                                                    name="projectId"
                                                                    label="Projects"
                                                                    required
                                                                    isSearchable
                                                                    isClearable
                                                                    onChange={(e) => {
                                                                        
                                                                        getHierarchy(e.target.value)
                                                                        setprojectId(e.target.value)
                                                                        if (projectId == '1133' || projectId == '1134' || projectId == '1135') {
                                                                            setHideP(true)
                                                                        }
                                                                        else {
                                                                            setHideP(false)
                                                                        }
                                                                        
                                                                        
                                                                    }}
                                                                >
                                                                    <MenuItem value={0} >  Select  Projects</MenuItem>
                                                                    {
                                                                        projects?.map((data) => {
                                                                            return <MenuItem key={data.id} value={data.id}> {data.name}</MenuItem>
                                                                        })
                                                                    }
                                                                </Select> */}
                              </FormControl>
                            </>
                          )}
                        </div>
                      }
                      <div className="col-md-5">
                        {/* <TextareaAutosize size="lg" name="Size" placeholder="Large" /> */}
                        <TextField
                          multiline
                          rows={2}
                          required
                          className="w-100"
                          label="Expense Description"
                          name="expenseTitle"
                          variant="outlined"
                          autoComplete="off"
                          placeholder="Enter Expense Description Here"
                          size="small"
                          value={formik.values.expenseTitle}
                          onChange={(e) => {
                            formik.handleChange(e);
                          }}
                          error={
                            formik.touched.expenseTitle &&
                            Boolean(formik.errors.expenseTitle)
                          }
                          helperText={
                            formik.touched.expenseTitle &&
                            formik.errors.expenseTitle
                          }
                        />
                      </div>
                      {(projectId == 250 || projectId == 258) && (
                        <div className="col-md-2">
                          {/* <TextareaAutosize size="lg" name="Size" placeholder="Large" /> */}
                          <TextField
                            required
                            className="w-100"
                            label={`Revenue ${currencyId}`}
                            name="revenue"
                            type="number"
                            variant="outlined"
                            autoComplete="off"
                            placeholder="Enter Revenue"
                            size="small"
                            value={revenue}
                            onChange={(e) => {
                              setRevenue(e.target.value);
                            }}
                          />
                        </div>
                      )}
                      {(projectId == 250 || projectId == 258) && (
                        <div className="col-md-2">
                          {/* <TextareaAutosize size="lg" name="Size" placeholder="Large" /> */}
                          <TextField
                            required
                            className="w-100"
                            label="Payment Terms"
                            name="terms"
                            variant="outlined"
                            autoComplete="off"
                            placeholder="Enter terms"
                            size="small"
                            value={terms}
                            onChange={(e) => {
                              setTerms(e.target.value);
                            }}
                          />
                        </div>
                      )}
                      <div className="">
                        <div className="card p-3">
                          <div className="d-flex align-items-center justify-content-end">
                            <IconButton
                              className="bg-success"
                              title="Add row"
                              style={{
                                background: "#198754",
                                borderRadius: "8px",
                                marginRight: "3px",
                              }}
                              onClick={() => handleAddFields()}
                            >
                              <AddIcon className="text-dar" />
                            </IconButton>
                            <IconButton
                              className={
                                inputfields.length == 1
                                  ? "bg-secondary"
                                  : "bg-danger"
                              }
                              title={
                                inputfields.length == 1
                                  ? "Disabled"
                                  : "Delete Row"
                              }
                              style={{
                                background:
                                  inputfields.length == 1
                                    ? "#808080"
                                    : "#198754",
                                borderRadius: "8px",
                              }}
                              onClick={async () => {
                                await setSum(0);
                                handleRemoveFields1();
                              }}
                              disabled={inputfields.length == 1}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </div>
                          {inputfields?.map((data, index) => {
                            return (
                              <div
                                id="create_expense"
                                className="row mt-3"
                                key={index}
                              >
                                {/* <label>Expense Date</label> */}
                                &nbsp;{" "}
                                <p
                                  style={{ marginBottom: "-10px", zIndex: 999 }}
                                >
                                  Expense Date{" "}
                                  <span className="text-danger form-label">
                                    *
                                  </span>
                                </p>
                                <div className="col-md-2">
                                  <ReactDatePicker
                                    className="form-control w-100"
                                    selected={data.expenseDate}
                                    onChange={(date) => {
                                      handleChangeInput5(index, date);
                                    }}
                                    locale="en-GB"
                                    showWeekNumbers
                                    type="text"
                                    required={true}
                                    placeholder="Enter Date"
                                    value={data.expenseDate}
                                    autoComplete="off"
                                    name="expenseDate"
                                    dateFormat="MMMM d, yyyy"
                                  />
                                </div>
                                {siteIdA && (
                                  <div className="col-md-1">
                                    <FormControl fullWidth required="true">
                                      <InputLabel id="demo-simple-select-label">
                                        Site Id
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data.siteId}
                                        name="siteId"
                                        required
                                        label="Site Id"
                                        onChange={(event) => {
                                          handleChangeInput(index, event);
                                        }}
                                      >
                                        <MenuItem value={""} key={0}>
                                          {" "}
                                          Select
                                        </MenuItem>
                                        {siteIdList.length > 0 &&
                                          siteIdList?.map((d, index) => {
                                            return (
                                              <MenuItem
                                                value={d.siteId}
                                                key={index}
                                              >
                                                {d.siteId}
                                              </MenuItem>
                                            );
                                          })}
                                      </Select>
                                    </FormControl>
                                  </div>
                                )}
                                {!siteIdA && (
                                  <div className="col-md-1">
                                    <TextField
                                      name="siteId"
                                      label="siteId"
                                      variant="outlined"
                                      size="small"
                                      type="text"
                                      className="w-100 "
                                      required
                                      value={projectName.substr(
                                        0,
                                        projectName.lastIndexOf("_")
                                      )}
                                      onChange={(event) => {}}
                                    />
                                  </div>
                                )}
                                <div className="col-md-1">
                                  <FormControl fullWidth required="true">
                                    <InputLabel id="demo-simple-select-label">
                                      Category
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={data.categoryId}
                                      name="categoryId"
                                      required
                                      label="Category"
                                      onChange={(event) => {
                                        handleChangeInput(index, event);
                                        getSubIds(event.target.value, index);
                                      }}
                                    >
                                      <MenuItem value={null}>
                                        {" "}
                                        Categories
                                      </MenuItem>
                                      {categories?.map((d) => {
                                        return (
                                          <MenuItem value={d.id}>
                                            {d.catTitle}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </div>
                                <div className="col-md-2">
                                  <FormControl fullWidth required="true">
                                    <InputLabel id="demo-simple-select-label">
                                      Sub Category
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={data.subCategoryId}
                                      name="subCategoryId"
                                      required
                                      label="Sub CategoryId"
                                      onChange={(event) => {
                                        handleChangeInput(index, event);
                                      }}
                                    >
                                      {data?.subIdList?.map((d) => {
                                        return (
                                          <MenuItem value={d.id}>
                                            {d.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </div>
                                <div className="col-md-2">
                                  <Tooltip
                                    title={
                                      data.expensetitle && (
                                        <h6 style={{ color: "lightblue" }}>
                                          {data.expensetitle}
                                        </h6>
                                      )
                                    }
                                    sx={{ cursor: "pointer" }}
                                    arrow
                                  >
                                    <TextField
                                      name="expensetitle"
                                      label="Vendor Name"
                                      variant="outlined"
                                      size="small"
                                      type="text"
                                      className="w-100 "
                                      required
                                      value={data.expensetitle}
                                      onChange={(event) =>
                                        handleChangeInput(index, event)
                                      }
                                    />
                                  </Tooltip>
                                </div>
                                <div className="col-md-1">
                                  <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                      Currency
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={data.currencyId}
                                      name="currencyId"
                                      label="Currency"
                                      onChange={(event) => {
                                        handleChangeInput(index, event);
                                        changeAll(event);
                                      }}
                                    >
                                      <MenuItem value={"INR"}>INR</MenuItem>
                                      <MenuItem value={"USD"}>USD</MenuItem>
                                      <MenuItem value={"KWD"}>KWD</MenuItem>
                                      <MenuItem value={"SGD"}>SGD</MenuItem>
                                      <MenuItem value={"KES"}>KES</MenuItem>
                                      <MenuItem value={"AED"}>AED</MenuItem>
                                    </Select>
                                  </FormControl>
                                </div>
                                <div className="col-md-2">
                                  <TextField
                                    name="amount"
                                    label="Expense Amount"
                                    variant="outlined"
                                    pattern="[0-9]*"
                                    size="small"
                                    onInput={(e) => {
                                      e.target.value = Math.max(
                                        0,
                                        parseInt(e.target.value)
                                      )
                                        .toString()
                                        .slice(0, 8);
                                    }}
                                    type="number"
                                    className="w-100 "
                                    autoComplete="off"
                                    required
                                    readOnly={detailView}
                                    disabled={detailView}
                                    value={data.amount}
                                    onChange={(event) => {
                                      handleChangeInput(index, event);
                                      calculateSum();
                                    }}
                                  />
                                </div>
                                <div
                                  className="col-md-1"
                                  id="choose_file_label"
                                >
                                  {/* -------------------------New file----------- */}
                                  <div className="container d-flex align-items-center justify-content-end px-0 mt-">
                                    {detailView ? (
                                      <>
                                        <div
                                          style={{
                                            display: "block",
                                            justifyContent: "center",
                                          }}
                                          onClick={(e) => {
                                            openModal2(index);
                                          }}
                                        >
                                          <AttachFileIcon />
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div
                                          className="m-2"
                                          style={{
                                            display: "block",
                                            justifyContent: "center",
                                          }}
                                          onClick={(e) => {
                                            openModal(data, index);
                                          }}
                                        >
                                          {/* <UploadIcon /> */}
                                          <IconButton title="Attach Files">
                                            <AttachFileIcon />
                                          </IconButton>
                                        </div>
                                        <IconButton
                                          className="p-0 m-2"
                                          title="View Attached Files"
                                          onClick={(e) => {
                                            openModal3(data, index);
                                          }}
                                        >
                                          <span
                                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                                            style={{ fontSize: "x-small" }}
                                          >
                                            {data.expenseFiles.length}
                                          </span>
                                          <VisibilityIcon />
                                        </IconButton>
                                      </>
                                    )}
                                  </div>
                                  {/* -------------------------------End new file--------------------------------- */}
                                </div>
                                {/* <div className="col-md-auto" >
                                                                    <IconButton onClick={(e) => {
                                                                        openModal3(data, index)
                                                                    }}>
                                                                        <VisibilityIcon />
                                                                    </IconButton>
                                                                </div> */}
                                {/* {
                                                                    detailView == false ? <>
                                                                        <div className="col-md-1"  >
                                                                            <IconButton onClick={() => handleAddFields()}>
                                                                                <AddIcon />
                                                                            </IconButton>
                                                                            <IconButton onClick={() => handleRemoveFields(index)}>
                                                                                <RemoveIcon />
                                                                            </IconButton>
                                                                        </div></> : <></>
                                                                } */}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {
                        <div className="">
                          {
                            <PaymentTerm
                              type={0}
                              show={false}
                              openDialog={() => {}}
                              clicked={update}
                              closeDialog={() => {
                                history.push("/expense");
                              }}
                              id={expenseId}
                            />
                          }
                        </div>
                      }
                      {detailView == false ? (
                        <>
                          <div className="text-end">
                            <button
                              type="submit"
                              className="btn btn-primary bg-gradient-primary m-0"
                            >
                              Submit
                              {/* <i className="material-icons opacity-10">
                                                        arrow_right_alt
                                                    </i> */}
                            </button>
                            <button
                              style={{ marginLeft: "6px" }}
                              type="button"
                              onClick={(e) => {
                                formik.handleReset();
                                resetForm();
                              }}
                              className="btn bg-secondary m-0 ms-2 text-white"
                            >
                              Reset
                            </button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card shadow-none border bg_blue mt-4">
                          <span
                            className="badge rounded-pill bg-primary margin_top w_50 mt-n3 ms-5 "
                            style={{ padding: "15px", fontSize: "large" }}
                          >
                            Activity Logs
                          </span>
                          <>
                            <div className="text-center mt-4">
                              {data?.length == 0 &&
                              open == true ? null : data?.length == 0 &&
                                open == undefined ? null : (
                                <div className="text-center">
                                  <h5>No Record Found..!!</h5>
                                </div>
                              )}
                            </div>
                          </>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card shadow-none border bg_blue mt-4">
                          <span
                            className="badge rounded-pill bg-primary margin_top w_50 mt-n3 ms-5 "
                            style={{ padding: "15px", fontSize: "large" }}
                          >
                            Notes
                          </span>
                          <>
                            <div className="text-center mt-4">
                              {data?.length == 0 &&
                              open == true ? null : data?.length == 0 &&
                                open == undefined ? null : (
                                <div className="text-center">
                                  <h5>No Record Found..!!</h5>
                                </div>
                              )}
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row" >
                                            <div className="col-md-6">
                                                <Box sx={{ width: '100%' }}>
                                                    {(
                                                        <>
                                                            <div className="card-body">
                                                                <div className="card shadow-none border bg_blue mt-4">
                                                                    <span className="badge  bg-primary mt-n3 " style={{ padding: "15px", fontSize: "large" }}>
                                                                        Activity Logs
                                                                    </span>
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
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </Box>
                                            </div>
                                            <div className="col-md-6">
                                                <Box sx={{ width: '100%' }}>
                                                    {(
                                                        <>
                                                            <div className="card-body">
                                                                <div className="card shadow-none border bg_blue mt-4">
                                                                    <span className="badge  bg-primary mt-n3 " style={{ padding: "15px", fontSize: "large" }}>
                                                                        Notes
                                                                    </span>
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
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </Box>
                                            </div>
                                        </div> */}
                  </div>
                </>
              )}
            </div>
          </div>
        </Box>
        {}
      </ThemeProvider>
      <button
        type="button"
        ref={modalContact}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Upload Attachments
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <form>
                  <div className="container px-0 mt-">
                    <p>
                      Supported format:doc(x) , pdf , xls(x) , jpeg , png , zip
                      {/* <span className="text-warning"> Max. size 20MB</span> */}
                    </p>
                    <hr />
                    <div>
                      {/* {viewFiles?.length == 0 && <p> No files Found</p>} */}
                      <ul>
                        {files.arr.length != 0 &&
                          files.arr?.map((data, index) => {
                            return (
                              <>
                                <div className="row">
                                  <div className="col-md-auto">
                                    <li> {data.name}</li>
                                  </div>{" "}
                                  <div className="col-md-auto">
                                    <span
                                      className="text text-danger"
                                      onClick={(e) => {
                                        removeAttachments2(index);
                                      }}
                                    >
                                      {" "}
                                      <CloseIcon style={{ color: "red" }} />
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </ul>
                    </div>
                    <div>
                      <Button
                        className="position-relative"
                        variant="contained"
                        component="label"
                        style={{
                          backgroundColor: "white",
                          boxShadow: "none",
                          height: "40px",
                          border: "1px solid #d2d6da",
                          padding: "0px 0px 0px 0px",
                        }}
                      >
                        <input
                          className="w-100 p-0 form-control form-control-lg"
                          multiple
                          style={{
                            opacity: "0",
                            height: "35px",
                          }}
                          accept=".png,.jpg,.jpeg,.pdf,.docx,.xlsx ,.zip,.csv,.doc,.rar"
                          onChange={(e) => {
                            UploadFile(e);
                          }}
                          id="formFileLg"
                          type="file"
                        />
                        <div
                          className="p-2"
                          style={{
                            position: "absolute",
                            left: "0",
                            right: "0",
                            top: "0",
                            bottom: "0",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <button
                            style={{
                              lineHeight: "normal",
                              borderRadius: "0",
                              background: "#efefef",
                              border: "1px solid #000",
                              display: "block",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              flex: "0 0 auto",
                            }}
                            className="btn py-0 px-1 text-dark m-0"
                            type="button"
                            onClick={() =>
                              document.getElementById("formFileLg")?.click()
                            }
                          >
                            {files?.arr?.length == 0 && <>Choose Files </>}
                            {files?.arr?.length != 0 && <>Choose More Files </>}
                          </button>
                        </div>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={modalContactClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => {
                  uploadApi();
                }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        ref={modalContact2}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#view-modal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="view-modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                View Attachments
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <form>
                  <div className="container px-0 mt-">
                    <div>
                      {viewFiles?.length == 0 && <p> No files Found</p>}
                      <ul>
                        {viewFiles &&
                          viewFiles?.map((data) => {
                            return (
                              <>
                                <div className="row">
                                  <div className="col-md-auto">
                                    <li> {data.name}</li>
                                  </div>{" "}
                                  <div className="col-md-auto">
                                    <span
                                      className="text text-danger"
                                      onClick={(e) => {
                                        removeAttachment(data.id);
                                      }}
                                    >
                                      {" "}
                                      <CloseIcon style={{ color: "red" }} />
                                    </span>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        id="action-click"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#actionModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="actionModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="action-close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <p>Query</p>
                </div>
                <div className="col-md-6"></div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <p>Trends</p>
                </div>
                <div className="col-md-6"></div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
