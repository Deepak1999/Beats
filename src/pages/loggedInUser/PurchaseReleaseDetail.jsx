import ReplyIcon from "@mui/icons-material/Reply";
import attachment from "../../assets/images/attachment.png";
import UploadIcon from "@mui/icons-material/Upload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
// import { NotesTable } from "../../Components/NotesTable";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
  ThemeProvider,
  Tooltip,
  FormControlLabel,
  Autocomplete,
  FormControl,
  MenuItem,
} from "@mui/material";
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
import RemoveIcon from "@mui/icons-material/Remove";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import AccessLevel from "./AccessLevel";
import { createTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import Swal from "sweetalert2";
import dots from "../../assets/images/three dotes.png";
import "./main.css";
import "../../assets/css1/expensedetail.css";
import { Select } from "@mui/material";
import { common_axios } from "../../App";
import moment from "moment";
import { InputLabel, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ReactDatePicker from "react-datepicker";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DoneIcon from "@mui/icons-material/Done";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import ColumnFilter from "../../Components/ColumnFilter";
import { NotesTable } from "../../Components/NotesTable";
import { PaymentTerm } from "../../Components/PaymentTerm";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import {
  setQueryId,
  setReleaseId,
  setexpenseId,
} from "../../redux/features/expenseIdSlice";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import FileCopyIcon from "@mui/icons-material/FileCopy";
import HierarchyListComp from "../../Components/HierarchyListComp";
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
export default function PurchaseReleaseDetail() {
  const params = useParams();
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

  const addVendorRef = useRef(null);
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [querydata, setQueryData] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [showSubmit, setShowSubmit] = useState(false);
  const modalContact4Close = useRef(null);
  const [deleteArray, setDeleteArray] = useState([]);
  const [querySub, setQuerySub] = useState(0);
  const [showCat, setShowCat] = useState("");
  const [queryUserId, setqueryUserId] = useState(0);
  const [qId, setqId] = useState(0);

  const [isAdvance, setIsAdvance] = useState(0);

  const [notes, setNotes] = useState([]);

  const history = useHistory();
  const [raiseText, setRaiseText] = useState("");
  const [raiseAmount, setRaiseAmount] = useState(null);
  const [data, setData] = useState([]);
  const [rejectArray, setRejectArray] = useState([]);
  const [showApprove, setShowApprove] = useState(false);
  const [totalSum, setTotalSum] = useState(0);

  const [vendorDetails, setVendorDetails] = useState(null);

  const [update, setUpdate] = useState(false);
  const [purchase, setPurchase] = useState(null);
  const [replyId, setReplyId] = useState(0);

  const [reply, setReply] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [deleteNote, setDeleteNote] = useState("");
  const [actionType, setActionType] = useState(0);
  const [attachArray, setAttachArray] = useState([]);
  const [deleteId, setDeleteId] = useState(0);
  const modalContact = useRef(null);
  const modalContact1 = useRef(null);
  const modalContactClose = useRef(null);
  const [expenseId, setExpenseId] = useState(0);
  const [projects, setprojects] = useState([]);
  const [fileNames, setfileNames] = useState("");
  const [detailView, setDetailView] = useState(false);
  const [isData, setisData] = useState(false);
  const [isData1, setisData1] = useState(false);
  const [expense, setExpense] = useState({});
  const [fileat, setFileAt] = useState(null);
  const fileRef = useRef(null);
  const [dummyArray, setDummyArray] = useState([]);
  const [subExpenseId, setsubExpenseId] = useState(0);
  const deleteModalRef = useRef(null);
  const deleteModalRefClose = useRef(null);
  const [trends, setTrends] = useState([]);
  const [currencyId, setCurrencyId] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const dispatch = useDispatch();
  const [note, setNote] = useState("");
  const [type, setType] = useState(0);
  const [sum, setSum] = useState(0);
  const [showFiles, setShowFiles] = useState(false);
  const [pofileArray, setpoFileArray] = useState([]);
  const [pendingQuery, setPendingQuery] = useState(false);
  const [actionData, setActionData] = useState({});
  const [actionIndex, setActionIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState([]);

  const [businessCompany, setBusinessCompany] = useState("");
  const [vendorList, setVendorList] = useState([]);

  const [attachments, setAttachments] = useState([]);
  const [initialValues, setInitialValues] = useState({
    // templateType: "",
    expenseTitle: "",
    expenseDate: "",
    projectId: 0,
  });
  const [milestoneId, setMilestoneId] = useState(0);
  const [cat, setCat] = useState("");
  const [subCat, setSubCate] = useState("");
  const [checked1, setChecked1] = useState(0);
  const [milestones, setMilestones] = useState([
    {
      description: "",
      amount: "",
      status: 0,
      createdBy: "",
      createdOn: "",
      percentage: "",
      finalAmount: "",
      value: "",
    },
  ]);

  const [processAmount, setProcessAmount] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);

  const [mCreate, setMCreate] = useState(false);
  const [mCount, setMCount] = useState(null);
  const getProjecrIdBy = async (id) => {
    const res = await common_axios.post(`/project/detail/${id}`);
    if (res?.data) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        getVendors(res.data.project.companyId);
      }
    }
  };
  const getVendors = async (id) => {
    const res = await common_axios.post(`/vendor/getBybusinessCompany/${id}`);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setVendorList(res.data.vendorList);
    } else {
      let vendorList = [];
      setVendorList(vendorList);
    }
  };
  const pickData = (values1) => {
    let values = [...milestones];
    values1 = values1.map((data) => {
      if (data.checked == 0) {
        setChecked1(data.checked);
        return {
          ...data,
          finalAmount: data.finalAmount,
          amount: data.amount,
          value: data.amount,
          description: data.description,
        };
      } else {
        setChecked1(data.checked);
        return {
          ...data,
          finalAmount: data.finalAmount,
          amount: data.amount,
          value: data.percentage,
          description: data.description,
        };
      }
    });
    if (values1.length > 0) {
      setMCount(values1.length);
      setMilestones(values1);
      setMCreate(true);
    } else {
      setMCount(null);
      setMCreate(false);
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
      let AmString = raiseAmount + "";
      formdata.append("amount", AmString.split(".")[0]);
      formdata.append("remark", raiseText);
      files.arr.forEach((element) => {
        formdata.append("files", element);
      });
      formdata.append("expenseId", expense?.id);
      formdata.append("milestoneId", milestoneId);
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
        getExpenseDetail(expense?.id);
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
  const [subName, setSubName] = useState("");
  const [user, setUser] = useState({});
  const [expeseAmount, setExpenseAmount] = useState(null);
  const actionModalOpen = (data, index) => {
    setActionData(data);
    setActionIndex(index);
    setCat(data.categoryName);
    setSubCate(data.subCategoryName);
    document.getElementById("action-click").click();
  };
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
    });
    await setDummyArray(dumArray);
    values[e].expenseAttachments.forEach((Data) => {
      arr.push(Data);
    });
    setFiles({ arr: arr });
    formik2.setFieldValue("newAmount", values[e].amount);
    formik2.setFieldValue("oldAmount", values[e].amount);
    formik2.setValues({
      unitPrice: values[e].amountObj.unitPrice,
      basicAmount: values[e].amountObj.basicAmount,
      gstAmount: values[e].amountObj.gstAmount,
      totalAmount: values[e].amountObj.totalAmount,
      warranty: values[e].terms.warranty,
      payment: values[e].terms.payment,
      delivery: values[e].terms.delivery,
      quantity: values[e].amountObj.quantity,
      vendorId: values[e].vendorDetails.id,
      vendorState: values[e].vendorDetails,
      oldAmount: values[e].amount,
      freightAmount: values[e].amountObj.freightAmount,
      remarks: values[e].amountObj.remarks,
    });
    setsubExpenseId(values[e].id);
    getProjecrIdBy(expense?.projectId);
    await modalContactRef4.current.click();
  };
  const handleDialog = () => {
    openModal3(4);
  };

  const UpdateVendorDetails = (data) => {
    formik3.setValues({
      vendorName: data?.vendorName,
      bankName: data?.bankName,
      accountNo: data?.accountNo,
      panNo: data?.panNo,
      gstNo: data?.gstNo,
      ifsc: data?.ifsc,
      state: data?.state,
      pinCode: data?.pinCode,
      address: data?.address,
      panFileCheck: data?.panFile,
      gstfileCheck: data?.gstFile,
      chequeFileCheck: data?.cheque,
      msmeCheck: data?.msmeCer,
      isMsme: data?.isMsme,
      email: data?.email,
      msisdn: data?.msisdn,
      vendorCode: data?.vendorCode,
      status: data?.status,
    });
  };
  const getPOFiles = async (expenseId) => {
    const res = await common_axios.post(`/payment/po/files/${expenseId}`);
    if (res) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        setpoFileArray(res.data.list);
        setShowFiles(true);
      } else {
        setShowFiles(false);
        setpoFileArray([]);
      }
    }
  };
  const removeAttachments2 = async (name) => {
    let arr = [...files.arr];
    arr.splice(name, 1);
    await setFiles({
      arr: arr,
    });
  };
  const handleDownload = (data) => {
    const fileUrl = data.url;
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.target = "_blank";
    anchor.download = data.savedName;
    anchor.click();
  };
  const modalContact3 = useRef(null);
  const modalContact4 = useRef(null);
  const approveRejectCloseRef = useRef(null);
  const modalContactRef4 = useRef(null);
  //   useEffect(() => {
  //     return () => {
  //       if (localStorage.getItem("expenseId")) {
  //         dispatch(setexpenseId(localStorage.getItem("expenseId")));
  //       }
  //     };
  //   });

  useEffect(() => {
    // console.log(params);
    if (params.id) {
      getExpenseDetail(params.id);
      localStorage.setItem("releaseId", params.id);
      setExpenseId(params.id);
      setDetailView(true);
      getExpenseDetail(params.id);
    }

    return () => {
      if (localStorage.getItem("releaseId")) {
        dispatch(setReleaseId(localStorage.getItem("releaseId")));
      }
    };
  }, [params.id]);
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
            await deleteModalRefClose.current.click();
            setDeleteNote("");
            getExpenseDetail(expenseId);
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
  const openModal = async (e) => {
    setapiindex(e);
    await modalContact.current.click();
  };
  const openModal2 = async (e) => {
    await setAttachmentKList([]);
    await setapiindex1(e);
    await modalContact1.current.click();
    await setAttachmentKList(attachments);
  };
  const openModal3 = async (type) => {
    await modalContact3.current.click();
    setType(type);
    if (type == 5) {
      let arr = [];
      const values = [...inputfields];
      expenseDetails.forEach((exp) => {
        if (exp.id == querySub) {
          exp.attachmentList?.forEach((data) => {
            arr.push(data);
          });
        }
      });
      await setAttachmentKList(arr);
    }
  };
  const openModal5 = async (type, id) => {
    await modalContact3.current.click();
    setType(type);
    if (type == 5) {
      let arr = [];
      await setAttachmentKList(attachments);
    }
  };
  //   useEffect(() => {
  //     if (expenseIdSelector != 0) {

  //     }
  //   }, [expenseIdSelector]);
  const getMilestomes = async (id) => {
    dispatch(setLoader(true));
    const res = await common_axios.post(`/payment/milestone/get/${id}`);
    if (res) {
      dispatch(setLoader(false));
      if (res?.data?.statusDescription?.statusCode == 200) {
        setMilestones(res.data.list);
        pickData(res.data.list);
      } else {
        setMilestones([]);
        pickData(res.data.list);
      }
    }
  };
  const getTrends = async (data) => {
    let formdata = {
      siteId: "",
      categoryId: data.categoryId,
    };
    if (data.siteId) {
      formdata.siteId = data.siteId;
    }
    if (data.categoryId) {
      formdata.categoryId = data.categoryId;
    }
    if (data.subCatId) {
      formdata.subId = data.subCatId;
      setSubName(data.subCategoryName);
    }
    setshowSiteN(data.siteId);
    const res = await common_axios.post(`/expense/trends`, formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setTrends(res.data.expenseTrends);
      setShowCat(res.data.expenseTrends[0].catTitle);
    } else {
      setTrends([]);
    }
  };
  const getTrends1 = async (data) => {
    let formdata = {
      siteId: "",
      categoryId: data.categoryId,
    };
    setBusinessCompany(data.businessCompany);
    if (data.siteId) {
      formdata.siteId = data.siteId;
    }
    if (data.categoryId) {
      formdata.categoryId = data.categoryId;
    }
    if (data.subCatId) {
      formdata.subId = data.subCatId;
      setSubName(data.subCategoryName);
    }
    if (data.businessCompany) {
      formdata.businessCompany = data.businessCompany;
    }
    setshowSiteN(data.siteId);
    const res = await common_axios.post(`/expense/butrends`, formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setTrends(res.data.expenseTrends);
      setShowCat(res.data.expenseTrends[0].catTitle);
    } else {
      setTrends([]);
    }
  };
  const getExpenseDetail = async (expenseId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    let arr = [];
    setUser(user);
    dispatch(setLoader(true));
    let formdata = {
      id: expenseId,
    };
    let res = await common_axios.post(
      `/payment/detail/release/${expenseId}`,
      {}
    );
    if (res?.data?.statusDescription?.statusCode == 200) {
      setMilestones(res.data.list);

      setExpense(res.data.list[0].expense1);
      setPurchase(res.data.list[0].expense);
      // console.log(res.data);
      setVendorDetails(res.data.vendorDetails);
      dispatch(setLoader(false));
      replyExpenseCheck(res.data.list[0].expense1.id);
      let sum1 = 0;
      let processAm = 0;
      let pendingAm = 0;

      // console.log(res.data.list[0].isAdvance);
      setIsAdvance(res.data.list[0].isAdvance);
      res.data.list.forEach((data) => {
        sum1 = sum1 + Number(data.actualAmount);
        if (data.status == 2) {
          processAm = processAm + data.finalAmount;
        }
        if (data.status == 1) {
          pendingAm = pendingAm + data.finalAmount;
        }
        //   if(data.status ==1) {
        //     pendingAm  =  pendingAm  + data.finalAmount
        // }
      });

      setAttachments(res.data.attachments);
      setTotalSum(sum1);
      setProcessAmount(processAm);

      // console.log(res.data.hierarchy);
      sethierarchyList(res.data.hierarchy);
      setPendingAmount(pendingAm);
      setData(res.data.activitiesList);
      setVendorDetails(res.data.vendorDetails);
      setNotes(res.data.notesList);

      // setactivities(true);
      setHideSkeleton(false);
      setisData(true);
      if (res.data?.activitiesList.length > 0) {
      }

      let userIndex = null;
      res.data.hierarchy.forEach((data, index) => {
        if (user.id == expense.approverId) {
          userIndex = index - 2;
        }
        if (expense.approverId == user.id && data.userId == user.id) {
          if (index != 0) {
            indexObj = index - 1;
            setqueryName(res.data.hierarchy[indexObj].userName);
          }
        }
      });
      res.data?.hierarchy.forEach((hi, index) => {
        let formdata = {
          userId: hi.userId,
          userName: hi.userName,
        };
        if (userIndex > index && hi.userId != user.id) {
          arr.push(formdata);
        }
      });
      let formdata = {
        userId: res.data.list[0].expense1.userId,
        userName: res.data.list[0].expense1.generatorName,
      };

      // console.log(formdata);
      arr.push(formdata);
      setqhierarchyList(arr);

      //   setCurrencyId(res.data.expense?.currencyId);
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: res?.data?.statusDescription?.statusMessage,
      });
      dispatch(setLoader(false));
    }
  };
  const removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };
  const [hierarchyList, sethierarchyList] = useState([]);
  const [qhierarchyList, setqhierarchyList] = useState([]);
  const [inputfields, setinputfields] = useState([]);

  const [files, setFiles] = useState({
    arr: [],
  });
  const [poFiles, setPOFiles] = useState({
    arr: [],
  });
  const onKeyDown = (e) => {
    e.preventDefault();
  };
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
              {expense?.type == 0 && cell.row.original.activity}
              {expense?.type == 1 &&
                cell.row.original.activity
                  .replace("Expense", "Purchase")
                  .replace("expense", "purchase")}
              {expense?.type == 3 &&
                cell.row.original.activity
                  .replace("Expense", "Payment Request")
                  .replace("expense", "Payment Request")}
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

  const [projectId, setprojectId] = useState(0);
  const [projectName, setprojectName] = useState("");
  const [expenseDetails, setExpenseDetails] = useState([]);
  const [apiindex, setapiindex] = useState(0);
  const [attachmentKList, setAttachmentKList] = useState([]);
  const [apiindex1, setapiindex1] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const approveExpense = async () => {
    const formdata = {
      expenseId: expenseId,
      remark: note,
      remarks: note,
      projectId: expense?.projectId,
      type: isAdvance,
    };
    let res = await common_axios.post(
      `/expense/approve/PurchasePayment`,
      formdata
    );

    if (true) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        await approveRejectCloseRef?.current?.click();
        document.getElementById("update-close").click();
        // setTimeout(() => {
        //   deleteExpenseInput();
        // }, 3000);
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
            title: "Approved Successfully",
            text: res?.data?.statusDescription?.statusMessage,
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
      expenseId: expenseId,
      remark: note,
      remarks: note,
      projectId: expense?.projectId,
      scheduleList: [],
    };
    let arr = [];

    const res = await common_axios.post(
      `/expense/reject/PurchasePayment`,
      formdata
    );

    if (true) {
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
    // await setsubExpenseId(expDetail[0].id);
    files.arr.forEach((data) => {
      const formdata = new FormData();
      formdata.append("file", data);
      formdata.append("expenseId", expenseId);
      formdata.append("subExpenseId", querySub);
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
      queryId: replyId,
    };
    formdata["attachedList"] = nameArray;
    if (deleteArray.length > 0) {
      formdata["deleteList"] = deleteArray;
    }
    const res = await common_axios.post(
      `/expense/query/reply/payment`,
      formdata
    );

    if (true) {
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
        setReplyId(res.data.queryExpense[0].id);
        // console.log(res.data.queryExpense[0]);
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
    const res = await common_axios.post(`/expense/queryPayment`, formdata);

    if (true) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        await approveRejectCloseRef?.current?.click();
        getExpenseDetail(expenseId);
        // setShowButton(false)
        afterDeletion();
        document.getElementById("update-close").click();
        Swal.fire({
          icon: "success",
          title: "Query Raised",
        }).then(() => {
          // setTimeout(() => {
          //     historyRedirect()
          // }, 1000)
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
  const uploadApi1 = async () => {
    let arr = [];
    dispatch(setLoader(true));
    const getDumyy = [...dummyArray];
    if (poFiles.arr.length == 0) {
      Swal.fire({
        icon: "warning",
        title: "file is required",
        text: "please attach file before submitting",
      });
      return;
    }
    const formdata = new FormData();
    poFiles.arr.forEach((x) => {
      formdata.append("files", x);
    });
    formdata.append("purchaseId", expenseId);
    formdata.append("userId", "" + localStorage.getItem("userId"));
    formdata.append("jwtToken", localStorage.getItem("token"));
    formdata.append("source", "0");
    const res = await common_axios.post(`/payment/attach/po`, formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
      document.getElementById("btn-PO-close").click();
      setPOFiles({
        arr: [],
      });
      getExpenseDetail(expenseId);
      getPOFiles(expenseId);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "PO files attached successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Internal server error",
        text: res?.data?.statusDescription?.statusMessage,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
    // files.arr.forEach((data) => {
    //   const formdata = new FormData();
    //   formdata.append("file", data);
    //   setTimeout(async () => {
    //     const res = await common_axios.post(`/payment/attach/po`, formdata);
    //     if (res?.data?.statusDescription?.statusCode == 200) {
    //       await arr.push(res?.data?.expenseAttachments?.id);
    //     } else if (res?.data?.statusDescription?.statusCode == 401) {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Session Expired",
    //         text: res?.data?.statusDescription?.statusMessage,
    //         // footer: '<a href="">Why do I have this issue?</a>'
    //       });
    //     } else if (res?.data?.statusDescription?.statusCode == 500) {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Internal server error",
    //         text: res?.data?.statusDescription?.statusMessage,
    //         // footer: '<a href="">Why do I have this issue?</a>'
    //       });
    //     } else {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Something went wrong",
    //         text: res?.data?.statusDescription?.statusMessage,
    //         // footer: '<a href="">Why do I have this issue?</a>'
    //       });
    //     }
    //   }, 1000);
    // });
    // setfileNames("");
    // setFiles({
    //   arr: [],
    // });
    // const values = [...inputfields];
    // values[apiindex]["expenseAttachments"] = arr;
    // setinputfields(values);
    // await modalContactClose.current.click();
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
  const UploadFile1 = (e) => {
    const file = e.target.files[0];
    let arr = [];
    let fileArray = Array.from(e.target.files);
    let filesName = "";
    let arrr = poFiles.arr?.length > 0 ? [...poFiles.arr] : [];
    for (let index = 0; index < fileArray.length; index++) {
      const element = fileArray[index];
      arrr.push(element);
    }
    arrr.concat(Array.from(e.target.files));
    setPOFiles({
      arr: arrr,
    });
    // setviewUploadFiles(arrr);
    // setfileNames(filesName);
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
  const [termsSub, setTermsSub] = useState(false);
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
  const formik3 = useFormik({
    initialValues: {
      vendorName: "",
      vendorCode: "",
      bankName: "",
      accountNo: "",
      panNo: "",
      gstNo: "",
      gstFile: null,
      panFile: null,
      cheque: null,
      ifsc: "",
      pinCode: "",
      state: "",
      gstfileCheck: "",
      email: "",
      msisdn: "",
      msmeCheck: "",
      isMsme: 0,
      panFileCheck: "",
      chequeFileCheck: "",
      isPrevious: false,
      status: 0,
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    onSubmit: async (values) => {},
  });
  const formik2 = useFormik({
    initialValues: {
      newAmount: "",
      oldAmount: "",
      vendorState: null,
      vendorId: "",
      terms: "",
      warranty: "",
      delivery: "",
      payment: "",
      quantity: "",
      totalAmount: "",
      unitPrice: "",
      gstAmount: "",
      basicAmount: "",
      remarks: "",
      freightAmount: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    onSubmit: async (values) => {
      let formdata = {
        newAmount: Number(values.totalAmount.split(".")[0]),
        attachmentList: attachArray,
        subExpenseId: subExpenseId,
        expenseId: expenseId,
        oldAmount: values.oldAmount,
        oldBasicAmount: values.basicAmount,
        gstAmount: values.gstAmount,
        quantity: values.quantity,
        payment: values.payment,
        warranty: values.warranty,
        delivery: values.delivery,
        unitPrice: values.unitPrice,
        quantity: values.quantity,
        totalAmount: values.totalAmount,
        vendorId: values.vendorId,
        remarks: values.remarks,
        freightAmount: values.freightAmount,
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
  const formik4 = useFormik({
    initialValues: {
      payment: "",
      warranty: "",
      delivery: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    onSubmit: async (values) => {},
  });
  const uploadArray = async () => {
    dispatch(setLoader(true));
    const values = [...inputfields];
    let arr = [];
    if (attachArray.length > 0) {
      arr = [...attachArray];
    }
    if (files.arr.length == 0) {
      formik2.handleSubmit();
      return;
    }
    if (values[actionIndex].expenseAttachments.length > files.arr.length) {
      let newArr = [];
      files.arr.forEach((data) => {
        newArr.push(data.id);
      });
      setAttachArray(newArr);
      setTimeout(() => {
        formik2.handleSubmit();
      }, 400);
      return;
    }
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
        }, 200);
      } else {
        if (arr.length == files.arr.length) {
          setTimeout(() => {
            formik2.handleSubmit();
          }, 1000);
        }
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
      openRead: "",
      closeRead: "",
      dueDate: "",
      totalAmount: "",
      billAmount: "",
      lateFee: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
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
  const changeCxategory = async () => {
    let formdata = {
      expensedList: [],
    };
    const values = [...inputfields];
    let arr = [];
    values.forEach((ekl) => {
      if (ekl.newCategoryId != 0 && ekl.newSubId != 0) {
        let newData = {
          categoryId: ekl.newCategoryId,
          subCategoryId: ekl.newSubId,
          id: ekl.id,
          expenseId: expenseId,
        };
        arr.push(newData);
      } else if (ekl.newSubId != 0) {
        let newData = {
          categoryId: ekl.categoryId,
          subCategoryId: ekl.newSubId,
          id: ekl.id,
          expenseId: expenseId,
        };
        arr.push(newData);
      }
    });
    if (arr.length == 0) {
      return;
    }
    formdata["expensedList"] = arr;
    const res = await common_axios.post("/expense/cat/change", formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
      document.getElementById("close_id").click();
      setShowSave(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Categories/Sub-Categories changed sucessfully",
      });
      getExpenseDetail(expenseId);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: res.data.statusDescription.statusMessage,
      });
    }
  };
  const getDesignFunc = (status) => {
    if (status == 5) {
      return "myClass position-relative coor_black";
    } else if (status == 2) {
      return "myClass position-relative greenColor";
    } else if (status == 1) {
      return "myClass position-relative red_color";
    } else {
      return " myClass position-relative grey_color";
    }
  };
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
  useEffect(() => {
    if (inputfields && categories && !inputfields?.[0]?.["categoryState"]) {
      let backinputfields = [...inputfields];
      let backcategories = [...categories];
      backinputfields.map((element1) => {
        const foreEach = backcategories?.find((element2) => {
          if (element2?.id === element1?.categoryId) {
            return element2;
          }
        });
        element1["categoryState"] = foreEach;
        return element1;
      });
      setinputfields(backinputfields);
    }
  }, [categories]);
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
          <div className="card-body">
            <div role="presentation" onClick={(e) => {}}>
              <Breadcrumbs aria-label="breadcrumb" className="ml-5">
                <Link
                  style={{
                    color: "#1976d2",
                    fontSize: "23px",
                    textDecoration: "none",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    redirectExpense();
                  }}
                >
                  &#x2190;
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
                    {expense && expense?.type == 3
                      ? "Payment Release Detail"
                      : "Milestones Detail"}
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
                      className="row expense_lable expense_row  g-3 needs-validation"
                      noValidate
                    >
                      <div>
                        <div className="row ">
                          {expense && (
                            <div className="col-md-auto">
                              <p style={{ fontSize: "small", margin: "0" }}>
                                {expense && expense?.type == 0 ? (
                                  <span>Expense Id </span>
                                ) : (
                                  <span> PR Id </span>
                                )}
                                {expense && (
                                  <span
                                    style={{
                                      fontSize: "small",
                                      margin: "0",
                                      color: "rgb(94, 93, 93",
                                    }}
                                  >
                                    {" "}
                                    :<b>{expense?.id}</b>{" "}
                                  </span>
                                )}
                              </p>
                            </div>
                          )}
                          {expense && (
                            <div className="col-md-auto">
                              <p style={{ fontSize: "small", margin: "0" }}>
                                {expense && expense?.type == 3 ? (
                                  <span>Purchase Id </span>
                                ) : (
                                  <span> PR Id </span>
                                )}
                                {expense && (
                                  <span
                                    style={{
                                      fontSize: "small",
                                      margin: "0",
                                      color: "rgb(94, 93, 93",
                                    }}
                                  >
                                    {" "}
                                    :
                                    <b
                                      style={{
                                        color: "blue",
                                        cursor: "pointer",
                                      }}
                                      onClick={(e) => {
                                        dispatch(setexpenseId(purchase.id));
                                        localStorage.setItem(
                                          "expenseId",
                                          "" + purchase.id
                                        );
                                        window.open(
                                          `${
                                            window.location.href.split("#")[0]
                                          }#/detail`,
                                          "_blank"
                                        );
                                      }}
                                    >
                                      {purchase?.id}
                                    </b>{" "}
                                  </span>
                                )}
                              </p>
                            </div>
                          )}
                          <div className="col-md-auto">
                            {expense && (
                              <p style={{ fontSize: "small", margin: "0" }}>
                                Raised By{" "}
                                <span>
                                  :{" "}
                                  <b style={{ color: "rgb(94 93 93)" }}>
                                    {expense?.generatorName}
                                  </b>{" "}
                                </span>
                              </p>
                            )}
                          </div>
                          {expense && (
                            <>
                              <div className="col-md-auto">
                                <p style={{ fontSize: "small", margin: "0" }}>
                                  {" "}
                                  status
                                  <span>
                                    {expense?.status == 0 && (
                                      <span
                                        className="text"
                                        style={{
                                          fontSize: "small",
                                          color: "#ff8c00",
                                        }}
                                      >
                                        <b> Pending </b>{" "}
                                      </span>
                                    )}
                                    {expense?.status == 1 && (
                                      <span
                                        className="text text-danger"
                                        style={{ fontSize: "medium" }}
                                      >
                                        {" "}
                                        <b>Rejected </b>{" "}
                                      </span>
                                    )}
                                    {expense?.status == 2 && (
                                      <span
                                        className="text text-success"
                                        style={{ fontSize: "medium" }}
                                      >
                                        {" "}
                                        <b>Approved </b>{" "}
                                      </span>
                                    )}
                                  </span>
                                </p>
                              </div>
                              <div className="col-md-auto">
                                <p style={{ fontSize: "small", margin: "0" }}>
                                  Project Name
                                  {expense && (
                                    <span
                                      style={{ fontSize: "small", margin: "0" }}
                                    >
                                      {" "}
                                      :{" "}
                                      <b style={{ color: "rgb(94 93 93)" }}>
                                        {" "}
                                        {expense?.projectName}{" "}
                                      </b>
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className="col-md-auto">
                                <p style={{ fontSize: "small", margin: "0" }}>
                                  Total Amt
                                  {expense && (
                                    <span
                                      style={{ fontSize: "small", margin: "0" }}
                                    >
                                      {" "}
                                      :{" "}
                                      <b className="text-success">
                                        {expense?.currencyId}{" "}
                                      </b>{" "}
                                      &nbsp;
                                      <b style={{ color: "rgb(94 93 93)" }}>
                                        {" "}
                                        {totalSum.toLocaleString()}
                                      </b>{" "}
                                    </span>
                                  )}
                                </p>
                              </div>

                              {/* <div className="col-md-auto">
                                <p style={{ fontSize: "small", margin: "0" }}>
                                  Process Amt
                                  {expense && (
                                    <span
                                      style={{ fontSize: "small", margin: "0" }}
                                    >
                                      {" "}
                                      :{" "}
                                      <b className="text-success">
                                        {currencyId}{" "}
                                      </b>{" "}
                                      &nbsp;
                                      <b style={{ color: "rgb(94 93 93)" }}>
                                        {" "}
                                        {processAmount.toLocaleString()}
                                      </b>{" "}
                                    </span>
                                  )}
                                </p>
                              </div>

                              <div className="col-md-auto">
                                <p style={{ fontSize: "small", margin: "0" }}>
                                  Pending Amt
                                  {expense && (
                                    <span
                                      style={{ fontSize: "small", margin: "0" }}
                                    >
                                      {" "}
                                      :{" "}
                                      <b className="text-success">
                                        {currencyId}{" "}
                                      </b>{" "}
                                      &nbsp;
                                      <b style={{ color: "rgb(94 93 93)" }}>
                                        {" "}
                                        {pendingAmount.toLocaleString()}
                                      </b>{" "}
                                    </span>
                                  )}
                                </p>
                              </div> */}
                            </>
                          )}
                        </div>
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
                              top: "37px",
                              left: "8px",
                              right: "12px",
                              height: "2px",
                              background: "rgb(209, 209, 209, 1)",
                            }}
                          ></div>
                          <div
                            className="scrollbar py-2"
                            style={{ overflow: "auto" }}
                          >
                            <div
                              className="d-flex"
                              style={{
                                display: "flex",
                                whiteSpace: "nowrap",
                                width: "100%",
                                margin: "0px 0px",
                                justifyContent: "space-between",
                              }}
                            >
                              {hierarchyList?.map((data, index) => {
                                return (
                                  <HierarchyListComp
                                    index={index}
                                    data={data}
                                    expense={expense}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
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

                          <p> Milestones Details</p>
                          {milestones?.length != 0 &&
                            milestones?.map((data, index) => {
                              return (
                                <div
                                  id="expense_details"
                                  className={
                                    data.status == 2
                                      ? "row mt-4 label_root "
                                      : "row label_root mt-3 "
                                  }
                                  key={index}
                                >
                                  <div className="col-md-1  align-self-start">
                                    <p>Milestone {data?.sequence}</p>
                                  </div>
                                  <div className="col-md-3 align-self-start">
                                    <TextField
                                      name="z"
                                      label="Description"
                                      variant="outlined"
                                      size="small"
                                      type="text"
                                      className="w-100 "
                                      required
                                      value={data.description}
                                      //   onChange={(event) => {
                                      //     setNote(event.target.value);
                                      //   }}
                                    />
                                  </div>

                                  <div className="col-md-2 align-self-start">
                                    <TextField
                                      name="z"
                                      label={
                                        data.checked == 0
                                          ? "Amount"
                                          : "Percentage (in %)"
                                      }
                                      variant="outlined"
                                      size="small"
                                      type="text"
                                      InputLabelProps={{ shrink: true }}
                                      className="w-100 "
                                      required
                                      value={
                                        data.checked == 0
                                          ? data.amount
                                          : data.percentage
                                      }
                                    />
                                  </div>
                                  {/* <div className="col-md-2 align-self-start">
                                    <TextField
                                      name="finalAmount"
                                      label="Final Amount"
                                      variant="outlined"
                                      size="small"
                                      type="text"
                                      className="w-100 "
                                      required
                                      value={data.finalAmount}
                                    />
                                  </div> */}

                                  <div className="col-md-2 align-self-start">
                                    <TextField
                                      name="actualAmount"
                                      label="Amount"
                                      variant="outlined"
                                      size="small"
                                      InputLabelProps={{ shrink: true }}
                                      type="text"
                                      className="w-100 "
                                      required
                                      value={data.actualAmount}
                                    />
                                  </div>

                                  <div className="col-md-2 align-self-start">
                                    <TextField
                                      name="vendorName"
                                      InputLabelProps={{ shrink: true }}
                                      label="Vendor Name"
                                      variant="outlined"
                                      size="small"
                                      type="text"
                                      className="w-100 "
                                      required
                                      value={vendorDetails?.vendorName}
                                    />
                                  </div>
                                  {true && (
                                    <div className="col-md-auto">
                                      <Tooltip
                                        title={
                                          <h6 style={{ color: "lightblue" }}>
                                            View Vendor
                                          </h6>
                                        }
                                        sx={{ cursor: "pointer" }}
                                        arrow
                                      >
                                        <VisibilityIcon
                                          data-bs-toggle="modal"
                                          data-bs-target="#addVendor"
                                          style={{ color: "green" }}
                                          onClick={() => {
                                            UpdateVendorDetails(vendorDetails);
                                          }}
                                        />
                                      </Tooltip>
                                    </div>
                                  )}
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
                                              onClick={() => {
                                                openModal2(index);
                                              }}
                                            >
                                              <span
                                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                                                style={{ fontSize: "x-small" }}
                                              >
                                                {attachments?.length}
                                              </span>
                                              <img
                                                className="img-small"
                                                src={attachment}
                                                style={{
                                                  width: "24px",
                                                  marginTop: "-21% ",
                                                }}
                                              />
                                            </IconButton>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              fontSize: "1.2rem",
                                              color: "green",
                                            }}
                                            className="small"
                                            onClick={() => {
                                              openModal(index);
                                            }}
                                          >
                                            <AttachFileIcon
                                              color="success"
                                              style={{
                                                padding: "6px",
                                                marginRight: "0px",
                                                color: "green",
                                              }}
                                              sx={{ color: "green" }}
                                            />
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    {/* -------------------------------End new file--------------------------------- */}
                                  </div>

                                  {reply && (
                                    <div className="col-md-auto">
                                      <IconButton
                                        title={`Reply Sub Expense ${data?.id}`}
                                        style={{ color: "blue" }}
                                        onClick={async (e) => {
                                          await setapiindex1(0);
                                          e.preventDefault();
                                          // await setQuerySub(data.id);
                                          // await setreplyIndex(index);
                                          // await setqId(data.query.id);
                                          // await setapiindex1(index);
                                          openModal5(5, data.id);
                                        }}
                                      >
                                        <ReplyIcon />
                                      </IconButton>
                                    </div>
                                  )}

                                  {showFiles && (
                                    <div className="col-md-auto">
                                      <IconButton
                                        title="PO Files "
                                        data-bs-toggle="modal"
                                        data-bs-target="#remarkModal"
                                        onClick={(e) => {
                                          // document
                                          //   .getElementById("attachPO")
                                          //   .click();
                                        }}
                                      >
                                        <FileCopyIcon
                                          style={{
                                            marginRight: "0px",
                                          }}
                                        />
                                      </IconButton>
                                    </div>
                                  )}
                                  {expense?.isFinalApproved == 1 &&
                                    expense?.status == 2 &&
                                    user.id == expense?.approverId && (
                                      <>
                                        <div className="col-md-auto">
                                          <IconButton
                                            title="Other Actions"
                                            onClick={(e) => {
                                              actionModalOpen(data, index);
                                            }}
                                          >
                                            <img
                                              className="img-small"
                                              src={dots}
                                              style={{
                                                width: "24px",
                                                marginTop: "43% ",
                                              }}
                                            />
                                          </IconButton>
                                        </div>
                                      </>
                                    )}
                                  {data.status != 2 &&
                                    expense?.isFinalApproved != 1 &&
                                    showButton &&
                                    user &&
                                    user.id != expense?.approverId &&
                                    expense &&
                                    expense?.saveStatus == 2 && (
                                      <div className="col-md-auto">
                                        <div className="dropdown">
                                          {/* <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"> */}
                                          <IconButton
                                            className="btn"
                                            title="Other Actions"
                                            role="button"
                                            id="dropdownMenuLink"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            // onClick={(e) => {
                                            //   actionModalOpen(data, index);
                                            // }}
                                          >
                                            <img
                                              className="img-small"
                                              src={dots}
                                              style={{
                                                width: "24px",
                                                marginTop: "43% ",
                                              }}
                                            />
                                          </IconButton>
                                          {/* </a> */}
                                          <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuLink"
                                          >
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                              >
                                                Action
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                onClick={(e) => {
                                                  actionModalOpen(data, index);
                                                }}
                                              >
                                                Another action
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                              >
                                                Something else here
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    )}
                                </div>
                              );
                            })}
                          {milestones?.length == 0 && (
                            <h5
                              className="text-center"
                              style={{ fontSize: "11px" }}
                            >
                              {" "}
                              No Milestones Found{" "}
                            </h5>
                          )}
                          {expense?.isFinalApproved != 1 &&
                          showButton &&
                          user &&
                          user.id == expense?.approverId &&
                          expense &&
                          expense?.saveStatus == 2 ? (
                            <div
                              className="buttons"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "1rem",
                              }}
                            >
                              {showSubmit && inputfields.length != 0 && (
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
                                  Submit
                                </button>
                              )}
                              {!showSubmit && (
                                <button
                                  className=" btn btn-success "
                                  type="button"
                                  style={{
                                    marginRight: "8px",
                                    width: "87px",
                                    fontSize: "11px",
                                  }}
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
                              {/* <button
                                className=" btn btn-danger"
                                style={{
                                  marginRight: "8px",
                                  width: "87px",
                                  fontSize: "11px",
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  openModal3(2);
                                }}
                              >
                                Reject
                              </button> */}
                              {!reply && (
                                <button
                                  className=" btn btn-primary"
                                  title="Save Categories/Sub-Categories"
                                  style={{
                                    marginRight: "8px",
                                    width: "87px",
                                    fontSize: "11px",
                                  }}
                                  onClick={async (e) => {
                                    openModal3(3);
                                    e.preventDefault();
                                    // await modalContact4.current.click();
                                  }}
                                >
                                  Query
                                </button>
                              )}
                            </div>
                          ) : (
                            <></>
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
                                    ></button>
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
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-center m-auto mt-">
                                {data?.length == 0 &&
                                open == true ? null : data?.length == 0 &&
                                  open == undefined ? null : (
                                  <div className="text-center">
                                    <h5 style={{ fontSize: "13px" }}>
                                      No Record Found..!!
                                    </h5>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        {true && <NotesTable data={notes} heading="Notes" />}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Box>
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
            <div className="modal-header" style={{ border: "none" }}>
              <h5
                className="modal-title"
                id="exampleModalLabel"
                style={{ marginLeft: "32%" }}
              >
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
                      {!attachmentKList && (
                        <h6 style={{ textAlign: "center" }}>
                          No Files Available
                        </h6>
                      )}
                      {attachmentKList && attachmentKList.length > 0 && (
                        <ol>
                          {attachmentKList?.map((el, i) => {
                            return (
                              <a
                                onClick={() => {
                                  handleDownload(el);
                                }}
                                key={i}
                              >
                                {" "}
                                <li
                                  style={{ color: "blue", cursor: "pointer" }}
                                >
                                  {" "}
                                  {el?.saveFileName}
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
                    value={raiseAmount}
                    placeholder="Enter Amount"
                    // onChange={(e) => {
                    //   setRaiseAmount(e.target.value);
                    // }}
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
                      <h6>
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
                cancel
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
            <div className="modal-header" style={{ border: "none" }}>
              {type == 1 && (
                <h5
                  style={{ marginLeft: "24%" }}
                  className="modal-title"
                  id="exampleModalLabel"
                >
                  {showSubmit ? (
                    <span>Modify Confirmation </span>
                  ) : (
                    <span> Approval Confirmation </span>
                  )}
                </h5>
              )}
              {type == 2 && (
                <h5
                  style={{ marginLeft: "24%" }}
                  className="modal-title"
                  id="exampleModalLabel"
                >
                  Reject Confirmation
                </h5>
              )}
              {type == 3 && querydata && (
                <h5
                  style={{ marginLeft: "24%" }}
                  className="modal-title"
                  id="exampleModalLabel"
                >
                  Pending
                </h5>
              )}
              {type == 3 && !querydata && (
                <h5
                  style={{ marginLeft: "24%" }}
                  className="modal-title"
                  id="exampleModalLabel"
                >
                  Query Confirmation
                </h5>
              )}
              {type == 4 && (
                <h5
                  style={{ marginLeft: "24%" }}
                  className="modal-title"
                  id="exampleModalLabel"
                >
                  Update Confirmation
                </h5>
              )}
              {type == 5 && (
                <h5
                  style={{ marginLeft: "24%" }}
                  className="modal-title"
                  id="exampleModalLabel"
                >
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
                  setQueryData(false);
                  setqueryUserId(0);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="heyaa container px-0 mt-">
                  {type == 1 && (
                    <div className="row">
                      <div className="col-md-12">
                        {showSubmit ? (
                          <p className="mb-2">
                            Are you sure you want to submit this modified
                            {expense && expense.type == 0 ? (
                              <span> expense ?</span>
                            ) : (
                              <span> request ?</span>
                            )}
                          </p>
                        ) : (
                          true &&
                          true && (
                            <p className="mb-2">
                              Are you sure you want to approve the{" "}
                              {expense && expense.type == 0 ? (
                                <span>expense ?</span>
                              ) : (
                                <span>request ?</span>
                              )}{" "}
                            </p>
                          )
                        )}
                        {showFiles &&
                          hierarchyList[hierarchyList.length - 1].userId !=
                            user.id &&
                          expense.type == 1 && (
                            <p className="mb-2">
                              Are you sure you want to approve the{" "}
                              {expense && expense.type == 0 ? (
                                <span>expense ?</span>
                              ) : (
                                <span>request ?</span>
                              )}{" "}
                            </p>
                          )}
                        {!showFiles &&
                          expense.type == 1 &&
                          hierarchyList[hierarchyList.length - 1].userId ==
                            user.id && (
                            <p className="mb-2">
                              {
                                <span className="text text-danger">
                                  {/* Are you want to approve the purchase request
                                  without attaching Purchase Order{" "} */}
                                  Are you want to approve the purchase request
                                  without attaching Purchase Order
                                </span>
                              }
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
                      {type == 3 && querydata && (
                        <p>
                          you already have one query unanswered for this
                          subexpense
                        </p>
                      )}
                      {type == 3 && !querydata && (
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
                              <MenuItem value={0}>{"Select User"}</MenuItem>
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
                        {!querydata && (
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
                        )}
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
                      <div className="col-md-12" style={{ fontSize: "11px" }}>
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
                                    Upload Quotation
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
                                            onClick={() => {
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
                            {attachmentKList?.map((el, i) => {
                              return (
                                <li
                                  style={{ color: "blue", cursor: "pointer" }}
                                  key={i}
                                >
                                  {" "}
                                  <a
                                    onClick={() => {
                                      handleDownload(el);
                                    }}
                                  >
                                    {" "}
                                    {el.attachmentFileName}{" "}
                                  </a>{" "}
                                  &nbsp;{" "}
                                  <span
                                    className="text-danger"
                                    onClick={() => {
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
            <div className="modal-footer" style={{ border: "none" }}>
              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                                setNote("")
                                setqueryUserId(0)
                                setQueryData(false)
                            }} >Close</button> */}
              {type == 1 && (
                <button
                  type="button"
                  style={{
                    fontSize: "11px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  className="btn btn-primary"
                  onClick={() => {
                    approveExpense();
                    // changeCxategory();
                  }}
                >
                  {" "}
                  {showSubmit ? <span>Submit</span> : <span>Approve</span>}
                </button>
              )}
              {type == 2 && (
                <button
                  style={{
                    fontSize: "11px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    rejectExpense();
                  }}
                >
                  Reject
                </button>
              )}
              {!querydata && type == 3 && (
                <button
                  style={{
                    fontSize: "11px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  type="button"
                  className="btn btn-primary"
                  disabled={note == "" && queryUserId == 0}
                  onClick={() => {
                    setQueryData(false);
                    queryExpense();
                  }}
                >
                  Send Query
                </button>
              )}
              {type == 4 && (
                <button
                  type="button"
                  style={{
                    fontSize: "11px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  className="btn btn-primary"
                  onClick={async () => {
                    setUpdate(true);
                  }}
                >
                  Submit
                </button>
              )}
              {type == 5 && (
                <button
                  type="button"
                  style={{
                    fontSize: "11px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  className="btn btn-primary"
                  disabled={note == ""}
                  onClick={async () => {
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
        id="addVendor"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header" style={{ border: "none" }}>
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
                style={{ marginLeft: "30%" }}
              >
                {formik3.values.vendorCode ? (
                  <b>{formik3.values.vendorCode} &nbsp;</b>
                ) : (
                  ""
                )}{" "}
                Vendor Details{" "}
                {formik3?.values?.status == 1 ? (
                  <span className="text text-success">
                    {" "}
                    <DoneOutlineIcon /> Verified{" "}
                  </span>
                ) : (
                  <span className="text text-warning"> New Vendor </span>
                )}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={addVendorRef}
                onClick={() => {}}
              ></button>
            </div>
            <form
              onSubmit={formik3.handleSubmit}
              className="row mt- my-0 g-3 needs-validation"
            >
              <div className="modal-body">
                <div className="row">
                  <div className=" textual col-md-3">
                    <TextField
                      required
                      className="w-100"
                      label="Vendor Name"
                      name="vendorName"
                      // type="email"
                      disabled="true"
                      style={{ fontSize: "11px" }}
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Vendor Here"
                      size="small"
                      value={formik3?.values?.vendorName}
                      onChange={(e) => {
                        formik3.handleChange(e);
                      }}
                      error={
                        formik3?.touched?.vendorName &&
                        Boolean(formik3?.errors?.vendorName)
                      }
                      helperText={
                        formik3?.touched?.vendorName &&
                        formik3?.errors?.vendorName
                      }
                    />
                  </div>
                  <div className="textual col-md-3">
                    <TextField
                      required
                      className="w-100"
                      disabled="true"
                      label="GST No."
                      name="gstNo"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter GST no"
                      size="small"
                      value={
                        formik3.values.gstNo ? formik3.values.gstNo : "N/a"
                      }
                      onChange={(e) => {
                        formik3.handleChange(e);
                      }}
                      error={
                        formik3.touched.gstNo && Boolean(formik3.errors.gstNo)
                      }
                      helperText={formik3.touched.gstNo && formik3.errors.gstNo}
                    />
                  </div>
                  <div className=" textual col-md-3">
                    <TextField
                      required
                      className="w-100"
                      label="Pan No."
                      name="panNo"
                      // type="email"
                      variant="outlined"
                      disabled="true"
                      autoComplete="off"
                      placeholder="Enter Pan no"
                      size="small"
                      value={formik3.values.panNo}
                      onChange={(e) => {
                        formik3.handleChange(e);
                      }}
                      error={
                        formik3.touched.panNo && Boolean(formik3.errors.panNo)
                      }
                      helperText={formik3.touched.panNo && formik3.errors.panNo}
                    />
                  </div>
                  <div className=" textual col-md-3">
                    <TextField
                      required
                      className="w-100"
                      label="Account No"
                      name="accountNo"
                      // type="email"
                      disabled="true"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Account No"
                      size="small"
                      value={formik3.values.accountNo}
                      onChange={(e) => {
                        formik3.handleChange(e);
                      }}
                      error={
                        formik3.touched.accountNo &&
                        Boolean(formik3.errors.accountNo)
                      }
                      helperText={
                        formik3.touched.accountNo && formik3.errors.accountNo
                      }
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className=" textual col-md-3">
                    <TextField
                      className="w-100"
                      disabled="true"
                      label="Bank Name"
                      name="bankName"
                      // type="email"
                      required
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Bank Name"
                      size="small"
                      value={formik3.values.bankName}
                      onChange={(e) => {
                        formik3.handleChange(e);
                      }}
                      error={
                        formik3.touched.bankName &&
                        Boolean(formik3.errors.bankName)
                      }
                      helperText={
                        formik3.touched.bankName && formik3.errors.bankName
                      }
                    />
                  </div>
                  <div className=" textual col-md-3">
                    <TextField
                      required
                      className="w-100"
                      disabled="true"
                      label="IFSC"
                      name="ifsc"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter IFSC"
                      size="small"
                      value={formik3.values.ifsc}
                      onChange={(e) => {
                        formik3.handleChange(e);
                      }}
                      error={
                        formik3.touched.ifsc && Boolean(formik3.errors.ifsc)
                      }
                      helperText={formik3.touched.ifsc && formik3.errors.ifsc}
                    />
                  </div>
                  <div className=" textual col-md-3">
                    <TextField
                      required
                      className="w-100"
                      disabled="true"
                      label="State"
                      name="state"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter State"
                      size="small"
                      value={formik3.values.state}
                      onChange={(e) => {
                        formik3.handleChange(e);
                      }}
                      error={
                        formik3.touched.state && Boolean(formik3.errors.state)
                      }
                      helperText={formik3.touched.state && formik3.errors.state}
                    />
                  </div>
                  <div className=" textual col-md-3">
                    <TextField
                      className="w-100"
                      label="Pin Code"
                      name="pinCode"
                      // type="email"
                      disabled="true"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Pin Code"
                      size="small"
                      value={formik3.values.pinCode}
                      onChange={(e) => {
                        formik3.handleChange(e);
                      }}
                      error={
                        formik3.touched.pinCode &&
                        Boolean(formik3.errors.pinCode)
                      }
                      helperText={
                        formik3.touched.pinCode && formik3.errors.pinCode
                      }
                    />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className=" textual col-md-3">
                    <TextField
                      required
                      multiline
                      rows={2}
                      disabled="true"
                      className="w-100"
                      label="Address"
                      name="address"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Address"
                      size="small"
                      value={formik3.values.address}
                      onChange={(e) => {
                        formik3.handleChange(e);
                      }}
                      error={
                        formik3?.touched?.address &&
                        Boolean(formik3?.errors?.address)
                      }
                      helperText={
                        formik3?.touched?.address && formik3?.errors?.address
                      }
                    />
                  </div>
                  <div className=" textual col-md-3 mt-2">
                    <TextField
                      required
                      disabled="true"
                      className="w-100"
                      label="Email"
                      name="email"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter email"
                      size="small"
                      value={
                        formik3?.values?.email ? formik3?.values?.email : "N/A"
                      }
                      onChange={(e) => {
                        formik3.handleChange(e);
                      }}
                      error={
                        formik3?.touched?.email &&
                        Boolean(formik3?.errors?.email)
                      }
                      helperText={
                        formik3?.touched?.email && formik3?.errors?.email
                      }
                    />
                  </div>
                  <div className=" textual col-md-3 mt-2">
                    <TextField
                      required
                      disabled="true"
                      className="w-100"
                      label="Mobile"
                      name="msisdn"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Phone"
                      size="small"
                      value={
                        formik3?.values?.msisdn
                          ? formik3?.values?.msisdn
                          : "N/A"
                      }
                      onChange={(e) => {
                        formik3.handleChange(e);
                      }}
                      error={
                        formik3?.touched?.msisdn &&
                        Boolean(formik3?.errors?.msisdn)
                      }
                      helperText={
                        formik3?.touched?.msisdn && formik3?.errors?.msisdn
                      }
                    />
                  </div>
                  {/* <div className="col-md-3">
                    <label>MSME</label>

                    <div className="row justify-content-between">
                      {formik3?.values?.isMsme == 0 && (
                        <span className="badge bg-secondary">No</span>
                      )}
                      {formik3?.values?.isMsme == 1 && (
                        <span className="badge bg-primary">Yes</span>
                      )}
                     
                    </div>
                  </div> */}

                  <div className="col-md-3">
                    <label>MSME</label>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="isMsme"
                        value={formik3?.values?.isMsme}
                      >
                        <div className="row justify-content-between">
                          <div className="col-md-4">
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              disabled={true}
                              label="Yes"
                            />
                          </div>
                          <div className="col-md-6">
                            <FormControlLabel
                              value="0"
                              disabled={true}
                              control={<Radio />}
                              label="No"
                            />
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                {true ? (
                  <div className="row mt-4">
                    {formik3?.values?.msmeCheck == "" ||
                    formik3?.values?.msmeCheck == null ? (
                      <></>
                    ) : (
                      <div className="col-md-3">
                        <label>MSME Certificate</label>
                        {formik3?.values?.msmeCheck == "" ? (
                          <p>N/A</p>
                        ) : (
                          <a
                            className="text text-primary"
                            href={formik3?.values?.msmeCheck}
                            target="_blank"
                          >
                            {formik3?.values?.msmeCheck.slice(
                              formik3?.values?.msmeCheck.lastIndexOf("/") + 1
                            )}{" "}
                          </a>
                        )}
                      </div>
                    )}
                    {formik3?.values?.gstfileCheck == "" ||
                    formik3?.values?.gstfileCheck == null ? (
                      <></>
                    ) : (
                      <div className="col-md-3">
                        <label>GST File</label>
                        {formik3?.values?.gstfileCheck == "" ? (
                          <p>N/A</p>
                        ) : (
                          <a
                            className="text text-primary"
                            href={formik3?.values?.gstfileCheck}
                            target="_blank"
                          >
                            {formik3?.values?.gstfileCheck.slice(
                              formik3?.values?.gstfileCheck.lastIndexOf("/") + 1
                            )}{" "}
                          </a>
                        )}
                      </div>
                    )}
                    {formik3?.values?.panFileCheck == "" ||
                    formik3?.values?.panFileCheck == null ? (
                      <></>
                    ) : (
                      <div className="col-md-3">
                        <label>PAN File</label>
                        {formik3?.values?.panFileCheck == "" ? (
                          <p>N/A</p>
                        ) : (
                          <a
                            className="text text-primary"
                            href={formik3?.values?.panFileCheck}
                            target="_blank"
                          >
                            {formik3?.values?.panFileCheck?.slice(
                              formik3?.values?.panFileCheck?.lastIndexOf("/") +
                                1
                            )}{" "}
                          </a>
                        )}
                      </div>
                    )}
                    {formik3?.values?.chequeFileCheck == "" ||
                    formik3?.values?.chequeFileCheck == null ? (
                      <></>
                    ) : (
                      <div className="col-md-3">
                        <label>Cancelled Cheque</label>
                        {formik3?.values?.chequeFileCheck == "" ? (
                          <p>N/A</p>
                        ) : (
                          <a
                            className="text text-primary"
                            href={formik3?.values?.chequeFileCheck}
                            target="_blank"
                          >
                            {formik3?.values?.chequeFileCheck?.slice(
                              formik3?.values?.chequeFileCheck?.lastIndexOf(
                                "/"
                              ) + 1
                            )}{" "}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="row mt-3">
                    <div className="col-md-3">
                      <TextField
                        required
                        multiline
                        rows={2}
                        className="w-100"
                        label="Address"
                        name="address"
                        // type="email"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Enter Address"
                        size="small"
                        value={formik3?.values?.address}
                        onChange={(e) => {
                          formik3.handleChange(e);
                        }}
                        error={
                          formik3.touched.address &&
                          Boolean(formik3.errors.address)
                        }
                        helperText={
                          formik3.touched.address && formik3.errors.address
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              {true ? (
                <></>
              ) : (
                <div className="modal-footer">
                  {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                  <button
                    type="submit"
                    style={{
                      fontSize: "11px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
