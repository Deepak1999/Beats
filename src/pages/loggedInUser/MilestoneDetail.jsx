import ReplyIcon from "@mui/icons-material/Reply";
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
  Autocomplete,
  Menu,
  MenuItem,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";

import * as yup from "yup";

import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import BackHandIcon from "@mui/icons-material/BackHand";
// import AccessLevel from "./AccessLevel";
import { createTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import Swal from "sweetalert2";
import dots from "../../assets/images/three dotes.png";
import "./main.css";
import "../../assets/css1/expensedetail.css";
import { common_axios } from "../../App";
import moment from "moment";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import ColumnFilter from "../../Components/ColumnFilter";
import { NotesTable } from "../../Components/NotesTable";
import { PaymentTerm } from "../../Components/PaymentTerm";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import { setQueryId, setexpenseId } from "../../redux/features/expenseIdSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { toast } from "react-toastify";

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
export default function MilestoneDetail() {
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
  const [hideSkeleton, setHideSkeleton] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [showSubmit, setShowSubmit] = useState(false);
  const modalContact4Close = useRef(null);
  const [deleteArray, setDeleteArray] = useState([]);
  const [querySub, setQuerySub] = useState(0);
  const [showCat, setShowCat] = useState("");
  const [queryUserId, setqueryUserId] = useState(0);
  const [qId, setqId] = useState(0);
  const history = useHistory();
  const [raiseText, setRaiseText] = useState("");
  const [raiseAmount, setRaiseAmount] = useState(null);
  const [data, setData] = useState([]);
  const [rejectArray, setRejectArray] = useState([]);
  const [showApprove, setShowApprove] = useState(false);
  const [totalSum, setTotalSum] = useState(0);

  const [roleId, setRoleId] = useState(0);
  const [update, setUpdate] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [deleteNote, setDeleteNote] = useState("");
  const [actionType, setActionType] = useState(0);
  const [attachArray, setAttachArray] = useState([]);
  const [deleteId, setDeleteId] = useState(0);
  const modalContact = useRef(null);
  const modalContact1 = useRef(null);
  const modalContactClose = useRef(null);

  const [showAmount, setShowAmount] = useState(null);

  const [isAdvance, setIsAdvance] = useState(0);

  const [showDownload, setShowDownload] = useState(false);

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
  const [initialValues, setInitialValues] = useState({
    // templateType: "",
    expenseTitle: "",
    expenseDate: "",
    projectId: 0,
  });

  const [formsubmitted, setFormSubmitted] = useState(false);

  const [expList, setexpList] = useState([]);

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
  const [processedAmount, setProcessedAmount] = useState(0);

  const [shortAmt, setShortAmt] = useState(0);

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

  const formik5 = useFormik({
    initialValues: {
      text: "",
      showAmount: 0,
      raiseAmount: 0,
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    validationSchema: yup.object({
      text: yup
        .string()
        .required("Remarks is required")
        .max(60, "Remarks must be less than 60 characters"),
      raiseAmount: yup.number().required(),
    }),
    onSubmit: async (values) => {
      setFormSubmitted(true);

      // console.log(formsubmitted);
      if (formik5.values.raiseAmount && formik5.values.text) {
        let formdata = new FormData();
        let AmString = raiseAmount + "";
        formdata.append("amount", formik5.values.raiseAmount);
        formdata.append("remark", formik5.values.text);
        formdata.append("userId", user.id);
        formdata.append("jwtToken", localStorage.getItem("token"));
        formdata.append("source", 1);

        if (isAdvance == 1) {
          formdata.append("type", 1);
        } else {
          formdata.append("type", 0);
        }
        files.arr.forEach((element) => {
          formdata.append("files", element);
        });
        formdata.append("expenseId", expense.id);
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
          let e;

          formik5.handleReset(e);
          getExpenseDetail(expense.id);
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

      console.log(values);
    },
  });

  const handleDownload1 = async () => {
    if (expList.length == 0) {
      return;
    }
    let formdata = {
      expenseIds: expList,
      purchaseId: expense.id,
    };
    let res = await common_axios.post(`/payment/attachment/download`, formdata);
    if (res) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        const fileUrl = res.data.encryptedResponse;
        const anchor = document.createElement("a");
        anchor.href = fileUrl;
        anchor.target = "_blank";
        anchor.download = "any Name";
        anchor.click();
      } else {
        toast("No attachment found");
      }
    }
  };

  const ActionMenu = (cell) => {
    const [anchorEl, setAnchorEl] = useState(null);
    let show = false;

    if (
      cell.row.original?.isAdvance == 1 &&
      roleId == 17 &&
      cell.row.original.status == 1
    ) {
      show = true;
    }

    if (
      cell.row.original?.isAdvance == 0 &&
      cell.row.original.initiator?.id == user.id &&
      cell.row.original.status == 1
    ) {
      show = true;
    }
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleMenuItemClick = (action) => {
      handleClose();

      if (action == "short") {
        document.getElementById("confirm-button1").click();
        setMilestoneId(cell.row.original.id);
      }
      if (action == "raise") {
        document.getElementById("confirm-button").click();
        setShowAmount(cell.row.original.finalAmount);
        setMilestoneId(cell.row.original.id);
        setRaiseAmount(cell.row.original.finalAmount);

        formik5.setFieldValue("raiseAmount", cell.row.original.finalAmount);
        // formik5.setFieldValue({
        //   raiseAmount: cell.row.original.finalAmount,
        // });
        // console.log(cell.row.original.isAdvance);
        setIsAdvance(cell.row.original.isAdvance);
      }

      // console.log(`Selected action: ${action} for row ID: ${cell.row.id}`);
    };

    return (
      <>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {show && (
            <MenuItem
              onClick={(e) => {
                formik5.handleReset(e);
                handleMenuItemClick("raise");
              }}
            >
              Raise Request
            </MenuItem>
          )}

          {show && (
            <MenuItem onClick={() => handleMenuItemClick("short")}>
              Short Close
            </MenuItem>
          )}
        </Menu>
      </>
    );
  };
  const viewDetail = (expenseId) => {
    history.push(`/releaseDetail/${expenseId}`);
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
  const resetRaise = () => {
    setRaiseAmount(null);
    setRaiseText("");
    setFiles({
      arr: [],
    });
    fileRef.current.value = null;
    setMilestoneId(0);

    setFormSubmitted(false);
  };

  const resetShortNote = () => {
    setShortnote("");
    setMilestoneId(0);
  };
  const raiseRequest = async () => {
    setFormSubmitted(true);

    // console.log(formsubmitted);
    if (raiseAmount && raiseText) {
      let formdata = new FormData();
      let AmString = raiseAmount + "";
      formdata.append("amount", AmString.split(".")[0]);
      formdata.append("remark", raiseText);
      formdata.append("userId", user.id);
      formdata.append("jwtToken", localStorage.getItem("token"));
      formdata.append("source", 1);

      if (isAdvance == 1) {
        formdata.append("type", 1);
      } else {
        formdata.append("type", 0);
      }
      files.arr.forEach((element) => {
        formdata.append("files", element);
      });
      formdata.append("expenseId", expense.id);
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
        getExpenseDetail(expense.id);
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

  const [shortnote, setShortnote] = useState("");
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
    getProjecrIdBy(expense.projectId);
    await modalContactRef4.current.click();
  };
  const handleDialog = () => {
    openModal3(4);
  };

  const shortNoteSubmit = async () => {
    let formdata = {
      purchaseId: expense.id,
      milestoneId: milestoneId,
      remarks: shortnote,
    };

    if (shortnote == "") {
      toast("Remark is required");
      return;
    }

    let res = await common_axios.post("/payment/short/close", formdata);

    if (res) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        getExpenseDetail(expense.id);
        document.getElementById("btn-close3").click();
        resetShortNote();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.statusDescription.statusMessage,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something Wrong",
          text: res.data.statusDescription.statusMessage,
        });
      }
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
  useEffect(() => {
    if (localStorage.getItem("roleId") != null) {
      setRoleId(localStorage.getItem("roleId"));
    }
    // return () => {
    //   if (localStorage.getItem("milestoneId")) {
    //     dispatch(setMilestoneId(localStorage.getItem("milestoneId")));
    //   }
    // };
  }, []);
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
    (state) => state.expenseIdSlice.milestoneId
  );
  const qIdSlice = useSelector((state) => state.expenseIdSlice.queryId);
  useEffect(() => {
    if (qIdSlice != 0) {
      setqId(qIdSlice);
    }
  }, [qIdSlice]);
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
      const values = [...inputfields];
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
  useEffect(() => {
    if (params) {
      if (params.id) {
        setExpenseId(params.id);
        setDetailView(true);
        getExpenseDetail(params.id);
      }
    }
    // if(expenseIdSelector != 0 ) {
    //    localStorage.setItem('milestoneId' ,localStorage.get)
    // }
    // if (expenseIdSelector != 0) {
    //   setExpenseId(expenseIdSelector);
    //   setDetailView(true);
    //   getExpenseDetail(expenseIdSelector);
    // }
  }, [expenseIdSelector]);
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
    setUser(user);
    dispatch(setLoader(true));
    let formdata = {
      id: expenseId,
    };
    let res = await common_axios.post(`/payment/detail/${expenseId}`, {});
    if (res?.data?.statusDescription?.statusCode == 200) {
      setMilestones(res.data.list);
      let arr = [];
      res.data.list.forEach((dd) => {
        if (dd.status == 2) {
          // console.log(dd);
          arr.push(dd.expense1.id);
        }
      });

      setexpList(arr);
      setShowDownload(false);
      // console.log(arr);
      setExpense(res.data.expense);
      setData(res.data.list);
      dispatch(setLoader(false));
      let sum1 = 0;
      let processAm = 0;
      let pendingAm = 0;
      let processedAmt = 0;
      let shortAmount = 0;

      // console.log(res.data.list);

      res.data.list.forEach((data) => {
        sum1 = sum1 + Number(data.finalAmount);
        if (data.status == 2) {
          setShowDownload(true);
          processAm = processAm + data.actualAmount;
        }
        if (data.status == 1) {
          pendingAm = pendingAm + data.finalAmount;
        }
        if (data.status == 4) {
          setShowDownload(true);
          processedAmt = processedAmt + data.actualAmount;
        }

        if (data.status == 2 || data.status == 4) {
          let Amounnt = data.finalAmount - data.actualAmount;
          shortAmount = shortAmount + Number(Amounnt);
        }

        if (data.status == 5) {
          shortAmount = shortAmount + data.finalAmount;
        }
        //   if(data.status ==1) {
        //     pendingAm  =  pendingAm  + data.finalAmount
        // }
      });
      setTotalSum(sum1);
      setProcessedAmount(processedAmt);
      setProcessAmount(processAm);
      setPendingAmount(pendingAm);
      setShortAmt(shortAmount);

      setCurrencyId(res.data.expense.currencyId);
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
        Header: "No",
        accessor: "sequence",
        Cell: (cell) => {
          return (
            <>
              <span> Milestone </span> &nbsp;{" "}
              <span>{cell.row.original.sequence}</span>
            </>
          );
        },
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: (cell) => {
          return <>{cell.row.original.description}</>;
        },
      },

      {
        Header: "Advance",
        accessor: "isAdvance",
        Cell: (cell) => {
          return <> {cell.row.original.isAdvance == 1 ? "Yes" : "No"}</>;
          // return <>{cell.row.original.description}</>;
        },
      },
      {
        Header: "Payment Part",
        accessor: "percentage",
        Cell: (cell) => {
          return (
            <>
              <span>{cell.row.original.percentage} % </span>
            </>
          );
        },
      },
      {
        Header: "Approved Amount",
        accessor: "finalAmount",
        Cell: (cell) => {
          return (
            <>
              {" "}
              <span className="">
                {" "}
                {cell.row.original.expense.currencyId} &nbsp;
                {cell.row.original.finalAmount}
              </span>
            </>
          );
        },
      },

      {
        Header: "Amount Released",
        accessor: "actualAmount",
        Cell: (cell) => {
          return (
            <>
              {" "}
              {cell.row.original.actualAmount ? (
                <span className="">
                  {" "}
                  {cell.row.original.expense.currencyId} &nbsp;
                  {cell.row.original.actualAmount
                    ? cell.row.original.actualAmount
                    : "0"}
                </span>
              ) : (
                <span className="">INR 0</span>
              )}
            </>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (cell) => {
          return (
            <>
              {" "}
              {cell.row.original.status == 2 && (
                <span
                  className="badge  text-white mx-1 cursor_"
                  title="Under process"
                  style={{
                    padding: "5px",
                    backgroundColor: "#ff8c00",
                  }}
                >
                  Under Process
                  {/* <AccessTimeIcon style={{ color: "white" }} /> */}
                </span>
              )}
              {cell.row.original.status == 5 && (
                <span
                  className="badge bg-danger text-white mx-1 cursor_"
                  title="Short Closed"
                  style={{
                    padding: "5px",
                    backgroundColor: "#ff8c00",
                  }}
                >
                  Short Closed
                  {/* <AccessTimeIcon style={{ color: "white" }} /> */}
                </span>
              )}
              {cell.row.original.status == 1 && (
                <span
                  className="badge  text-white mx-1 cursor_"
                  title="Not Initiated"
                  style={{
                    padding: "5px",
                    backgroundColor: "#d3d30e",
                  }}
                >
                  Not initiated
                  {/* <PauseCircleOutlineIcon
                    style={{
                      color: "white",
                      backgroundColor: "#d3d30e",
                    }}
                  /> */}
                </span>
              )}
              {cell.row.original.status == 3 && (
                // <span className="badge bg-danger">
                //   Rejected
                // </span>
                <span
                  className="badge bg-danger text-white mx-1 cursor_"
                  title="Rejected"
                  style={{ padding: "5px" }}
                >
                  <CloseIcon style={{ color: "white" }} />
                </span>
              )}
              {cell.row.original.status == 4 && (
                <span
                  className="badge bg-success text-white mx-1 cursor_ "
                  title="Processed"
                  style={{ padding: "5px" }}
                >
                  Processed
                  {/* <DoneOutlineIcon style={{ color: "white" }} /> */}
                </span>
              )}
            </>
          );
        },
      },

      {
        Header: "Action",
        Footer: "User-Action",
        accessor: "action",
        Cell: (cell) => {
          let type = 0;

          let show = false;
          if (
            cell.row.original?.isAdvance == 1 &&
            roleId == 17 &&
            cell.row.original.status == 1
          ) {
            show = true;
          }

          if (
            cell.row.original?.isAdvance == 0 &&
            cell.row.original.initiator?.id == user.id &&
            cell.row.original.status == 1
          ) {
            show = true;
          }

          // // console.log(
          //   cell.row.original.isAdvance == 1 &&
          //     roleId == 17 &&
          //     cell.row.original.status == 1
          // );
          // // console.log(
          //   cell.row.original.isAdvance == 0 &&
          //     cell.row.original.initiator?.id == user.id &&
          //     cell.row.original.status == 1
          // );
          return (
            <>
              {(cell.row.original.status == 2 ||
                cell.row.original.status == 4) && (
                <IconButton
                  title="View Detail"
                  // style={{ marginLeft: "19%" }}
                  onClick={() => {
                    viewDetail(cell.row.original.expense1.id);
                  }}
                >
                  <VisibilityIcon
                    style={{
                      color: "blue",
                      fontSize: "19px",
                      padding: "0px",
                    }}
                  />
                </IconButton>
              )}

              {show && cell.row.original.status == 1 ? (
                <>
                  {true && (
                    <span>
                      <ActionMenu row={cell.row} />
                    </span>
                  )}
                </>
              ) : (
                <>
                  {cell.row.original.status == 1 && (
                    <span>
                      <Tooltip title="You're not authorised to perform this Action">
                        <span>N/A</span>
                      </Tooltip>
                    </span>
                  )}{" "}
                </>
              )}

              {/* {type == 2 && cell.row.original.isAdvance == 0 && (
                <>
                  {cell.row.original.isAdvance != 1 && (
                    <span>
                      <ActionMenu row={cell.row} />
                    </span>
                  )}
                </>
              )} */}

              {cell.row.original.status == 5 && <span> N/A</span>}
            </>
          );
        },
        disableFilters: true,
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
      scheduleList: [],
    };
    let arr = [];
    let values = [...inputfields];
    values.forEach((data) => {
      if (data.scheduleId) {
        arr.push(data.scheduleId);
      }
    });
    formdata["scheduleList"] = arr;
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
    history.push("/paymentRelease");
    // if (tabIndexSel == -1) {
    //   history.push("/search");
    // } else {
    //   history.push("/expense");
    // }
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
                    {expense && expense.type == 0
                      ? "Expense Detail"
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
                      className="row   expense_lable expense_row  g-3 needs-validation"
                      noValidate
                      style={{ paddingRight: "1px" }}
                    >
                      <div>
                        <div className="row  ">
                          {expense && (
                            <div className="col-md-auto">
                              <p style={{ fontSize: "small", margin: "0" }}>
                                {expense && expense.type == 0 ? (
                                  <span>Expense Id </span>
                                ) : (
                                  <span> Purchase Id </span>
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
                          {expense && (
                            <>
                              <div className="col-md-auto">
                                <p style={{ fontSize: "small", margin: "0" }}>
                                  Project
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
                            </>
                          )}
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-auto">
                            <p style={{ fontSize: "small", margin: "0" }}>
                              Amt PO
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
                          <div className="col-md-auto">
                            <p style={{ fontSize: "small", margin: "0" }}>
                              Amt Paid
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
                                    {processedAmount.toLocaleString()}
                                  </b>{" "}
                                </span>
                              )}
                            </p>
                          </div>

                          <div className="col-md-auto">
                            <p style={{ fontSize: "small", margin: "0" }}>
                              Amt Under Process
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
                              Amt Unreleased
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
                          </div>
                          <div className="col-md-auto">
                            <p style={{ fontSize: "small", margin: "0" }}>
                              Amt Shorted
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
                                    {shortAmt.toLocaleString()}
                                  </b>{" "}
                                </span>
                              )}
                            </p>
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

                          <p className="fw-bold"> Milestones Details</p>

                          {milestones?.length == 0 && (
                            <h5
                              className="text-center"
                              style={{ fontSize: "11px" }}
                            >
                              {" "}
                              No Milestones Found{" "}
                            </h5>
                          )}

                          {showDownload && (
                            <div className="row">
                              <div className="offset-md-11 col-md-1 ">
                                {
                                  <IconButton
                                    title="Download All Attachments"
                                    onClick={(e) => {
                                      handleDownload1();
                                    }}
                                  >
                                    <DownloadIcon />
                                  </IconButton>
                                }
                              </div>
                            </div>
                          )}

                          {milestones.length > 0 && (
                            <div className="card-body px-0">
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
                                        {headerGroup?.headers.map((column) => (
                                          <th
                                            {...column.getHeaderProps(
                                              column.getSortByToggleProps()
                                            )}
                                            className={
                                              column?.Header == "Status"
                                                ? "text-center width_2 update_th messageWidth"
                                                : column?.Header == "Camp Type"
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
                                                    sx={{
                                                      color: "white",
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
                                        ))}
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
                                                  cell.column.Header ==
                                                  "Payment Part"
                                                    ? "text-center update_td"
                                                    : cell.column.Header ==
                                                      "Status"
                                                    ? "text-center update_td"
                                                    : cell.column.Header ==
                                                      "Approved Amount"
                                                    ? "text-right update_td  newClass_amount"
                                                    : cell.column.Header ==
                                                      "Action"
                                                    ? "text-center update_td"
                                                    : cell.column.Header ==
                                                      "Advance"
                                                    ? "text-center update_td"
                                                    : cell.column.Header ==
                                                      "Amount Released"
                                                    ? "text-right update_td  newClass_amount"
                                                    : "text-left  update_td"
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
                    {/* <div className="row mt-3" id="active_logs">
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
                                    >
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
                    </div> */}
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

            <form onSubmit={formik5.handleSubmit}>
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
                      value={formik5.values.text}
                      placeholder="Enter Remarks"
                      required
                      onChange={(e) => {
                        if (e.target.value?.length < 50) {
                          formik5.handleChange(e);
                          setRaiseText(e.target.value);
                        }
                      }}
                      error={
                        formik5?.touched?.text && Boolean(formik5?.errors?.text)
                      }
                      helperText={
                        formik5?.touched?.text && formik5?.errors?.text
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label>
                      Amount Approved for Milestone{" "}
                      <span className="text text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      disabled={true}
                      className="form-control mt-2"
                      name="showAmount"
                      value={showAmount}
                      onBlur={(e) => {
                        setFormSubmitted(false);
                      }}
                      placeholder="Enter Amount"
                      // onChange={(e) => {
                      //   setRaiseAmount(e.target.value);
                      // }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label>
                      Actual Amount to be Released{" "}
                      <span className="text text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      name="raiseAmount"
                      onBlur={(e) => {
                        setFormSubmitted(false);
                      }}
                      value={formik5.values.raiseAmount}
                      placeholder="Enter Amount"
                      required
                      onChange={(e) => {
                        // setRaiseAmount(e.target.value);

                        if (
                          e.target.value === "" ||
                          Number(e.target.value) <= showAmount
                        ) {
                          setRaiseAmount(e.target.value);
                          formik5.handleChange(e);
                        }
                      }}
                      error={
                        formik5?.touched?.raiseAmount &&
                        Boolean(formik5?.errors?.raiseAmount)
                      }
                      helperText={
                        formik5?.touched?.raiseAmount &&
                        formik5?.errors?.raiseAmount
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12 mt-3">
                  <label>Attach File</label>
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
                Short Close Milestone
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="btn-close3"
                onClick={(e) => {
                  resetShortNote();
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <p> Are you sure you want to short close the milestone?</p>

                <div className="col-md-12 mt-3">
                  <label>
                    Remarks <span className="text text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="text"
                    value={shortnote}
                    placeholder="Enter Remarks"
                    onChange={(e) => {
                      if (e.target.value?.length < 50) {
                        setShortnote(e.target.value);
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
                id="confirm-close3"
              >
                cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  shortNoteSubmit();
                }}
              >
                {" "}
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
