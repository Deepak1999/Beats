import DoDisturbIcon from "@mui/icons-material/DoDisturb";
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
  TextField,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import HistoryIcon from "@mui/icons-material/History";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DoneIcon from "@mui/icons-material/Done";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as yup from "yup";
// import AccessLevel from "./AccessLevel";
import { createTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import UploadIcon from "@mui/icons-material/Upload";
import Swal from "sweetalert2";
import "./main.css";
// import "./../../assets/css1/expensedetail.css";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import "../../assets/css1/expensedetail.css";
import { common_axios } from "../../App";
// import { toast } from "react-toastify";
import moment from "moment";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
// import ColumnFilter from "../../Reacttable/UserManagement/ReactTableFiles/ColumnFilter";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ReactDatePicker from "react-datepicker";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import ColumnFilter from "../../Components/ColumnFilter";
import { NotesTable } from "../../Components/NotesTable";
import { PaymentTerm } from "../../Components/PaymentTerm";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import { setQueryId, setexpenseId } from "../../redux/features/expenseIdSlice";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
const useStyles = makeStyles((theme) => ({
  input: {
    "& .MuiInputBase-inputMultiline": {
      paddingBottom: "30px",
      position: "relative", // Adjust the padding for the InputAdornment
    },
    "& .MuiInputAdornment-positionEnd": {
      position: "absolute",
      bottom: "0",
      right: "0",
    },
  },
}));
export default function ExpenseDetailFile() {
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
  const [tableShow, setTableShow] = useState(false);
  const [defaultHitApi, setDefaultHitApi] = useState(false);
  const [defaultHitPartialSearch, setDefaultHitPartialSearch] = useState(false);
  const [MoreFilters, setMoreFilters] = useState(false);
  const [hideSkeleton1, setHideSkeleton1] = useState();
  const [MenuItemChange, setMenuItemChange] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [accountcountryid, setAccountCountryId] = useState("");
  const [accountidvalue, setAccountIdValue] = useState([]);
  const [userState, setUserState] = React.useState([]);
  const [text, setText] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const modalContact4Close = useRef(null);
  const [deleteArray, setDeleteArray] = useState([]);
  const [queryUserId, setqueryUserId] = useState(0);
  const [options, setOptions] = useState([
    "Chocolate",
    "Chocolate",
    "Chocolate",
    "Chocolate",
  ]);
  // { value: 'chocolate', label: 'Chocolate' },
  // { value: 'strawberry', label: 'Strawberry' },
  // { value: 'vanilla', label: 'Vanilla' }
  const [qId, setqId] = useState(0);
  const [reply, setReply] = useState(false);
  const modalRef5 = useRef(null);
  const history = useHistory();
  const [rejctIndex, setrejctIndex] = useState(0);
  const [rejectArray, setRejectArray] = useState([]);
  const [showApprove, setShowApprove] = useState(false);
  const [totalSum, setTotalSum] = useState(0);
  const [queryName, setqueryName] = useState("");
  const [update, setUpdate] = useState(false);
  const [getData, setgetData] = useState(false);
  const [newType, setNewType] = useState(0);
  const [deleteNote, setDeleteNote] = useState("");
  const [actionType, setActionType] = useState(0);
  const [attachArray, setAttachArray] = useState([]);
  const [deleteId, setDeleteId] = useState(0);
  const [value, setValue] = useState("");
  const modalContact = useRef(null);
  const modalContact1 = useRef(null);
  const modalContactClose = useRef(null);
  const [expenseId, setExpenseId] = useState(0);
  const [Pagination, setPagination] = useState(0);
  const [projects, setprojects] = useState([]);
  const [fileNames, setfileNames] = useState("");
  const [detailView, setDetailView] = useState(false);
  const [state, setState] = useState({});
  const [isData, setisData] = useState(false);
  const [isData1, setisData1] = useState(false);
  const [expense, setExpense] = useState({});
  const [dummyArray, setDummyArray] = useState([]);
  const [subExpenseId, setsubExpenseId] = useState(0);
  const deleteModalRef = useRef(null);
  const deleteModalRefClose = useRef(null);
  const [currencyId, setCurrencyId] = useState("");
  const [hideQuery, setHideQuery] = useState(false);
  const [detailHistory, setDetailHistory] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [errorBool, seterrorBool] = useState(false);
  const dispatch = useDispatch();
  const [note, setNote] = useState("");
  const [type, setType] = useState(0);
  const params = useParams();
  const [pendingQuery, setPendingQuery] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [initialValues, setInitialValues] = useState({
    // templateType: "",
    expenseTitle: "",
    expenseDate: "",
    projectId: 0,
  });
  const [initialbool, setinitialBool] = useState(false);
  const [title, settitle] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    setExpenseId(params.id);
  }, [params.id]);
  var userSelector = useSelector((state) => state.authSliceandSidebar.user);
  const openModal4 = async (e) => {
    const values = [...inputfields];
    let arr = [];
    let dumArray = [];
    values[e].expenseAttachments.forEach((Data) => {
      if (Data.name != null || Data.name != undefined) {
        dumArray.push(Data.name);
      }
      if (Data.fileName != null || Data.fileName != undefined) {
        dumArray.push(Data.fileName);
      }
      // dumArray.push(Data.id)
    });
    await setDummyArray(dumArray);
    values[e].expenseAttachments.forEach((Data) => {
      arr.push(Data);
    });
    setFiles({ arr: arr });
    formik2.setFieldValue("newAmount", values[e].amount);
    formik2.setFieldValue("oldAmount", values[e].amount);
    setsubExpenseId(values[e].id);
    await modalContactRef4.current.click();
  };
  const handleDialog = () => {
    openModal3(4);
  };
  const closeDialog = async () => {
    setUpdate(false);
    getExpenseDetail(expenseId);
    await approveRejectCloseRef.current.click();
  };
  const removeAttachments2 = async (name) => {
    let arr = [...files.arr];
    arr.splice(name, 1);
    await setFiles({
      arr: arr,
    });
  };
  const handleDownload = (data) => {
    // Replace 'file-url-here' with the actual URL of the file you want to download
    const fileUrl = data.url;
    // Create an anchor element to trigger the download
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.target = "_blank";
    anchor.download = data.savedName; // Specify the file name for download
    anchor.click();
  };
  const modalContact3 = useRef(null);
  const approveRejectCloseRef = useRef(null);
  const modalContactRef4 = useRef(null);
  useEffect(() => {
    return () => {
      if (localStorage.getItem("expenseId")) {
        dispatch(setexpenseId(localStorage.getItem("expenseId")));
      }
    };
  });
  const settingRejectStatus = async () => {
    const values = [...inputfields];
    values[rejctIndex]["rejectstatus"] = true;
    await setinputfields(values);
    let arr = [...rejectArray];
    arr.push("el");
    await setRejectArray(arr);
    if (rejectArray.length == inputfields.length) {
      await setShowApprove(true);
    }
  };
  const setUnRejectStatus = async (index) => {
    const values = [...inputfields];
    values[index]["rejectstatus"] = false;
    await setinputfields(values);
    let arr = [...rejectArray];
    arr.pop();
    setRejectArray(arr);
    await setShowApprove(false);
  };
  const deleteSubExpense = async (index, id, type) => {
    await setDeleteId(id);
    await setrejctIndex(index);
    await setActionType(type);
    await setNewType(1);
    await deleteModalRef.current.click();
  };
  const getCategories = async (projectId, categoryId) => {
    const res = await common_axios.post(`/projectenc/categories/${projectId}`);
    let { statusDescription } = res.data;
    if (statusDescription.statusCode == 200) {
      setCategories(res.data.categories);
      res.data.categories.forEach((data) => {
        if (data.id == categoryId) {
          setCategoryName(data.catTitle);
        }
      });
    } else {
    }
  };
  const deleteExpense = async (id) => {
    try {
      let formdata = {
        notes: deleteNote,
      };
      const encrypted = await common_axios.post(
        `/expenseenc/detail/delete/${id}`,
        encryptBody(formdata, localStorage.getItem("aesKey"), 1)
      );
      let res = {
        data: {},
      };
      if (encrypted.data.statusDescription.statusCode == 200) {
        res.data = decryptBody(
          encrypted.data.encryptedResponse,
          localStorage.getItem("aesKey")
        );
        if (res) {
          if (res?.data?.statusDescription?.statusCode == 200) {
          } else {
            Swal.fire({
              icon: "error",
              title: res.data.statusDescription.statusMessage,
            });
          }
        }
      }
    } catch (errr) {}
  };
  var expenseIdSelector = useSelector(
    (state) => state.expenseIdSlice.expenseId
  );
  const qIdSlice = useSelector((state) => state.expenseIdSlice.queryId);
  useEffect(() => {
    if (qIdSlice != 0) {
      setqId(qIdSlice);
    }
  }, [qIdSlice]);
  const tabIndexSel = useSelector((state) => state.expenseIdSlice.tabIndex);
  useEffect(async () => {
    // if (tabIndexSel != -1) {
    //     await document.getElementById(`simple-tab-${tabIndexSel}`).click();
    // }
  }, [tabIndexSel]);
  const openModal = async (e) => {
    setapiindex(e);
    await modalContact.current.click();
  };
  const openModal2 = async (e) => {
    await setAttachmentKList([]);
    await setapiindex1(e);
    await modalContact1.current.click();
    await setAttachmentKList(expenseDetails[e].attachmentList);
  };
  const getHistory = async (e, id) => {
    try {
      modalRef5.current.click();
      dispatch(setLoader(true));
      let formdata = {
        expenseId: id,
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
          setDetailHistory(res.data.detailHistory);
          dispatch(setLoader(false));
        }
      }
    } catch (err) {
    } finally {
      dispatch(setLoader(false));
    }
  };
  const openModal3 = async (type) => {
    await modalContact3.current.click();
    setType(type);
    if (type == 5) {
      let arr = [];
      const values = [...inputfields];
      expenseDetails.forEach((exp) => {
        exp.attachmentList?.forEach((data) => {
          arr.push(data);
        });
      });
      await setAttachmentKList(arr);
    }
  };
  const deleteAttachments = (id) => {
    let arr = [];
    let attachList = [...attachmentKList];
    attachList = attachList.filter((x) => {
      return x.id != id;
    });
    if (deleteArray.length > 0) {
      arr = [...deleteArray];
      arr.push(id);
    } else {
      arr.push(id);
    }
    setDeleteArray(arr);
    setAttachmentKList(attachList);
  };
  const getqueryData = async (expenseId) => {
    let formdata = {
      expenseId: expenseId,
    };
    let ecnrypted = await common_axios.post(
      `/expenseenc/queries/check2`,
      encryptBody(formdata, localStorage.getItem("aesKey"))
    );
    let res = {
      data: {},
    };
    res.data = decryptBody(
      ecnrypted.data.encryptedResponse,
      localStorage.getItem("aesKey")
    );
    if (res?.data?.statusDescription?.statusCode == 200) {
      setPendingQuery(true);
    } else {
      setPendingQuery(false);
    }
  };
  useEffect(() => {
    if (expenseIdSelector != 0) {
      setExpenseId(expenseIdSelector);
      setDetailView(true);
      getExpenseDetail(expenseIdSelector);
    }
  }, [expenseIdSelector]);
  const getExpenseDetail = async (expenseId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    dispatch(setLoader(true));
    let formdata = {
      id: expenseId,
    };
    let encrypted = await common_axios.post(
      `/expenseenc/details`,
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
        setprojectId(res.data.expenseDetails.expense.projectId);
        const expense = res.data.expenseDetails.expense;
        settitle(res.data.expenseDetails.expense.title);
        await setStartDate(new Date(expense.created));
        await setInitialValues({
          expenseTitle: expense.description,
          expenseDate: "",
          projectId: expense.projectId,
        });
        replyExpenseCheck(expense.id);
        getCategories(expense.projectId, expense.categoryId);
        getqueryData(expenseId);
        setCurrencyId(expense.currencyId);
        await setExpense(res.data.expenseDetails.expense);
        let arr = [];
        let sum = 0;
        if (res.data.expenseDetails.expenseDetailsList != null) {
          setExpenseDetails(res.data.expenseDetails.expenseDetailsList);
          res.data.expenseDetails?.expenseDetailsList?.forEach((data) => {
            let formdata = {
              expenseDate: new Date(data.expenseDate),
              expensetitle: data.expenseTitle,
              expenseAttachments: [],
              amount: Number(data.totalIncVat),
              id: data.id,
              status: data.status,
              rejectstatus: false,
              currencyId: data.currencyId,
              categoryId: data.categoryId,
            };
            data.attachmentList?.forEach((el) => {
              formdata.expenseAttachments.push(el);
            });
            if (data.status != 2) {
              sum = sum + Number(data.totalIncVat);
            }
            arr.push(formdata);
          });
          setTotalSum(sum);
          setinputfields(arr);
        }
        if (expense.userId == user.id && expense.saveStatus == 1) {
          setDetailView(false);
        }
        let indexObj = 0;
        if (res.data?.expenseDetails?.hierarchyList != null) {
          res.data.expenseDetails.hierarchyList.forEach((data, index) => {
            if (
              data.isModify == 1 &&
              expense.approverId == user.id &&
              data.userId == user.id
            ) {
              setShowEdit(true);
            }
            if (expense.approverId == user.id && data.userId == user.id) {
              if (data.userHierarchy == 1) {
                setHideQuery(true);
              }
            }
          });
          let userIndex = null;
          res.data.expenseDetails.hierarchyList.forEach((data, index) => {
            if (user.id == expense.approverId) {
              userIndex = index - 2;
            }
            if (expense.approverId == user.id && data.userId == user.id) {
              if (index != 0) {
                indexObj = index - 1;
                setqueryName(
                  res.data.expenseDetails.hierarchyList[indexObj].userName
                );
              }
            }
          });
          sethierarchyList(res.data.expenseDetails.hierarchyList);
          let arr = [];
          let inhierarchy = false;
          res.data.expenseDetails.hierarchyList.forEach((hi, index) => {
            let formdata = {
              userId: hi.userId,
              userName: hi.userName,
            };
            if (userIndex > index && hi.userId != user.id) {
              arr.push(formdata);
            }
          });
          let formdata = {
            userId: expense.userId,
            userName: expense.generatorName,
          };
          arr.push(formdata);
          let newArray = removeDuplicates(arr);
          setqhierarchyList(arr);
        }
        if (res.data?.expenseDetails?.activities != null) {
          setData(res.data.expenseDetails.activities);
          setactivities(true);
          setisData(true);
        }
        if (res?.data.expenseDetails?.notes != null) {
          setisData1(true);
          setData3(res.data.expenseDetails.notes);
        } else {
          setisData1(true);
        }
        // getButtons()
        setinitialBool(true);
        dispatch(setLoader(false));
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: res?.data?.statusDescription?.statusMessage,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        dispatch(setLoader(false));
      }
    } else {
      dispatch(setLoader(false));
      Swal.fire({
        icon: "error",
        title: "Descryption Failed",
        text: res?.data?.statusDescription?.statusMessage,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  };
  const removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };
  const [hierarchyList, sethierarchyList] = useState([]);
  const [qhierarchyList, setqhierarchyList] = useState([]);
  const [inputfields, setinputfields] = useState([]);
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
        Header: "Activity",
        accessor: "activity",
        Cell: (cell) => {
          return (
            <>
              {expense.type == 0 && cell.row.original.activity}
              {expense.type == 1 &&
                cell.row.original.activity
                  .replace("Expense", "Purchase")
                  .replace("expense", "purchase")}
            </>
          );
        },
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
                .format("DD-MM-YYYY, h:mm a")}
            </>
          );
        }, // accessor is the "key" in the data
      },
    ],
    [data, TableStatus]
  );
  const columns1 = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Activity",
        accessor: "activity",
        Cell: (cell) => {
          return (
            <>
              {expense.type == 0 && cell.row.original.activity}
              {expense.type == 1 && "Purchase"}
            </>
          );
        },
      },
      {
        Header: "UserId",
        accessor: "userId", // accessor is the "key" in the data
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
        }, // accessor is the "key" in the data
      },
    ],
    [data, TableStatus]
  );
  const [projectId, setprojectId] = useState(0);
  const [projectName, setprojectName] = useState("");
  const [expenseDetails, setExpenseDetails] = useState([]);
  const [apiindex, setapiindex] = useState(0);
  const [attachmentKList, setAttachmentKList] = useState([]);
  const [apiindex1, setapiindex1] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const approveExpense = async () => {
    const formdata = {
      id: expenseId,
      note: note,
      projectId: expense.projectId,
    };
    let encrypted = await common_axios.post(
      `/expenseenc/approve`,
      encryptBody(formdata, localStorage.getItem("aesKey"))
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
        await approveRejectCloseRef?.current?.click();
        document.getElementById("update-close").click();
        if (showSubmit) {
          Swal.fire({
            icon: "success",
            title: "Submitted Successfully",
          }).then(() => {
            historyRedirect();
          });
        } else {
          Swal.fire({
            icon: "success",
            title: res?.data?.statusDescription?.statusMessage,
          }).then(() => {
            setTimeout(() => {
              historyRedirect();
            }, 1000);
          });
        }
        setShowButton(false);
        getExpenseDetail(expenseId);
      } else {
        Swal.fire({
          icon: "error",
          title: res?.data?.statusDescription?.statusMessage,
          text: res?.data?.statusDescription?.statusMessage,
        });
        await approveRejectCloseRef?.current?.click();
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Decryption Failed",
        text: res?.data?.statusDescription?.statusMessage,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
  };
  const deleteExpenseInput = async () => {
    const values = [...inputfields];
    values.forEach((data) => {
      if (data.rejectstatus) {
        deleteExpense(data.id);
      }
    });
    setTimeout(() => {
      afterDeletion();
    }, 4000);
  };
  const afterDeletion = () => {
    setDeleteNote("");
    setRejectArray([]);
    setDeleteConfirm(false);
    setShowApprove(false);
  };
  const rejectExpense = async () => {
    if (note == "") {
      Swal.fire({
        icon: "error",
        title: "Note is required",
        text: "Note is required",
      });
      return;
    }
    const formdata = {
      id: expenseId,
      note: note,
      projectId: expense.projectId,
    };
    const encrypted = await common_axios.post(
      `/expenseenc/reject`,
      encryptBody(formdata, localStorage.getItem("aesKey")),
      1
    );
    let res = { data: {} };
    res.data = decryptBody(
      encrypted.data.encryptedResponse,
      localStorage.getItem("aesKey")
    );
    if (encrypted.data.statusDescription.statusCode == 200) {
      // const res = await common_axios.post(`/expenseenc/reject`, formdata)
      if (res?.data?.statusDescription?.statusCode == 200) {
        await approveRejectCloseRef?.current?.click();
        getExpenseDetail(expenseId);
        setShowButton(false);
        document.getElementById("update-close").click();
        Swal.fire({
          icon: "success",
          title: res?.data?.statusDescription?.statusMessage,
          text: res?.data?.statusDescription?.statusMessage,
        }).then(() => {
          setTimeout(() => {
            historyRedirect();
          }, 1000);
        });
      } else {
        await approveRejectCloseRef?.current?.click();
        Swal.fire({
          icon: "error",
          title: res?.data?.statusDescription?.statusMessage,
          text: res?.data?.statusDescription?.statusMessage,
        });
      }
    }
  };
  const replyExpense = async () => {
    let nameArray = [];
    let arr = [];
    dispatch(setLoader(true));
    const expDetail = [...expenseDetails];
    await setsubExpenseId(expDetail[0].id);
    files.arr.forEach((data) => {
      const formdata = new FormData();
      formdata.append("file", data);
      formdata.append("expenseId", expenseId);
      formdata.append("subExpenseId", expDetail[0].id);
      if (data.name != null || data.name != undefined) {
        nameArray.push(data.name);
        setTimeout(async () => {
          const res = await common_axios.post(
            `/expenseenc/upload/file`,
            formdata
          );
          if (res?.data?.statusDescription?.statusCode == 200) {
            await arr.push(res?.data?.expenseAttachments?.id);
            // await nameArray.push(data.name)
          } else if (res?.data?.statusDescription?.statusCode == 401) {
            Swal.fire({
              icon: "error",
              title: "Session Expired",
              text: res?.data?.statusDescription?.statusMessage,
              // footer: '<a href="">Why do I have this issue?</a>'
            });
          } else if (res?.data?.statusDescription?.statusCode == 500) {
            Swal.fire({
              icon: "error",
              title: "Internal server error",
              text: res?.data?.statusDescription?.statusMessage,
              // footer: '<a href="">Why do I have this issue?</a>'
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Something went wrong",
              text: res?.data?.statusDescription?.statusMessage,
              // footer: '<a href="">Why do I have this issue?</a>'
            });
          }
        }, 0);
      } else {
        // arr.push(data.id)
      }
    });
    setTimeout(() => {
      replyApi(nameArray);
    }, 4000);
  };
  const replyApi = async (nameArray) => {
    let formdata = {
      expenseId: expenseId,
      userId: user.id,
      query: note,
      queryId: qId,
    };
    formdata["attachedList"] = nameArray;
    if (deleteArray.length > 0) {
      formdata["deleteList"] = deleteArray;
    }
    const encrypted = await common_axios.post(
      `/expenseenc/query/reply`,
      encryptBody(formdata, localStorage.getItem("aesKey")),
      1
    );
    let res = { data: {} };
    res.data = decryptBody(
      encrypted.data.encryptedResponse,
      localStorage.getItem("aesKey")
    );
    if (encrypted.data.statusDescription.statusCode == 200) {
      // const res = await common_axios.post(`/expenseenc/query/reply`, formdata)
      if (res?.data?.statusDescription?.statusCode == 200) {
        getExpenseDetail(expenseId);
        Swal.fire({
          icon: "success",
          text: "Replied Successfully",
        });
        setUpdate(true);
        dispatch(setQueryId(0));
        dispatch(setLoader(false));
        document.getElementById("update-close").click();
        approveRejectCloseRef.current.click();
      } else {
        Swal.fire({
          icon: "error",
          text: "Something Went Wrong",
        });
      }
    }
  };
  const replyExpenseCheck = async (expId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    let formdata = {
      expenseId: expId,
      userId: user.id,
      query: note,
    };
    const encrypted = await common_axios.post(
      `/expenseenc/query/check`,
      encryptBody(formdata, localStorage.getItem("aesKey"))
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
        dispatch(setQueryId(res.data.queryExpense[0].id));
        setReply(true);
      } else {
        setReply(false);
      }
    }
  };
  const queryExpense = async () => {
    if (note == "") {
      Swal.fire({
        icon: "error",
        title: "Note is required",
        text: "Note is required",
      });
      return;
    }
    const formdata = {
      expenseId: expenseId,
      query: note,
      userId: queryUserId,
    };
    const encrypted = await common_axios.post(
      `/expenseenc/query`,
      encryptBody(formdata, localStorage.getItem("aesKey"))
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
        await approveRejectCloseRef?.current?.click();
        getExpenseDetail(expenseId);
        setShowButton(false);
        afterDeletion();
        document.getElementById("update-close").click();
        Swal.fire({
          icon: "success",
          title: "Query Raised",
        }).then(() => {
          setTimeout(() => {
            historyRedirect();
          }, 1000);
        });
      } else {
        await approveRejectCloseRef?.current?.click();
        Swal.fire({
          icon: "error",
          title: res?.data?.statusDescription?.statusMessage,
          text: res?.data?.statusDescription?.statusMessage,
        });
      }
    }
  };
  const uploadApi = async () => {
    let arr = [];
    dispatch(setLoader(true));
    const getDumyy = [...dummyArray];
    files.arr.forEach((data) => {
      const formdata = new FormData();
      formdata.append("file", data);
      setTimeout(async () => {
        const res = await common_axios.post(
          `/expenseenc/upload/file`,
          formdata
        );
        if (res?.data?.statusDescription?.statusCode == 200) {
          await arr.push(res?.data?.expenseAttachments?.id);
        } else if (res?.data?.statusDescription?.statusCode == 401) {
          Swal.fire({
            icon: "error",
            title: "Session Expired",
            text: res?.data?.statusDescription?.statusMessage,
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        } else if (res?.data?.statusDescription?.statusCode == 500) {
          Swal.fire({
            icon: "error",
            title: "Internal server error",
            text: res?.data?.statusDescription?.statusMessage,
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: res?.data?.statusDescription?.statusMessage,
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        }
      }, 1000);
    });
    setfileNames("");
    setFiles({
      arr: [],
    });
    const values = [...inputfields];
    values[apiindex]["expenseAttachments"] = arr;
    setinputfields(values);
    await modalContactClose.current.click();
    dispatch(setLoader(false));
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
    setfileNames(filesName);
  };
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
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
  // ....................................Sender Id GetApi............................................................//
  // .........................Partial Search API....................................................................//
  // ...............................................................................................//
  // useEffect(() => {
  //   GetSenderIddetails();
  // }, []);
  // .........................................Export Data.......................................................//
  // ............................................................................................//
  useEffect(() => {
    getUserProjects();
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const getUserProjects = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    if (user != null) {
      const formdata = {
        roleId: user.roleId,
      };
      try {
        let encrypted = await common_axios.post(
          `/projectenc/get`,
          encryptBody(formdata, localStorage.getItem("aesKey"))
        );
        let res = {
          data: {},
        };
        res.data = decryptBody(
          encrypted.data.encryptedResponse,
          localStorage.getItem("aesKey")
        );
        if (res?.data?.statusDescription?.statusCode == 200) {
          setprojects(res.data.projects);
        } else {
        }
      } catch (error) {}
    }
  };
  const [data2, setData2] = useState([]);
  const validationSchema = yup.object({
    // templateType: yup.string().required("templateType is required!"),
    // selectValue: yup.string().required("selectValue is required!"),
    // selectLang: yup.string().required("selectLang is required!"),
    // dltId: yup
    //   .string("Enter your DLT PE Id")
    //   .min(3, "DLT PE Id should be of minimum 3 characters length")
    //   .max(20, "DLT PE Id should be of maximum 20 characters length"),
  });
  const formik2 = useFormik({
    initialValues: {
      newAmount: "",
      oldAmount: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      let formdata = {
        newAmount: values.newAmount,
        attachmentList: attachArray,
        subExpenseId: subExpenseId,
        expenseId: expenseId,
        oldAmount: values.oldAmount,
      };
      const encrypted = await common_axios.post(
        `/expenseenc/modify`,
        encryptBody(formdata, localStorage.getItem("aesKey")),
        1
      );
      let res = { data: {} };
      res.data = decryptBody(
        encrypted.data.encryptedResponse,
        localStorage.getItem("aesKey")
      );
      if (encrypted.data.statusDescription.statusCode == 200) {
        if (res?.data?.statusDescription?.statusCode == 200) {
          dispatch(setLoader(false));
          formik.handleReset();
          getExpenseDetail(expenseId);
          setAttachArray([]);
          await modalContact4Close.current.click();
          setShowSubmit(true);
          Swal.fire({
            icon: "success",
            title: res?.data?.statusDescription?.statusMessage,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: res?.data?.statusDescription?.statusMessage,
          });
        }
      }
    },
  });
  const uploadArray = async () => {
    dispatch(setLoader(true));
    let arr = [];
    if (attachArray.length > 0) {
      arr = [...attachArray];
    }
    // dispatch(setLoader(true))
    files.arr.forEach((data) => {
      const formdata = new FormData();
      formdata.append("file", data);
      if (data.name != null || data.name != undefined) {
        setTimeout(async () => {
          var res = await common_axios.post(
            `/expenseenc/upload/file`,
            formdata
          );
          if (res?.data?.statusDescription?.statusCode == 200) {
            await arr.push(res?.data?.expenseAttachments?.id);
            if (arr.length == files.arr.length) {
              setTimeout(() => {
                formik2.handleSubmit();
              }, 1000);
            }
          } else if (res?.data?.statusDescription?.statusCode == 401) {
            Swal.fire({
              icon: "error",
              title: "Session Expired",
              text: res?.data?.statusDescription?.statusMessage,
              // footer: '<a href="">Why do I have this issue?</a>'
            });
          } else if (res?.data?.statusDescription?.statusCode == 500) {
            Swal.fire({
              icon: "error",
              title: "Internal server error",
              text: res?.data?.statusDescription?.statusMessage,
              // footer: '<a href="">Why do I have this issue?</a>'
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Something went wrong",
              text: res?.data?.statusDescription?.statusMessage,
              // footer: '<a href="">Why do I have this issue?</a>'
            });
          }
        }, 0);
      } else {
        arr.push(data.id);
      }
    });
    setfileNames("");
    setFiles({
      arr: [],
    });
    await setAttachArray(arr);
  };
  const formik = useFormik({
    initialValues,
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (projectId == 0) {
        Swal.fire({
          icon: "warning",
          title: "Project required",
          text: "Please select a project",
        });
        return;
      }
      let formdata = {
        projectId: projectId,
        projectName: projectName,
        details: [],
        title: values.expenseTitle,
        description: values.expenseTitle,
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
        };
        sum = sum + Number(data.amount);
        formdata.details.push(obj);
      });
      const userId = localStorage.getItem("userId");
      formdata["userId"] = userId;
      formdata["expenseAppliedAmount"] = sum;
      const res = await common_axios.post(`/expenseenc/add`, formdata);
      if (res?.data?.statusDescription?.statusCode == 200) {
        resetForm();
        formik.handleReset();
        Swal.fire({
          icon: "success",
          title: "Created successfully",
          text: "Expense created successfully ",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.statusDescription.statusMessage,
        });
      }
    },
  });
  const resetForm = () => {
    setprojectId(0);
    setprojectName("");
    setinputfields([
      {
        expenseDate: new Date(),
        expensetitle: "",
        expenseAttachments: [],
        amount: 0,
        id: 0,
      },
    ]);
    setfileNames("");
    setFiles({
      arr: [],
    });
  };
  // ....................................KeywordCheckApi......................................................//
  const formik1 = useFormik({
    initialValues: {
      // templateType: "",
      expenseTitle: "",
      expenseDate: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });
  const redirectExpense = () => {
    if (tabIndexSel == -1) {
      history.push("/search");
    } else {
      history.push("/expense");
    }
  };
  const handleChangeInput = (index, event) => {
    const values = [...inputfields];
    values[index][event.target?.name] = event.target?.value;
    setinputfields(values);
  };
  const handleChangeDate = (date, index) => {
    const values = [...inputfields];
    values[index]["expenseDate"] = date;
    setinputfields(values);
  };
  const historyRedirect = () => {
    localStorage.removeItem("expenseId");
    history.push("/expense");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleClick = (e) => {
    e.preventDefault();
  };
  const handleAddFields = () => {
    setinputfields([
      ...inputfields,
      {
        expenseDate: new Date(),
        expensetitle: "",
        expenseAttachments: [],
        amount: 0,
      },
    ]);
  };
  const handleRemoveFields = (index) => {
    if (inputfields.length == 1) {
      return;
    }
    const values = [...inputfields];
    values.splice(index, 1);
    setinputfields(values);
  };
  const handleRemoveFields1 = () => {
    if (inputfields.length == 1) {
      return;
    }
    const values = [...inputfields];
    const length = values.length;
    values.pop();
    setinputfields(values);
  };
  const Tableinitialize = () => {};
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
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
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            alignContent: "center",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px !important",
          }}
        >
          {/* <div role="presentation" onClick={handleClick}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/expense"
                            >
                                Expense
                            </Link>
                            <Typography color="text.primary">Breadcrumbs</Typography>
                        </Breadcrumbs>
                    </div> */}
          <div className="card-body">
            <div role="presentation" onClick={(e) => {}}>
              <Breadcrumbs aria-label="breadcrumb" className="ml-5">
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={(e) => {
                    e.preventDefault();
                    redirectExpense();
                  }}
                >
                  &#x2190; Back
                </Link>
              </Breadcrumbs>
            </div>
            <div
              className="card shadow-none border bg_blue m-4"
              style={{ marginTop: "20px !important" }}
            >
              {detailView ? (
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
                    {expense && expense.type == 0
                      ? "Expense Detail"
                      : "Purchase Detail"}
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
                    Edit Expense
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
                    <form className="row  g-3 needs-validation" noValidate>
                      <div>
                        <div className="row ">
                          {expense && (
                            <div className="col-md-auto">
                              <p style={{ fontSize: "small", margin: "0" }}>
                                {expense && expense.type == 0 ? (
                                  <b>Expense Id </b>
                                ) : (
                                  <b>Purchase Id </b>
                                )}
                                {expense && (
                                  <span
                                    style={{ fontSize: "small", margin: "0" }}
                                  >
                                    {" "}
                                    {expense.id}
                                  </span>
                                )}
                              </p>
                            </div>
                          )}
                          <div className="col-md-auto">
                            {expense && (
                              <p style={{ fontSize: "small", margin: "0" }}>
                                {" "}
                                <b>Raised By</b>{" "}
                                <span>{expense.generatorName} </span>
                              </p>
                            )}
                          </div>
                          {expense && (
                            <>
                              <div className="col-md-auto">
                                <p style={{ fontSize: "small", margin: "0" }}>
                                  {" "}
                                  <b> Current status</b>
                                  <span>
                                    {expense.status == 0 && (
                                      <span
                                        className="text text-warning"
                                        style={{ fontSize: "small" }}
                                      >
                                        {" "}
                                        Pending{" "}
                                      </span>
                                    )}
                                    {expense.status == 1 && (
                                      <span
                                        className="text text-danger"
                                        style={{ fontSize: "medium" }}
                                      >
                                        {" "}
                                        Rejected{" "}
                                      </span>
                                    )}
                                    {expense.status == 2 && (
                                      <span
                                        className="text text-success"
                                        style={{ fontSize: "medium" }}
                                      >
                                        {" "}
                                        Approved{" "}
                                      </span>
                                    )}
                                  </span>
                                </p>
                              </div>
                              <div className="col-md-auto">
                                <p style={{ fontSize: "small", margin: "0" }}>
                                  <b>Project Name </b>
                                  {expense && (
                                    <span
                                      style={{ fontSize: "small", margin: "0" }}
                                    >
                                      {" "}
                                      {expense.projectName}
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className="col-md-auto">
                                <p style={{ fontSize: "small", margin: "0" }}>
                                  <b>Total Amount </b>
                                  {expense && (
                                    <span
                                      style={{ fontSize: "small", margin: "0" }}
                                    >
                                      {" "}
                                      {totalSum} &nbsp;{" "}
                                      <b className="text-success">
                                        {currencyId}{" "}
                                      </b>{" "}
                                    </span>
                                  )}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                        <div
                          className="p-2 mb-1 mt-2"
                          id="hierarchy"
                          style={{ background: "none", padding: "0px" }}
                        >
                          <div className="position-relative">
                            <div
                              className="position-absolute"
                              style={{
                                top: "23px",
                                left: "0",
                                right: "0",
                                height: "2px",
                                background: "blue",
                              }}
                            ></div>
                            <div
                              className="scrollbar py-2"
                              style={{ overflow: "auto" }}
                            >
                              <div
                                className="d-flex align-items-center text-center"
                                style={{
                                  display: "flex",
                                  whiteSpace: "nowrap",
                                  maxWidth: "fit-content",
                                  width: "100%",
                                  margin: "0 auto",
                                }}
                              >
                                {hierarchyList?.map((data, index) => (
                                  <div className="d-block mx-3" key={index}>
                                    <div
                                      className={
                                        data.status == 0 &&
                                        expense &&
                                        data.userId == expense.approverId &&
                                        expense.saveStatus == 2
                                          ? "myClass position-relative coor_black"
                                          : "myClass position-relative "
                                      }
                                    >
                                      {data.status == 1 && (
                                        <p className="text text-danger">
                                          <CloseIcon style={{ color: "red" }} />{" "}
                                        </p>
                                      )}
                                      {data.status == 0 &&
                                        expense &&
                                        data.userId == expense.approverId &&
                                        expense.saveStatus == 2 && (
                                          <PanoramaFishEyeIcon
                                            style={{ color: "yellow" }}
                                          />
                                        )}
                                      {data.status == 2 && (
                                        <p className="text text-success">
                                          <DoneIcon
                                            style={{ color: "green" }}
                                          />{" "}
                                        </p>
                                      )}
                                      {data.status == 3 && (
                                        <p className="text text-info">
                                          <DoDisturbIcon
                                            style={{ color: "orange" }}
                                          />{" "}
                                        </p>
                                      )}
                                    </div>
                                    <div className="para1">
                                      {/* {expense && (data.userId == expense.approverId) && expense.saveStatus == 2 && <b style={{ fontSize: "smaller", color: '#000' }}> Pending at</b>} */}
                                      <p
                                        style={{
                                          fontSize: "smaller",
                                          color: "#000",
                                        }}
                                      >
                                        {data.userName}
                                      </p>
                                      {data.status == 0 &&
                                        expense &&
                                        data.userId == expense.approverId &&
                                        expense.saveStatus == 2}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-auto">
                        <ReactDatePicker
                          label="From"
                          className="form-control w-100"
                          selected={startDate}
                          locale="en-GB"
                          showWeekNumbers
                          dateFormat="MMMM d, yyyy"
                          disabled={true}
                        />
                      </div>
                      {initialbool && (
                        <div className="col-md-4">
                          <TextField
                            required
                            multiline
                            rows={2}
                            className="w-100"
                            label={
                              expense && expense.type == "0"
                                ? "Expense Description"
                                : "Purchase Description"
                            }
                            name="expenseTitle"
                            variant="outlined"
                            size="small"
                            type="text"
                            onInput={(e) => {}}
                            value={expense.title}
                            onChange={(event) => {}}
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
                      )}
                      <div className="">
                        <div className="card p-3">
                          {detailView == false && (
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
                                onClick={() => handleRemoveFields1()}
                                disabled={inputfields.length == 1}
                              >
                                <RemoveIcon />
                              </IconButton>
                            </div>
                          )}
                          {inputfields.length != 0 &&
                            inputfields?.map((data, index) => {
                              return (
                                <div
                                  id="expense_details"
                                  className={
                                    data.status == 2
                                      ? "row mt-3   reject_border"
                                      : "row mt-3 "
                                  }
                                  key={index}
                                >
                                  {/* <label>Expense Date</label> */}
                                  <div className="col-md-auto">
                                    <ReactDatePicker
                                      className="form-control w-100"
                                      selected={data.expenseDate}
                                      onChange={(date) =>
                                        handleChangeDate(date, index)
                                      }
                                      locale="en-GB"
                                      showWeekNumbers
                                      type="text"
                                      readOnly={detailView}
                                      disabled={detailView}
                                      value={data.expenseDate}
                                      required
                                      name="expenseDate"
                                      dateFormat="MMMM d, yyyy"
                                    />
                                  </div>
                                  <div className="col-md-2">
                                    <TextField
                                      name="expenseTitle"
                                      label={
                                        expense && expense.type == 0
                                          ? "Sub Expense Description"
                                          : "Purchase Sub Description"
                                      }
                                      variant="outlined"
                                      size="small"
                                      type="text"
                                      className="w-100 "
                                      required
                                      value={data.expensetitle}
                                      onChange={(event) => {}}
                                    />
                                  </div>
                                  <div className="col-md-1">
                                    {/* <TextField
                                                                            name="currency"
                                                                            label="Currency"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            type="text"
                                                                            className="w-100 "
                                                                            required
                                                                            value="INR"
                                                                        /> */}
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">
                                        Currency
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data.currencyId}
                                        name="currencyId"
                                        disabled={true}
                                        label="Currency"
                                        // onChange={(event) => handleChangeInput(index, event)}
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
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">
                                        Category
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data.categoryId}
                                        name="categoryId"
                                        disabled={true}
                                        label="Category"
                                        onChange={(event) => {
                                          handleChangeInput(index, event);
                                          // changeAll(event)
                                        }}
                                      >
                                        <MenuItem value={"0"}>Other</MenuItem>
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
                                    <TextField
                                      name="amount"
                                      label={
                                        expense && expense.type == 0
                                          ? "Expense Amount"
                                          : "Amount"
                                      }
                                      variant="outlined"
                                      size="small"
                                      type="number"
                                      className="w-100 "
                                      required
                                      readOnly={detailView}
                                      disabled={detailView}
                                      value={data.amount}
                                      onChange={(event) =>
                                        handleChangeInput(index, event)
                                      }
                                    />
                                    {expense && expense.type == 1 && (
                                      <p style={{ fontSize: "x-small" }}>
                                        Taxes and duties are extra as applicable{" "}
                                      </p>
                                    )}
                                  </div>
                                  <div
                                    className="col-md-auto "
                                    id="choose_file_label"
                                  >
                                    {/* -------------------------New file----------- */}
                                    <div className="container px-0 mt-">
                                      {detailView ? (
                                        <>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            <IconButton
                                              size="large"
                                              edge="start"
                                              color="inherit"
                                              title="View Attached Files"
                                              aria-label="menu"
                                              className={
                                                "btn btn-primary position-relative"
                                              }
                                              sx={{ mr: 2 }}
                                              onClick={(e) => {
                                                openModal2(index);
                                              }}
                                            >
                                              <span
                                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                                                style={{ fontSize: "x-small" }}
                                              >
                                                {data.expenseAttachments.length}
                                              </span>
                                              <AttachFileIcon />
                                            </IconButton>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                            onClick={(e) => {
                                              openModal(index);
                                            }}
                                          >
                                            <AttachFileIcon />
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    {/* -------------------------------End new file--------------------------------- */}
                                  </div>
                                  {data.status != 2 &&
                                    user &&
                                    user.id == expense.approverId &&
                                    expense &&
                                    expense?.saveStatus == 2 &&
                                    showEdit && (
                                      <div className="col-md-auto">
                                        <IconButton
                                          title="Modify Expense"
                                          onClick={(e) => {
                                            openModal4(index);
                                          }}
                                        >
                                          <ModeEditIcon />
                                        </IconButton>
                                      </div>
                                    )}
                                  {expense.type == 1 && (
                                    <div className="col-md-auto">
                                      <IconButton
                                        title="View History"
                                        onClick={(e) => {
                                          getHistory(e, data.id);
                                        }}
                                      >
                                        <HistoryIcon />
                                      </IconButton>
                                    </div>
                                  )}
                                  {data.status != 2 &&
                                    showButton &&
                                    user &&
                                    user.id == expense.approverId &&
                                    expense &&
                                    expense.saveStatus == 2 && (
                                      <>
                                        {data.rejectstatus ? (
                                          <div className="col-md-auto">
                                            <IconButton
                                              className="text text-danger"
                                              title="Delete Sub Expense"
                                              onClick={(e) => {
                                                deleteSubExpense(
                                                  index,
                                                  data.id,
                                                  1
                                                );
                                                // setUnRejectStatus(index)
                                              }}
                                            >
                                              <HighlightOffIcon
                                                style={{ color: "red" }}
                                              />
                                            </IconButton>
                                          </div>
                                        ) : (
                                          <div className="col-md-auto">
                                            <IconButton
                                              title="Delete Sub Expense"
                                              onClick={(e) => {
                                                deleteSubExpense(
                                                  index,
                                                  data.id,
                                                  0
                                                );
                                              }}
                                            >
                                              <HighlightOffIcon />
                                            </IconButton>
                                          </div>
                                        )}
                                      </>
                                    )}
                                </div>
                              );
                            })}
                          {inputfields.length == 0 && (
                            <h5 className="text-center">
                              {" "}
                              No Sub Expense Found{" "}
                            </h5>
                          )}
                          {expense.isFinalApproved != 1 &&
                          showButton &&
                          user &&
                          user.id == expense.approverId &&
                          expense &&
                          expense.saveStatus == 2 ? (
                            <div
                              className="buttons"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "1rem",
                              }}
                            >
                              {showSubmit &&
                                inputfields.length != 0 &&
                                inputfields.length != rejectArray.length && (
                                  <button
                                    className=" btn btn-success "
                                    type="button"
                                    style={{ marginRight: "8px" }}
                                    onClick={(e) => {
                                      openModal3(1);
                                    }}
                                  >
                                    Submit
                                  </button>
                                )}
                              {inputfields.length != rejectArray.length &&
                                !showSubmit && (
                                  <button
                                    className=" btn btn-success "
                                    type="button"
                                    style={{ marginRight: "8px" }}
                                    onClick={(e) => {
                                      if (pendingQuery) {
                                        Swal.fire({
                                          icon: "warning",
                                          title: "Pending Query",
                                          text: "There is a query raised  by you which is still unanswered .So this  expense cannot be approved",
                                        });
                                        return;
                                      }
                                      openModal3(1);
                                    }}
                                  >
                                    Approve
                                  </button>
                                )}
                              <button
                                className=" btn btn-danger"
                                style={{ marginRight: "8px" }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (pendingQuery) {
                                    Swal.fire({
                                      icon: "warning",
                                      title: "Pending Query",
                                      text: "There is a query raised  by you which is still unanswered .So this  expense cannot be rejected",
                                    });
                                    return;
                                  }
                                  openModal3(2);
                                }}
                              >
                                Reject
                              </button>
                              {
                                <button
                                  className=" btn btn-primary"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // if (hideQuery) {
                                    //     Swal.fire({
                                    //         icon: "warning",
                                    //         text: "This facility is not available for Level 1 approver"
                                    //     })
                                    //     return
                                    // }
                                    openModal3(3);
                                  }}
                                >
                                  Query
                                </button>
                              }
                            </div>
                          ) : (
                            <></>
                          )}
                          {reply && qId != 0 && (
                            <div
                              className="buttons"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "1rem",
                              }}
                            >
                              <button
                                className=" btn btn-primary"
                                onClick={async (e) => {
                                  await setapiindex1(0);
                                  e.preventDefault();
                                  // await setapiindex1(index);
                                  openModal3(5);
                                }}
                              >
                                Reply
                              </button>
                            </div>
                          )}
                          {false && (
                            <div
                              className="buttons"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "1rem",
                              }}
                            >
                              {
                                <button
                                  className=" btn btn-success "
                                  type="button"
                                  style={{ marginRight: "8px" }}
                                  onClick={(e) => {
                                    openModal3(4);
                                  }}
                                >
                                  Resubmit
                                </button>
                              }
                            </div>
                          )}
                        </div>
                      </div>
                      {expense.type == 1 && (
                        <div className="">
                          {expense && expense.type == 1 && (
                            <PaymentTerm
                              type={1}
                              show={false}
                              openDialog={handleDialog}
                              clicked={update}
                              closeDialog={async () => {
                                closeDialog();
                                // await approveRejectCloseRef?.current?.click()
                              }}
                              id={expenseId}
                              getData={true}
                            />
                          )}
                        </div>
                      )}
                      {expense.type == 0 && (
                        <div className="">
                          {
                            <PaymentTerm
                              type={0}
                              show={false}
                              disabled={!reply}
                              openDialog={() => {}}
                              clicked={update}
                              closeDialog={() => {
                                getExpenseDetail(expenseId);
                              }}
                              id={expenseId}
                              getData={true}
                            />
                          }
                        </div>
                      )}
                      {false ? (
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
                    <div className="row mt-3" id="active_logs">
                      <div className="col-md-6">
                        <div className="card shadow-none border bg_blue mt- m-0">
                          <span
                            className="badge rounded-pill bg-primary margin_top w_50 mt-n3 ms-5 "
                            style={{ padding: "15px", fontSize: "large" }}
                          >
                            Activity Logs
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
                              <div className="card-body box_withd">
                                <div className="d-flex justify-content-between mb-3">
                                  <Tooltip title="Refresh">
                                    <button
                                      type="submit"
                                      className="btn bg-gradient-primary w_btn m-0 ms-3 me-3 search_1  "
                                      // onClick={() => RefreshBtn("Text to Copy")}
                                    >
                                      {/* <i className="material-icons opacity-10">refresh</i> */}
                                      {/* <RefreshIcon /> */}
                                    </button>
                                  </Tooltip>
                                </div>
                                <div></div>
                                <div className="table-responsive">
                                  <table
                                    {...getTableProps()}
                                    id="example"
                                    className="table table-striped message_table table-bordered dataTable table-sm"
                                    style={{ width: "100%" }}
                                  >
                                    <thead>
                                      {headerGroups?.map((headerGroup) => (
                                        <tr
                                          {...headerGroup?.getHeaderGroupProps()}
                                        >
                                          {headerGroup?.headers.map(
                                            (column) => (
                                              <th
                                                {...column.getHeaderProps(
                                                  column.getSortByToggleProps()
                                                )}
                                                className={
                                                  column?.Header == "Message"
                                                    ? "text-center width_2 update_th messageWidth"
                                                    : column?.Header ==
                                                      "Camp Type"
                                                    ? "text-center width_2 update_th_sp d-flex border-start-0"
                                                    : "text-center width_2 update_th_sp "
                                                }
                                              >
                                                {column?.render("Header")}
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
                                                  // className="text-start"
                                                  className={
                                                    "text-left update_td "
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
                                {/* 
                                                                                <div className="d-flex justify-content-between mt-3">
                                                                                    <div>
                                                                                        <span>
                                                                                            Page:
                                                                                            <strong>
                                                                                                {0 + 1} of {""}
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
                                                                                                totalPage = totalPage - 1
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
                                                                                </div> */}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-center m-auto mt-">
                                {data?.length == 0 &&
                                open == true ? null : data?.length == 0 &&
                                  open == undefined ? null : (
                                  <div className="text-center">
                                    <h5>No Record Found..!!</h5>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        {isData1 && <NotesTable data={data3} heading="Notes" />}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Box>
        {false && (
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
            <div className="card-body">
              <div className="card shadow-none border bg_blue mt-4 ">
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
                      {false && (
                        <>
                          <div className="row">
                            <div className="col-md-12">
                              <Box sx={{ width: "100%" }}>
                                {
                                  <>
                                    <div className="card-body">
                                      <div className="card shadow-none border bg_blue mt-4">
                                        <span
                                          className="badge  bg-primary mt-n3 "
                                          style={{
                                            padding: "15px",
                                            fontSize: "large",
                                          }}
                                        >
                                          Activity Logs
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
                                              <div className="d-flex justify-content-between mb-3">
                                                <select
                                                  value={TableStatus.pageSize}
                                                  className="dropdown"
                                                  onChange={(e) => {
                                                    // setPageSize(Number(e.target.value));
                                                    setTableStatus({
                                                      ...TableStatus,
                                                      pageSize: e.target.value,
                                                      pageNo: 0,
                                                    });
                                                    // setPaginationPage(1);
                                                    // setrunningStateFun(false);
                                                  }}
                                                >
                                                  {[10, 25, 50].map(
                                                    (value, i) => {
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
                                                    }
                                                  )}
                                                </select>
                                                <Tooltip title="Refresh">
                                                  <button
                                                    type="submit"
                                                    className="btn bg-gradient-primary w_btn m-0 ms-3 me-3 search_1  "
                                                    // onClick={() => RefreshBtn("Text to Copy")}
                                                  >
                                                    {/* <i className="material-icons opacity-10">refresh</i> */}
                                                    {/* <RefreshIcon /> */}
                                                  </button>
                                                </Tooltip>
                                              </div>
                                              <div></div>
                                              <div className="table-responsive">
                                                <table
                                                  {...getTableProps()}
                                                  id="example"
                                                  className="table table-striped message_table table-bordered dataTable table-sm"
                                                  style={{ width: "100%" }}
                                                >
                                                  <thead>
                                                    {headerGroups?.map(
                                                      (headerGroup) => (
                                                        <tr
                                                          {...headerGroup?.getHeaderGroupProps()}
                                                        >
                                                          {headerGroup?.headers.map(
                                                            (column) => (
                                                              <th
                                                                {...column.getHeaderProps(
                                                                  column.getSortByToggleProps()
                                                                )}
                                                                className={
                                                                  column?.Header ==
                                                                  "Message"
                                                                    ? "text-center width_2 update_th messageWidth"
                                                                    : column?.Header ==
                                                                      "Camp Type"
                                                                    ? "text-center width_2 update_th_sp d-flex border-start-0"
                                                                    : "text-center width_2 update_th_sp "
                                                                }
                                                              >
                                                                {column?.render(
                                                                  "Header"
                                                                )}
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
                                                                          .split(
                                                                            " "
                                                                          )
                                                                          .map(
                                                                            (
                                                                              arg
                                                                            ) => {
                                                                              return (
                                                                                <>
                                                                                  {
                                                                                    arg
                                                                                  }
                                                                                  <br />
                                                                                </>
                                                                              );
                                                                            }
                                                                          )}
                                                                        id="toolTipId"
                                                                        placement="top"
                                                                        arrow
                                                                        sx={{
                                                                          color:
                                                                            "white",
                                                                        }}
                                                                      >
                                                                        <InfoIcon />
                                                                      </Tooltip>
                                                                    </InputAdornment>
                                                                  </>
                                                                ) : (
                                                                  <></>
                                                                )}
                                                              </th>
                                                            )
                                                          )}
                                                        </tr>
                                                      )
                                                    )}
                                                  </thead>
                                                  <tbody
                                                    {...getTableBodyProps()}
                                                    id="svg_tbody"
                                                  >
                                                    {page.map((row) => {
                                                      prepareRow(row);
                                                      return (
                                                        <tr
                                                          {...row.getRowProps()}
                                                        >
                                                          {row.cells.map(
                                                            (cell) => {
                                                              return (
                                                                <td
                                                                  {...cell.getCellProps()}
                                                                  // className="text-start"
                                                                  className={
                                                                    "text-left update_td "
                                                                  }
                                                                >
                                                                  {cell.render(
                                                                    "Cell"
                                                                  )}
                                                                </td>
                                                              );
                                                            }
                                                          )}
                                                        </tr>
                                                      );
                                                    })}
                                                  </tbody>
                                                </table>
                                              </div>
                                              {/* 
                                                                                <div className="d-flex justify-content-between mt-3">
                                                                                    <div>
                                                                                        <span>
                                                                                            Page:
                                                                                            <strong>
                                                                                                {0 + 1} of {""}
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
                                                                                                totalPage = totalPage - 1
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
                                                                                </div> */}
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <div className="text-center mt-4">
                                              {data?.length == 0 &&
                                              open ==
                                                true ? null : data?.length ==
                                                  0 &&
                                                open == undefined ? null : (
                                                <div className="text-center">
                                                  <h5>No Record Found..!!</h5>
                                                </div>
                                              )}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </>
                                }
                              </Box>
                            </div>
                          </div>
                        </>
                      )}
                      {false && (
                        <>
                          <div className="row">
                            <div className="col-md-12">
                              {isData1 && (
                                <NotesTable data={data3} heading="Notes" />
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Box>
        )}
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
                          // margin:
                          //   "0px -3px 0px 0px",
                        }}
                      >
                        <input
                          className="w-100 p-0 form-control form-control-lg"
                          multiple
                          style={{
                            // display: "none",
                            opacity: "0",
                            height: "35px",
                          }}
                          accept=".png,.jpg,.jpeg,.pdf,.docx,.xlsx ,.zip,.csv,.doc,.xls "
                          //   value={state}
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
        ref={modalContact1}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                File Attachments
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setAttachmentKList([]);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <form>
                  <div className="container px-0 mt-">
                    <div>
                      {/* {fileNames != "" ? fileNames : "No files Available"} */}
                      {!attachmentKList && <h6>No Files Available</h6>}
                      {attachmentKList && attachmentKList.length > 0 && (
                        <ol>
                          {attachmentKList?.map((el) => {
                            return (
                              <a
                                onClick={() => {
                                  handleDownload(el);
                                }}
                              >
                                {" "}
                                <li
                                  style={{ color: "blue", cursor: "pointer" }}
                                >
                                  {" "}
                                  {el.savedName}
                                </li>{" "}
                              </a>
                            );
                          })}
                        </ol>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button type="button" ref={modalContact3} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Approval Confirmation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  ></button>
                        </div>
                        <div className="modal-body">
                            <div >
                                <form>
                                    <div className="container px-0 mt-">
                                        <div >
                                            Are you sure you want to Approve the Expense ?
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
      <button
        type="button"
        ref={modalContact3}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal3"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel3"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {type == 1 && (
                <h5 className="modal-title" id="exampleModalLabel">
                  {showSubmit ? (
                    <span>Modify Confirmation </span>
                  ) : (
                    <span> Approval Confirmation </span>
                  )}
                </h5>
              )}
              {type == 2 && (
                <h5 className="modal-title" id="exampleModalLabel">
                  Reject Confirmation
                </h5>
              )}
              {type == 3 && (
                <h5 className="modal-title" id="exampleModalLabel">
                  Query Confirmation
                </h5>
              )}
              {type == 4 && (
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Confirmation
                </h5>
              )}
              {type == 5 && (
                <h5 className="modal-title" id="exampleModalLabel">
                  Reply Query
                </h5>
              )}
              <button
                type="button"
                className="btn-close"
                id="update-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={approveRejectCloseRef}
                onClick={() => {
                  setNote("");
                  setqueryUserId(0);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="container px-0 mt-">
                  {type == 1 && (
                    <div className="row">
                      <div className="col-md-12">
                        {showSubmit ? (
                          <p>
                            Are you sure you want to submit this modified
                            {expense && expense.type == 0 ? (
                              <span> expense ?</span>
                            ) : (
                              <span> request ?</span>
                            )}
                          </p>
                        ) : (
                          <p>
                            Are you sure you want to approve the{" "}
                            {expense && expense.type == 0 ? (
                              <span>expense ?</span>
                            ) : (
                              <span>request ?</span>
                            )}{" "}
                          </p>
                        )}
                      </div>
                      <div className="col-md-12">
                        <TextField
                          name="z"
                          label="Note"
                          variant="outlined"
                          size="small"
                          type="text"
                          className="w-100 "
                          required
                          value={note}
                          onChange={(event) => {
                            setNote(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {(type == 2 || type == 3) && (
                    <div className="row">
                      {type == 3 && (
                        <div className="col-md-12">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              {" "}
                              UserId
                            </InputLabel>
                            <Select
                              id="demo-simple-select"
                              name="categoryId"
                              value={queryUserId}
                              placeholder="Select UserId"
                              label="UserId"
                              onChange={(event) => {
                                // handleChangeInput(index, event)
                                setqueryUserId(event.target.value);
                                // changeAll(event)
                              }}
                            >
                              {qhierarchyList?.map((d) => {
                                return (
                                  <MenuItem value={d.userId}>
                                    {d.userName}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </div>
                      )}
                      <div className="col-md-12  mt-3">
                        {type == 2 && (
                          <p>
                            {" "}
                            Request once rejected cannot be resubmitted again
                            .In case you want any changes to be done by
                            initiator in this request please use query option
                          </p>
                        )}
                        <TextField
                          name="z"
                          label={type == 2 ? "Note" : "Query"}
                          variant="outlined"
                          size="small"
                          type="text"
                          className="w-100 "
                          required
                          value={note}
                          onChange={(event) => {
                            setNote(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {type == 4 && (
                    <div className="row">
                      <div className="col-md-12 ">
                        <p>Are you sure you want to Submit ? </p>
                      </div>
                    </div>
                  )}
                  {type == 5 && (
                    <div className="row">
                      <div className="col-md-12">
                        <TextField
                          name="z"
                          label="Reply"
                          variant="outlined"
                          size="small"
                          type="text"
                          className="w-100 "
                          required
                          value={note}
                          onChange={(event) => {
                            setNote(event.target.value);
                          }}
                        />
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          {/* ondragover="handleDragOver(event)"
                                        ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)" */}
                          <div
                            className="file-upload-container mt-3 border-0 p-0"
                            onClick={() => {
                              document.getElementById("formFileLg")?.click();
                            }}
                          >
                            <label
                              for="fileInput"
                              className="p-0 d-flex"
                              style={{
                                height: "185px",
                                fontSize: "31px",
                                border: "2px dashed #ccc",
                              }}
                            >
                              <div className="d-flex align-items-center p-3 m-auto">
                                <UploadIcon style={{ color: "black" }} />
                                <div
                                  className="ms-2 file_text"
                                  style={{
                                    fontSize: "20px",
                                    whiteSpace: "normal",
                                  }}
                                >
                                  <span style={{ color: "blue" }}>
                                    Upload file
                                  </span>
                                </div>
                              </div>
                            </label>
                            <input
                              className="file-input w-100 p-0 form-control form-control-lg"
                              multiple
                              style={{
                                // display: "none",
                                opacity: "0",
                                height: "35px",
                              }}
                              accept=".png,.jpg,.jpeg,.pdf,.docx,.xlsx ,.zip,.csv,.doc,.rar"
                              //   value={state}
                              onChange={(e) => {
                                UploadFile(e);
                              }}
                              id="formFileLg"
                              type="file"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="mt-2">
                            {files?.arr?.length > 0 && (
                              <ul>
                                {files?.arr?.map((el, index) => {
                                  return (
                                    <>
                                      <li>
                                        {" "}
                                        {el.name ? el.name : el.fileName}{" "}
                                        <span className="text text-danger">
                                          {" "}
                                          <IconButton
                                            onClick={(e) => {
                                              let filesArray = [...files.arr];
                                              filesArray.splice(index, 1);
                                              setFiles({
                                                arr: filesArray,
                                              });
                                            }}
                                          >
                                            <CloseIcon
                                              style={{ color: "red" }}
                                            />
                                          </IconButton>{" "}
                                        </span>
                                      </li>
                                    </>
                                  );
                                })}
                              </ul>
                            )}
                            {files.arr.length < 0 && <p>Files Not found</p>}
                            {/* {fileNames != "" ? fileNames : "No files Available"} */}
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="col-md-12">
                        {attachmentKList && attachmentKList.length > 0 && (
                          <ol>
                            {attachmentKList?.map((el) => {
                              return (
                                <li
                                  style={{ color: "blue", cursor: "pointer" }}
                                >
                                  {" "}
                                  <a
                                    onClick={() => {
                                      handleDownload(el);
                                    }}
                                  >
                                    {" "}
                                    {el.savedName}{" "}
                                  </a>{" "}
                                  &nbsp;{" "}
                                  <span
                                    className="text-danger"
                                    onClick={(e) => {
                                      deleteAttachments(el.id);
                                    }}
                                  >
                                    {" "}
                                    X
                                  </span>
                                </li>
                              );
                            })}
                          </ol>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setNote("");
                  setqueryUserId(0);
                }}
              >
                Close
              </button>
              {type == 1 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    approveExpense();
                    deleteExpenseInput();
                  }}
                >
                  {" "}
                  {showSubmit ? <span>Submit</span> : <span>Approve</span>}
                </button>
              )}
              {type == 2 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => {
                    rejectExpense();
                  }}
                >
                  Reject
                </button>
              )}
              {type == 3 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={note == "" && queryUserId == 0}
                  onClick={(e) => {
                    queryExpense();
                  }}
                >
                  Send Query
                </button>
              )}
              {type == 4 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async (e) => {
                    setUpdate(true);
                  }}
                >
                  Submit
                </button>
              )}
              {type == 5 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={note == "" || qId == 0}
                  onClick={async (e) => {
                    replyExpense();
                  }}
                >
                  Reply
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel3"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              {type == 5 && (
                <h5 className="modal-title" id="exampleModalLabel">
                  Reply Query
                </h5>
              )}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={approveRejectCloseRef}
                onClick={() => {
                  setNote("");
                  setqueryUserId(0);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="container px-0 mt-">
                  {type == 5 && (
                    <div className="row">
                      <div className="col-md-12">
                        <TextField
                          name="z"
                          label="Reply"
                          variant="outlined"
                          size="small"
                          type="text"
                          className="w-100 "
                          required
                          value={note}
                          onChange={(event) => {
                            setNote(event.target.value);
                          }}
                        />
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          {/* ondragover="handleDragOver(event)"
                                        ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)" */}
                          <div
                            className="file-upload-container mt-3 border-0 p-0"
                            onClick={() => {
                              document.getElementById("formFileLg")?.click();
                            }}
                          >
                            <label
                              for="fileInput"
                              className="p-0 d-flex"
                              style={{
                                height: "185px",
                                fontSize: "31px",
                                border: "2px dashed #ccc",
                              }}
                            >
                              <div className="d-flex align-items-center p-3 m-auto">
                                <UploadIcon style={{ color: "black" }} />
                                <div
                                  className="ms-2 file_text"
                                  style={{
                                    fontSize: "20px",
                                    whiteSpace: "normal",
                                  }}
                                >
                                  <span style={{ color: "blue" }}>
                                    Upload file
                                  </span>
                                </div>
                              </div>
                            </label>
                            <input
                              className="file-input w-100 p-0 form-control form-control-lg "
                              multiple
                              style={{
                                // display: "none",
                                opacity: "0",
                                height: "35px",
                              }}
                              accept=".png,.jpg,.jpeg,.pdf,.docx,.xlsx ,.zip,.csv,.doc,.rar"
                              //   value={state}
                              onChange={(e) => {
                                UploadFile(e);
                              }}
                              id="formFileLg"
                              type="file"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="mt-2">
                            {files?.arr?.length > 0 && (
                              <ul>
                                {files?.arr?.map((el, index) => {
                                  return (
                                    <>
                                      <li>
                                        {" "}
                                        {el.name ? el.name : el.fileName}{" "}
                                        <span className="text text-danger">
                                          {" "}
                                          <IconButton
                                            onClick={(e) => {
                                              let filesArray = [...files.arr];
                                              filesArray.splice(index, 1);
                                              setFiles({
                                                arr: filesArray,
                                              });
                                            }}
                                          >
                                            <CloseIcon
                                              style={{ color: "red" }}
                                            />
                                          </IconButton>{" "}
                                        </span>
                                      </li>
                                    </>
                                  );
                                })}
                              </ul>
                            )}
                            {files.arr.length < 0 && <p>Files Not found</p>}
                            {/* {fileNames != "" ? fileNames : "No files Available"} */}
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="col-md-12">
                        {attachmentKList && attachmentKList.length > 0 && (
                          <ol>
                            {attachmentKList?.map((el) => {
                              return (
                                <li
                                  style={{ color: "blue", cursor: "pointer" }}
                                >
                                  {" "}
                                  <a
                                    onClick={() => {
                                      handleDownload(el);
                                    }}
                                  >
                                    {" "}
                                    {el.savedName}{" "}
                                  </a>{" "}
                                  &nbsp;{" "}
                                  <span
                                    className="text-danger"
                                    onClick={(e) => {
                                      deleteAttachments(el.id);
                                    }}
                                  >
                                    {" "}
                                    X
                                  </span>
                                </li>
                              );
                            })}
                          </ol>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setNote("");
                  setqueryUserId(0);
                }}
              >
                Close
              </button>
              {type == 1 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    approveExpense();
                    deleteExpenseInput();
                  }}
                >
                  {" "}
                  {showSubmit ? <span>Submit</span> : <span>Approve</span>}
                </button>
              )}
              {type == 2 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => {
                    rejectExpense();
                  }}
                >
                  Reject
                </button>
              )}
              {type == 3 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={note == "" && queryUserId == 0}
                  onClick={(e) => {
                    queryExpense();
                  }}
                >
                  Send Query
                </button>
              )}
              {type == 4 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async (e) => {
                    setUpdate(true);
                  }}
                >
                  Submit
                </button>
              )}
              {type == 5 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={note == "" || qId == 0}
                  onClick={async (e) => {
                    replyExpense();
                  }}
                >
                  Reply
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        ref={modalContactRef4}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#modalContactRef4"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="modalContactRef4"
        tabIndex="-1"
        aria-labelledby="modalContactRef4"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {expense && expense.type == 0 ? (
                <h5 className="modal-title" id="exampleModalLabel">
                  Modify Expense
                </h5>
              ) : (
                <h5 className="modal-title" id="exampleModalLabel">
                  Modify Request
                </h5>
              )}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={modalContact4Close}
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="container px-0 mt-">
                        {
                          <div>
                            <TextField
                              name="newAmount"
                              label="New Amount"
                              variant="outlined"
                              size="small"
                              type="text"
                              className="w-100 "
                              required
                              value={formik2.values.newAmount}
                              onChange={formik2.handleChange}
                            />
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {/* ondragover="handleDragOver(event)"
                                        ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)" */}
                    <div
                      className="file-upload-container mt-3 border-0 p-0"
                      onClick={() => {
                        document.getElementById("formFileLg")?.click();
                      }}
                    >
                      <label
                        for="fileInput"
                        className="p-0 d-flex"
                        style={{
                          height: "185px",
                          fontSize: "31px",
                          border: "2px dashed #ccc",
                        }}
                      >
                        <div className="d-flex align-items-center p-3 m-auto">
                          <UploadIcon style={{ color: "black" }} />
                          <div
                            className="ms-2 file_text"
                            style={{ fontSize: "20px", whiteSpace: "normal" }}
                          >
                            <span style={{ color: "blue" }}>Upload file</span>
                          </div>
                        </div>
                      </label>
                      <input
                        className="file-input w-100 p-0 form-control form-control-lg"
                        multiple
                        style={{
                          // display: "none",
                          opacity: "0",
                          height: "35px",
                        }}
                        accept=".png,.jpg,.jpeg,.pdf,.docx,.xlsx ,.zip,.csv,.doc,.rar"
                        //   value={state}
                        onChange={(e) => {
                          UploadFile(e);
                        }}
                        id="formFileLg"
                        type="file"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mt-2">
                      {files?.arr?.length > 0 && (
                        <ul>
                          {files?.arr?.map((el, index) => {
                            return (
                              <>
                                <li>
                                  {" "}
                                  {el.name ? el.name : el.fileName}{" "}
                                  <span className="text text-danger">
                                    {" "}
                                    <IconButton
                                      onClick={(e) => {
                                        let filesArray = [...files.arr];
                                        filesArray.splice(index, 1);
                                        setFiles({
                                          arr: filesArray,
                                        });
                                      }}
                                    >
                                      <CloseIcon style={{ color: "red" }} />
                                    </IconButton>{" "}
                                  </span>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      )}
                      {files.arr.length < 0 && <p>Files Not found</p>}
                      {/* {fileNames != "" ? fileNames : "No files Available"} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {}}
                >
                  Close
                </button>
                {
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={(e) => {
                      e.preventDefault();
                      uploadArray();
                    }}
                  >
                    Submit
                  </button>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
      <button
        type="button"
        ref={deleteModalRef}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#deleteModalRef"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="deleteModalRef"
        tabIndex="-1"
        aria-labelledby="deleteModalRef"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {expense && actionType == 0 ? (
                <h5 className="modal-title" id="exampleModalLabel">
                  Reject Sub{" "}
                  {expense.type == 0 ? (
                    <span>Expense</span>
                  ) : (
                    <span>Purchase</span>
                  )}{" "}
                </h5>
              ) : (
                <h5 className="modal-title" id="exampleModalLabel">
                  Reverse Decision
                </h5>
              )}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={deleteModalRefClose}
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div>
                  <div className="row">
                    {actionType == 0 ? (
                      <p>
                        {" "}
                        Are you sure you want to reject the Sub{" "}
                        {expense.type == 0 ? (
                          <span>Expense</span>
                        ) : (
                          <span>Purchase</span>
                        )}{" "}
                        ?
                      </p>
                    ) : (
                      <p>
                        {" "}
                        Are you sure you want to reverse your decision for
                        rejecting the Sub{" "}
                        {expense.type == 0 ? (
                          <span>Expense</span>
                        ) : (
                          <span>Purchase</span>
                        )}{" "}
                        ?
                      </p>
                    )}
                    {actionType == 0 && (
                      <div className="col-md-12">
                        <div className="container px-0 mt-">
                          {
                            <div>
                              <TextField
                                name="deleteNote"
                                label="Note"
                                variant="outlined"
                                size="small"
                                type="text"
                                className="w-100 "
                                required
                                value={deleteNote}
                                onChange={(e) => {
                                  setDeleteNote(e.target.value);
                                }}
                                error={deleteNote == "" && Boolean(errorBool)}
                                helperText={
                                  deleteNote == "" && Boolean(errorBool)
                                }
                              />
                            </div>
                          }
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setDeleteNote("");
                  }}
                >
                  Close
                </button>
                {actionType == 0 ? (
                  <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={deleteNote == ""}
                    onClick={async (e) => {
                      e.preventDefault();
                      await setDeleteConfirm(true);
                      settingRejectStatus();
                      // deleteExpense()
                      await deleteModalRefClose.current.click();
                      // uploadArray()
                    }}
                  >
                    Reject
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={async (e) => {
                      e.preventDefault();
                      setDeleteConfirm(true);
                      setUnRejectStatus(rejctIndex);
                      // deleteExpense()
                      await deleteModalRefClose.current.click();
                      // uploadArray()
                    }}
                  >
                    Reverse{" "}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <button
        type="button"
        ref={modalRef5}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#modalRef5"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="modalRef5"
        tabIndex="-1"
        aria-labelledby="modalRef5"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modification history{" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  setDetailHistory([]);
                }}
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div>
                  {/* <div className="rw" > */}
                  {/* <div className="col-md-121" > */}
                  {detailHistory?.length > 0 &&
                    detailHistory.reverse()?.map((data, index) => {
                      return (
                        <>
                          <div
                            id="expense_details"
                            className="row mt-"
                            key={index}
                          >
                            <div className="col-6">
                              <p>
                                <b>Id :</b> {data.id}{" "}
                              </p>
                              <p>
                                {" "}
                                <b>Title :</b> {data?.expenseTitle}{" "}
                              </p>
                              <p>
                                <b>Old Amount :</b>
                                {data.oldAmount == null
                                  ? "N/a"
                                  : data.oldAmount}
                              </p>
                              <p>
                                {" "}
                                <b>Amount :</b> {data?.totalIncVat}{" "}
                              </p>
                              {data?.status == -1 ? (
                                <>
                                  <p>
                                    {" "}
                                    <b>Created by :</b> {data?.modifiedBy}{" "}
                                  </p>
                                  <p>
                                    {" "}
                                    <b>Created :</b>{" "}
                                    {moment(
                                      data?.modified
                                        ? data?.modified
                                        : new Date()
                                    )
                                      .add(5, "hours")
                                      .add(30, "minutes")
                                      ?.format("DD-MM-YYYY, h:mm a")}{" "}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p>
                                    {" "}
                                    <b>Modified by :</b> {data?.modifiedBy}{" "}
                                  </p>
                                  <p>
                                    {" "}
                                    <b>Modified :</b>{" "}
                                    {moment(
                                      data?.modified
                                        ? data?.modified
                                        : new Date()
                                    )
                                      .add(5, "hours")
                                      .add(30, "minutes")
                                      ?.format("DD-MM-YYYY, h:mm a")}{" "}
                                  </p>
                                </>
                              )}
                            </div>
                            <div className="col-6 d-flex flex-column align-items-start my-auto">
                              {data?.attachments.length > 0 &&
                                data?.attachments?.map((at) => {
                                  return (
                                    // <div className="col-md-auto" key={at.id} >
                                    <a
                                      className="my-1"
                                      style={{ lineBreak: "anywhere" }}
                                      href={
                                        "https://beats.altruistindia.com/files/expense_files/" +
                                        at.saveFileName
                                      }
                                      target="_blank "
                                    >
                                      {at.attachmentFileName}
                                    </a>
                                    // </div>
                                  );
                                })}
                            </div>
                            {/* <div className="col-md-auto" >
                                                        <p><b>Id :</b> {data.id} </p>
                                                    </div> */}
                            {/* <div className="col-md-auto" >
                                                        <p > <b  >Date : </b>  {moment(data?.expenseDate ? data?.expenseDate : new Date())?.format('DD-MM-YYYY, h:mm a')}   </p>
                                             
                                                    </div> */}
                            {/* <div className="col-md-auto" >
                                                        <p> <b>Title :</b> {data?.expenseTitle} </p>
                                                        <input
                                                            name="expenseTitle"
                                                            label="Sub Expense Description"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={() => {
                                                            }}
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            value={data?.expenseTitle}
                                                        />
                                                    </div> */}
                            {/* <div className="col-md-auto" >
                                                        <p> <b>Amount :</b> {data?.totalIncVat} </p>
                                                        <input
                                                            name="amount"
                                                            label="Expense Amount"
                                                            variant="outlined"
                                                            size="small"
                                                            type="number"
                                                            className="form-control"
                                                            required
                                                            onChange={() => {
                                                            }}
                                                            value={data?.totalIncVat}
                                                        />
                                                    </div> */}
                            {/* <div className="col-md-auto" >
                                                        <p> <b>Modified by  :</b> {data?.modifiedBy} </p>
                                                        <input
                                                            name="modifiedBy"
                                                            label="Modified By"
                                                            variant="outlined"
                                                            size="small"
                                                            type="number"
                                                            className="form-control"
                                                            required
                                                            onChange={() => {
                                                            }}
                                                            value={data?.modifiedBy}
                                                        />
                                                    </div> */}
                            {/* <div className="col-md-auto" >
                                                        <p> <b>Modified :</b>   {moment(data?.modified ? data?.modified : new Date())?.format('DD-MM-YYYY, h:mm a')}  </p>
                                                    </div> */}
                          </div>
                          {/* <div className="row">
                                                    {data?.attachments.length > 0 && data?.attachments?.map((at) => {
                                                        return (
                                                            <div className="col-md-auto" key={at.id} >
                                                                <a href={"https://beats.altruistindia.com/files/expense_files/" + at.saveFileName} target="_blank ">{at.attachmentFileName}</a>
                                                            </div>
                                                        )
                                                    })}
                                                </div> */}
                          <hr />
                        </>
                      );
                    })}
                  {detailHistory?.length === 0 && <p>No History Found </p>}
                  {/* </div> */}
                  {/* </div> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
