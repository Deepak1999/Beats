import ReplyIcon from "@mui/icons-material/Reply";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  IconButton,
  Checkbox,
  InputAdornment,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
  ThemeProvider,
  Tooltip,
} from "@mui/material";

import * as yup from "yup";

import axios from "axios";

import DownloadIcon from "@mui/icons-material/Download";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ElectricMeterIcon from "@mui/icons-material/ElectricMeter";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DoneIcon from "@mui/icons-material/Done";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import UploadIcon from "@mui/icons-material/Upload";
import { createTheme } from "@mui/material/styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { common_axios } from "../../App";
import "../../assets/css1/expensedetail.css";
import attachment from "../../assets/images/attachment.png";
import edit from "../../assets/images/edit.png";
import mod_history from "../../assets/images/mod_history.jpg";
import query from "../../assets/images/raise query.png";
import dots from "../../assets/images/three dotes.png";
import trend from "../../assets/images/trendjpg.jpg";
import "./main.css";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ReactDatePicker from "react-datepicker";
import {
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { styled, lighten, darken } from "@mui/system";
const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));
const GroupItems = styled("ul")({
  padding: 0,
});
import ColumnFilter from "../../Components/ColumnFilter";
import { ExpenseDetailTable } from "../../Components/ExpenseDetailTable";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import {
  setMilestoneId,
  setQueryId,
  setexpenseId,
} from "../../redux/features/expenseIdSlice";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
import enUS from "date-fns/locale/en-US";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { toast } from "react-toastify";
import { NotesTable } from "../../Components/NotesTable";
import { PaymentTerm } from "../../Components/PaymentTerm";
import HierarchyListComp from "../../Components/HierarchyListComp";

export default function ExpenseDetail() {
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
  const [hideSkeleton, setHideSkeleton] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [showSubmit, setShowSubmit] = useState(false);
  const modalContact4Close = useRef(null);
  const [deleteArray, setDeleteArray] = useState([]);
  const [querySub, setQuerySub] = useState(0);
  const [showCat, setShowCat] = useState("");
  const [queryUserId, setqueryUserId] = useState(0);
  const modalPaymentClose = useRef(null);
  const [hidepSubmit, sethidepSubmit] = useState(false);
  const pattern = new RegExp(/^\d{0,10}$/);
  const [querydata, setQueryData] = useState(false);
  const [poRemarks, setpoRemarks] = useState("");

  const [termsObj, setTermsObj] = useState(null);

  const [isDuplicate, setisDuplicate] = useState(false);

  const [vendorDetails, setVendorDetails] = useState(null);

  const [states1, setstatesList] = useState([]);

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
  const [milestones1, setMilestones1] = useState([
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
  const [states, setStates] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [qId, setqId] = useState(0);
  const [siteIdList, setSiteIdList] = useState([]);
  const [replyIndex, setreplyIndex] = useState(0);
  const [showSiteN, setshowSiteN] = useState("");
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
  const [showTerm, setShowTerm] = useState(true);
  const [showSave, setShowSave] = useState(false);
  const [deleteNote, setDeleteNote] = useState("");
  const [revenue, setRevenue] = useState("");
  const [terms, setTerms] = useState("");
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
  const [trends, setTrends] = useState([]);
  const [currencyId, setCurrencyId] = useState("");
  const [hideQuery, setHideQuery] = useState(false);
  const [detailHistory, setDetailHistory] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [errorBool, seterrorBool] = useState(false);
  const dispatch = useDispatch();
  const [note, setNote] = useState("");
  const [type, setType] = useState(0);
  const [showFiles, setShowFiles] = useState(false);
  const [pofileArray, setpoFileArray] = useState([]);
  const [pendingQuery, setPendingQuery] = useState(false);
  const [actionData, setActionData] = useState({});
  const [actionIndex, setActionIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [businessCompany, setBusinessCompany] = useState("");
  const [vendorList, setVendorList] = useState([]);
  const [vendorList1, setVendorList1] = useState([]);
  const [showDetail, setShowDetails] = useState(false);
  const [showPO, setShowPO] = useState(false);
  const [initialValues, setInitialValues] = useState({
    // templateType: "",
    expenseTitle: "",
    expenseDate: "",
    projectId: 0,
  });
  const [cat, setCat] = useState("");
  const [subCat, setSubCate] = useState("");
  const [checked1, setChecked1] = useState(1);
  const [mCreate, setMCreate] = useState(false);
  const [mCount, setMCount] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [amountObj, setAmountObj] = useState({
    basicAmount: "",
    totalAmount: "",
    gstAmount: "",
    unitPrice: "",
    quantity: "",
    freight: 0,
    freightAmount: "",
    remarks: "",
  });

  const [amountIndex, setAmountIndex] = useState(0);
  const [amountPickindex, setAmountPickIndex] = useState(0);

  const [newAmountObj, setnewAmountObj] = useState(null);

  const [queryString, setQueryString] = useState("");

  const location = useLocation();
  const myParam = new URLSearchParams(location.search).get("expenseId");
  useEffect(() => {
    if (myParam) {
      // console.log(myParam);
      setQueryString(myParam);
      localStorage.setItem("expenseId", myParam);
    }
  }, [myParam]);

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    // console.log();
    getStates();
    if (!isEmpty(params) && params.expenseId) {
      dispatch(setLoader(true));
      getExpenseDetail(params.expenseId);
      localStorage.setItem("expenseId", params.expenseId);
      setExpenseId(params.expenseId);
      setDetailView(true);
      // getExpenseDetail(params.expenseId);
    }

    return () => {
      if (localStorage.getItem("expenseId")) {
        dispatch(setexpenseId(localStorage.getItem("expenseId")));
      }
    };
  }, [params.expenseId]);

  const getStates = async () => {
    let formdata = {
      country: "India",
    };
    const res = await axios.post(
      `https://countriesnow.space/api/v0.1/countries/states`,
      formdata
    );
    if (res.data) {
      if (res.data) {
        setstatesList(res.data.data.states);
      } else {
      }
    }
  };

  const [pageHeading, setPageHeading] = useState("");
  const getProjecrIdBy = async (id) => {
    const res = await common_axios.post(`/project/detail/${id}`);
    if (res?.data) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        getVendors(res.data.project.companyId);
        getVendors1(res.data.project.companyId);
      }
    }
  };

  const getVendors1 = async (id) => {
    const res = await common_axios.post(`/vendor/getBybusinessCompany/${id}`);
    if (res?.data?.statusDescription?.statusCode == 200) {
      // console.log(res.data.vendorList);
      res.data.vendorList.unshift({ vendorName: "Add Vendor", id: -1 });
      const options = res.data.vendorList.map((option) => {
        const type = option.id;
        return {
          firstLetter: type == -1 ? "New Vendor" : "Existing Vendor",
          ...option,
        };
      });
      setVendorList1(options);
    } else {
      // console.log(res.data.vendorList);
      let vendorList = [];
      vendorList.unshift({ vendorName: "Add Vendor", id: -1 });
      const options = vendorList.map((option) => {
        const type = option.id;
        return {
          firstLetter: type == -1 ? "New Vendor" : "Existing Vendor",
          ...option,
        };
      });
      setVendorList1(options);
    }
  };

  const handleChange1 = (index, value) => {
    const values = [...milestones];
    // console.log(value);

    if (value == 0) {
      values[index]["isAdvance"] = 1;
    } else {
      values[index]["isAdvance"] = 0;
    }

    setMilestones(values);
  };
  /**
   * Calculates and updates form values for basic amount and total amount.
   * @example
   * updateFormAmounts()
   * // Updates form fields with calculated amounts
   * @returns {void} Updates the form fields with calculated basic and total amounts based on current form values.
   * @description
   *   - Multiplies quantity by unit price to compute the basic amount.
   *   - Applies GST and adds freight to calculate the total amount.
   *   - Utilizes fixed-point notation for monetary values.
   */

  const calculateTotal = () => {
    let totalbasicAmount =
      Number(formik2.values.quantity) * Number(formik2.values.unitPrice);
    totalbasicAmount = totalbasicAmount.toFixed(2);
    formik2.setFieldValue("basicAmount", totalbasicAmount);
    let totalAmount =
      (Number(formik2.values.gstAmount) / 100) * Number(totalbasicAmount) +
      Number(totalbasicAmount) +
      Number(formik2.values.freightAmount);
    totalAmount = totalAmount.toFixed(2);
    formik2.setFieldValue("totalAmount", totalAmount);
  };
  const calculateTotal1 = () => {
    let totalbasicAmount =
      Number(formik5.values.quantity) * Number(formik5.values.unitPrice);
    totalbasicAmount = totalbasicAmount.toFixed(2);
    formik5.setFieldValue("basicAmount", totalbasicAmount);
    let totalAmount =
      (Number(formik5.values.gstAmount) / 100) * Number(totalbasicAmount) +
      Number(totalbasicAmount) +
      Number(formik5.values.freightAmount);
    totalAmount = totalAmount.toFixed(2);
    formik5.setFieldValue("totalAmount", totalAmount);
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

  const gstNoCheckAndPanCheck = async () => {
    if (formik3.values.gstNo) {
      let formdata = {
        gstNo: formik3.values.gstNo,
      };
      const res = await common_axios.post("/vendor/check", formdata);
      const { statusDescription } = res.data;
      if (statusDescription.statusCode == 200) {
        setisDuplicate(true);
        setType(2);
      } else {
        setisDuplicate(false);
      }
    } else if (formik3.values.gstNo && formik3.values.panNo) {
      let formdata = {
        gstNo: formik3.values.gstNo,
        panNo: formik3.values.panNo,
      };
      const res = await common_axios.post("/vendor/check", formdata);
      const { statusDescription } = res.data;
      if (statusDescription.statusCode == 200) {
        setisDuplicate(true);
        setType(2);
      } else {
        setisDuplicate(false);
      }
    } else {
      if (formik3.values.panNo) {
        let formdata = {
          panNo: formik3.values.panNo,
        };
        const res = await common_axios.post("/vendor/check", formdata);
        const { statusDescription } = res.data;
        if (statusDescription.statusCode == 200) {
          setisDuplicate(true);
          setType(1);
        } else {
          setisDuplicate(false);
        }
      }
    }
  };
  const handleRadio1 = async (value) => {
    await setChecked1(value);
  };

  const handleDownload1 = async () => {
    let list = [];
    list.push(expenseId);
    let formdata = {
      expenseIds: list,
      purchaseId: expense.id,
    };
    let res = await common_axios.post(`/expense/attachment/download`, formdata);
    if (res) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        const fileUrl = res.data.encryptedResponse;
        const anchor = document.createElement("a");
        anchor.href = fileUrl;
        anchor.target = "_blank";
        anchor.download = "any Name";
        anchor.click();
      } else {
        toast("No Attachments found");
      }
    }
  };
  const checkLogic = () => {
    const values = [...milestones1];
    let sum1 = 0;
    let totalAmount = 0;
    values.forEach((data) => {
      if (checked1 == 1) {
        totalAmount = totalAmount + Number(data.percentage);
        sum1 = sum1 + Number(data.finalAmount);
      } else {
        sum1 = sum1 + Number(data.finalAmount);
      }
    });
    sum1 = sum1.toFixed(2);
    if (true) {
      if (checked1 == 1) {
        if (totalAmount != 100) {
          Swal.fire({
            icon: "warning",
            title: "Percentage mismatch error",
            text: `You entered  milestones for  ${totalAmount}%  this  should  be  equal  to  100%`,
            // text: `Total purchase Amount : ${new Intl.NumberFormat().format(
            //   expeseAmount
            // )} and total milestones amount entered :${new Intl.NumberFormat().format(
            //   sum1
            // )}`,
          });
          return false;
        } else {
          return true;
        }
      } else {
      }
    }
  };
  //Loading...
  const mileStoneSubmit = async () => {
    let formdata = {
      list: milestones,
      purchaseId: Number(expenseId),
      checked: checked1,
    };
    const values = [...milestones];
    let sum1 = 0;
    let totalAmount = 0;
    values.forEach((data) => {
      if (checked1 == 1) {
        totalAmount = totalAmount + Number(data.percentage);
        sum1 = sum1 + Number(data.finalAmount);
      } else {
        sum1 = sum1 + Number(data.finalAmount);
      }
    });
    if (checked1 == 1) {
      if (totalAmount != 100) {
        Swal.fire({
          icon: "warning",
          title: "Percentage mismatch error",
          text: `You entered  milestones for  ${totalAmount}%  this  should  be  equal  to  100%`,
          // text: `Total purchase Amount : ${new Intl.NumberFormat().format(
          //   expeseAmount
          // )} and total milestones amount entered :${new Intl.NumberFormat().format(
          //   sum1
          // )}`,
        });
        return;
      }
    } else {
      if (sum1 != expeseAmount) {
        Swal.fire({
          icon: "warning",
          title: "Percentage mismatch error",
          text: `You entered  milestones for  ${totalAmount}%  this  should  be  equal  to  100%`,
          // text: `Total purchase Amount : ${new Intl.NumberFormat().format(
          //   expeseAmount
          // )} and total milestones amount entered :${new Intl.NumberFormat().format(
          //   sum1
          // )}`,
        });
        return;
      }
    }
    const res = await common_axios.post(`/payment/milestone/create`, formdata);
    if (res) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        document.getElementById("btn-amt1-close").click();
        getMilestomes(expenseId);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Milestones created successfully",
        });
        getExpenseDetail(expenseId);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something Went Wrong",
          text: res.data.statusDescription.statusMessage,
        });
      }
    }
  };
  const pickData = (values1) => {
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
      setMilestones1(values1);
    } else {
      setMCount(null);
      setMCreate(false);
    }
  };
  const [subName, setSubName] = useState("");
  const [hideSubmit, setHideSubmit] = useState(false);
  const addVendorRef = useRef(null);
  const [checked, setChecked] = useState(0);
  const [initialbool, setinitialBool] = useState(false);
  const [title, settitle] = useState("");
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
    formik2.setFieldValue("newAmount", values[e]?.amount);
    formik2.setFieldValue("oldAmount", values[e]?.amount);
    formik2.setValues({
      unitPrice: values[e]?.amountObj?.unitPrice,
      basicAmount: values[e]?.amountObj?.basicAmount,
      gstAmount: values[e]?.amountObj?.gstAmount,
      totalAmount: values[e].amountObj?.totalAmount,
      warranty: values[e]?.terms?.warranty,
      payment: values[e]?.terms?.payment,
      delivery: values[e]?.terms?.delivery,
      quantity: values[e]?.amountObj?.quantity,
      vendorId: values[e]?.vendorDetails?.id,
      vendorState: values[e]?.vendorDetails,
      oldAmount: values[e]?.amount,
      freightAmount: values[e]?.amountObj?.freightAmount,
      remarks: values[e]?.amountObj?.remarks,
    });
    setsubExpenseId(values[e].id);
    getProjecrIdBy(expense.projectId);
    await modalContactRef4.current.click();
  };
  const clearAmount = () => {
    let values = [...milestones];
    values = values.map((x) => {
      return { ...x, finalAmount: "", amount: "", value: "", percentage: "" };
    });
    setMilestones(values);
  };
  const handleInput = (index, event) => {
    let values = [...milestones];
    values[index][event.target.name] = event.target.value;
    if (event.target.name == "value") {
      if (checked1 == 0) {
        values[index]["value"] = event.target.value;
        values[index]["amount"] = event.target.value;
      } else {
        values[index]["value"] = event.target.value;
        values[index]["percentage"] = event.target.value;
      }
    }
    setMilestones(values);
  };
  const AmountPercentLogic = (index, value) => {
    const values = [...milestones];
    if (checked1 == 0) {
      values[index]["finalAmount"] = Number(value).toFixed(2);
    } else {
      values[index]["finalAmount"] = Number(
        (expeseAmount * value) / 100
      ).toFixed(2);
    }
  };
  const milestonesCreate = (count) => {
    let totalMilestones = [];
    if (count) {
      for (let i = 0; i < count; i++) {
        let formdata = null;
        formdata = {
          description: "",
          amount: "",
          status: 0,
          createdBy: "",
          createdOn: "",
          percentage: "",
          finalAmount: "",
          value: "",
          sequence: i + 1,
          isAdvance: 0,
        };
        totalMilestones.push(formdata);
      }
      setMilestones(totalMilestones);
      setMCreate(true);
    }
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
  const getPaymentTerms = (data) => {
    if (data) {
      sethidepSubmit(true);
      formik4.handleReset();
      formik4.setValues({
        payment: data?.payment,
        warranty: data?.warranty,
        delivery: data?.delivery,
      });
    } else {
      sethidepSubmit(false);
    }
  };
  const removeAttachments2 = async (name) => {
    let arr = [...files.arr];
    arr.splice(name, 1);
    await setFiles({
      arr: arr,
    });
  };
  const removeAttachments3 = async (name) => {
    let arr = [...poFiles.arr];
    arr.splice(name, 1);
    await setPOFiles({
      arr: arr,
    });
    // await setFiles({
    //   arr: arr,
    // });
  };
  const UpdateVendorDetails = (data) => {
    setVendorDetails(data);
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
  useEffect(() => {
    return () => {
      if (localStorage.getItem("expenseId") != null) {
        dispatch(setexpenseId(localStorage.getItem("expenseId")));
      }
    };
  });
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
    const res = await common_axios.post(`/project/categories/0`);
    let { statusDescription } = res.data;
    if (statusDescription.statusCode == 200) {
      res.data.categories.forEach((data) => {
        if (data.id == categoryId) {
          setCategoryName(data.catTitle);
        }
      });
      let data = res.data.categories.sort(function (a, b) {
        if (a.catTitle < b.catTitle) {
          return -1;
        }
        if (a.catTitle > b.catTitle) {
          return 1;
        }
        return 0;
      });
      setCategories(data);
    } else {
    }
  };
  const getSubIds = async (value) => {
    if (value) {
      const res = await common_axios.post(`/project/sub/categories/${value}`);
      if (res?.data?.statusDescription?.statusCode == 200) {
        let subIdList = res.data.subCategoriesList.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        return subIdList;
      }
    }
  };
  const getSubIds1 = async (value, idnex) => {
    if (value) {
      const res = await common_axios.post(`/project/sub/categories/${value}`);
      if (res?.data?.statusDescription?.statusCode == 200) {
        const values = [...inputfields];
        values[idnex].newCategoryId = value;
        values[idnex].subIdList = [];
        values[idnex].subCatState = null;
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
      }
    }
  };
  const setnewSubCat = (index, value) => {
    const values = [...inputfields];
    values[index].newSubId = value;
    setinputfields(values);
  };
  const getSiteIds = async (projectId, projectName) => {
    const res = await common_axios.post(`/project/get/siteIds/${projectId}`);
    let { statusDescription } = res.data;
    if (statusDescription.statusCode == 200) {
      if (res.data.siteIds) {
        setSiteIdList(res.data.siteIds);
      }
    } else {
      let arr = [];
      let formdata = {
        id: 0,
        siteId: projectName.split("_")[0],
      };
      arr.push(formdata);
      setSiteIdList(arr);
    }
  };
  const deleteExpense = async (id) => {
    if (inputfields.length > 1) {
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
    } else {
      const formdata = {
        id: expenseId,
        note: deleteNote,
        projectId: expense.projectId,
        scheduleList: [],
      };
      let arr = [];
      let values = [...inputfields];

      if (arr.length > 0) {
        formdata["scheduleList"] = arr;
      }

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
          await deleteModalRefClose.current.click();
          setDeleteNote("");
          getExpenseDetail(expenseId);
          setShowButton(false);
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
    }
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
  useEffect(async () => {}, [tabIndexSel]);
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
  const openModal3 = async (type) => {
    await modalContact3.current.click();
    setType(type);
    if (type == 5) {
      let arr = [];
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
      expenseDetails.forEach((exp) => {
        if (exp.id == id) {
          exp.attachmentList?.forEach((data) => {
            arr.push(data);
          });
        }
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
  /**
   * Checks and sets the status of a pending query based on the expense ID.
   * @example
   * checkExpenseStatus('12345')
   * undefined
   * @param {string} expenseId - The ID of the expense to check.
   * @returns {void} No return value.
   * @description
   *   - Encrypts the request body with the AES key from local storage.
   *   - Sends the encrypted request to the server and decrypts the response.
   *   - Sets the pending query status based on the server response.
   */
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
    if (expenseIdSelector != 0 && isEmpty(params)) {
      setExpenseId(expenseIdSelector);
      setDetailView(true);
      getExpenseDetail(expenseIdSelector);
    }
  }, [expenseIdSelector]);
  const getMilestomes = async (id) => {
    dispatch(setLoader(true));
    const res = await common_axios.post(`/payment/milestone/get/${id}`);
    if (res) {
      dispatch(setLoader(false));
      if (res?.data?.statusDescription?.statusCode == 200) {
        setMilestones(res.data.list);
        setMilestones1(res.data.list);
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
    // encryptBody(localStorage.getItem("aesKey"), 1);
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    dispatch(setLoader(true));
    let formdata = {
      id: expenseId,
    };

    let encrypted = await common_axios.post(
      `/expenseenc/v2/details`,
      encryptBody(formdata, localStorage.getItem("aesKey"), 1)
    );

    let res = {
      data: {},
    };

    res.data = decryptBody(
      encrypted.data.encryptedResponse,
      localStorage.getItem("aesKey")
    );

    console.log(res);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setprojectId(res.data.expenseDetails.expense.projectId);
      const expense = res.data.expenseDetails.expense;
      settitle(res.data.expenseDetails.expense.title);
      await setStartDate(new Date(expense.created));
      setExpenseAmount(expense.expenseAppliedAmount);
      await setInitialValues({
        expenseTitle: expense.description,
        expenseDate: "",
        projectId: expense.projectId,
      });
      if (expense.approvalType) {
        setChecked(expense.approvalType);
      }

      if (expense.type == 1) {
        setPageHeading("Purchase Title");
      }
      if (expense.type == 2) {
        setPageHeading("Claim Title");
      }
      if (expense.type == 0) {
        setPageHeading("Expense Title");
      }
      setRevenue(expense.revenue);
      setTerms(expense.terms);
      replyExpenseCheck(expense.id);
      getSiteIds(Number(expense.projectId), expense.projectName);
      getqueryData(expenseId);
      setCurrencyId(expense.currencyId);
      if (expense.type == 1) {
        getMilestomes(expenseId);
        getPOFiles(expense.id);
      }
      await setExpense(res.data.expenseDetails.expense);
      let arr = [];
      let sum = 0;
      if (res.data.expenseDetails.expenseDetailsList != null) {
        setExpenseDetails(res.data.expenseDetails.expenseDetailsList);
        res.data.expenseDetails?.expenseDetailsList?.forEach((data) => {
          // console.log(data.id);
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
            siteId: data.siteId,
            query: data.query,
            reply: false,
            categoryName: data.categoryName,
            modifiedBy: data.modifiedBy,
            subCategoryName: data.subCategoryName,
            vendorDetails: data.vendorDetails,
            terms: data.terms,
            newCategoryId: 0,
            newSubId: 0,
            categoryId: data.categoryId,
            subCatId: data.subCategoryId,
            subIdList: [],
            categoryState: null,
            subCatState: null,
            scheduleName: null,
            invoiceNo: "Not Entered",
            startDate: data.startDate,
            endDate: data.endDate,
            businessCompany: data.businessCompany,
            vendorDetails: null,
            scheduleId: data.scheduleId,
          };

          if (data?.vendorPaymentFolio?.vendorDetails) {
            formdata["vendorDetails"] = data.vendorPaymentFolio.vendorDetails;
          }
          if (data?.vendorDetails) {
            formdata["vendorDetails"] = data.vendorDetails;
          }
          if (data.electricityData) {
            formdata["electricityData"] = data.electricityData;
          }
          if (data.scheduleName) {
            formdata["scheduleName"] = data.scheduleName;
          }

          formdata["invoiceNo"] = data?.invoiceNo ? data?.invoiceNo : "N/A";

          if (data.amountObj) {
            formdata["amountObj"] = data.amountObj;
          } else {
          }

          if (!data.vendorDetails && expense.type == 1) {
            formdata["vendorState"] = { vendorName: "New Vendor", id: -1 };
          }
          getSubIds(data.categoryId, null).then((el) => {
            formdata["subIdList"] = el;
            formdata["subCatState"] = el?.find(
              (daataaa) => daataaa?.id == data.subCategoryId
            );
          });
          if (
            data?.query?.status == 0 &&
            data.query?.queryUserId == localStorage.getItem("userId")
          ) {
            formdata["reply"] = true;
          }
          data.attachmentList?.forEach((el) => {
            formdata.expenseAttachments.push(el);
          });
          if (data.status != 2) {
            sum = sum + Number(data.totalIncVat);
          }
          arr.push(formdata);
        });

        getProjecrIdBy(expense.projectId);

        let obj1 = arr.find((x) => {
          return x.amountBreakup == null;
        });
        if (obj1) {
        }

        let obj = arr.find((x) => {
          return x.terms == null;
        });

        if (obj) {
          // console.log(obj);
          sethidepSubmit(false);
          setTermsObj(null);
        } else {
          sethidepSubmit(true);
          setTermsObj(data.terms);
        }
        setTotalSum(sum);
        setinputfields(arr);
        getCategories(expense.projectId, expense.categoryId, arr);
      }
      if (expense.userId == user.id && expense.saveStatus == 1) {
        setDetailView(false);
      }
      if (
        expense.projectId == 1134 ||
        expense.projectId == 1133 ||
        expense.projectId == 1135
      ) {
        setShowTerm(false);
      }
      let indexObj = 0;
      if (res.data?.expenseDetails?.hierarchyList != null) {
        res.data.expenseDetails.hierarchyList.forEach((data) => {
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
          if (
            expense.approverId == user.id &&
            data.userId == user.id &&
            expense.type == 1 &&
            hierarchyList[hierarchyList.length - 1]?.userId == user.id
          ) {
            setShowPO(true);
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
  const [poFiles, setPOFiles] = useState({
    arr: [],
  });
  const [data, setData] = useState([]);
  const [data3, setData3] = useState([]);
  const [activities, setactivities] = useState(false);
  const [data1, setData1] = useState([]);
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
                  .replace("expense", "purchase")
                  .replace(" an ", " a ")
                  .replace(" () ", " ")}
              {expense.type == 2 &&
                cell.row.original.activity
                  .replace("Expense", "Claim")
                  .replace("expense", "claim")
                  .replace(" an ", " a ")}
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
      id: expenseId,
      note: note,
      projectId: expense.projectId,
    };

    const values = [...inputfields];
    let milestones1 = [...milestones];

    // console.log(values);
    let obj = values.find((x) => {
      return x.terms == null || x.vendorDetails == null;
    });

    let obj1 = values.find((x) => {
      return x.amountObj == null;
    });

    if (
      (obj || milestones1.length == 0) &&
      localStorage.getItem("roleId") == "17" &&
      expense?.type == 1
    ) {
      let text = obj
        ? "Terms/Vendor details are required"
        : obj1
        ? "Amount Breakup is required"
        : "Milestones are required";

      Swal.fire({
        icon: "warning",
        title: "Data Required",
        text: text,
      });

      return;
    }

    if (obj1 && localStorage.getItem("roleId") == "17" && expense?.type == 1) {
      let text = obj1
        ? "Amount Breakup is required"
        : "Milestones are required";

      Swal.fire({
        icon: "warning",
        title: "Data Required",
        text: text,
      });
    }

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
            title: "Approved successfully",
            text:
              expense.title.slice(0, 25) +
              " raised by  " +
              expense.generatorName +
              " approved successfully",
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
      // scheduleList: [],
    };
    let arr = [];
    let values = [...inputfields];
    values.forEach((data) => {
      if (data.scheduleId) {
        arr.push(data.scheduleId);
      }
    });

    // if (arr.length > 0) {
    //   formdata["scheduleList"] = arr;
    // }

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
          text:
            expense.title.slice(0, 25) +
            " raised  by " +
            expense.generatorName +
            "rejected successfully ",
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
        setReply(false);
      } else {
        setReply(true);
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
      subExpenseId: querySub,
    };
    const encrypted = await common_axios.post(
      `/expenseenc/v2/query`,
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
    if (poFiles.arr.length == 0) {
      Swal.fire({
        icon: "warning",
        title: "file is required",
        text: "please attach file before submitting",
      });
      return;
    }
    dispatch(setLoader(true));
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
    // console.log(e);

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
    let fileArray = Array.from(e.target.files);
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
      vendorId: "-1",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    validationSchema: yup.object({
      vendorName: yup.string().max(50),
      email: yup.string().email("Invalid email").required("Required").max(30),
      bankName: yup
        .string()
        .max(50, "Bank Name must not be more than 50 characters"),
      // address: yup.string().max(100, "Address must contain 50 characters"),
      gstNo: yup
        .string()
        .max(16, "GST must be max 15 characters")
        .min(15, "GST must contain 15 characters"),
      panNo: yup
        .string()
        .max(10, "PAN must be max 10 characters")
        .min(10, "PAN must contain 10 characters"),

      // accountNo: yup
      //   .number()
      //   .max(16, "Account no must be max 16 characters")
      //   .min(16, "Account no  must contain 16 characters"),
    }),
    onSubmit: async () => {
      const arr = [...inputfields];
      if (isDuplicate) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "This GST/PAN  combination belong to an existing vendor having vendor Code ",
        });
        return;
      }
      if (!formik3.values.email.includes("@")) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Please enter a valid  email",
        });
        return;
      }
      if (formik3?.values?.isMsme == "1" && !formik3.values.msmeCer) {
        Swal.fire({
          icon: "warning",
          title: "File Required",
          text: "MSME certificate file is required",
        });
        return;
      }
      if (
        !formik3.values.cheque &&
        !formik3.values.gstFile &&
        !formik3.values.panFile &&
        !formik3.values.msmeCer
      ) {
        addVendorRef.current.click();
        arr[termsSub]["vendorDetails"] = formik3.values;
        await setinputfields(arr);
      } else {
        const formdata = new FormData();
        if (
          formik3.values.gstFile &&
          typeof formik3.values.gstFile == "object"
        ) {
          formdata.append("gstFile", formik3.values.gstFile);
        }
        if (
          formik3.values.panFile &&
          typeof formik3.values.panFile == "object"
        ) {
          formdata.append("panFile", formik3.values.panFile);
        }
        if (formik3.values.cheque && typeof formik3.values.cheque == "object") {
          formdata.append("chequeFile", formik3.values.cheque);
        }
        if (
          formik3.values.msmeCer &&
          typeof formik3.values.msmeCer == "object"
        ) {
          formdata.append("msmeCer", formik3.values.msmeCer);
        }
        formdata.append("jwtToken", localStorage.getItem("token"));
        formdata.append("userId", localStorage.getItem("userId"));
        if (
          typeof formik3.values.cheque == "object" ||
          typeof formik3.values.panFile == "object" ||
          typeof formik3.values.gstFile == "object" ||
          typeof formik3.values.msmeCer == "object"
        ) {
          const res = await common_axios.post(`/vendor/upload/files`, formdata);
          if (res?.data?.statusDescription?.statusCode == 200) {
            addVendorRef.current.click();
            // toast("Vendor Added Successfully");
            // setVendorSubmitted(true)
            arr[termsSub]["vendorDetails"] = formik3.values;
            if (res.data.gstFileResp) {
              arr[termsSub]["vendorDetails"].gstFile =
                res.data.gstFileResp.saveFileName;
              arr[termsSub]["vendorDetails"].gstfileCheck =
                res.data.gstFileResp.saveFileName;
            }
            if (res.data.panFileResp) {
              arr[termsSub]["vendorDetails"].panFile =
                res.data.panFileResp.saveFileName;
              arr[termsSub]["vendorDetails"].panFileCheck =
                res.data.panFileResp.saveFileName;
            }
            if (res.data.chequeFileResp) {
              arr[termsSub]["vendorDetails"].cheque =
                res.data.chequeFileResp.saveFileName;
              arr[termsSub]["vendorDetails"].chequeFileCheck =
                res.data.chequeFileResp.saveFileName;
            }
            if (res.data.msmeFileResp) {
              arr[termsSub]["vendorDetails"].msmeCer =
                res.data.msmeFileResp.attachmentFileName;
              arr[termsSub]["vendorDetails"].msmeCheck =
                res.data.msmeFileResp.attachmentFileName;
            }

            // console.log(arr[termsSub]["vendorDetails"]);

            vendorAddApi(arr[termsSub]["vendorDetails"]);

            // await setinputfields(arr);
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: res.data.statusDescription.statusMessage,
            });
            addVendorRef.current.click();
          }
        } else {
          addVendorRef.current.click();
        }
      }
    },
  });

  const vendorAddApi = async (data) => {
    let formdata = {
      vendorDetails: data,
      purchaseId: expenseId,
      vendorId: formik3.values.vendorId,
    };

    const res = await common_axios.post(`/vendor/add`, formdata);
    if (res) {
      if (res?.data?.statusDescription?.statusCode === 200) {
        toast("Vendor added Successfully  ");
        getExpenseDetail(expenseId);
      } else {
        toast("Something  went  wrong ");
      }
    }
  };

  const updateExistingVendor = async (id) => {
    let formdata = {
      vendorDetails: null,
      purchaseId: expenseId,
      vendorId: id,
    };

    const res = await common_axios.post(`/vendor/add`, formdata);
    if (res) {
      if (res?.data?.statusDescription?.statusCode === 200) {
        toast("Vendor added Successfully  ");
        getExpenseDetail(expenseId);
      } else {
        toast("Something  went  wrong ");
      }
    }
  };

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


      console.log(formdata)
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

  const formik5 = useFormik({
    initialValues: {
      basicAmount: "",
      unitPrice: "",
      quantity: "",
      gstAmount: "0",
      totalAmount: "",
      freight: 0,
      remarks: "",
      freightAmount: "0",
      subExpenseId: "",
      totalExpenseAmount: "0",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
      let formdata = {
        amountBreakup: values,
        purchaseId: Number(expenseId),
        subPurchaseId: formik5.values.subExpenseId,
      };
      const res = await common_axios.post(
        `/vendor/add/amountbreakup`,
        formdata
      );

      if (res) {
        if (res?.data?.statusDescription?.statusCode == 200) {
          getExpenseDetail(expenseId);
          document.getElementById("btn-amount1-close").click();
          toast("Amount Breakup added successfully");
        } else {
          toast("Something went Wrong");
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
    onSubmit: async () => {
      let values = formik4.values;
      values["type"] = 1;
      let formdata = {
        terms: formik4.values,
        purchaseId: expenseId,
      };

      const res = await common_axios.post(`/vendor/add/tc`, formdata);

      if (res) {
        if (res?.data?.statusDescription?.statusCode == 200) {
          await setTermsSub(0);
          toast("Terms & Conditions added successfully");
          // document.getElementById("paymentClose").click();

          modalPaymentClose.current.click();

          getExpenseDetail(expenseId);
        } else {
          toast("Something Wrong");
        }
      }
    },
  });
  const uploadArray = async () => {
    // dispatch(setLoader(true));
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
    onSubmit: async () => {},
  });
  const redirectExpense = () => {
    if (tabIndexSel == -1) {
      history.push("/search");
    } else {
      history.push("/expense");
    }
  };
  const historyRedirect = () => {
    localStorage.removeItem("expenseId");
    history.push("/expense");
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
  const handleRemoveFields1 = () => {
    if (inputfields.length == 1) {
      return;
    }
    const values = [...inputfields];
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
            <div role="presentation" onClick={() => {}}>
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
                    {expense && expense.type == 0 && "Expense Detail"}
                    {expense && expense.type == 1 && "Purchase Order"}
                    {expense && expense.type == 2 && "Claim  Detail"}
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
                    <form
                      className="row expense_lable expense_row  g-3 needs-validation"
                      noValidate
                    >
                      <div>
                        <div className="row ">
                          {expense && (
                            <div className="col-md-auto">
                              <p style={{ fontSize: "small", margin: "0" }}>
                                {expense && expense.type == 0 && (
                                  <span>Expense Id </span>
                                )}

                                {expense && expense.type == 1 && (
                                  <span> Purchase Id </span>
                                )}
                                {expense && expense.type == 2 && (
                                  <span> Claim Id </span>
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
                                    :<b>{expense.id}</b>{" "}
                                    {expense.isImportant == "1" && (
                                      <span
                                        className="text text-danger"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        {" "}
                                        Important
                                      </span>
                                    )}
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
                                    {expense.generatorName}
                                  </b>{" "}
                                </span>
                              </p>
                            )}
                          </div>
                          {expense.type == 2 && (
                            <div className="col-md-auto">
                              {expense.type == 2 && (
                                <p style={{ fontSize: "small", margin: "0" }}>
                                  Emp Code{" "}
                                  <span>
                                    :{" "}
                                    <b style={{ color: "rgb(94 93 93)" }}>
                                      {expense.empCode}
                                    </b>{" "}
                                  </span>
                                </p>
                              )}
                            </div>
                          )}

                          {expense && (
                            <>
                              <div className="col-md-auto">
                                <p style={{ fontSize: "small", margin: "0" }}>
                                  {" "}
                                  Current status
                                  <span>
                                    {expense.status == 0 && (
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
                                    {expense.status == 1 && (
                                      <span
                                        className="text text-danger"
                                        style={{ fontSize: "medium" }}
                                      >
                                        {" "}
                                        <b>Rejected </b>{" "}
                                      </span>
                                    )}
                                    {expense.status == 2 && (
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
                                        {expense.projectName}{" "}
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
                                        {currencyId}{" "}
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
                            </>
                          )}

                          {/* {expense && (
                            <div className="col-md-1">
                              <IconButton
                                title="Download All Attachments"
                                onClick={(e) => {
                                  handleDownload1();
                                }}
                              >
                                <DownloadIcon
                                  style={{
                                    color: "green",
                                    fontSize: "32px !important",
                                  }}
                                />
                              </IconButton>
                            </div>
                          )} */}
                        </div>

                        <div className="row mt-2">
                          <div className="offset-md-11  col-md-1">
                            <IconButton
                              title="Download All Attachments"
                              onClick={(e) => {
                                handleDownload1();
                              }}
                            >
                              <DownloadIcon
                                style={{
                                  color: "green",
                                  fontSize: "32px !important",
                                }}
                                fontSize="32px"
                              />
                            </IconButton>
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
                                    // <div className="d-block" key={index}>
                                    //   <div
                                    //     className={
                                    //       data.status == 0 &&
                                    //       expense &&
                                    //       data.userId == expense.approverId &&
                                    //       expense.saveStatus == 2
                                    //         ? getDesignFunc(5)
                                    //         : getDesignFunc(data.status)
                                    //     }
                                    //   >
                                    //     {data.status == 1 && (
                                    //       <p className="text text-danger">
                                    //         <CloseIcon
                                    //           style={{ color: "white" }}
                                    //         />{" "}
                                    //       </p>
                                    //     )}
                                    //     {data.status == 0 &&
                                    //       expense &&
                                    //       data.userId == expense.approverId &&
                                    //       expense.saveStatus == 2 && (
                                    //         <AccessTimeIcon
                                    //           style={{ color: "white" }}
                                    //         />
                                    //       )}
                                    //     {data.status == 2 && (
                                    //       <p className=" heavy_green text text-success">
                                    //         <DoneIcon
                                    //           style={{ color: "white" }}
                                    //         />{" "}
                                    //       </p>
                                    //     )}
                                    //     {data.status == 3 && (
                                    //       <p className="text text-info">
                                    //         <DoDisturbIcon
                                    //           style={{ color: "white" }}
                                    //         />{" "}
                                    //       </p>
                                    //     )}
                                    //   </div>
                                    //   <div className="para1">
                                    //     {/* {expense && (data.userId == expense.approverId) && expense.saveStatus == 2 && <b style={{ fontSize: "smaller", color: '#000' }}> Pending at</b>} */}
                                    //     <p
                                    //       style={{
                                    //         fontSize: "smaller",
                                    //         color: "#000",
                                    //       }}
                                    //     >
                                    //       {data.userName}
                                    //     </p>
                                    //     {data.status == 0 &&
                                    //       expense &&
                                    //       data.userId == expense.approverId &&
                                    //       expense.saveStatus == 2}
                                    //   </div>
                                    // </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 react_input_col">
                        <ReactDatePicker
                          label="From"
                          className="form-control w-100"
                          selected={startDate}
                          // inputProps={{ style: { fontSize: "11px !important" } }}
                          locale="en-GB"
                          required={true}
                          showWeekNumbers
                          dateFormat="MMMM d, yyyy"
                          disabled={true}
                        />
                      </div>
                      {initialbool && (
                        <div className="col-md-3">
                          <Tooltip
                            title={
                              <h6 style={{ color: "lightblue" }}>
                                {expense.title}
                              </h6>
                            }
                            sx={{ cursor: "pointer" }}
                            arrow
                          >
                            <TextField
                              required
                              multiline
                              rows={2}
                              className="w-100"
                              label={pageHeading}
                              name="expenseTitle"
                              variant="outlined"
                              inputProps={{ style: { fontSize: "11px" } }}
                              size="small"
                              type="text"
                              onInput={() => {}}
                              value={expense.title}
                              onChange={() => {}}
                              error={
                                formik.touched.expenseTitle &&
                                Boolean(formik.errors.expenseTitle)
                              }
                              helperText={
                                formik.touched.expenseTitle &&
                                formik.errors.expenseTitle
                              }
                            />
                          </Tooltip>
                        </div>
                      )}
                      {expense.type == 1 && (
                        <div className="col-md-3 offset-md- data">
                          <FormControl>
                            <FormLabel
                              id="demo-row-radio-buttons-group-label"
                              style={{ fontSize: "13px" }}
                            >
                              Approval Type
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                            >
                              <FormControlLabel
                                value="0"
                                control={
                                  <Radio
                                    checked={checked == "0"}
                                    value="0"
                                    name="radio-buttons"
                                  />
                                }
                                label="Capex"
                                className="smallLabel"
                              />
                              <FormControlLabel
                                value="1"
                                control={
                                  <Radio
                                    checked={checked == "1"}
                                    value="1"
                                    name="radio-buttons"
                                  />
                                }
                                label="Opex"
                                className="smallLabel"
                                disabled
                              />
                              <FormControlLabel
                                value="2"
                                control={
                                  <Radio
                                    checked={checked == "2"}
                                    value="2"
                                    name="radio-buttons"
                                  />
                                }
                                label="Both"
                                className="smallLabel"
                                disabled
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      )}
                      {expense.type == 1 && (
                        <div className="col-md-4" disabled={expeseAmount == 0}>
                          <div className="row">
                            <div className="col-md-auto">
                              {" "}
                              {
                                <p style={{ marginTop: "22px" }}>
                                  Payment milestones
                                </p>
                              }
                            </div>
                            <div className="col-md-auto">
                              {expeseAmount == 0 ? (
                                <img
                                  src={
                                    showEdit ? "edit nj.png" : "eye patch.png"
                                  }
                                  disabled={expeseAmount == 0}
                                  style={{
                                    width: "100%",
                                    cursor: "pointer",
                                    marginTop: "14px",
                                    height: "38px",
                                  }}
                                  title="Please enter amount before entering milestones"
                                  onClick={() => {
                                    Swal.fire({
                                      icon: "info",
                                      title: "Amount required",
                                      text: "Please enter purchase amount for creating milestones",
                                    });
                                    return;
                                  }}
                                />
                              ) : (
                                <img
                                  src={
                                    showEdit ? "edit nj.png" : "eye patch.png"
                                  }
                                  data-bs-toggle="modal"
                                  data-bs-target="#create-milestone1"
                                  disabled={expeseAmount == 0}
                                  style={{
                                    width: "100%",
                                    cursor: "pointer",
                                    marginTop: "14px",
                                    height: "38px",
                                  }}
                                  title="Add Payment Milestones"
                                  onClick={() => {
                                    getMilestomes(expenseId);
                                  }}
                                />
                              )}{" "}
                            </div>

                            {expense?.isFinalApproved == 1 && (
                              <div
                                className="col-md-auto"
                                style={{ marginTop: "26px" }}
                              >
                                Payment Status
                              </div>
                            )}
                            {expense?.isFinalApproved == 1 && (
                              <div
                                className="col-md-auto "
                                // style={{ marginTop: "21px" }}
                              >
                                <img
                                  src={"paymentIcon.png"}
                                  disabled={expeseAmount == 0}
                                  style={{
                                    width: "100%",
                                    cursor: "pointer",
                                    marginTop: "14px",
                                    height: "38px",
                                  }}
                                  title="Payment Status"
                                  onClick={() => {
                                    localStorage.getItem(
                                      "milestoneId",
                                      expenseId
                                    );
                                    history.push("/mDetail/" + expenseId);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* {expense.type == 1 && expense?.isFinalApproved == 1 && (
                        <div className="col-md-2" disabled={expeseAmount == 0}>
                          <div className="row">
                            <div className="col-md-auto">Payment Status</div>
                            <div
                              className="col-md-auto "
                              style={{ marginTop: "21px" }}
                            >
                              <IconButton
                                onClick={(e) => {
                                  localStorage.getItem(
                                    "milestoneId",
                                    expenseId
                                  );
                                  history.push("/mDetail/" + expenseId);
                                }}
                              >
                                <PaymentsIcon style={{ color: "green" }} />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      )} */}

                      {(projectId == 250 || projectId == 258) && (
                        <div className="col-md-2">
                          {/* <TextareaAutosize size="lg" name="Size" placeholder="Large" /> */}
                          <TextField
                            required
                            className="w-100"
                            label={`Revenue ${currencyId}`}
                            name="revenue"
                            type="number"
                            // type="email"
                            variant="outlined"
                            autoComplete="off"
                            placeholder="Enter Revenue"
                            size="small"
                            value={revenue}
                            onChange={() => {}}
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
                            // type="email"
                            variant="outlined"
                            autoComplete="off"
                            placeholder="Enter terms"
                            size="small"
                            value={terms}
                            onChange={() => {}}
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
                                      ? "row mt-4 label_root   reject_border"
                                      : "row label_root mt-3 "
                                  }
                                  key={index}
                                >
                                  {data.status == 2 && (
                                    <p style={{ marginTop: "-30px" }}>
                                      Rejected By{" "}
                                      <span className="text-danger">
                                        {data.modifiedBy}
                                      </span>
                                    </p>
                                  )}
                                  {/* {data.reply && <p style={{ marginTop: "-32px", color: "blue" }}>Query </p>} */}
                                  {expense.type == 0 && (
                                    <div
                                      className="col-md-1"
                                      style={{ textAlign: "right" }}
                                    >
                                      <div className="position-relative">
                                        <TextField
                                          name="expenseDate "
                                          label="Expense Date"
                                          variant="outlined"
                                          size="small"
                                          inputProps={{
                                            style: { fontSize: "11px" },
                                          }}
                                          type="text"
                                          className="w-100 fonts"
                                          required
                                          value={
                                            moment(data.expenseDate).format(
                                              "DD-MM-YY"
                                            )
                                              ? moment(data.expenseDate).format(
                                                  "DD-MM-YY"
                                                )
                                              : "Other"
                                          }
                                        />
                                      </div>
                                    </div>
                                  )}
                                  {
                                    <div className="col-md-1">
                                      <Tooltip
                                        title={
                                          data.siteId && (
                                            <h6 style={{ color: "lightblue" }}>
                                              {data.siteId}
                                            </h6>
                                          )
                                        }
                                        sx={{ cursor: "pointer" }}
                                        arrow
                                      >
                                        <TextField
                                          name="SiteId "
                                          label="SiteId"
                                          variant="outlined"
                                          size="small"
                                          inputProps={{
                                            style: { fontSize: "11px" },
                                          }}
                                          type="text"
                                          className="w-100 fonts"
                                          required
                                          value={
                                            data.siteId ? data.siteId : "Other"
                                          }
                                        />
                                      </Tooltip>
                                    </div>
                                  }
                                  {expense.type == 1 && (
                                    <>
                                      {data.vendorDetails ? (
                                        <div className="col-md-2">
                                          <Tooltip
                                            title={
                                              data?.vendorDetails
                                                ?.vendorName && (
                                                <h6
                                                  style={{ color: "lightblue" }}
                                                >
                                                  {
                                                    data?.vendorDetails
                                                      ?.vendorName
                                                  }
                                                </h6>
                                              )
                                            }
                                            sx={{ cursor: "pointer" }}
                                            arrow
                                          >
                                            <TextField
                                              name="VendorId "
                                              label="Vendor"
                                              variant="outlined"
                                              inputProps={{
                                                style: { fontSize: "11px" },
                                              }}
                                              size="small"
                                              type="text"
                                              className="w-100 fonts"
                                              required
                                              value={
                                                data?.vendorDetails?.vendorName
                                                  ? data.vendorDetails
                                                      ?.vendorName
                                                  : "N/A"
                                              }
                                            />
                                          </Tooltip>
                                        </div>
                                      ) : (
                                        <>
                                          {!data.vendorDetails &&
                                          expense.type == 1 &&
                                          expense.approverId == user.id &&
                                          expense.saveStatus == 2 ? (
                                            <div className="col-md-auto">
                                              <>
                                                <FormControl
                                                  style={{ width: "160px" }}
                                                >
                                                  <Autocomplete
                                                    id="controlled-dem22o1"
                                                    value={data.vendorState}
                                                    size="small"
                                                    inputprops={{
                                                      style: {
                                                        padding: "0px",
                                                        width: "160px",
                                                      },
                                                    }}
                                                    groupBy={(option) =>
                                                      option.firstLetter
                                                    }
                                                    disabled={index != 0}
                                                    // getOptionLabel={(option) =>/
                                                    //   option.title
                                                    // }
                                                    required
                                                    onChange={(
                                                      e,
                                                      newValue,
                                                      reason
                                                    ) => {
                                                      if (reason == "clear") {
                                                        return;
                                                      }

                                                      updateExistingVendor(
                                                        newValue.id
                                                      );
                                                    }}
                                                    options={vendorList1.sort(
                                                      function (a, b) {
                                                        if (
                                                          a.vendorName ==
                                                          "Add Vendor"
                                                        ) {
                                                          return -1;
                                                        } else {
                                                          if (
                                                            a.vendorName <
                                                            b.vendorName
                                                          ) {
                                                            return -1;
                                                          }
                                                          if (
                                                            a.vendorName >
                                                            b.vendorName
                                                          ) {
                                                            return 1;
                                                          }
                                                          return 0;
                                                        }
                                                      }
                                                    )}
                                                    componentsProps={{
                                                      popper: {
                                                        style: {
                                                          width: "fit-content",
                                                        },
                                                      },
                                                    }}
                                                    getOptionLabel={(option) =>
                                                      option?.vendorName || ""
                                                    }
                                                    renderInput={(params) => (
                                                      <TextField
                                                        {...params}
                                                        label="Vendor"
                                                      />
                                                    )}
                                                    renderGroup={(params) => (
                                                      <li key={params?.key}>
                                                        <GroupHeader>
                                                          {params?.group ==
                                                          "New Vendor" ? (
                                                            <span className="text-warning">
                                                              {" "}
                                                              New Vendor
                                                            </span>
                                                          ) : (
                                                            <span className="text-success">
                                                              {" "}
                                                              Existing Vendors
                                                            </span>
                                                          )}
                                                        </GroupHeader>
                                                        <GroupItems>
                                                          {params.children}
                                                        </GroupItems>
                                                      </li>
                                                    )}
                                                  />
                                                </FormControl>
                                              </>
                                            </div>
                                          ) : (
                                            <div className="col-md-2">
                                              <Tooltip
                                                title={
                                                  data?.vendorDetails
                                                    ?.vendorName && (
                                                    <h6
                                                      style={{
                                                        color: "lightblue",
                                                      }}
                                                    >
                                                      {
                                                        data?.vendorDetails
                                                          ?.vendorName
                                                      }
                                                    </h6>
                                                  )
                                                }
                                                sx={{ cursor: "pointer" }}
                                                arrow
                                              >
                                                <TextField
                                                  name="VendorId "
                                                  label="Vendor"
                                                  variant="outlined"
                                                  inputProps={{
                                                    style: { fontSize: "11px" },
                                                  }}
                                                  size="small"
                                                  type="text"
                                                  className="w-100 fonts"
                                                  required
                                                  value={
                                                    data?.vendorDetails
                                                      ?.vendorName
                                                      ? data.vendorDetails
                                                          ?.vendorName
                                                      : "N/A"
                                                  }
                                                />
                                              </Tooltip>
                                            </div>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                  {expense.type == 1 &&
                                    data?.vendorDetails != null && (
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
                                              if (!data.vendorDetails) {
                                                setHideSubmit(true);
                                              }

                                              // setVendorDetails(data.vendorDetails)
                                              UpdateVendorDetails(
                                                data.vendorDetails
                                              );
                                            }}
                                          />
                                        </Tooltip>
                                      </div>
                                    )}
                                  {expense.type == 1 &&
                                    data.vendorDetails == null &&
                                    expense.approverId == user.id &&
                                    expense.saveStatus == 2 && (
                                      <div className="col-md-auto">
                                        <button
                                          className={
                                            data.vendorDetails
                                              ? "btn bg-success btn-sm  fi_clas col_white"
                                              : "btn bg-primary btn-sm  fi_clas col_white"
                                          }
                                          type="button"
                                          style={{
                                            padding: "0",
                                            height: "33px",
                                          }}
                                          // ref={modalContact3}
                                          data-bs-toggle="modal"
                                          data-bs-target="#addVendor"
                                          onClick={(e) => {
                                            setTermsSub(index);

                                            if (
                                              data.vendorDetails &&
                                              data.vendorId == -1
                                            ) {
                                              updateVendorDetails(
                                                data.vendorDetails,
                                                index
                                              );
                                            }
                                            setHideSubmit(false);
                                          }}
                                        >
                                          <i className="fa fa-plus" />
                                        </button>
                                      </div>
                                    )}

                                  <div
                                    className={
                                      expense.type == 2 ? "d-none" : "col-md-1"
                                    }
                                    title={data?.categoryState?.catTitle}
                                    style={{ width: "15%" }}
                                  >
                                    {categories.length > 0 &&
                                    expense.isFinalApproved != 1 &&
                                    showButton &&
                                    user &&
                                    user.id == expense.approverId &&
                                    expense &&
                                    expense.saveStatus == 2 &&
                                    data?.categoryState &&
                                    expense.type == 0 ? (
                                      <FormControl fullWidth>
                                        <Autocomplete
                                          id="controlled-dem22o"
                                          value={
                                            data?.categoryState
                                              ? data?.categoryState
                                              : null
                                          }
                                          size="small"
                                          inputProps={{
                                            style: { padding: "0px" },
                                          }}
                                          required
                                          // style={{ padding: "0px" }}
                                          onChange={(e, newValue) => {
                                            if (newValue) {
                                              getSubIds1(newValue.id, index);
                                              setinputfields((prevvv) => {
                                                prevvv[index].categoryState =
                                                  newValue;
                                                return prevvv;
                                              });
                                              setShowSave(false);
                                              // setShowSave(true);
                                            }
                                          }}
                                          // defaultValue={categories.find((x) => x.id == data.categoryId)}
                                          options={categories}
                                          componentsProps={{
                                            popper: {
                                              style: { width: "fit-content" },
                                            },
                                          }}
                                          getOptionLabel={(option) =>
                                            option?.catTitle || ""
                                          }
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="Select Categories"
                                            />
                                          )}
                                        />
                                      </FormControl>
                                    ) : (
                                      <Tooltip
                                        title={
                                          data.categoryName && (
                                            <h6 style={{ color: "lightblue" }}>
                                              {data.categoryName}
                                            </h6>
                                          )
                                        }
                                        sx={{ cursor: "pointer" }}
                                        arrow
                                      >
                                        <TextField
                                          name="categoryId "
                                          label={
                                            expense.type == 2
                                              ? "Category"
                                              : "Cat"
                                          }
                                          variant="outlined"
                                          size="small"
                                          inputProps={{
                                            style: { fontSize: "11px" },
                                          }}
                                          type="text"
                                          className="w-100 fonts"
                                          required
                                          value={
                                            data.categoryName
                                              ? data.categoryName
                                              : "Other"
                                          }
                                        />
                                      </Tooltip>
                                    )}
                                  </div>
                                  <div
                                    className={
                                      expense.type == 2
                                        ? "col-md-2"
                                        : expense.type == 1
                                        ? "col-md-1"
                                        : "col-md-auto"
                                    }
                                    title={`${data?.subCatState?.name}`}
                                  >
                                    {data?.subIdList?.length > 0 &&
                                    expense.isFinalApproved != 1 &&
                                    showButton &&
                                    user &&
                                    user.id == expense.approverId &&
                                    expense &&
                                    expense.saveStatus == 2 &&
                                    expense.type == 0 ? (
                                      <FormControl fullWidth>
                                        <Autocomplete
                                          id="controlled-dem2o"
                                          size="small"
                                          inputProps={{
                                            style: {
                                              padding: "0px",
                                              fontSize: "x-small",
                                            },
                                          }}
                                          required
                                          value={
                                            data?.subCatState
                                              ? data?.subCatState
                                              : null
                                          }
                                          onChange={(e, newValue) => {
                                            if (newValue) {
                                              setinputfields((prevvv) => {
                                                prevvv[index].subCatState =
                                                  newValue;
                                                return prevvv;
                                              });
                                              setShowSave(true);
                                              setnewSubCat(index, newValue.id);
                                            }
                                          }}
                                          options={data?.subIdList}
                                          componentsProps={{
                                            popper: {
                                              style: { width: "fit-content" },
                                            },
                                          }}
                                          getOptionLabel={(option) =>
                                            option?.name || ""
                                          }
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="Select SubCategories"
                                            />
                                          )}
                                        />
                                      </FormControl>
                                    ) : (
                                      <Tooltip
                                        title={
                                          data?.subCategoryName && (
                                            <h6 style={{ color: "lightblue" }}>
                                              {data?.subCategoryName}
                                            </h6>
                                          )
                                        }
                                        sx={{ cursor: "pointer" }}
                                        arrow
                                      >
                                        <TextField
                                          name="subCategoryId "
                                          label={
                                            expense.type == 2
                                              ? "Expense Category"
                                              : "S Cat"
                                          }
                                          variant="outlined"
                                          size="small"
                                          inputProps={{
                                            style: { fontSize: "11px" },
                                          }}
                                          type="text"
                                          className="w-100 fonts"
                                          required
                                          value={
                                            data.subCategoryName
                                              ? data.subCategoryName
                                              : "N/A"
                                          }
                                        />
                                      </Tooltip>
                                    )}
                                  </div>
                                  {data?.scheduleName && (
                                    <div className="col-md-1">
                                      <Tooltip
                                        title={
                                          <h6 style={{ color: "lightblue" }}>
                                            {data.scheduleName}
                                          </h6>
                                        }
                                        sx={{ cursor: "pointer" }}
                                        arrow
                                      >
                                        <TextField
                                          name="scheduleName"
                                          label="Pay code"
                                          variant="outlined"
                                          size="small"
                                          type="text"
                                          inputProps={{
                                            style: { fontSize: "11px" },
                                          }}
                                          className="w-100 fonts"
                                          required
                                          value={data.scheduleName}
                                          onChange={() => {}}
                                        />
                                      </Tooltip>
                                    </div>
                                  )}
                                  {data.startDate && (
                                    <div className="col-md-auto">
                                      <IconButton
                                        onClick={async () => {
                                          document
                                            .getElementById("rent-click")
                                            .click();
                                          let states1 = [...states];
                                          states1[0].startDate = new Date(
                                            data.startDate
                                          );
                                          states1[0].endDate = new Date(
                                            data.endDate
                                          );
                                          setStates(states1);
                                        }}
                                        title="Select Rent Dates"
                                      >
                                        <CalendarMonthIcon
                                          sx={{
                                            color: "blue",
                                            fontSize: "xx-large",
                                            marginTop: "-10px",
                                          }}
                                        />
                                      </IconButton>
                                    </div>
                                  )}
                                  {data.electricityData && (
                                    <div
                                      className="col-md-auto"
                                      style={{ color: "red" }}
                                    >
                                      <IconButton
                                        style={{ color: "red" }}
                                        onClick={() => {
                                          document
                                            .getElementById("meter-click")
                                            .click();
                                          if (data.electricityData) {
                                            let values1 = data.electricityData;
                                            formik1.setFieldValue(
                                              "openRead",
                                              values1?.openRead
                                            );
                                            formik1.setFieldValue(
                                              "billAmount",
                                              values1?.billAmount
                                            );
                                            formik1.setFieldValue(
                                              "lateFee",
                                              values1?.lateFee
                                            );
                                            formik1.setFieldValue(
                                              "totalAmount",
                                              values1?.totalAmount
                                            );
                                            formik1.setFieldValue(
                                              "closeRead",
                                              values1?.closeRead
                                            );
                                            formik1.setFieldValue(
                                              "dueDate",
                                              values1?.dueDate
                                            );
                                          } else {
                                            formik1.setFieldValue(
                                              "dueDate",
                                              ""
                                            );
                                            formik1.setFieldValue(
                                              "closeRead",
                                              ""
                                            );
                                            formik1.setFieldValue(
                                              "openRead",
                                              ""
                                            );
                                            formik1.setFieldValue(
                                              "billAmount",
                                              values1?.billAmount
                                            );
                                            formik1.setFieldValue(
                                              "lateFee",
                                              values1?.lateFee
                                            );
                                            formik1.setFieldValue(
                                              "totalAmount",
                                              values1?.totalAmount
                                            );
                                          }
                                        }}
                                      >
                                        <span className="text-danger">
                                          <ElectricMeterIcon
                                            sx={{
                                              color: "blue",
                                              fontSize: "xx-large",
                                              marginTop: "-10px",
                                            }}
                                          />
                                        </span>
                                      </IconButton>
                                    </div>
                                  )}
                                  {data?.invoiceNo &&
                                    (expense.type == 0 ||
                                      expense.type == 2) && (
                                      <div className="col-md-1">
                                        <Tooltip
                                          title={
                                            <h6 style={{ color: "lightblue" }}>
                                              {data.invoiceNo}
                                            </h6>
                                          }
                                          sx={{ cursor: "pointer" }}
                                          arrow
                                        >
                                          <TextField
                                            name="scheduleName"
                                            label="InvoiceNo"
                                            variant="outlined"
                                            size="small"
                                            type="text"
                                            inputProps={{
                                              style: { fontSize: "11px" },
                                            }}
                                            className="w-100 fonts"
                                            required
                                            value={data.invoiceNo}
                                            onChange={() => {}}
                                          />
                                        </Tooltip>
                                      </div>
                                    )}
                                  {(expense.type == 0 || expense.type == 2) && (
                                    // col-md-2  col_size_16
                                    <div
                                      className={
                                        expense.type == 2
                                          ? "col-md-3"
                                          : "col-md-2 col_size_16"
                                      }
                                    >
                                      <Tooltip
                                        title={
                                          <h6 style={{ color: "lightblue" }}>
                                            {data.expensetitle}
                                          </h6>
                                        }
                                        sx={{ cursor: "pointer" }}
                                        arrow
                                      >
                                        <TextField
                                          name="expenseTitle"
                                          label={
                                            expense && expense.type == 0
                                              ? "Vendor Name"
                                              : "Expense Description"
                                          }
                                          variant="outlined"
                                          size="small"
                                          type="text"
                                          inputProps={{
                                            style: { fontSize: "11px" },
                                          }}
                                          className="w-100 fonts"
                                          required
                                          value={data.expensetitle}
                                          onChange={() => {}}
                                        />
                                      </Tooltip>
                                    </div>
                                  )}
                                  {data.vendorDetails && expense.type == 0 && (
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
                                            setHideSubmit(true);
                                            // setVendorDetails(data.vendorDetails)
                                            UpdateVendorDetails(
                                              data.vendorDetails
                                            );
                                          }}
                                        />
                                      </Tooltip>
                                    </div>
                                  )}
                                  {expense.type == 1 && data.amountObj && (
                                    <div className="col-md-auto">
                                      <a
                                        className=" vendor_button"
                                        // className="btn btn-primary d-none"
                                        data-bs-toggle="modal"
                                        data-bs-target="#amountExtendShow"
                                        onClick={() => {
                                          setAmountObj({
                                            basicAmount: "",
                                            totalAmount: "",
                                            gstAmount: "",
                                            unitPrice: "",
                                            quantity: "",
                                            freight: 0,
                                            freightAmount: "",
                                            remarks: "",
                                          });
                                          setAmountObj(data.amountObj);
                                        }}
                                      >
                                        Amt Breakup
                                      </a>
                                    </div>
                                  )}

                                  {expense.type == 1 &&
                                  !data.amountObj &&
                                  user.id == expense.approverId &&
                                  expense &&
                                  expense.saveStatus == 2 ? (
                                    <div className="col-md-auto">
                                      <a
                                        className=" vendor_button"
                                        // className="btn btn-primary d-none"
                                        data-bs-toggle="modal"
                                        data-bs-target="#amountExtend1"
                                        onClick={(r) => {
                                          formik5.handleReset(r);
                                          formik5.setFieldValue(
                                            "subExpenseId",
                                            data.id
                                          );
                                        }}
                                      >
                                        Add Amt Breakup
                                      </a>
                                    </div>
                                  ) : (
                                    <>
                                      {!data.amountObj && expense.type == 1 && (
                                        <div className="col-md-auto">
                                          <a
                                            className=" vendor_button"
                                            // className="btn btn-primary d-none"
                                            data-bs-toggle="modal"
                                            data-bs-target="#amountExtendShow"
                                            onClick={(r) => {
                                              formik5.handleReset(r);
                                            }}
                                          >
                                            Amt Breakup
                                          </a>
                                        </div>
                                      )}
                                    </>
                                  )}
                                  <div
                                    className="col-md-auto"
                                    style={{ width: "10%" }}
                                  >
                                    {/* <CurrencyFormat customInput={TextField} format="#### #### #### ####"/>  */}
                                    <TextField
                                      name="amount"
                                      label={
                                        expense && expense.type == 0
                                          ? ` Amount (${data.currencyId})`
                                          : ` Amt (${data.currencyId}) `
                                      }
                                      variant="outlined"
                                      size="small"
                                      inputProps={{
                                        style: {
                                          textAlign: "right",
                                          fontSize: "11px",
                                        },
                                      }}
                                      type="text"
                                      className="w-100   text_right"
                                      required
                                      // InputProps={{
                                      //   inputComponent: ,
                                      // }}
                                      value={data.amount.toLocaleString()}
                                      onChange={() => {}}
                                    />
                                  </div>

                                  {expense.type == 1 && (
                                    <div className="col-md-auto">
                                      {data.terms ? (
                                        <a
                                          className=" vendor_button"
                                          data-bs-toggle="modal"
                                          onClick={async () => {
                                            await getPaymentTerms(data.terms);
                                            sethidepSubmit(true);
                                          }}
                                          data-bs-target="#paymentTerms"
                                        >
                                          View T&C{" "}
                                        </a>
                                      ) : (
                                        <>
                                          {user.id == expense.approverId &&
                                            expense &&
                                            expense.saveStatus == 2 && (
                                              <a
                                                className=" vendor_button"
                                                data-bs-toggle="modal"
                                                onClick={async () => {
                                                  await getPaymentTerms(
                                                    data.terms
                                                  );
                                                  // sethidepSubmit(true);
                                                }}
                                                data-bs-target="#paymentTerms"
                                              >
                                                Add T&C{" "}
                                              </a>
                                            )}
                                        </>
                                      )}
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
                                                {data.expenseAttachments.length}
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
                                  {data.status != 2 &&
                                    showButton &&
                                    user &&
                                    user.id == expense.approverId &&
                                    expense &&
                                    expense.saveStatus == 2 &&
                                    expense.isFinalApproved != 1 &&
                                    (expense.type == 0 ||
                                      expense.type == 2) && (
                                      <>
                                        {data.rejectstatus ? (
                                          <div className="col-md-auto">
                                            <IconButton
                                              className="text text-danger"
                                              title="Partial Rejection"
                                              onClick={() => {
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
                                              title="Partial Rejection "
                                              onClick={() => {
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
                                  {data.status != 2 &&
                                    showButton &&
                                    user &&
                                    user.id == expense.approverId &&
                                    expense &&
                                    expense.saveStatus == 2 &&
                                    expense.isFinalApproved != 1 &&
                                    expense.type == 1 && (
                                      <>
                                        {data.rejectstatus ? (
                                          <div className="col-md-auto">
                                            <IconButton
                                              className="text text-danger"
                                              title="Partial Rejection"
                                              onClick={() => {
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
                                              title="Partial Rejection"
                                              onClick={() => {
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
                                  {data.status != 2 &&
                                    expense.isFinalApproved != 1 &&
                                    showButton &&
                                    user &&
                                    user.id == expense.approverId &&
                                    expense &&
                                    expense.saveStatus == 2 && (
                                      <div className="col-md-auto">
                                        <IconButton
                                          title="Other Actions"
                                          onClick={() => {
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
                                    )}
                                  {!showFiles &&
                                    expense.type == 1 &&
                                    hierarchyList[hierarchyList.length - 1]
                                      ?.userId == user.id &&
                                    expense.isFinalApproved != 1 && (
                                      <div className="col-md-auto">
                                        <IconButton
                                          title="Attach PO"
                                          data-bs-toggle="modal"
                                          data-bs-target="#attachPO"
                                          onClick={() => {
                                            document
                                              .getElementById("attachPO")
                                              .click();
                                          }}
                                        >
                                          <AttachFileIcon
                                            style={{
                                              marginRight: "0px",
                                            }}
                                          />
                                        </IconButton>
                                        <p style={{ fontSize: "10px" }}>
                                          Attach PO
                                        </p>
                                      </div>
                                    )}
                                  {showFiles && (
                                    <div className="col-md-auto">
                                      <div className="row">
                                        <div className="col-md-auto">
                                          <p
                                            style={{
                                              fontSize: "smaller",
                                              marginTop: "5px",
                                            }}
                                          >
                                            PO
                                          </p>
                                        </div>
                                        <div className="col-md-auto">
                                          {" "}
                                          <IconButton
                                            title="PO Files "
                                            data-bs-toggle="modal"
                                            data-bs-target="#remarkModal"
                                            onClick={() => {
                                              // document
                                              //   .getElementById("attachPO")
                                              //   .click();
                                            }}
                                          >
                                            <FileCopyIcon
                                              style={{
                                                marginRight: "0px",
                                                color: "#3d9ce3",
                                              }}
                                            />
                                          </IconButton>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {expense.isFinalApproved == 1 &&
                                    expense.status == 2 &&
                                    user.id == expense.approverId && (
                                      <>
                                        <div className="col-md-auto">
                                          <IconButton
                                            title="Other Actions"
                                            onClick={() => {
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
                                    expense.isFinalApproved != 1 &&
                                    showButton &&
                                    user &&
                                    user.id != expense.approverId &&
                                    expense &&
                                    expense.saveStatus == 2 && (
                                      <div className="col-md-auto">
                                        <IconButton
                                          title="Other Actions"
                                          onClick={() => {
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
                                    )}
                                  {data.reply && (
                                    <div className="col-md-auto">
                                      <IconButton
                                        title={`Reply Sub Expense ${data?.id}`}
                                        style={{ color: "blue" }}
                                        onClick={async (e) => {
                                          await setapiindex1(0);
                                          e.preventDefault();
                                          await setQuerySub(data.id);
                                          await setreplyIndex(index);
                                          await setqId(data.query.id);
                                          // await setapiindex1(index);
                                          openModal5(5, data.id);
                                        }}
                                      >
                                        <ReplyIcon />
                                      </IconButton>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          {inputfields.length == 0 && (
                            <h5
                              className="text-center"
                              style={{ fontSize: "11px" }}
                            >
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
                                    onClick={() => {
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
                              {inputfields.length != rejectArray.length &&
                                !showSubmit && (
                                  <button
                                    className=" btn btn-success "
                                    type="button"
                                    style={{
                                      marginRight: "8px",
                                      width: "87px",
                                      fontSize: "11px",
                                    }}
                                    onClick={() => {
                                      if (pendingQuery) {
                                        Swal.fire({
                                          icon: "warning",
                                          title: "Pending Query",
                                          text: "There is a query raised  by you which is still unanswered .So this  expense cannot be approved",
                                        });
                                        return;
                                      }
                                      if (
                                        expense.type == 1 &&
                                        showEdit &&
                                        milestones1.length > 0 &&
                                        !checkLogic()
                                      ) {
                                        let sum1 = 0;
                                        let totalAmount;
                                        let values = [...milestones1];
                                        values.forEach((data) => {
                                          if (data) {
                                            totalAmount =
                                              Number(totalAmount) +
                                              Number(data.percentage);

                                            sum1 =
                                              Number(sum1) +
                                              Number(data.finalAmount);
                                          }
                                        });
                                        Swal.fire({
                                          icon: "warning",
                                          title: "Percentage Mismatch Error",
                                          text: `You entered  milestones for  ${totalAmount}%  this  should  be  equal  to  100%`,
                                          // text: `Total purchase Amount : ${new Intl.NumberFormat().format(
                                          //   expeseAmount
                                          // )} and total milestones amount entered :${new Intl.NumberFormat().format(
                                          //   sum1
                                          // )} .Please create milestones for  ${new Intl.NumberFormat().format(
                                          //   expeseAmount
                                          // )}`,
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
                              </button>
                              {showSave && expense.type == 0 && (
                                <button
                                  className=" btn btn-primary"
                                  title="Save Categories/Sub-Categories"
                                  style={{
                                    marginRight: "8px",
                                    width: "87px",
                                    fontSize: "11px",
                                  }}
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    await modalContact4.current.click();
                                  }}
                                >
                                  Save
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
                                  onClick={() => {
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
                      {expense.type == 0 &&
                        !expenseDetails.find((x) => {
                          return x.scheduleName != null;
                        }) && (
                          <div className="">
                            {
                              <PaymentTerm
                                type={0}
                                show={false}
                                disabled={true}
                                notool={true}
                                openDialog={() => {}}
                                clicked={update}
                                closeDialog={() => {
                                  getExpenseDetail(expenseId);
                                }}
                                id={expenseId}
                                getData={true}
                                heading="Bank Details"
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
                                                  {[10, 25, 50].map((value) => {
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
                                                </select>
                                                <Tooltip title="Refresh">
                                                  <button
                                                    type="submit"
                                                    className="btn bg-gradient-primary w_btn m-0 ms-3 me-3 search_1  "
                                                    // onClick={() => RefreshBtn("Text to Copy")}
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
                                      onClick={() => {
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
                onClick={() => {
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
              {/* <div className="offset-md-11 col-md-1">
         
                <IconButton
                  title="Download All Attachments"
                  onClick={(e) => {
                    handleDownload1();
                  }}
                >
                  <DownloadIcon
                    style={{
                      color: "green",
                      fontSize: "32px !important",
                    }}
                  />
                </IconButton>
              </div> */}
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
      <button
        type="button"
        className="btn d-none"
        data-bs-toggle="modal"
        data-bs-target="#catChangeModel"
        ref={modalContact4}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="catChangeModel"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Category/Sub-Category Change
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="close_id"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to save the categories/sub-categories
              changes ?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  changeCxategory();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
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
                          !showPO &&
                          expense.type == 0 && (
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
                                  Are you want to approve the purchase request
                                  without attaching Purchase Order{" "}
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
                    if (
                      !showFiles &&
                      note == "" &&
                      expense.type == 1 &&
                      hierarchyList[hierarchyList.length - 1]?.userId == user.id
                    ) {
                      Swal.fire({
                        icon: "warning",
                        title: "Reason is required ",
                        text: "Please fill reason for not attaching Purchase Order",
                      });
                      return;
                    }
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
                  onClick={() => {
                    // approveExpense();
                    // deleteExpenseInput();
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
                  onClick={() => {
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
                  onClick={() => {
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
                  className="btn btn-primary"
                  disabled={note == "" || qId == 0}
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
        <div className="modal-dialog modal-xl">
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
                  <div className="row my-4">
                    <div className="col-md-3">
                      {
                        <>
                          <FormControl fullWidth>
                            <Autocomplete
                              id="controlled-dem22o1"
                              value={formik2.values.vendorState}
                              size="small"
                              inputProps={{
                                style: {
                                  padding: "0px",
                                  width: "160px",
                                },
                              }}
                              disabled={actionIndex != 0}
                              required
                              onChange={(e, newValue) => {
                                formik2.setFieldValue("vendorState", newValue);
                                formik2.setFieldValue("vendorId", newValue.id);
                              }}
                              options={vendorList.sort(function (a, b) {
                                if (a.vendorName == "New Vendor") {
                                  return -1;
                                } else {
                                  if (a.vendorName < b.vendorName) {
                                    return -1;
                                  }
                                  if (a.vendorName > b.vendorName) {
                                    return 1;
                                  }
                                  return 0;
                                }
                              })}
                              componentsProps={{
                                popper: {
                                  style: { width: "fit-content" },
                                },
                              }}
                              getOptionLabel={(option) =>
                                option?.vendorName || ""
                              }
                              renderInput={(params) => (
                                <TextField {...params} label="Vendor" />
                              )}
                            />
                          </FormControl>
                        </>
                      }
                    </div>
                    <div className="col-md-3">
                      <TextField
                        required
                        className="w-100"
                        label="Payment Terms"
                        name="payment"
                        // type="email"
                        disabled={actionIndex != 0}
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Enter Payment Terms"
                        size="small"
                        value={formik2.values.payment}
                        onChange={(e) => {
                          formik2.handleChange(e);
                        }}
                        error={
                          formik2.touched.payment &&
                          Boolean(formik2.errors.payment)
                        }
                        helperText={
                          formik2.touched.payment && formik2.errors.payment
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <TextField
                        className="w-100"
                        required
                        label="Warranty"
                        name="warranty"
                        // type="email"
                        disabled={actionIndex != 0}
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Enter Warranty"
                        size="small"
                        value={formik2.values.warranty}
                        onChange={(e) => {
                          formik2.handleChange(e);
                        }}
                        error={
                          formik2.touched.warranty &&
                          Boolean(formik2.errors.warranty)
                        }
                        helperText={
                          formik2.touched.warranty && formik2.errors.warranty
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <TextField
                        className="w-100"
                        required
                        label="Delivery Timeline"
                        name="delivery"
                        disabled={actionIndex != 0}
                        // type="email"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Enter Delivery Timeline"
                        size="small"
                        value={formik2.values.delivery}
                        onChange={(e) => {
                          formik2.handleChange(e);
                        }}
                        error={
                          formik2.touched.delivery &&
                          Boolean(formik2.errors.delivery)
                        }
                        helperText={
                          formik2.touched.delivery && formik2.errors.delivery
                        }
                      />
                    </div>
                  </div>
                  <div className="row   my-4">
                    <div className="col-md-3">
                      <TextField
                        required
                        className="w-100"
                        label="Unit Basic Price"
                        name="unitPrice"
                        // type="email"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Enter unit price"
                        size="small"
                        value={formik2.values.unitPrice}
                        onChange={(e) => {
                          if (
                            e?.target?.value?.match(/^(\d*\.{0,1}\d{0,2}$)/) &&
                            e?.target?.value?.length < 8
                          ) {
                            formik2.handleChange(e);
                          }
                        }}
                        onBlur={() => {
                          calculateTotal();
                        }}
                        error={
                          formik2.touched.unitPrice &&
                          Boolean(formik2.errors.unitPrice)
                        }
                        helperText={
                          formik2.touched.unitPrice && formik2.errors.unitPrice
                        }
                      />
                      <small> Unit price are exclusive of GST </small>
                    </div>
                    <div className="col-md-3">
                      <TextField
                        required
                        className="w-100"
                        label="Quantity"
                        name="quantity"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Enter quantity"
                        size="small"
                        value={formik2.values.quantity}
                        onChange={(e) => {
                          if (
                            e?.target?.value?.match(/^(\d*\.{0,1}\d{0,2}$)/) &&
                            e?.target?.value?.length < 6
                          ) {
                            formik2.handleChange(e);
                          }
                        }}
                        onBlur={() => {
                          calculateTotal();
                        }}
                        error={
                          formik2.touched.quantity &&
                          Boolean(formik2.errors.quantity)
                        }
                        helperText={
                          formik2.touched.quantity && formik2.errors.quantity
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <TextField
                        required
                        className="w-100"
                        label="Basic amount"
                        name="basicAmount"
                        // type="email"
                        disabled={true}
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Enter basic amount"
                        size="small"
                        value={formik2.values.basicAmount}
                        onChange={(e) => {
                          formik2.handleChange(e);
                        }}
                        error={
                          formik2.touched.basicAmount &&
                          Boolean(formik2.errors.basicAmount)
                        }
                        helperText={
                          formik2.touched.basicAmount &&
                          formik2.errors.basicAmount
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <TextField
                        className="w-100"
                        required
                        label="GST Amount"
                        name="gstAmount"
                        // type="email"
                        variant="outlined"
                        disabled={
                          !formik2.values.quantity && !formik2.values.unitPrice
                        }
                        autoComplete="off"
                        placeholder="Enter GST Amount"
                        size="small"
                        value={formik2.values.gstAmount}
                        onChange={(e) => {
                          if (
                            e?.target?.value?.match(/^(\d*\.{0,1}\d{0,2}$)/) &&
                            e?.target?.value?.length < 8
                          ) {
                            formik2.handleChange(e);
                          }
                        }}
                        onBlur={() => {
                          calculateTotal();
                        }}
                        error={
                          formik2.touched.gstAmount &&
                          Boolean(formik2.errors.gstAmount)
                        }
                        helperText={
                          formik2.touched.gstAmount && formik2.errors.gstAmount
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <TextField
                        className="w-100"
                        required
                        label="Freight Amount"
                        name="freightAmount"
                        // type="email
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Enter freight amount"
                        size="small"
                        value={formik2.values.freightAmount}
                        onChange={(e) => {
                          if (
                            e?.target?.value?.match(/^(\d*\.{0,1}\d{0,2}$)/) &&
                            e?.target?.value?.length < 8
                          ) {
                            formik2.handleChange(e);
                          }
                        }}
                        onBlur={() => {
                          calculateTotal();
                        }}
                      />
                    </div>
                    <div className="col-md-3">
                      <TextField
                        className="w-100"
                        required
                        label="Freight Remarks"
                        name="remarks"
                        // type="email"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Enter Remarks"
                        size="small"
                        value={formik2.values.remarks}
                        onChange={(e) => {
                          if (e?.target?.value.length < 50) {
                            formik2.handleChange(e);
                          }
                        }}
                      />
                    </div>
                    <div className="col-md-3">
                      <TextField
                        className="w-100"
                        required
                        label="Total Amount"
                        name="totalAmount"
                        disabled={true}
                        // type="email"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="Enter Total Amount"
                        size="small"
                        value={formik2.values.totalAmount}
                        onChange={(e) => {
                          formik2.handleChange(e);
                        }}
                        error={
                          formik2.touched.totalAmount &&
                          Boolean(formik2.errors.totalAmount)
                        }
                        helperText={
                          formik2.touched.totalAmount &&
                          formik2.errors.totalAmount
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
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
                                      onClick={() => {
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
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      // e.preventDefault();
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
        className=" lavel modal fade"
        id="deleteModalRef"
        tabIndex="-1"
        aria-labelledby="deleteModalRef"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{ border: "none" }}>
              {expense && actionType == 0 ? (
                <h5
                  style={{ marginLeft: "30%" }}
                  className="modal-title"
                  id="exampleModalLabel"
                >
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
              <div className="modal-footer" style={{ border: "none" }}>
                {actionType == 0 ? (
                  <button
                    style={{
                      fontSize: "11px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    type="submit"
                    className="btn btn-danger"
                    disabled={deleteNote == ""}
                    onClick={async (e) => {
                      e.preventDefault();
                      await setDeleteConfirm(true);
                      // settingRejectStatus();
                      deleteExpense(deleteId);
                      // deleteExpense()
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
        <div className="modal-dialog modal-xl">
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
                onClick={() => {
                  setDetailHistory([]);
                  setShowDetails(false);
                }}
              ></button>
            </div>
            <div className="row mx-1">
              {actionData?.id && showDetail ? (
                <ExpenseDetailTable
                  id={actionData?.id}
                  heading={"Modification History"}
                  category={cat}
                  subCategory={subCat}
                />
              ) : (
                <></>
              )}
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
            <div className="modal-header" style={{ borderBottom: "none" }}>
              {/* <h5 className="modal-title" id="exampleModalLabel">Actions</h5> */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="action-close"
              ></button>
            </div>
            {actionData && (
              <div className="modal-body">
                <div className="row  justify-content-center">
                  {expense.isFinalApproved != 1 &&
                    showButton &&
                    user &&
                    user.id == expense.approverId &&
                    expense &&
                    expense.saveStatus == 2 &&
                    reply &&
                    !actionData?.reply && (
                      <div className="col-md-auto">
                        <span className="text-black">
                          <IconButton
                            title="Raise Query"
                            style={{ color: "red" }}
                            onClick={() => {
                              openModal3(3);
                              document.getElementById("action-close").click();
                              setQuerySub(actionData?.id);
                              if (actionData?.query) {
                                setQueryData(true);
                              } else {
                                setQueryData(false);
                              }
                            }}
                          >
                            {/* <QuestionMarkIcon style={{ color: "black" }} /> */}
                            <img
                              className="img-small"
                              src={query}
                              style={{ width: "24px" }}
                            />
                          </IconButton>
                        </span>
                        <p style={{ fontSize: "10px" }}>Raise Query</p>
                      </div>
                    )}
                  {expense.isFinalApproved != 1 &&
                    showButton &&
                    user &&
                    user.id == expense.approverId &&
                    expense &&
                    expense.saveStatus == 2 && (
                      <div className="col-md-auto text-black">
                        <IconButton
                          title="Trend"
                          style={{ color: "blue" }}
                          onClick={async () => {
                            await setapiindex1(0);
                            document.getElementById("action-close").click();
                            document.getElementById("trend-click").click();
                            if (expense.type == 0) {
                              getTrends(actionData);
                            } else {
                              getTrends1(actionData);
                            }
                          }}
                        >
                          {/* <InsightsIcon style={{ color: "black" }} /> */}
                          <img
                            className="img-small"
                            src={trend}
                            style={{ width: "24px" }}
                          />
                        </IconButton>
                        <p style={{ fontSize: "10px" }}>See Trends</p>
                      </div>
                    )}
                  {expense.type == 1 &&
                    actionData?.status != 2 &&
                    user &&
                    user.id == expense.approverId &&
                    expense &&
                    expense?.saveStatus == 2 &&
                    showEdit && (
                      <div className="col-md-auto  text-black">
                        <IconButton
                          title="Modify Purchase"
                          onClick={() => {
                            document.getElementById("action-close").click();
                            openModal4(actionIndex);
                          }}
                        >
                          {/* <ModeEditIcon style={{ color: "black" }} /> */}
                          <img
                            className="img-small"
                            src={edit}
                            style={{ width: "24px" }}
                          />
                        </IconButton>
                        <p style={{ fontSize: "10px" }}>Modify Purchase</p>
                      </div>
                    )}
                  {expense.type == 1 && (
                    <div className="col-md-auto  text-black">
                      <span className="text-black">
                        <IconButton
                          title="View History"
                          onClick={async () => {
                            await setShowDetails(false);
                            document.getElementById("action-close").click();
                            modalRef5.current.click();
                            await setShowDetails(true);
                            // getHistory(e);
                          }}
                        >
                          {/* <HistoryIcon style={{ color: "black" }} /> */}
                          <img
                            className="img-small"
                            src={mod_history}
                            style={{ width: "24px" }}
                          />
                        </IconButton>
                        <p style={{ fontSize: "10px" }}>Modification History</p>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        id="trend-click"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#trendModel"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="trendModel"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Trend{" "}
                {trends?.length > 0 && expense.type == 0 && (
                  <span style={{ fontSize: "medium" }}>
                    {" "}
                    - {showCat} for <b> Site :</b> {showSiteN} -{" "}
                    {subName && (
                      <span>
                        <b>Sub Category : </b> {subName}
                      </span>
                    )}
                  </span>
                )}
                {trends?.length > 0 && expense.type == 1 && (
                  <span style={{ fontSize: "medium" }}>
                    {" "}
                    - {showCat} for <b> Business Company :</b> {businessCompany}{" "}
                    -{" "}
                    {subName && (
                      <span>
                        <b>Sub Category : </b> {subName}
                      </span>
                    )}
                  </span>
                )}
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
              {expense.type == 0 &&
                trends?.map((data) => {
                  return (
                    <>
                      <div
                        className="row mb-3"
                        style={{
                          backgroundColor: "#F7FCFF",
                          border: " 1px solid blue",
                          padding: "19px",
                        }}
                      >
                        <div className="col-md-auto">
                          <b>Id: </b> {data?.expenseId}
                        </div>
                        <div className="col-md-auto">
                          <b>Title :</b>{" "}
                          <Tooltip
                            title={
                              <h6 style={{ color: "lightblue" }}>
                                {data?.expenseTitle}
                              </h6>
                            }
                            sx={{ cursor: "pointer" }}
                            arrow
                          >
                            {" "}
                            <span className="cursor-pointer">
                              {data?.expenseTitle.slice(0, 10)}{" "}
                            </span>{" "}
                          </Tooltip>{" "}
                        </div>
                        <div className="col-md-auto">
                          <b>Amount :</b> {data?.amount}{" "}
                          <span className="text text-success">
                            {" "}
                            {data?.currencyId}{" "}
                          </span>{" "}
                        </div>
                        <div className="col-md-auto">
                          <b>Raised By: </b> {data?.initName.split(" ")[0]}{" "}
                        </div>
                        <div className="col-md-auto">
                          <b>Date: </b>{" "}
                          {moment(new Date(data.created))
                            .add(5, "hours")
                            .add(30, "minutes")
                            .format("DD-MMM-YYYY")}
                        </div>
                        <div className="col-md-auto">
                          <b> Approved at: </b>
                          {moment(new Date(data.finalApproveDate))
                            .add(5, "hours")
                            .add(30, "minutes")
                            .format("DD-MMM-YYYY ")}
                        </div>
                        {/* <div className="col-md-auto"><b>Initiator Name: </b> {data?.initName} </div>   <div className="col-md-auto"><b>Initiator Name: </b> {data?.initName} </div> */}
                      </div>
                    </>
                  );
                })}
              {expense.type == 1 &&
                trends?.map((data) => {
                  return (
                    <>
                      <div
                        className="row mb-3"
                        style={{
                          backgroundColor: "#F7FCFF",
                          border: " 1px solid blue",
                          padding: "19px",
                        }}
                      >
                        {/* <div className="col-md-auto">
                          <b>Id: </b> {data?.expenseId}
                        </div> */}
                        <div className="col-md-auto">
                          <b>Title :</b>{" "}
                          <Tooltip
                            title={
                              <h6 style={{ color: "lightblue" }}>
                                {data?.expenseTitle}
                              </h6>
                            }
                            sx={{ cursor: "pointer" }}
                            arrow
                          >
                            {" "}
                            <span className="cursor-pointer">
                              {data?.expenseTitle.slice(0, 10)}{" "}
                            </span>{" "}
                          </Tooltip>{" "}
                        </div>
                        <div className="col-md-auto">
                          <b>Quantity :</b> {data?.quantity}{" "}
                        </div>
                        <div className="col-md-auto">
                          <b>Unit Price :</b> {data?.unitPrice}{" "}
                          <span className="text text-success">
                            {" "}
                            {data?.currencyId}{" "}
                          </span>{" "}
                        </div>
                        <div className="col-md-auto">
                          <b>Basic Amount :</b> {data?.basicAmount}{" "}
                          <span className="text text-success">
                            {" "}
                            {data?.currencyId}{" "}
                          </span>{" "}
                        </div>
                        <div className="col-md-auto">
                          <b>GST Amount :</b> {data?.gstAmount}{" "}
                          <span className="text text-success">
                            {" "}
                            {data?.currencyId}{" "}
                          </span>{" "}
                        </div>
                        <div className="col-md-auto">
                          <b>Amount :</b> {Number(data?.amount).toFixed(2)}{" "}
                          <span className="text text-success">
                            {" "}
                            {data?.currencyId}{" "}
                          </span>{" "}
                        </div>
                        <div className="col-md-auto ">
                          <b>Raised By: </b> {data?.initName.split(" ")[0]}{" "}
                        </div>
                        <div className="col-md-auto mt-2">
                          <b>Date: </b>{" "}
                          {moment(new Date(data.created))
                            .add(5, "hours")
                            .add(30, "minutes")
                            .format("DD-MMM-YYYY")}
                        </div>
                        <div className="col-md-auto mt-2">
                          <b> Approved at: </b>
                          {moment(new Date(data.finalApproveDate))
                            .add(5, "hours")
                            .add(30, "minutes")
                            .format("DD-MMM-YYYY ")}
                        </div>
                        {/* <div className="col-md-auto"><b>Initiator Name: </b> {data?.initName} </div>   <div className="col-md-auto"><b>Initiator Name: </b> {data?.initName} </div> */}
                      </div>
                      <div className="row mt-2"></div>
                    </>
                  );
                })}
              {trends?.length == 0 && (
                <div>
                  <h6 style={{ textAlign: "center", padding: "40px" }}>
                    No Trend Found
                  </h6>
                </div>
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
                {formik3?.values?.vendorCode ? (
                  <b>{formik3?.values?.vendorCode} &nbsp;</b>
                ) : (
                  ""
                )}
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
                onClick={() => {
                  setHideSubmit(false);
                }}
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
                      disabled={vendorDetails != null}
                      // type="email"
                      // disabled="true"
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
                      disabled={vendorDetails != null}
                      label="GST No."
                      name="gstNo"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter GST no"
                      size="small"
                      value={formik3.values.gstNo}
                      onChange={(e) => {
                        e.target.value = e.target.value
                          .replace(/[^a-zA-Z0-9]/g, "")
                          .toUpperCase()
                          .trim();
                        if (e.target.value?.length <= 15) {
                          formik3.handleChange(e);
                        }
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
                      disabled={vendorDetails != null}
                      autoComplete="off"
                      placeholder="Enter Pan no"
                      size="small"
                      value={formik3.values.panNo}
                      onChange={(e) => {
                        e.target.value = e.target.value
                          .replace(/[^a-zA-Z0-9]/g, "")
                          .toUpperCase()
                          .trim();
                        if (e.target.value?.length <= 10) {
                          formik3.handleChange(e);
                        }
                      }}
                      error={
                        formik3.touched.panNo && Boolean(formik3.errors.panNo)
                      }
                      helperText={formik3.touched.panNo && formik3.errors.panNo}
                    />
                  </div>

                  <div className=" textual col-md-3">
                    <TextField
                      className="w-100"
                      disabled={vendorDetails != null}
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
                </div>
                <div className="row mt-3">
                  <div className=" textual col-md-3">
                    <TextField
                      required
                      className="w-100"
                      label="Account No"
                      name="accountNo"
                      // type="email"
                      disabled={vendorDetails != null}
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Account No"
                      size="small"
                      value={formik3.values.accountNo}
                      onChange={(e) => {
                        if (e.target.value.match(/^[0-9]*$/)) {
                          if (e.target.value?.length <= 16) {
                            e.target.value = e?.target?.value.trim();
                            formik3.handleChange(e);
                          }
                        }
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

                  <div className=" textual col-md-3">
                    <TextField
                      required
                      className="w-100"
                      disabled={vendorDetails != null}
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

                  {vendorDetails ? (
                    <div className=" textual col-md-3">
                      <TextField
                        required
                        className="w-100"
                        disabled={vendorDetails != null}
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
                        helperText={
                          formik3.touched.state && formik3.errors.state
                        }
                      />
                    </div>
                  ) : (
                    <div className="col-md-3" style={{ marginTop: "-9px" }}>
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-controlled-open-select-label">
                          State
                        </InputLabel>
                        <Select
                          labelId="demo-controlled-open-select-label"
                          id="demo-controlled-open-select"
                          value={formik3.values.state}
                          name="state"
                          onChange={(e) => {
                            formik3.handleChange(e);
                          }}
                        >
                          {states1.length > 0 &&
                            states1?.map((x, i) => {
                              return (
                                <MenuItem key={i} value={x.name}>
                                  {x?.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </div>
                  )}

                  <div className=" textual col-md-3">
                    <TextField
                      className="w-100"
                      label="Pin Code"
                      name="pinCode"
                      // type="email"
                      disabled={vendorDetails != null}
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Pin Code"
                      size="small"
                      value={formik3.values.pinCode}
                      onChange={(e) => {
                        if (
                          !pattern.test(e.target.value) ||
                          e.target.value?.length > 6
                        ) {
                        } else {
                          formik3.handleChange(e);
                        }
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
                      disabled={vendorDetails != null}
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
                      disabled={vendorDetails != null}
                      className="w-100"
                      label="Email"
                      name="email"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter email"
                      size="small"
                      value={formik3?.values?.email}
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
                      disabled={vendorDetails != null}
                      className="w-100"
                      label="Mobile"
                      name="msisdn"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Phone"
                      size="small"
                      value={formik3?.values?.msisdn}
                      onChange={(e) => {
                        if (
                          !pattern.test(e.target.value) ||
                          e.target.value?.length > 10
                        ) {
                        } else {
                          formik3.handleChange(e);
                        }
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
                              onChange={(e) => {
                                if (vendorDetails == null) {
                                  formik3.handleChange(e);
                                }
                              }}
                              label="Yes"
                            />
                          </div>
                          <div className="col-md-6">
                            <FormControlLabel
                              value="0"
                              onChange={(e) => {
                                if (vendorDetails == null) {
                                  formik3.handleChange(e);
                                }
                              }}
                              control={<Radio />}
                              label="No"
                            />
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                {vendorDetails != null ? (
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
                  <div className="row mt-4">
                    {formik3.values.isMsme == "1" && (
                      <>
                        {" "}
                        {formik3.values.msmeCheck == "" ||
                        (!formik3.values.msmeCer && !hideSubmit) ? (
                          <div className="col-md-3">
                            {true && (
                              <TextField
                                type="file"
                                label="MSME Certificate"
                                id="msemCER"
                                accept
                                name="msmeCer"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => {
                                  let file = e.target.files[0];
                                  if (file) {
                                    if (file.size > "20000000") {
                                      Swal.fire({
                                        icon: "warning",
                                        title: "File size too high",
                                        text: "File should be less than 20 MB",
                                      });
                                      document.getElementById("msemCER").value =
                                        "";
                                      return;
                                    }
                                    if (
                                      file.name.split(".")[1] == "png" ||
                                      file.name.split(".")[1] == "jpeg" ||
                                      file.name.split(".")[1] == "jpg" ||
                                      file.name.split(".")[1] == "pdf" ||
                                      file.name.split(".")[1] == "doc" ||
                                      file.name.split(".")[1] == "docx"
                                    ) {
                                      formik1.setFieldValue(
                                        "msmeCer",
                                        e.target.files[0]
                                      );
                                    } else {
                                      document.getElementById("msemCER").value =
                                        "";
                                      Swal.fire({
                                        icon: "warning",
                                        title: "This file format not allowed",
                                        text: "Please Attach Only PDF,JPG,PNG File Formats",
                                      });
                                    }
                                  }
                                }}
                              />
                            )}
                            {!hideSubmit && (
                              <small className="file_note">
                                {" "}
                                Max File Size limit 20 MB
                              </small>
                            )}
                            {!hideSubmit && (
                              <small className="file_note">
                                Formats supported (Png ,Jpg,Pdf,Jpeg)
                              </small>
                            )}
                          </div>
                        ) : true ? (
                          <div className="col-md-3">
                            {
                              <label>
                                MSME Certificate
                                {!hideSubmit && (
                                  <span
                                    className="text text-danger"
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                      formik1.setFieldValue("msmeCer", null);
                                      formik1.setFieldValue("msmeCheck", "");
                                    }}
                                  >
                                    Remove File
                                  </span>
                                )}
                              </label>
                            }
                            {formik3?.values?.msmeCheck == "" ? (
                              <p>N/A</p>
                            ) : (
                              <>
                                <a
                                  className="text text-primary  newStyle"
                                  href={formik3?.values?.msmeCheck}
                                  target="_blank"
                                >
                                  {formik3?.values?.msmeCheck?.slice(
                                    formik3?.values?.msmeCheck?.lastIndexOf(
                                      "/"
                                    ) + 1
                                  )}{" "}
                                </a>{" "}
                                &nbsp;
                              </>
                            )}
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                    {formik3.values.gstfileCheck == "" ||
                    !formik3.values.gstFile ? (
                      <div className="col-md-3">
                        {!hideSubmit && (
                          <TextField
                            type="file"
                            label="GST File"
                            id="gstId"
                            required={formik3.values.gstNo != ""}
                            accept
                            name="gstFile"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            onBlur={(e) => {
                              if (!formik3.values.gstNo) {
                                Swal.fire({
                                  icon: "warning",
                                  title: "Warning",
                                  text: "You're registering this vendor as a non GST vendor are you sure you want to proceed?",

                                  showCancelButton: true,
                                  denyButtonText: `Cancel`,
                                  confirmButtonText: `Proceed`,
                                }).then((res) => {
                                  if (res.isDismissed) {
                                    document.getElementById("gstId").focus();
                                  }
                                });

                                return;
                              }

                              gstNoCheckAndPanCheck();
                            }}
                            onChange={(e) => {
                              let file = e.target.files[0];
                              if (file) {
                                if (file.size > "20000000") {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "File size too high",
                                    text: "File should be less than 20 MB",
                                  });
                                  document.getElementById("gstId").value = "";
                                  return;
                                }
                                if (
                                  file.name.split(".")[1] == "png" ||
                                  file.name.split(".")[1] == "jpeg" ||
                                  file.name.split(".")[1] == "jpg" ||
                                  file.name.split(".")[1] == "pdf" ||
                                  file.name.split(".")[1] == "doc" ||
                                  file.name.split(".")[1] == "docx"
                                ) {
                                  formik3.setFieldValue(
                                    "gstFile",
                                    e.target.files[0]
                                  );
                                } else {
                                  document.getElementById("gstId").value = "";
                                  Swal.fire({
                                    icon: "warning",
                                    title: "This file format not allowed",
                                    text: "Please Attach Only PDF,JPG,PNG,WORD File Formats",
                                  });
                                }
                              }
                            }}
                          />
                        )}
                        {!hideSubmit && (
                          <small className="file_note">
                            {" "}
                            Max File Size limit 20 MB
                          </small>
                        )}
                        {!hideSubmit && (
                          <small className="file_note">
                            Formats supported (Png ,Jpg,Pdf,Jpeg)
                          </small>
                        )}
                      </div>
                    ) : (
                      <div className="col-md-3">
                        <label>
                          {" "}
                          GST File :{" "}
                          {!hideSubmit && (
                            <span
                              className="text text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                formik3.setFieldValue("gstFile", null);
                                formik3.setFieldValue("gstfileCheck", "");
                              }}
                            >
                              Remove File
                            </span>
                          )}
                        </label>
                        {formik3?.values?.gstfileCheck == "" ? (
                          <p>N/A</p>
                        ) : (
                          <>
                            <a
                              className="text text-primary  newStyle"
                              href={formik3?.values?.gstfileCheck}
                              target="_blank"
                            >
                              {formik3?.values?.gstfileCheck?.slice(
                                formik3?.values?.gstfileCheck?.lastIndexOf(
                                  "/"
                                ) + 1
                              )}{" "}
                            </a>{" "}
                            &nbsp;
                          </>
                        )}
                      </div>
                    )}
                    {formik3.values.panFileCheck == "" ||
                    (!formik3.values.panFile && !hideSubmit) ? (
                      <div className="col-md-3">
                        {!hideSubmit && (
                          <TextField
                            type="file"
                            size="small"
                            id="panId"
                            required
                            label="PAN File"
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                              let file = e.target.files[0];
                              if (file) {
                                if (file.size > "20000000") {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "File size to high",
                                    text: "File should be less than 20 MB",
                                  });
                                  document.getElementById("panId").value = "";
                                  return;
                                }
                                if (
                                  file.name.split(".")[1] == "png" ||
                                  file.name.split(".")[1] == "jpeg" ||
                                  file.name.split(".")[1] == "jpg" ||
                                  file.name.split(".")[1] == "pdf" ||
                                  file.name.split(".")[1] == "doc" ||
                                  file.name.split(".")[1] == "docx"
                                ) {
                                  formik3.setFieldValue(
                                    "panFile",
                                    e.target.files[0]
                                  );
                                } else {
                                  document.getElementById("panId").value = "";
                                  Swal.fire({
                                    icon: "warning",
                                    title: "This file format not allowed",
                                    text: "Please Attach Only PDF,JPG,PNG File Formats",
                                  });
                                }
                              }
                            }}
                          />
                        )}
                        {!hideSubmit && (
                          <small className="file_note">
                            {" "}
                            Max File Size limit 20 MB
                          </small>
                        )}
                        {!hideSubmit && (
                          <small className="file_note">
                            Formats supported (Png ,Jpg,Pdf,Jpeg)
                          </small>
                        )}
                      </div>
                    ) : (
                      <div className="col-md-3">
                        <label>
                          {" "}
                          PAN File :{" "}
                          {!hideSubmit && (
                            <span
                              className="text text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                formik3.setFieldValue("panFile", null);
                                formik3.setFieldValue("panFileCheck", "");
                              }}
                            >
                              Remove File
                            </span>
                          )}
                        </label>
                        {formik3.values.panFileCheck == "" ? (
                          <p>N/A</p>
                        ) : (
                          <a
                            className="text text-primary"
                            href={formik1.values.panFileCheck}
                            target="_blank"
                          >
                            {formik3?.values?.panFileCheck?.slice(
                              formik3.values.panFileCheck?.lastIndexOf("/") + 1
                            )}{" "}
                          </a>
                        )}
                      </div>
                    )}
                    {formik3.values.chequeFileCheck == "" ||
                    !formik3.values.cheque ? (
                      <div className="col-md-3">
                        {!hideSubmit && (
                          <TextField
                            type="file"
                            size="small"
                            label="Cheque File"
                            id="chequeId"
                            required
                            InputLabelProps={{ shrink: true }}
                            placeholder=""
                            onChange={(e) => {
                              let file = e.target.files[0];
                              if (file) {
                                if (file.size > "20000000") {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "File size to high",
                                    text: "File should be less than 20 MB",
                                  });
                                  document.getElementById("chequeId").value =
                                    "";
                                  return;
                                }
                                if (
                                  file.name.split(".")[1] == "png" ||
                                  file.name.split(".")[1] == "jpg" ||
                                  file.name.split(".")[1] == "jpeg" ||
                                  file.name.split(".")[1] == "pdf" ||
                                  file.name.split(".")[1] == "doc" ||
                                  file.name.split(".")[1] == "docx"
                                ) {
                                  formik3.setFieldValue(
                                    "cheque",
                                    e.target.files[0]
                                  );
                                } else {
                                  document.getElementById("chequeId").value =
                                    "";
                                  formik1.setFieldValue("cheque", null);
                                  Swal.fire({
                                    icon: "warning",
                                    title: "This file format not allowed",
                                    text: "Please Attach Only PDF,JPG,PNG File Formats",
                                  });
                                }
                              }
                            }}
                          />
                        )}
                        {!hideSubmit && (
                          <small className="file_note">
                            {" "}
                            Max File Size limit 20 MB
                          </small>
                        )}
                        {!hideSubmit && (
                          <small className="file_note">
                            Formats supported (Png ,Jpg,Pdf,Jpeg)
                          </small>
                        )}
                      </div>
                    ) : (
                      <div className="col-md-3">
                        <label>
                          {" "}
                          Cancelled Cheque :{" "}
                          {!hideSubmit && (
                            <span
                              className="text text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                formik1.setFieldValue("chequeFile", null);
                                formik1.setFieldValue("chequeFileCheck", "");
                              }}
                            >
                              Remove File
                            </span>
                          )}
                        </label>
                        {formik3.values.chequeFileCheck == "" ? (
                          <p>N/A</p>
                        ) : (
                          <a
                            className="text text-primary"
                            href={formik3.values.chequeFileCheck}
                            target="_blank"
                          >
                            {formik3.values.chequeFileCheck?.slice(
                              formik3.values.chequeFileCheck?.lastIndexOf("/") +
                                1
                            )}{" "}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {hideSubmit || vendorDetails ? (
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
      <div
        className="modal fade"
        id="paymentTerms"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="  modal-content">
            <div className="modal-header" style={{ border: "none" }}>
              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
                style={{ marginLeft: "42%" }}
              >
                Payment Terms{" "}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  sethidepSubmit(false);

                  formik4.handleReset();
                }}
                ref={modalPaymentClose}
              ></button>
            </div>
            <form
              onSubmit={formik4.handleSubmit}
              className="row mt- my-0 g-3 needs-validation"
            >
              <div className="modal-body" style={{ marginTop: "-2%" }}>
                <div className="row" style={{ justifyContent: "center" }}>
                  <div className="col-md-3">
                    <TextField
                      required
                      className="w-100"
                      label="Any other terms"
                      name="payment"
                      // type="email"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter other terms"
                      size="small"
                      value={formik4?.values?.payment}
                      onChange={(e) => {
                        formik4.handleChange(e);
                      }}
                      error={
                        formik4?.touched?.payment &&
                        Boolean(formik4?.errors?.payment)
                      }
                      helperText={
                        formik4?.touched?.payment && formik4?.errors?.payment
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <TextField
                      required
                      className="w-100"
                      label="Warranty"
                      InputLabelProps={{ shrink: true }}
                      name="warranty"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Warranty"
                      size="small"
                      value={formik4?.values?.warranty}
                      onChange={(e) => {
                        formik4.handleChange(e);
                      }}
                      error={
                        formik4?.touched?.warranty &&
                        Boolean(formik4?.errors?.warranty)
                      }
                      helperText={
                        formik4?.touched?.warranty && formik4?.errors?.warranty
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <TextField
                      required
                      className="w-100"
                      label="Delivery Timeline"
                      name="delivery"
                      // type="email"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      autoComplete="off"
                      placeholder="Enter Delivery Timeline"
                      size="small"
                      value={formik4?.values?.delivery}
                      onChange={(e) => {
                        formik4.handleChange(e);
                      }}
                      error={
                        formik4?.touched?.delivery &&
                        Boolean(formik4?.errors?.delivery)
                      }
                      helperText={
                        formik4?.touched?.delivery && formik4?.errors?.delivery
                      }
                    />
                  </div>
                </div>
              </div>
              {!hidepSubmit && (
                <div
                  className="modal-footer d-flex justify-content-center"
                  style={{ border: "none", marginTop: "-2%" }}
                >
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ fontSize: "11px" }}
                  >
                    Submit
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <button
        type="button"
        id="meter-click"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#meterModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="meterModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Electricity Reading
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="meter-close"
              ></button>
            </div>
            <form onSubmit={formik1.handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    <TextField
                      id="outlined-controlled"
                      label="Open Reading"
                      size="small"
                      name="openRead"
                      value={formik1.values.openRead}
                      onChange={(e) => {
                        formik1.handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      id="outlined-controlled"
                      label="Closing Reading"
                      name="closeRead"
                      size="small"
                      value={formik1.values.closeRead}
                      onChange={(e) => {
                        formik1.handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      id="outlined-controlled"
                      size="small"
                      label="Due Date"
                      placeholder="Enter dd-MM-yyyy"
                      name="dueDate"
                      value={formik1.values.dueDate}
                      onChange={(e) => {
                        formik1.handleChange(e);
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <TextField
                      id="outlined-controlled"
                      label="Bill Amount"
                      name="billAmount"
                      size="small"
                      maxLength="12"
                      type="number"
                      style={{ fontSize: "11px" }}
                      value={formik1.values.billAmount}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      id="outlined-controlled"
                      label="Late Fee"
                      name="lateFee"
                      size="small"
                      maxLength="12"
                      type="number"
                      style={{ fontSize: "11px" }}
                      value={formik1.values.lateFee}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      id="outlined-controlled"
                      label="Total Amount"
                      name="totalAmount"
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      maxLength="12"
                      type="number"
                      style={{ fontSize: "11px" }}
                      value={formik1.values.totalAmount}
                      onChange={(e) => {
                        formik1.handleChange(e);
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* 
      <button
        type="button"
        id="amountExtendModal"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#amountExtendS
        how"
      >
        Launch demo modal
      </button> */}
      <div
        className="modal fade"
        id="amountExtendShow"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel1">
                Amount Breakup
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="btn-amount-close"
                aria-label="Close"
                onClick={() => {}}
              ></button>
            </div>
            <form className="row mt- my-0 g-3 needs-validation">
              <div className="modal-body">
                <div className="row  mb-4">
                  <div className="col-md-4">
                    <TextField
                      required
                      className="w-100"
                      label="Unit Basic Price"
                      name="unitPrice"
                      // type="email"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter unit price"
                      size="small"
                      value={amountObj.unitPrice}
                    />
                    <small> Unit price are exclusive of GST </small>
                  </div>
                  <div className="col-md-4">
                    <TextField
                      required
                      className="w-100"
                      label="Quantity"
                      name="quantity"
                      variant="outlined"
                      autoComplete="off"
                      InputLabelProps={{ shrink: true }}
                      placeholder="Enter quantity"
                      size="small"
                      value={amountObj.quantity}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      required
                      className="w-100"
                      label="Basic amount"
                      name="basicAmount"
                      // type="email"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter basic amount"
                      size="small"
                      value={amountObj.basicAmount}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <TextField
                      className="w-100"
                      required
                      label="GST Amount"
                      name="gstAmount"
                      InputLabelProps={{ shrink: true }}
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter GST Amount"
                      size="small"
                      value={amountObj.gstAmount}
                    />
                  </div>
                  <div className="col-md-4 ">
                    <TextField
                      className="w-100"
                      required
                      label="Freight Amount"
                      name="freightAmount"
                      // type="email
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter freight amount"
                      size="small"
                      value={amountObj.freightAmount}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="col-md-4  ">
                    <TextField
                      className="w-100"
                      required
                      label="Freight Remarks"
                      name="remarks"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Enter Remarks"
                      size="small"
                      value={amountObj.remarks}
                    />
                  </div>
                  <div className="col-md-4 mt-4">
                    <TextField
                      className="w-100"
                      required
                      label="Total Amount"
                      name="totalAmount"
                      InputLabelProps={{ shrink: true }}
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Total Amount"
                      size="small"
                      value={amountObj.totalAmount}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <button
        type="button"
        id="amountExtendModal"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#amountExtend1"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="amountExtend1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel1">
                Amount Breakup
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="btn-amount1-close"
                aria-label="Close"
                onClick={(e) => {}}
              ></button>
            </div>
            <form
              onSubmit={formik5.handleSubmit}
              className="row mt- my-0 g-3 needs-validation"
            >
              <div className="modal-body">
                <div className="row  mb-4">
                  <div className="col-md-4">
                    <TextField
                      required
                      className="w-100"
                      label="Unit Basic Price"
                      name="unitPrice"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter unit price"
                      size="small"
                      value={formik5.values.unitPrice}
                      onChange={(e) => {
                        if (
                          e?.target?.value?.match(/^(\d*\.{0,1}\d{0,2}$)/) &&
                          e?.target?.value?.length < 8
                        ) {
                          formik5.handleChange(e);
                        }
                      }}
                      onBlur={(e) => {
                        calculateTotal1();
                      }}
                      error={
                        formik5.touched.unitPrice &&
                        Boolean(formik5.errors.unitPrice)
                      }
                      helperText={
                        formik5.touched.unitPrice && formik5.errors.unitPrice
                      }
                    />
                    <small> Unit price are exclusive of GST </small>
                  </div>
                  <div className="col-md-4">
                    <TextField
                      required
                      className="w-100"
                      label="Quantity"
                      name="quantity"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter quantity"
                      size="small"
                      value={formik5.values.quantity}
                      onChange={(e) => {
                        if (
                          e?.target?.value?.match(/^(\d*\.{0,1}\d{0,2}$)/) &&
                          e?.target?.value?.length < 6
                        ) {
                          formik5.handleChange(e);
                        }
                      }}
                      onBlur={(e) => {
                        calculateTotal1();
                      }}
                      error={
                        formik5.touched.quantity &&
                        Boolean(formik5.errors.quantity)
                      }
                      helperText={
                        formik5.touched.quantity && formik5.errors.quantity
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      required
                      className="w-100"
                      label="Basic amount"
                      name="basicAmount"
                      // type="email"
                      disabled={true}
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter basic amount"
                      size="small"
                      value={formik5.values.basicAmount}
                      onChange={(e) => {
                        formik5.handleChange(e);
                      }}
                      error={
                        formik5.touched.basicAmount &&
                        Boolean(formik5.errors.basicAmount)
                      }
                      helperText={
                        formik5.touched.basicAmount &&
                        formik5.errors.basicAmount
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <TextField
                      className="w-100"
                      required
                      label="GST Rate (in %)"
                      name="gstAmount"
                      // type="email"
                      variant="outlined"
                      disabled={
                        !formik5.values.quantity && !formik5.values.unitPrice
                      }
                      autoComplete="off"
                      placeholder="Enter GST Rate"
                      size="small"
                      value={formik5.values.gstAmount}
                      onChange={(e) => {
                        if (
                          e?.target?.value?.match(/^(\d*\.{0,1}\d{0,2}$)/) &&
                          e?.target?.value?.length < 8
                        ) {
                          formik5.handleChange(e);
                        }
                      }}
                      onBlur={(e) => {
                        calculateTotal1();
                      }}
                      error={
                        formik5.touched.gstAmount &&
                        Boolean(formik5.errors.gstAmount)
                      }
                      helperText={
                        formik5.touched.gstAmount && formik5.errors.gstAmount
                      }
                    />
                  </div>
                  <div className="col-md-4 ">
                    <TextField
                      className="w-100"
                      required
                      label="Freight Amount"
                      name="freightAmount"
                      // type="email
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter freight amount"
                      size="small"
                      value={formik5.values.freightAmount}
                      onChange={(e) => {
                        if (
                          e?.target?.value?.match(/^(\d*\.{0,1}\d{0,2}$)/) &&
                          e?.target?.value?.length < 8
                        ) {
                          formik5.handleChange(e);
                        }
                      }}
                      onBlur={() => {
                        calculateTotal1();
                      }}
                      error={
                        formik5.touched.freightAmount &&
                        Boolean(formik5.errors.freightAmount)
                      }
                      helperText={
                        formik5.touched.freightAmount &&
                        formik5.errors.freightAmount
                      }
                    />
                  </div>
                  <div className="col-md-4 ">
                    <TextField
                      className="w-100"
                      required
                      label="Freight Remarks"
                      name="remarks"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Remarks"
                      size="small"
                      value={formik5.values.remarks}
                      onChange={(e) => {
                        if (e?.target?.value?.length < 100) {
                          formik5.handleChange(e);
                        }
                      }}
                      onBlur={() => {
                        calculateTotal1();
                      }}
                      error={
                        formik5.touched.remarks &&
                        Boolean(formik5.errors.remarks)
                      }
                      helperText={
                        formik5.touched.remarks && formik5.errors.remarks
                      }
                    />
                  </div>
                  <div className="col-md-4 mt-4">
                    <TextField
                      className="w-100"
                      required
                      label="Total Amount"
                      name="totalAmount"
                      disabled={true}
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Total Amount"
                      size="small"
                      value={formik5.values.totalAmount}
                      onChange={(e) => {
                        formik5.handleChange(e);
                      }}
                      error={
                        formik5.touched.totalAmount &&
                        Boolean(formik5.errors.totalAmount)
                      }
                      helperText={
                        formik5.touched.totalAmount &&
                        formik5.errors.totalAmount
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={(e) => {
                    formik5.handleReset(e);
                  }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  // onClick={(e) => {
                  //   milestonesAmountudpate();
                  // }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="attachPO"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel1">
                Attach PO
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="btn-PO-close"
                aria-label="Close"
                onClick={() => {
                  setPOFiles({
                    arr: [],
                  });
                }}
              ></button>
            </div>
            <div className="modal-body" style={{ border: "none" }}>
              <div>
                <form>
                  <div className="container px-0 mt-">
                    <p>
                      Supported format:&nbsp;
                      <b>doc(x) , pdf , xls(x) , jpeg , png , zip</b>
                      {/* <span className="text-warning"> Max. size 20MB</span> */}
                    </p>
                    <hr />
                    <div>
                      {/* {viewFiles?.length == 0 && <p> No files Found</p>} */}
                      <ul>
                        {poFiles.arr.length != 0 &&
                          poFiles.arr?.map((data, index) => {
                            return (
                              <>
                                <div className="row" key={index}>
                                  <div className="col-md-auto">
                                    <li> {data.name}</li>
                                  </div>{" "}
                                  <div className="col-md-auto">
                                    <span
                                      className="text text-danger"
                                      onClick={() => {
                                        removeAttachments3(index);
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
                            UploadFile1(e);
                          }}
                          id="formFileLg1"
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
                              fontSize: "11px",
                            }}
                            className="btn py-0 px-1 text-dark m-0"
                            type="button"
                            onClick={() =>
                              document.getElementById("formFileLg1")?.click()
                            }
                          >
                            {poFiles?.arr?.length == 0 && <>Choose Files </>}
                            {poFiles?.arr?.length != 0 && (
                              <>Choose More Files </>
                            )}
                          </button>
                        </div>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer" style={{ border: "none" }}>
              {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={modalContactClose}>Close</button> */}
              <IconButton
                type="submit"
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  border: "1px solid blue",
                  backgroundColor: "blue",
                  color: "white",
                }}
                className="btn btn-primary"
                onClick={() => {
                  uploadApi1();
                }}
              >
                <UploadIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        id="rent-click"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#rentModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="rentModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {/* {payCode && <span className="text-bold">{payCode}</span>} -{" "} */}
                <span style={{ fontWeight: "lighter" }}>
                  {" "}
                  Rent start and end date
                </span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="rent-close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="modal_daterange position-relative">
                      <DateRange
                        locale={enUS}
                        onChange={() => {
                          // setStates([item.selection]);
                        }}
                        moveRangeOnFirstSelection={false}
                        ranges={states}
                        minDate={states[0].startDate}
                        maxDate={states[0].endDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="remarkModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <span style={{ fontWeight: "lighter" }}> PO Files </span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="remark-close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-auto">
                    {pofileArray?.length > 0 &&
                      pofileArray?.map((x, i) => {
                        return (
                          <a
                            key={i}
                            onClick={() => {
                              handleDownload(x);
                            }}
                          >
                            <li style={{ color: "blue", cursor: "pointer" }}>
                              {" "}
                              {x.fileNewName}
                            </li>
                          </a>
                        );
                      })}
                    {pofileArray.length == 0 && <p> No Files Available </p>}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="create-milestone1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel1">
                {showEdit ? <span>View/Edit </span> : <span> View </span>}
                Payment Milestone for Amount{" "}
                <span className="mr-2">
                  {" "}
                  {currencyId}
                  {expeseAmount}
                </span>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="btn-amount-close"
                aria-label="Close"
                onClick={() => {}}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row  mb-4">
                <div className="col-md-4">
                  <TextField
                    required
                    className="w-100"
                    label="No. of milestones"
                    name="unitPrice"
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    variant="outlined"
                    autoComplete="off"
                    disabled={!showEdit || mCreate}
                    placeholder="Any number between 1-10"
                    size="small"
                    value={mCount}
                    onChange={(e) => {
                      if (Number(e.target.value) <= 10) {
                        setMCount(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
              {mCreate &&
                milestones.length > 0 &&
                milestones.map((data, i) => {
                  return (
                    <>
                      <div className="row  mt-2" key={i}>
                        <div className="col-md-auto">
                          <p style={{ marginTop: "6px", fontWeight: "bold" }}>
                            {" "}
                            Milestone {i + 1} &#8594;
                          </p>
                        </div>

                        {i == 0 ? (
                          <div className="col-md-auto d-flex justify-content between">
                            <p style={{ marginTop: "9px" }}>Advance</p>
                            <Checkbox
                              checked={data.isAdvance}
                              onChange={(e) => {
                                handleChange1(i, data.isAdvance);
                              }}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </div>
                        ) : (
                          <div
                            className="col-md-1 d-flex justify-content between "
                            style={{
                              marginLeft: "10px",
                              marginRight: "10px",
                            }}
                          ></div>
                        )}

                        <div className="col-md-3">
                          <TextField
                            className="w-100"
                            required
                            label="Description"
                            name="description"
                            disabled={!showEdit}
                            InputLabelProps={{ shrink: true }}
                            // type="email"
                            variant="outlined"
                            // disabled={
                            //   !formik4.values.quantity && !formik4.values.unitPrice
                            // }
                            autoComplete="off"
                            placeholder="Enter Description"
                            size="small"
                            value={data.description}
                            onChange={(e) => {
                              if (e.target.value?.length < 30) {
                                handleInput(i, e);
                              }
                            }}
                          />
                        </div>
                        <div className="col-md-3">
                          <TextField
                            className="w-100"
                            required
                            label={`${
                              checked1 == 0 ? "Amount" : "Percentage (in %)"
                            } `}
                            name="value"
                            // type="email"
                            variant="outlined"
                            disabled={!showEdit}
                            // disabled={
                            //   !formik4.values.quantity && !formik4.values.unitPrice
                            // }
                            autoComplete="off"
                            InputLabelProps={{ shrink: true }}
                            placeholder={`${
                              checked1 == 0
                                ? "Enter Amount"
                                : "Enter Percentage"
                            } `}
                            size="small"
                            value={data.value}
                            onChange={(e) => {
                              if (
                                e?.target?.value?.match(
                                  /^(\d*\.{0,1}\d{0,2}$)/
                                ) &&
                                e?.target?.value?.length < 8
                              ) {
                                handleInput(i, e);
                                AmountPercentLogic(i, e.target.value);
                              }
                            }}
                            // onBlur={(e) => {
                            //   checkLogic();
                            // }}
                          />
                        </div>
                        <div className="col-md-3">
                          <TextField
                            className="w-100"
                            required
                            label="Final Amount"
                            name="finalAmount"
                            // type="email"
                            disabled={true}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            // disabled={
                            //   !formik4.values.quantity && !formik4.values.unitPrice
                            // }
                            autoComplete="off"
                            placeholder="Enter Final Amount"
                            size="small"
                            value={data.finalAmount}
                            onChange={(e) => {
                              if (
                                e?.target?.value?.match(
                                  /^(\d*\.{0,1}\d{0,2}$)/
                                ) &&
                                e?.target?.value?.length < 8
                              ) {
                                handleInput(i, e);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
            {showEdit && (
              <div className="modal-footer">
                {showEdit && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setMCreate(false);
                      setMCount(0);
                      setMilestones([]);
                      setCorrect(true);
                    }}
                  >
                    Reset
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  id="btn-amt1-close"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setMCreate(false);
                    setMCount(null);
                  }}
                >
                  Close
                </button>
                {mCreate ? (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {
                      mileStoneSubmit();
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      milestonesCreate(mCount);
                    }}
                  >
                    Create
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
