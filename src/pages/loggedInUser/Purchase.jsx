import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  TextField,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import * as yup from "yup";
// import "./main.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
// import AccessLevel from "./AccessLevel";
import { createTheme } from "@mui/material/styles";
import Swal from "sweetalert2";
import { common_axios } from "../../App";
// import { toast } from "react-toastify";
import moment from "moment";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ColumnFilter from "../../Components/ColumnFilter";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import { setRedirection } from "../../redux/features/expenseIdSlice";
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
import axios from "axios";
import {
  CollectionsBookmarkRounded,
  ConstructionOutlined,
  CurtainsOutlined,
  LocalConvenienceStoreOutlined,
} from "@mui/icons-material";
import { event } from "jquery";
import { toast } from "react-toastify";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
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
export default function PurchaseRequest() {
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

  const FormSchema = yup.object().shape({
    newPassword: yup
      .string()
      .min(15, "Password must be 8 characters long")
      .max(15)
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[A-Z]/, "Password requires an uppercase letter"),
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
  const [viewUploadFiles, setviewUploadFiles] = useState([]);
  const [requestType, setRequestType] = useState(1);
  const [isImportant, setisImportant] = useState(false);
  const [isDuplicate, setisDuplicate] = useState(false);
  const [mileBool, setMileBool] = useState(0);
  // const [siteId, setsiteId] = useState("");
  const pattern = new RegExp(/^\d{0,10}$/);
  const [disIndex, setDisIndex] = useState(0);

  const [companyId, setCompanyId] = useState(0);

  const [inputkey, setInputKey] = useState("");
  const pattern1 = new RegExp(
    /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/
  );
  const modalContact = useRef(null);
  const modalContact1 = useRef(null);
  const [vendorId, setVendorId] = useState(0);
  const modalContactClose = useRef(null);
  const [expenseId, setExpenseId] = useState(0);
  const [Pagination, setPagination] = useState(0);
  const [projects, setprojects] = useState([]);
  const [fileNames, setfileNames] = useState("");
  const addVendorRef = useRef(null);
  const [detailView, setDetailView] = useState(false);
  const [copyPreviousS, setCopyPreviousS] = useState(false);
  const [viewVendor, setViewVendor] = useState(false);
  const [state, setState] = useState({});
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isData1, setisData1] = useState(false);
  const [siteId, setSiteId] = useState("");
  const [user, setUser] = useState({});
  const [viewFiles, setviewFiles] = useState([]);
  const modalContact2 = useRef(null);
  const [hideP, setHideP] = useState(false);
  const modalContact3 = useRef(null);
  const [businessCompany, setBusinessCompany] = useState("N/A");
  const [vendorSubmitted, setVendorSubmitted] = useState(false);
  const [hideSubmit, setHideSubmit] = useState(false);
  const [projectState, setProjectState] = useState({});
  const modalCloseref = useState(null);
  const [termsSub, setTermsSub] = useState(0);
  const [checked, setChecked] = useState(0);
  const [checked1, setChecked1] = useState(1);
  const [sum, setSum] = useState(0);
  const [currencyId, setCurrencyId] = useState("INR");
  const [pIndex, setpIndex] = useState(0);
  const [vendorObj, setVendorObj] = useState({});
  const [vendorState, setVendorState] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [initialValues, setInitialValues] = useState({
    // templateType: "",
    expenseTitle: "",
    expenseDate: "",
    projectId: 0,
  });

  const [initialbool, setinitialBool] = useState(false);
  const [hierarchyList, sethierarchyList] = useState([]);
  const [inputfields, setinputfields] = useState([
    {
      expenseDate: new Date(),
      expensetitle: "",
      expenseAttachments: [],
      amount: 0,
      expenseFiles: [],
      currencyId: "INR",
      categoryId: 0,
      vendorId: -1,
      subCategoryId: 0,
      subIdList: [],
      terms: null,
      vendorDetails: null,
      previousVendor: null,
      amountBreakup: null,
      vendorState: { vendorName: "New Vendor", id: -1 },
      categoryState: null,
      subCatState: null,
    },
  ]);
  const [vendorData, setVendorData] = useState({});
  const [files, setFiles] = useState({
    arr: [],
  });
  const [data, setData] = useState([]);
  const onKeyDown = (e) => {
    e.preventDefault();
  };
  const [TableStatus, setTableStatus] = useState({
    pageNo: 0,
    pageSize: 10,
  });
  const [title, settitle] = useState("");
  const [approver1, setapprover1] = useState("");
  const modalPaymentClose = useRef(null);
  const [correct, setCorrect] = useState(false);
  const [mCreate, setMCreate] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [mCount, setMCount] = useState(null);
  const [frieght, setFreight] = useState(0);
  const [type, setType] = useState(0);
  var expenseIdSelector = useSelector(
    (state) => state.expenseIdSlice.expenseId
  );
  const validatenumber = (evt) => {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /^[0-9\b]+$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };
  const getPaymentTerms = (index) => {
    formik2.handleReset();
    setDisIndex(index);
    const values = [...inputfields];
    formik2.setValues({
      payment: values[index]["terms"]?.payment,
      warranty: values[index]["terms"]?.warranty,
      delivery: values[index]["terms"]?.delivery,
    });
  };
  const milestoneUpdates = () => {
    const values = [...milestones];
    setMilestones([...milestones]);
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

  const resetInput = () => {
    let randomString = Math.random().toString(36);
    setInputKey(randomString);
  };
  useEffect(() => {
    calculateSum();
  }, [inputfields.length]);
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
      let projectName1 = "";
      projects.forEach((data) => {
        if (data.id == projectId) {
          projectName1 = data.name;
          setSiteId(projectName1.substr(0, projectName1.lastIndexOf("_")));
        }
      });
      let arr = [];
      let formdata = {
        id: 0,
        siteId: projectName1,
      };
      arr.push(formdata);
      setSiteIdList(arr);
    }
  };
  const SaveMilestones = async () => {
    let formdata = {
      list: milestones,
      purchaseId: expenseId,
    };
    const values = [...milestones];
    let val1 = values.find((x) => {
      if (checked1 == 0) {
        return (
          x.amount == "" ||
          x.amount == null ||
          x.description == "" ||
          x.finalAmount == ""
        );
      } else {
        return (
          x.percentage == null ||
          x.percentage == "" ||
          x.description == "" ||
          x.finalAmount == ""
        );
      }
    });
    if (val1) {
      Swal.fire({
        title: "Fields required",
        text: "All fields  required ",
        icon: "error",
      });
      return;
    }
    let sum1 = 0;
    let totalAmount = 0;
    values.forEach((data) => {
      if (checked1 == 1) {
        totalAmount = Number(totalAmount) + Number(data.percentage);
        sum1 = Number(sum1) + Number(data.finalAmount);
      } else {
        sum1 = Number(sum1) + Number(data.finalAmount);
      }
    });
    sum1 = sum1.toFixed(2);
    await setCorrect(false);
    let val = values.find((x) => {
      if (checked1 == 0) {
        return x.amount == "" || x.amount == null;
      } else {
        return x.percentage == null || x.percentage == "";
      }
    });
    if (!val) {
      if (checked1 == 1) {
        // || sum1 != sum
        if (totalAmount != 100) {
          Swal.fire({
            icon: "warning",
            title: "Percentage mismatch error",

            text: `You entered  milestones for  ${totalAmount}%  this  should  be  equal  to  100%`,
            // text: `Total purchase amount : ${new Intl.NumberFormat().format(
            //   sum
            // )} and total milestones amount entered :${new Intl.NumberFormat().format(
            //   sum1
            // )}`,
          });
          setCorrect(false);
          return;
        } else {
          setCorrect(true);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Milestones created successfully",
          });
          document.getElementById("btn-amt-close").click();
          setMileBool(2);
        }
      }
    }
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Milestones created successfully",
    });
    document.getElementById("btn-amt-close").click();
    setMileBool(2);
  };
  const pickData = () => {
    const values = [...milestones];
    if (values.length > 0) {
      setMCount(values.length);
      setMCreate(true);
      setMileBool(4);
    } else {
      setMCount(null);
      setMCreate(false);
    }
  };
  const calculateTotal = () => {
    let totalbasicAmount =
      Number(formik4.values.quantity) * Number(formik4.values.unitPrice);
    totalbasicAmount = totalbasicAmount.toFixed(2);
    formik4.setFieldValue("basicAmount", totalbasicAmount);
    let totalAmount =
      (Number(formik4.values.gstAmount) / 100) * Number(totalbasicAmount) +
      Number(totalbasicAmount) +
      Number(formik4.values.freightAmount);
    totalAmount = totalAmount.toFixed(2);
    totalAmount = Math.round(totalAmount);
    formik4.setFieldValue("totalAmount", totalAmount);
  };
  const mileStoneSubmit = async () => {
    let formdata = {
      list: milestones,
      purchaseId: expenseId,
    };
    const values = [...milestones];
    let sum1 = 0;
    let totalAmount = 0;
    values.forEach((data) => {
      if (checked1 == 1) {
        totalAmount = Number(totalAmount) + Number(data.percentage);
        sum1 = Number(sum1) + Number(data.finalAmount);
      } else {
        sum1 = Number(sum1) + Number(data.finalAmount);
      }
    });
    sum1 = Number(sum1).toFixed(2);
    await setCorrect(false);
    let val = values.find((x) => {
      if (checked1 == 0) {
        return x.amount == "" || x.amount == null;
      } else {
        return x.percentage == null || x.percentage == "";
      }
    });
    if (!val) {
      if (checked1 == 1) {
        if (totalAmount != 100) {
          Swal.fire({
            icon: "warning",
            title: "Percentage mismatch error",
            text: `You entered  milestones for  ${totalAmount}%  this  should  be  equal  to  100%`,
          });
          setCorrect(false);
          return;
        } else {
          setCorrect(true);
        }

        if (sum1 != sum) {
          Swal.fire({
            icon: "warning",
            title: "Percentage mismatch error",
            text: `You entered  milestones for  ${totalAmount}%  this  should  be  equal  to  100%`,
          });
          setCorrect(false);
        } else {
          setCorrect(true);
        }

        return;
      }
    }
  };
  const finalCreation = async (id) => {
    if (mileBool == 2 || mileBool == 4) {
      let formdata = {
        list: milestones,
        purchaseId: id,
        checked: checked1,
      };
      const res = await common_axios.post(
        `/payment/milestone/create`,
        formdata
      );
      if (res) {
        if (res?.data?.statusDescription?.statusCode == 200) {
          setMilestones([]);
          setMileBool(0);
          setExpenseId(res.data.expenseId);
          resetForm();
          formik.handleReset();
          dispatch(setRedirection(true));
          dispatch(setLoader(false));
          history.push("/expense");
          Swal.fire({
            icon: "success",
            title: "Done",
            text: `Purchase Request Raised with Id : ${
              res.data.expenseId
            }  with description  ${values.expenseTitle}  on Date :${moment(
              new Date()
            ).format("DD-MM-YYYY")}`,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: res?.data?.statusDescription?.statusMessage,
            title: res?.data?.statusDescription?.statusMessage,
          });
        }
      }
    }
  };
  const addCategoryState = (index, id, state) => {
    const values = [...inputfields];
    values[index]["categoryId"] = id;
    values[index]["categoryState"] = state;

    if (state == null) {
      values[index]["subIdList"] = [];
    }

    // console.log(values);
    setinputfields(values);
  };
  const addSubCatState = (index, id, state) => {
    const values = [...inputfields];
    values[index]["subCategoryId"] = id;
    values[index]["subCatState"] = state;
    setinputfields(values);
  };
  const UpdateVendorDetails = (id, index) => {
    let list = vendorList;
    if (id != "-1") {
      list.forEach((data) => {
        if (data.id == id) {
          setVendorData(data);
          const values = [...inputfields];
          values[index]["previousVendor"] = data;
          setinputfields(values);
          formik1.setValues({
            vendorName: data.vendorName,
            bankName: data.bankName,
            accountNo: data.accountNo,
            panNo: data.panNo,
            gstNo: data.gstNo,
            ifsc: data.ifsc,
            state: data.state,
            pinCode: data.pinCode,
            address: data.address,
            panFileCheck: data.panFile,
            gstfileCheck: data.gstFile,
            chequeFileCheck: data.cheque,
            gstFile: data.gstFile,
            panFile: data.panFile,
            cheque: data.cheque,
          });
        }
      });
    } else {
      formik1.handleReset();
    }
  };
  const pickAmount = (data) => {
    formik4.setValues({
      basicAmount: data.basicAmount,
      unitPrice: data.unitPrice,
      gstAmount: data.gstAmount,
      totalAmount: data.totalAmount,
      quantity: data.quantity,
      freightAmount: data.freightAmount,
      remarks: data.remarks,
    });
  };
  //Loading...
  const pickFromData = (data, i) => {
    // console.log(i);

    // console.log(data);
    setDisIndex(i);
    formik1.handleReset();
    formik1.setValues({
      vendorName: data.vendorName,
      bankName: data.bankName,
      accountNo: data.accountNo,
      panNo: data.panNo,
      gstNo: data.gstNo,
      ifsc: data.ifsc,
      state: data.state,
      pinCode: data.pinCode,
      address: data.address,
      panFileCheck: data.panFile,
      gstfileCheck: data.gstFile,
      chequeFileCheck: data.cheque,
      gstFile: data.gstFile,
      panFile: data.panFile,
      cheque: data.cheque,
      msmeCheck: data.msmeCer,
      msmeCer: data.msmeCer,
      email: data.email,
      msisdn: data.msisdn,
      isMsme: data.isMsme,
      isPrevious: data.isPrevious,
      vendorCode: data.vendorCode,
    });
  };
  const getPaymentTermsUpdate = (data) => {
    formik2.handleReset();
    formik2.setValues({
      payment: data?.payment,
      warranty: data?.warranty,
      delivery: data?.delivery,
    });
  };
  const gstNoCheckAndPanCheck = async () => {
    if (formik1.values.gstNo) {
      let formdata = {
        gstNo: formik1.values.gstNo,
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
      if (formik1.values.panNo) {
        let formdata = {
          panNo: formik1.values.panNo,
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
  const handleRadio = async (value) => {
    await setChecked(value);
  };
  const handleRadio1 = async (value) => {
    await setChecked1(value);
  };
  const clearAmount = () => {
    let values = [...milestones];
    values = values.map((x) => {
      return { ...x, finalAmount: "", amount: "", value: "", percentage: "" };
    });
    setMilestones(values);
  };
  // const handleRadio1 = async (data) => {
  //   calculateTotal1data);
  //   await formik4.setFieldValue("freight", data);
  // };
  const getHierarchy = async (projectId) => {
    const res = await common_axios.post(`/projectenc/hierarchy/${projectId}`);
    let { statusDescription } = res.data;
    if (statusDescription.statusCode == 200) {
      let name = res.data.projects[0].name;
      setapprover1(name);
    }
    getCategories(projectId);
  };
  const getCategories = async (projectId) => {
    const res = await common_axios.post(`/projectenc/categories/0`);
    let { statusDescription } = res.data;
    projects.forEach((data) => {
      if (data.id == projectId) {
        setprojectName(data.name);
        setBusinessCompany(data.businessCompany);
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
    let arr = values[apiindex].expenseFiles?.filter((X) => {
      return X.id != id;
    });
    let expenseAttachments = values[apiindex].expenseAttachments?.filter(
      (X) => {
        return X != id;
      }
    );
    values[apiindex].expenseAttachments = expenseAttachments;
    values[apiindex].expenseFiles = arr;
    setinputfields(values);
    setviewFiles(arr);
  };
  const calculateSum = () => {
    let values = [...inputfields];
    let sum = 0;
    values.forEach((data) => {
      sum = sum + Number(data.amount);
    });
    setSum(sum);

    milestonesAmountudpate(sum);
  };
  const removeAttachments2 = async (name) => {
    let arr = [...files.arr];
    arr.splice(name, 1);
    await setFiles({
      arr: arr,
    });
  };
  const userSelector = useSelector((state) => state.authSliceandSidebar.user);
  useEffect(() => {
    if (expenseIdSelector != 0) {
      localStorage.removeItem("expenseId");
      setUpdate(false);
      setExpenseId(0);
    }
  }, [expenseIdSelector]);
  useEffect(async () => {
    if (userSelector) {
      await setUser(userSelector);
    }
  }, [userSelector]);

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
        accessor: "userId", // accessor is the "key" in the data
      },
      {
        Header: "Created Date Time",
        accessor: "created",
        Cell: (cell) => {
          return (
            <>
              {moment(new Date(cell.row.original.created))
                .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
                .format("DD-MMM-YYYY h:mm a")}
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
                .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
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
  const [apiindex, setapiindex] = useState(0);
  const [apiindex1, setapiindex1] = useState(0);
  const openModal = async (data, e) => {
    setapiindex(e);
    resetInput();
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
      }, 100);
    });

    resetInput();
    setfileNames("");
    setFiles({
      arr: [],
    });
    setTimeout(() => {
      setting(arr, fileArry);
    }, 1000);
    //       const formdata = new FormData();
    //     //   formdata.append("file",)
    // uploadFile(formdata)
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
      }, 1500);
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
      }, 1500);
    } else {
      values[apiindex]["expenseAttachments"] = arr;
    }
    await setinputfields(values);
    dispatch(setLoader(false));

    // console.log(inputfields);
    await modalContactClose.current.click();
  };
  //Loading...
  const UploadFile = (e) => {
    // console.log(inputfields);

    let values = [...inputfields];

    // values[apiindex].expenseFiles.// console.log(e.target.files);
    const file = e.target.files[0];
    let fileArray = Array.from(e.target.files);
    let isDuplicate = false;
    // fileArray.forEach((x, i) => {
    //   let obj = values[apiindex].expenseFiles.filter((y) => {
    //     return y.name == x.name;
    //   });
    // });

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
  const [vendorList, setVendorList] = useState([]);
  const [siteIdList, setSiteIdList] = useState([]);
  const [siteIdA, setsiteIdA] = useState(false);
  useEffect(() => {
    getUserProjects();
    getStates();
  }, []);
  const getVendors = async (id) => {
    const res = await common_axios.post(`/vendor/getBybusinessCompany/${id}`);
    if (res?.data?.statusDescription?.statusCode == 200) {
      res.data.vendorList.unshift({ vendorName: "Add Vendor", id: -1 });
      const options = res.data.vendorList.map((option) => {
        const type = option.id;
        return {
          firstLetter: type == -1 ? "New Vendor" : "Existing Vendor",
          ...option,
        };
      });
      setVendorList(options);
    } else {
      let vendorList = [];
      vendorList.unshift({ vendorName: "Add Vendor", id: -1 });
      const options = vendorList.map((option) => {
        const type = option.id;
        return {
          firstLetter: type == -1 ? "New Vendor" : "Existing Vendor",
          ...option,
        };
      });
      setVendorList(options);
    }
  };
  const getUserProjects = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // setUser(user)
    if (user != null) {
      const formdata = {
        roleId: user.roleId,
        userId: user.id,
        type: 1,
      };
      try {
        let res = await common_axios.post(`/project/get`, formdata);
        if (res?.data?.statusDescription?.statusCode == 200) {
          setprojects(res.data.projects);
        } else {
        }
      } catch (error) {}
    }
  };
  // const sidebarState = useSelector(
  //     (state) => state.sidebarReducer.sectionClass
  // );
  const history = useHistory();
  const dispatch = useDispatch();
  const [subIdList, setsubIdList] = useState([]);
  const [data2, setData2] = useState([]);
  const [states, setstatesList] = useState([]);
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
  const formik = useFormik({
    initialValues: {
      expenseTitle: "",
      expenseDate: "",
      projectId: 0,
      currencyId: "INR",
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

      if (milestones.length > 0 || mileBool == 2 || mileBool == 4) {
        const values = [...milestones];
        let sum1 = 0;
        let totalAmount = 0;
        values.forEach((data) => {
          if (checked1 == 1) {
            totalAmount = Number(totalAmount) + Number(data.percentage);
            sum1 = Number(sum1) + Number(data.finalAmount);
          } else {
            sum1 = Number(sum1) + Number(data.finalAmount);
          }
        });
        sum1 = sum1.toFixed(2);
        setCorrect(false);

        if (true) {
          if (checked1 == 1) {
            // || sum1 != sum
            if (totalAmount != 100) {
              Swal.fire({
                icon: "warning",
                title: "Percentage mismatch error",
                text: ` you entered  milestones for  ${totalAmount}%  this  should  be  equal  to  100%`,
              });
              return;
            }
          } else {
          }
        }
      }
      const arr = [...inputfields];
      let ob1 = arr.find((obj) => {
        return (
          obj.categoryState == null ||
          obj.subCatState == null ||
          obj.categoryId == 0 ||
          obj.subCategoryId == 0
        );
      });
      if (ob1) {
        Swal.fire({
          icon: "error",
          title: "Category required",
          text: "Category/SubCategory can't be empty",
        });
        return;
      }

      let returned = false;
      let hasamountBreakup = arr.some((user) => !user.amountBreakup);
      let hasEmptyTerms = arr.some((user) => !user.terms);
      let hasEmptyVendor = arr.some(
        (user) => !user.vendorDetails && vendorId == -1
      );

      let text = "Are you sure you want to proceed without ";
      if (hasamountBreakup) {
        text = text + " Amount Details";
      }
      if (hasEmptyTerms) {
        text = text + " Terms & Conditions";
      }
      if (hasEmptyVendor) {
        text = text + " Vendor Details ";
      }

      if (milestones.length == 0) {
        text = text + " Payment Milestones";
      }

      await console.log("sdfsdjhfgvsdcsd");

      if (
        hasamountBreakup ||
        hasEmptyTerms ||
        hasEmptyVendor ||
        milestones.length == 0
      ) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: text,

          showCancelButton: true,
          denyButtonText: `Cancel`,
          confirmButtonText: `Proceed`,
        }).then((res) => {
          if (res?.isDismissed) {
            console.log("sdfjs hgfsd");
            return;
          }

          if (res?.isConfirmed) {
            let formdata = {
              projectId: projectId,
              projectName: projectName,
              details: [],
              title: values.expenseTitle,
              description: values.expenseTitle,
              currencyId: "",
              dateValue: moment(new Date()).format("YYYY-MM-DD"),
              type: "1",
              approvalType: checked,
              isImportant: isImportant,
              list: milestones,
            };
            projects.forEach((data) => {
              if (data.id == projectId) {
                setprojectName(data.name);
                formdata["projectName"] = data.name;
              }
            });
            let sum2 = 0;
            inputfields.forEach((data, i) => {
              let obj = {
                expenseDate: moment(new Date()).format("YYYY-MM-DD"),
                expenseTitle: data.expensetitle,
                totalIncVat: data.amount,
                attachmentIdList: data.expenseAttachments,
                currencyId: data.currencyId,
                categoryId: data.categoryId,
                terms: data.terms,
                subCategoryId: data.subCategoryId,
                vendorId: data.vendorId,
              };
              if (data.amountBreakup) {
                obj["amountBreakup"] = data.amountBreakup;
              }
              if (data.vendorDetails) {
                obj["vendorDetails"] = data.vendorDetails;
              } else {
                obj["vendorDetails"] = null;
              }
              if (siteIdA) {
                obj["siteId"] = data.siteId;
              } else {
                obj["siteId"] = projectName.substr(
                  0,
                  projectName.lastIndexOf("_")
                );
              }
              sum2 = sum2 + Number(data.amount);
              formdata.details.push(obj);
            });
            formdata.currencyId = formdata.details[0].currencyId;
            const userId = localStorage.getItem("userId");
            formdata["userId"] = userId;
            formdata["expenseAppliedAmount"] = sum2;
            dispatch(setLoader(true));
            addPurchase(formdata);

            return;
          }

          // console.log(res.isConfirmed);
        });

        return;
      }

      let formdata = {
        projectId: projectId,
        projectName: projectName,
        details: [],
        title: values.expenseTitle,
        description: values.expenseTitle,
        currencyId: "",
        dateValue: moment(new Date()).format("YYYY-MM-DD"),
        type: "1",
        approvalType: checked,
        isImportant: isImportant,
        list: milestones,
      };
      projects.forEach((data) => {
        if (data.id == projectId) {
          setprojectName(data.name);
          formdata["projectName"] = data.name;
        }
      });
      let sum2 = 0;
      inputfields.forEach((data, i) => {
        let obj = {
          expenseDate: moment(new Date()).format("YYYY-MM-DD"),
          expenseTitle: data.expensetitle,
          totalIncVat: data.amount,
          attachmentIdList: data.expenseAttachments,
          currencyId: data.currencyId,
          categoryId: data.categoryId,
          terms: data.terms,
          subCategoryId: data.subCategoryId,
          vendorId: data.vendorId,
        };
        if (data.amountBreakup) {
          obj["amountBreakup"] = data.amountBreakup;
        }
        if (data.vendorDetails) {
          obj["vendorDetails"] = data.vendorDetails;
        } else {
          obj["vendorDetails"] = null;
        }
        if (siteIdA) {
          obj["siteId"] = data.siteId;
        } else {
          obj["siteId"] = projectName.substr(0, projectName.lastIndexOf("_"));
        }
        sum2 = sum2 + Number(data.amount);
        formdata.details.push(obj);
      });
      formdata.currencyId = formdata.details[0].currencyId;
      const userId = localStorage.getItem("userId");
      formdata["userId"] = userId;
      formdata["expenseAppliedAmount"] = sum2;
      dispatch(setLoader(true));
      addPurchase(formdata);
    },
  });

  const addPurchase = async (formdata) => {
    const res = await common_axios.post(`/expense/purchase/add`, formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setUpdate(true);
      // finalCreation(res.data.expenseId);
      setMilestones([]);
      setMileBool(0);
      setExpenseId(res.data.expenseId);
      resetForm();
      formik.handleReset();
      dispatch(setRedirection(true));
      dispatch(setLoader(false));
      history.push("/expense");
      Swal.fire({
        icon: "success",
        title: "Done",
        text: `Purchase Request Raised with Id : ${
          res.data.expenseId
        }  with description  ${formdata.title}  on Date :${moment(
          new Date()
        ).format("DD-MM-YYYY")}`,
      });
      dispatch(setLoader(false));
    } else {
      dispatch(setLoader(false));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.statusDescription.statusMessage,
      });
    }
  };
  const UploadGstFiles = () => {};
  const formik2 = useFormik({
    initialValues: {
      payment: "",
      delivery: "",
      warranty: "",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
      let inputArr = [...inputfields];
      values["type"] = 1;
      inputArr = inputArr.map((x) => {
        return { ...x, terms: values };
      });
      await setinputfields(inputArr);
      await setTermsSub(0);
      toast("Terms & Conditions added successfully");
      document.getElementById("paymentClose").click();
    },
  });
  const formik4 = useFormik({
    initialValues: {
      basicAmount: "0",
      unitPrice: "0",
      quantity: "0",
      gstAmount: "0",
      totalAmount: "0",
      freight: 0,
      remarks: "N/A",
      freightAmount: "0",
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
      const values1 = [...inputfields];
      calculateTotal();
      milestonesAmountudpate();
      values1[termsSub]["amountBreakup"] = values;
      values1[termsSub]["amount"] = values.totalAmount;
      let e = null;
      toast("Amount added successfully");
      formik4.handleReset(e);
      document.getElementById("btn-amount-close").click();
      calculateSum();
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
        amount: null,
        currencyId: "INR",
        vendorDetails: null,
        terms: null,
        vendorId: -1,
        categoryState: null,
        categoryId: 0,
        subCatState: null,
        subCategoryId: 0,
        amountBreakup: null,
        terms: null,
      },
    ]);
    setfileNames("");
    setFiles({
      arr: [],
    });
    formik1.handleReset();
    formik2.handleReset();
    formik4.handleReset();
    setprojectId(0);
    setBusinessCompany("N/A");
    setMCreate(false);
    setMCount(null);
  };

  const milestonesAmountudpate = (sum1) => {
    if (milestones.length > 0) {
      let values = [...milestones];
      // console.log(sum1);

      values = values.map((data) => {
        if (data) {
          let finalAmount = sum1 * (data.percentage / 100);
          // console.log(finalAmount);
          return { ...data, finalAmount: finalAmount.toFixed(2) };
        }
      });

      setMilestones(values);
    }
  };
  const saveAsPrevious = (index) => {
    const values = [...inputfields];
    index = index - 1;
    if (values[index]["vendorDetails"]) {
      let data = values[index]["vendorDetails"];
      formik1.setValues({
        vendorName: data.vendorName,
        bankName: data.bankName,
        accountNo: data.accountNo,
        panNo: data.panNo,
        gstNo: data.gstNo,
        ifsc: data.ifsc,
        state: data.state,
        pinCode: data.pinCode,
        address: data.address,
        panFileCheck: data.panFile,
        gstfileCheck: data.gstFile,
        chequeFileCheck: data.cheque,
        panFile: data.panFile,
        gstFile: data.gstFile,
        cheque: data.cheque,
        msmeCer: data.msmeCer,
        isMsme: data.isMsme,
        email: data.email,
        msisdn: data.msisdn,
        msmeCheck: data.msmeCer,
      });
      formik1.setFieldValue("isPrevious", true);
      setpIndex(index);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Previous Vendor is not there in line item",
      });
    }
  };
  const getSubIds = async (value, idnex) => {
    const res = await common_axios.post(`/project/sub/categories/${value}`);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setsubIdList(res.data.subCategoriesList);
      const values = [...inputfields];
      values[idnex].subCatState = null;
      values[idnex].subCategoryId = 0;
      values[idnex].subIdList = [];
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

      // console.log(values);
      setinputfields(values);
    } else {
      const values = [...inputfields];
      values[idnex].subIdList = [];
      setsubIdList([]);
      setinputfields(values);
    }
  };
  // ....................................KeywordCheckApi......................................................//
  const formik1 = useFormik({
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
      panFileCheck: "",
      chequeFileCheck: "",
      msmeCheck: "",
      isPrevious: false,
      address: "",
      isMsme: "0",
      isGST: "0",
      msmeCer: null,
      email: "",
      msisdn: "",
      isConfirm: true,
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
      address: yup.string().max(50, "Address must contain 50 characters"),
      gstNo: yup
        .string()
        .max(16, "GST must be max 15 characters")
        .min(15, "GST must contain 15 characters"),
      panNo: yup
        .string()
        .max(10, "PAN must be max 10 characters")
        .min(10, "PAN must contain 10 characters"),
    }),
    onSubmit: async (values) => {
      const arr = [...inputfields];
      if (isDuplicate) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "This GST/PAN  combination belong to an existing vendor having vendor Code ",
        });
        return;
      }
      if (!values.email.includes("@")) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Please enter a valid  email",
        });
        return;
      }
      if (formik1?.values?.isMsme == "1" && !values.msmeCer) {
        Swal.fire({
          icon: "warning",
          title: "File Required",
          text: "MSME certificate file is required",
        });
        return;
      }
      if (
        !values.cheque &&
        !values.gstFile &&
        !values.panFile &&
        !values.msmeCer
      ) {
        addVendorRef.current.click();
        arr[termsSub]["vendorDetails"] = values;
        await setinputfields(arr);
      } else {
        const formdata = new FormData();
        if (values.gstFile && typeof values.gstFile == "object") {
          formdata.append("gstFile", values.gstFile);
        }
        if (values.panFile && typeof values.panFile == "object") {
          formdata.append("panFile", values.panFile);
        }
        if (values.cheque && typeof values.cheque == "object") {
          formdata.append("chequeFile", values.cheque);
        }
        if (values.msmeCer && typeof values.msmeCer == "object") {
          formdata.append("msmeCer", values.msmeCer);
        }
        formdata.append("jwtToken", localStorage.getItem("token"));
        formdata.append("userId", localStorage.getItem("userId"));
        if (
          typeof values.cheque == "object" ||
          typeof values.panFile == "object" ||
          typeof values.gstFile == "object" ||
          typeof values.msmeCer == "object"
        ) {
          const res = await common_axios.post(`/vendor/upload/files`, formdata);
          if (res?.data?.statusDescription?.statusCode == 200) {
            addVendorRef.current.click();
            toast("Vendor Added Successfully");
            // setVendorSubmitted(true)
            arr[termsSub]["vendorDetails"] = values;
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

            let arr1 = [];
            arr.forEach((data, i) => {
              if (i == 0) {
                arr[i]["vendorDetails"] = values;
                arr[i]["vendorDetails"].isPrevious = false;
              } else {
                arr[i]["vendorDetails"] = values;
                arr[i]["vendorDetails"].isPrevious = true;
                // data.vendorDetails?.isPrevious = true;
              }
            });

            // console.log(arr);
            await setinputfields(arr);
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
  const { globalFilter } = state;
  const [globalSearchValue, setGlobalSearchValue] = useState(globalFilter);
  const handleChangeInput = (index, event) => {
    const values = [...inputfields];
    values[index][event.target?.name] = event.target?.value;
    if (event.target.name == "amount") {
    }
    setinputfields(values);
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
      values[index]["finalAmount"] = Number((sum * value) / 100).toFixed(2);
    }
    setMilestones(values);
  };
  const milestonesCreate = (count) => {
    const values = [...milestones];
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
        // if (i == 0) {
        //   formdata["isAdvance"] = 1;
        // } else {
        //   formdata["isAdvance"] = 0;
        // }
        totalMilestones.push(formdata);
      }
      setMilestones(totalMilestones);
      setMCreate(true);
    }
  };
  const changeAll = (event) => {
    const values = [...inputfields];
    if ((event.target.name = "currencyId")) {
      for (let i = 0; i < values.length; i++) {
        values[i][event.target?.name] = event.target?.value;
      }
    }
    setinputfields(values);
  };
  const changeVendorName = async (vendorId, index) => {
    const values = [...inputfields];
    values[index]["vendorId"] = vendorId;
    await setinputfields(values);
  };
  const handleChangeDate = (date, index) => {
    const values = [...inputfields];
    values[index]["expenseDate"] = date;
    setinputfields(values);
  };
  const handleAddFields = () => {
    // console.log(inputfields);
    setinputfields([
      ...inputfields,
      {
        expenseDate: new Date(),
        expensetitle: "",
        expenseAttachments: [],
        amount: null,
        expenseFiles: [],
        currencyId: inputfields[0].currencyId,
        categoryId: 0,
        subCatState: null,
        categoryState: null,
        vendorId: inputfields[0]?.vendorState?.id
          ? inputfields[0]?.vendorState?.id
          : -1,
        vendorDetails: inputfields[0].vendorDetails,
        terms: inputfields[0].terms,
        isPrevious: true,
        vendorState: inputfields[0].vendorState,
      },
    ]);
    calculateSum();
  };
  const handleRemoveFields1 = async () => {
    if (inputfields.length == 1) {
      return;
    }
    const values = [...inputfields];
    const length = values.length;
    values.pop();
    // let sum = 0;
    // values.forEach((data) => {
    //   sum = sum + Number(data.amount);
    // });
    setSum(sum);
    setinputfields(values);
    await calculateSum();
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
  const {} = useTable(
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
                    Purchase Request
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
                      className="row expense_lable expense_row mt- my-0 g- needs-validation"
                    >
                      <div className="my-0 mb-1">
                        <div className="row main_info">
                          <div className="col-md-auto d-flex justify-content-start">
                            <span>
                              {" "}
                              Business Company :{" "}
                              {
                                <b>
                                  {" "}
                                  {businessCompany ? businessCompany : "N/A"}
                                </b>
                              }
                            </span>
                          </div>
                          <div className="col-md-auto">
                            <span>
                              {" "}
                              Raised By : <b>{user && user.name}</b>
                            </span>
                          </div>
                          <div className="col-md-auto d-flex justify-content-start">
                            <span>
                              {" "}
                              Total Amount :{" "}
                              {
                                <b>
                                  {sum} &nbsp;{currencyId}
                                </b>
                              }
                            </span>
                          </div>
                          <div className="col-md-auto d-fle flex-wrap align-items-center px-  mt_0-1">
                            <span style={{ fontSize: "13px" }}>
                              <FormControl>
                                <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  defaultValue="female"
                                  name="radio-buttons-group"
                                >
                                  <div
                                    className="row"
                                    style={{ marginTop: "-10px" }}
                                  >
                                    <div className="col-md-12">
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            value={isImportant}
                                            onChange={(e) => {
                                              if (isImportant) {
                                                setisImportant(false);
                                              } else {
                                                setisImportant(true);
                                              }
                                            }}
                                          />
                                        }
                                        label="Mark as important"
                                      />
                                    </div>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </span>
                          </div>
                          <div className="col-md-auto d-fle flex-wrap align-items-center px-">
                            {
                              approver1 && (
                                // <div className="col-md-6 d-flex justify-content-end">
                                <span
                                  style={{ fontSize: "13px" }}
                                  className="d-flex"
                                >
                                  {" "}
                                  <b>Approver(Level 1) :</b>{" "}
                                  {approver1 && <span>{approver1}</span>}
                                </span>
                              )
                              // </div>
                            }
                          </div>
                        </div>
                      </div>

                      {
                        <div className="col-md-3 lavel select_project">
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
                                  className="select-project-input"
                                  style={{ fontSize: "12px" }}
                                  value={projectState}
                                  size="small"
                                  onChange={(e, newValue, reason) => {
                                    if (reason == "clear") {
                                      setProjectState([]);
                                      setprojectId(0);
                                      setVendorList([]);
                                      setCompanyId(0);
                                      setSiteId("");
                                      resetForm();
                                    }
                                    if (newValue) {
                                      getHierarchy(newValue.id);
                                      setProjectState(newValue);
                                      setprojectId(newValue.id);
                                      getVendors(newValue.companyId);
                                      setCompanyId(newValue.companyId);
                                      getSiteIds(newValue.id);
                                    }
                                    // setBusinessCompany(newValue.businessCompany)
                                    if (
                                      projectId == "1133" ||
                                      projectId == "1134" ||
                                      projectId == "1135"
                                    ) {
                                      setHideP(true);
                                    } else {
                                      setHideP(false);
                                    }
                                    // getSiteIds(newValue.id)
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
                              </FormControl>
                            </>
                          )}
                        </div>
                      }
                      {
                        <div className="col-md-3 lavel">
                          {/* <TextareaAutosize size="lg" name="Size" placeholder="Large" /> */}
                          <TextField
                            multiline
                            rows={2}
                            required
                            className="w-100"
                            label="Purchase Description"
                            name="expenseTitle"
                            // type="email"
                            variant="outlined"
                            autoComplete="off"
                            placeholder="Enter Purchase Description Here"
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
                      }
                      <div className="col-md-auto offset-md- radio_label_col lave">
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
                                  onChange={(e) => {
                                    handleRadio(0);
                                  }}
                                  value="0"
                                  name="radio-buttons"
                                />
                              }
                              label="Capex"
                              className="capexLabel"
                            />
                            <FormControlLabel
                              value="1"
                              control={
                                <Radio
                                  checked={checked == "1"}
                                  onChange={(e) => {
                                    handleRadio(1);
                                  }}
                                  value="1"
                                  name="radio-buttons"
                                />
                              }
                              label="Opex"
                            />
                            <FormControlLabel
                              value="2"
                              control={
                                <Radio
                                  checked={checked == "2"}
                                  onChange={(e) => {
                                    handleRadio(2);
                                  }}
                                  value="2"
                                  name="radio-buttons"
                                />
                              }
                              label="Both"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      {true && (
                        <div className="col-md-3" disabled={sum == 0}>
                          <div className="row">
                            <div className="col-md-auto">
                              {" "}
                              <p style={{ marginTop: "17px" }}>
                                Create milestones
                              </p>
                            </div>
                            <div className="col-md-auto">
                              {sum == 0 ? (
                                <img
                                  src="plus nj.png"
                                  disabled={sum == 0}
                                  style={{
                                    width: "100%",
                                    cursor: "pointer",
                                    marginTop: "14px",
                                    height: "38px",
                                  }}
                                  title="Please enter amount before entering milestones"
                                  onClick={(e) => {
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
                                  src="plus nj.png"
                                  data-bs-toggle="modal"
                                  data-bs-target="#create-milestone"
                                  disabled={sum == 0}
                                  style={{
                                    width: "100%",
                                    cursor: "pointer",
                                    marginTop: "14px",
                                    height: "38px",
                                  }}
                                  title="Add Payment Milestones"
                                  onClick={(e) => {
                                    pickData();
                                  }}
                                />
                              )}{" "}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="">
                        <div className="card p-3">
                          {/* <button
                            className="btn btn-primary  "
                            type="button"
                            onClick={(e) => {
                              milestonesAmountudpate();
                            }}
                          >
                            {" "}
                            Calculate{" "}
                          </button> */}
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
                              <AddIcon
                                className="text-dar"
                                style={{ color: "white" }}
                              />
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
                              onClick={() => {
                                handleRemoveFields1();
                                calculateSum();
                              }}
                              disabled={inputfields.length == 1}
                            >
                              <RemoveIcon style={{ color: "white" }} />
                            </IconButton>
                          </div>
                          {inputfields?.map((data, index) => {
                            return (
                              <div
                                id="create_expense1"
                                className="row mt-3"
                                key={index}
                                disabled={index != 0}
                              >
                                {siteIdA && (
                                  <div className="col-md-1">
                                    <FormControl
                                      fullWidth
                                      required="true"
                                      className=" mus"
                                      style={{ height: "31px" }}
                                    >
                                      <InputLabel
                                        // style={{ fontSize: "11px" }}
                                        id="demo-simple-select-label"
                                      >
                                        Site Id
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data.siteId}
                                        style={{ fontSize: "10px" }}
                                        name="siteId"
                                        required
                                        label="Site Id"
                                        // InputProps={{ style: { fontSize: '11px' } }}
                                        onChange={(event) => {
                                          handleChangeInput(index, event);
                                          setSiteId(event.target.value);
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
                                {/* {!siteIdA && (
                                  <div className="col-md-1">
                                    <TextField
                                      name="siteId"
                                      label="siteId"
                                      variant="outlined"
                                      size="small"
                                      InputProps={{
                                        style: { fontSize: "11px" },
                                      }}
                                      type="text"
                                      className="w-100 "
                                      required
                                      value={projectName.substr(
                                        0,
                                        projectName.lastIndexOf("_")
                                      )}
                                      onChange={(event) => {
                                      }}
                                    />
                                  </div>
                                )} */}

                                <div
                                  className="col-md-2"
                                  style={{ width: "158px" }}
                                >
                                  <>
                                    <FormControl fullWidth>
                                      <Autocomplete
                                        id="controlled-dem22o1"
                                        // open={true}
                                        value={data.categoryState}
                                        size="small"
                                        inputprops={{
                                          style: { padding: "0px" },
                                        }}
                                        required
                                        // style={{ padding: "0px" }}
                                        onChange={(e, newValue, reason) => {
                                          // console.log(reason);
                                          if (reason == "clear") {
                                            addCategoryState(index, 0, null);

                                            // setinputfields((prevvv) => {
                                            //   prevvv[index].categoryState = [];
                                            //   prevvv[index].categoryId = 0;
                                            //   return prevvv;
                                            // });
                                            return;
                                          }
                                          if (newValue) {
                                            getSubIds(newValue.id, index);
                                            addCategoryState(
                                              index,
                                              newValue.id,
                                              newValue
                                            );
                                          }
                                        }}
                                        options={categories?.sort(function (
                                          a,
                                          b
                                        ) {
                                          if (a.catTitle < b.catTitle) {
                                            return -1;
                                          }
                                          if (a.catTitle > b.catTitle) {
                                            return 1;
                                          }
                                          return 0;
                                        })}
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
                                            label="Category"
                                          />
                                        )}
                                      />
                                    </FormControl>
                                  </>
                                </div>
                                <div
                                  className=" col-md-2"
                                  style={{ width: "158px" }}
                                >
                                  <>
                                    <FormControl fullWidth>
                                      <Autocomplete
                                        id="controlled-demo16"
                                        // open={true}
                                        value={data.subCatState}
                                        size="small"
                                        required
                                        inputprops={{
                                          style: {
                                            padding: "0px !important",
                                            width: "100%",
                                          },
                                        }}
                                        onChange={(e, newValue, reason) => {
                                          if (reason == "clear") {
                                            addSubCatState(index, 0, null);
                                          }
                                          if (newValue) {
                                            // handleChangeInput(index, event)
                                            addSubCatState(
                                              index,
                                              newValue.id,
                                              newValue
                                            );
                                          }
                                        }}
                                        options={
                                          data?.subIdList?.sort(function (
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
                                          }) || []
                                        }
                                        getOptionLabel={(option) =>
                                          option?.name || ""
                                        }
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            label="Subcategory"
                                          />
                                        )}
                                      />
                                    </FormControl>
                                  </>
                                </div>
                                {
                                  <div className="col-md-auto">
                                    <>
                                      <FormControl style={{ width: "160px" }}>
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
                                          onChange={(e, newValue, reason) => {
                                            if (reason == "clear") {
                                              let values = [...inputfields];

                                              values = values.map((x) => {
                                                return {
                                                  ...x,
                                                  vendorId: -1,
                                                  vendorState: {
                                                    vendorName: "New Vendor",
                                                    id: -1,
                                                  },
                                                };
                                              });
                                              setinputfields(values);
                                              return;
                                            }
                                            let values = [...inputfields];

                                            values = values.map((x) => {
                                              return {
                                                ...x,
                                                vendorId: newValue.id,
                                                vendorState: newValue,
                                              };
                                            });
                                            handleChangeInput(index, e);
                                            setVendorId(newValue.id);
                                            if (newValue.id != -1) {
                                              UpdateVendorDetails(
                                                newValue.id,
                                                index
                                              );
                                            } else {
                                              values = values.map((x) => {
                                                return {
                                                  ...x,
                                                  vendorId: -1,
                                                  vendorState: {
                                                    vendorName: "Add Vendor",
                                                    id: "-1",
                                                  },
                                                };
                                              });
                                            }
                                            setinputfields(values);
                                          }}
                                          options={vendorList.sort(function (
                                            a,
                                            b
                                          ) {
                                            if (a.vendorName == "Add Vendor") {
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
                                            <TextField
                                              {...params}
                                              label="Vendor"
                                            />
                                          )}
                                          renderGroup={(params) => (
                                            <li key={params.key}>
                                              <GroupHeader>
                                                {params.group ==
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
                                }
                                {data.vendorId == -1 ? (
                                  <Tooltip
                                    title={
                                      data.vendorDetails ? (
                                        <h6 style={{ color: "lightblue" }}>
                                          Vendor Details
                                        </h6>
                                      ) : (
                                        <h6 style={{ color: "lightblue" }}>
                                          Add Vendor
                                        </h6>
                                      )
                                    }
                                    sx={{ cursor: "pointer" }}
                                    arrow
                                  >
                                    <div className="col-md-1 fi_clas">
                                      {data.vendorDetails ? (
                                        <button
                                          className={
                                            data.vendorDetails
                                              ? "btn bg-success vendor_button"
                                              : "btn bg-primary vendor_button"
                                          }
                                          type="button"
                                          ref={modalContact3}
                                          style={{ height: "71%" }}
                                          data-bs-toggle="modal"
                                          data-bs-target="#addVendor"
                                          onClick={(e) => {
                                            setTermsSub(index);
                                            formik1.handleReset();
                                            if (
                                              data.vendorDetails &&
                                              data.vendorId == -1
                                            ) {
                                              pickFromData(
                                                data.vendorDetails,
                                                index
                                              );
                                            }
                                            setHideSubmit(false);
                                            setVendorId(data.vendorId);
                                          }}
                                        >
                                          <span className="text-white">
                                            <i className="fa fa-eye " />
                                          </span>
                                        </button>
                                      ) : (
                                        <button
                                          className={
                                            data.vendorDetails
                                              ? "btn bg-success  fi_clas col_white"
                                              : "btn bg-primary  fi_clas col_white"
                                          }
                                          type="button"
                                          ref={modalContact3}
                                          data-bs-toggle="modal"
                                          data-bs-target="#addVendor"
                                          onClick={(e) => {
                                            setTermsSub(index);
                                            formik1.handleReset();
                                            setVendorId(data.vendorId);
                                            if (
                                              data.vendorDetails &&
                                              data.vendorId == -1
                                            ) {
                                              pickFromData(
                                                data.vendorDetails,
                                                index
                                              );
                                            }
                                            setHideSubmit(false);
                                          }}
                                        >
                                          <i className="fa fa-plus" />
                                        </button>
                                      )}
                                    </div>
                                  </Tooltip>
                                ) : (
                                  <Tooltip
                                    title={
                                      true && (
                                        <h6 style={{ color: "lightblue" }}>
                                          {data.vendorId != -1
                                            ? "View Details"
                                            : "Add Vendor"}
                                        </h6>
                                      )
                                    }
                                    sx={{ cursor: "pointer" }}
                                    arrow
                                  >
                                    <div
                                      className="col-md-auto"
                                      style={{ width: "fit-content" }}
                                    >
                                      <button
                                        className="btn bg-success "
                                        type="button"
                                        ref={modalContact3}
                                        data-bs-toggle="modal"
                                        data-bs-target="#addVendor"
                                        onClick={(e) => {
                                          formik1.handleReset();
                                          setHideSubmit(true);
                                          if (data.vendorState) {
                                            pickFromData(
                                              data.vendorState,
                                              index
                                            );
                                          } else {
                                            pickFromData(data.vendorState, i);
                                          }
                                          setVendorId(data.vendorId);
                                          // getVendorDetails(data.previousVendor)
                                        }}
                                        disabled={data.vendorId == 0}
                                      >
                                        <i className="fa fa-eye" />
                                      </button>
                                    </div>
                                  </Tooltip>
                                )}
                                {
                                  <div
                                    className="col-md-1"
                                    style={{ width: "fit-content" }}
                                  >
                                    <button
                                      className={
                                        data.terms
                                          ? "btn bg-success col_white"
                                          : "btn bg-primary col_white"
                                      }
                                      // className='btn bg-primary vendor_button'
                                      type="button"
                                      data-bs-toggle="modal"
                                      onClick={async (e) => {
                                        await setTermsSub(index);
                                        getPaymentTerms(index);
                                        if (data.terms) {
                                          getPaymentTermsUpdate(data.terms);
                                        }
                                      }}
                                      data-bs-target="#paymentTerms"
                                    >
                                      {data.terms ? <>T&C </> : <>T&C</>}{" "}
                                    </button>
                                  </div>
                                }
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
                                        setCurrencyId(event.target.value);
                                      }}
                                    >
                                      <MenuItem value={"INR"}>INR</MenuItem>
                                      <MenuItem value={"USD"}>USD</MenuItem>
                                      <MenuItem value={"KWD"}>KWD</MenuItem>
                                      <MenuItem value={"SGD"}>SGD</MenuItem>
                                      <MenuItem value={"KES"}>KES</MenuItem>
                                      <MenuItem value={"AED"}>AED</MenuItem>
                                      <MenuItem value={"CAD"}>CAD</MenuItem>
                                    </Select>
                                  </FormControl>
                                </div>
                                <div className="col-md-auto">
                                  <button
                                    className={
                                      !data.amountBreakup
                                        ? "btn btn-primary col_white"
                                        : "btn btn-success col_white"
                                    }
                                    onClick={(e) => {
                                      document
                                        .getElementById("amountExtendModal")
                                        .click();
                                      setTermsSub(index);
                                      if (data.amountBreakup) {
                                        pickAmount(data.amountBreakup);
                                      } else {
                                        let e = null;
                                        formik4.handleReset(e);
                                      }
                                    }}
                                    type="button"
                                  >
                                    {!data.amountBreakup
                                      ? "Fill Amount"
                                      : "View Amount"}
                                  </button>
                                </div>
                                <div
                                  className="col-md-auto purchase"
                                  style={{ width: "125px" }}
                                >
                                  <TextField
                                    name="amount"
                                    label="Purchase Amount"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    inputprops={{
                                      style: {
                                        textAlign: "right",
                                        width: "110px",
                                      },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    pattern="[0-9]*"
                                    className="w-100 "
                                    required
                                    readOnly={true}
                                    disabled={true}
                                    value={data.amount}
                                  />
                                </div>
                                <div
                                  className="col-md-1"
                                  id="choose_file_label"
                                >
                                  {/* -------------------------New file----------- */}
                                  <div className="container d-flex align-items-center justify-content-start px-0 mt-">
                                    {detailView ? (
                                      <>
                                        <div
                                          style={{
                                            display: "block",
                                            justifyContent: "start",
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
                                            {data.expenseFiles?.length}
                                          </span>
                                          <VisibilityIcon />
                                        </IconButton>
                                      </>
                                    )}
                                  </div>
                                  {/* -------------------------------End new file--------------------------------- */}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {detailView == false ? (
                        <>
                          <div className="text-center">
                            <button
                              type="submit"
                              style={{ fontSize: "11px" }}
                              className="btn btn-primary bg-gradient-primary m-0"
                            >
                              Submit
                            </button>
                            <button
                              style={{ marginLeft: "6px", fontSize: "11px" }}
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
                    <div className="row expense_row">
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
                                  <h5 style={{ fontSize: "13px" }}>
                                    No Record Found..!!
                                  </h5>
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
                                  <h5 style={{ fontSize: "13px" }}>
                                    No Record Found..!!
                                  </h5>
                                </div>
                              )}
                            </div>
                          </>
                        </div>
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
                        }}
                      >
                        <input
                          className="w-100 p-0 form-control form-control-lg"
                          multiple
                          key={inputkey || ""}
                          style={{
                            opacity: "0",
                            height: "35px",
                          }}
                          accept=".png,.jpg,.jpeg,.pdf,.docx,.xlsx ,.zip,.csv,.doc,.xls "
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
      <div
        className="modal fade"
        id="addVendor"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Vendor Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={addVendorRef}
                onClick={(e) => {
                  setHideSubmit(false);
                  formik1.handleReset();
                }}
              ></button>
            </div>
            <form
              onSubmit={formik1.handleSubmit}
              className="row mt- my-0 g-3 needs-validation"
            >
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-3">
                    <TextField
                      required
                      className="w-100"
                      label="Vendor Name"
                      name="vendorName"
                      disabled={vendorId != -1 || disIndex != 0}
                      maxLength="30"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Vendor Here"
                      size="small"
                      pattern="[A-Za-z]+"
                      value={formik1.values.vendorName}
                      onChange={(e) => {
                        formik1.handleChange(e);
                      }}
                      error={
                        formik1.touched.vendorName &&
                        Boolean(formik1.errors.vendorName)
                      }
                      helperText={
                        formik1.touched.vendorName && formik1.errors.vendorName
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <TextField
                      className="w-100"
                      label="GST No."
                      name="gstNo"
                      id="gstfocus"
                      variant="outlined"
                      disabled={vendorId != -1 || disIndex != 0}
                      autoComplete="off"
                      onBlur={(e) => {
                        gstNoCheckAndPanCheck();
                        if (!formik1.values.gstNo) {
                          Swal.fire({
                            icon: "warning",
                            title: "Warning",
                            text: "You're registering this vendor as a non GST vendor are you sure you want to proceed?",

                            showCancelButton: true,
                            denyButtonText: `Cancel`,
                            confirmButtonText: `Proceed`,
                          }).then((res) => {
                            if (res.isDismissed) {
                              document.getElementById("gstfocus").focus();
                            }
                          });
                        }
                      }}
                      placeholder="Enter GST no"
                      size="small"
                      value={formik1.values.gstNo}
                      onChange={(e) => {
                        e.target.value = e.target.value
                          .replace(/[^a-zA-Z0-9]/g, "")
                          .toUpperCase()
                          .trim();
                        if (e.target.value?.length <= 15) {
                          formik1.handleChange(e);
                        }
                      }}
                      error={
                        formik1.touched.gstNo && Boolean(formik1.errors.gstNo)
                      }
                      helperText={formik1.touched.gstNo && formik1.errors.gstNo}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextField
                      required
                      className="w-100"
                      label="PAN no."
                      name="panNo"
                      onBlur={(e) => {
                        gstNoCheckAndPanCheck();
                      }}
                      variant="outlined"
                      autoComplete="off"
                      disabled={vendorId != -1 || disIndex != 0}
                      placeholder="Enter PAN no"
                      size="small"
                      value={formik1.values.panNo}
                      onChange={(e) => {
                        e.target.value = e.target.value
                          .replace(/[^a-zA-Z0-9]/g, "")
                          .toUpperCase()
                          .trim();
                        if (e.target.value?.length <= 10) {
                          formik1.handleChange(e);
                        }
                      }}
                      error={
                        formik1.touched.panNo && Boolean(formik1.errors.panNo)
                      }
                      helperText={formik1.touched.panNo && formik1.errors.panNo}
                    />
                  </div>
                  <div className="col-md-3">
                    <TextField
                      className="w-100"
                      label="Bank Name"
                      name="bankName"
                      required
                      variant="outlined"
                      disabled={vendorId != -1 || disIndex != 0}
                      autoComplete="off"
                      placeholder="Enter Bank Name"
                      size="small"
                      value={formik1.values.bankName}
                      onChange={(e) => {
                        formik1.handleChange(e);
                      }}
                      error={
                        formik1.touched.bankName &&
                        Boolean(formik1.errors.bankName)
                      }
                      helperText={
                        formik1.touched.bankName && formik1.errors.bankName
                      }
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <TextField
                      required
                      inputprops={{ maxLength: 12 }}
                      className="w-100"
                      label="Account No"
                      name="accountNo"
                      disabled={vendorId != -1 || disIndex != 0}
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Account No"
                      size="small"
                      value={formik1.values.accountNo}
                      onChange={(e) => {
                        if (e.target.value.match(/^[0-9]*$/)) {
                          if (e.target.value?.length <= 16) {
                            e.target.value = e?.target?.value.trim();
                            formik1.handleChange(e);
                          }
                        }
                      }}
                      error={
                        formik1.touched.accountNo &&
                        Boolean(formik1.errors.accountNo)
                      }
                      helperText={
                        formik1.touched.accountNo && formik1.errors.accountNo
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <TextField
                      required
                      className="w-100"
                      label="IFSC"
                      name="ifsc"
                      variant="outlined"
                      autoComplete="off"
                      disabled={vendorId != -1 || disIndex != 0}
                      placeholder="Enter IFSC"
                      size="small"
                      value={formik1.values.ifsc}
                      onChange={(e) => {
                        e.target.value = e.target.value
                          .replace(/[^a-zA-Z0-9]/g, "")
                          .toUpperCase()
                          .trim();
                        if (e.target.value?.length <= 11) {
                          formik1.handleChange(e);
                        }
                      }}
                      error={
                        formik1.touched.ifsc && Boolean(formik1.errors.ifsc)
                      }
                      helperText={formik1.touched.ifsc && formik1.errors.ifsc}
                    />
                  </div>
                  <div className="col-md-3" style={{ marginTop: "-9px" }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-controlled-open-select-label">
                        State
                      </InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        disabled={vendorId != -1 || disIndex != 0}
                        value={formik1.values.state}
                        name="state"
                        onChange={(e) => {
                          formik1.handleChange(e);
                        }}
                      >
                        {states.length > 0 &&
                          states?.map((x, i) => {
                            return (
                              <MenuItem key={i} value={x.name}>
                                {x?.name}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-3">
                    <TextField
                      className="w-100"
                      label="PIN Code"
                      name="pinCode"
                      type="text"
                      maxLength="8"
                      disabled={vendorId != -1 || disIndex != 0}
                      variant="outlined"
                      required
                      autoComplete="off"
                      placeholder="Enter PIN Code"
                      size="small"
                      value={formik1.values.pinCode}
                      onChange={(e) => {
                        if (
                          !pattern.test(e.target.value) ||
                          e.target.value?.length > 6
                        ) {
                        } else {
                          formik1.handleChange(e);
                        }
                      }}
                      error={
                        formik1.touched.pinCode &&
                        Boolean(formik1.errors.pinCode)
                      }
                      helperText={
                        formik1.touched.pinCode && formik1.errors.pinCode
                      }
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <TextField
                      required
                      multiline
                      rows={2}
                      className="w-100"
                      disabled={vendorId != -1 || disIndex != 0}
                      label="Address"
                      name="address"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Address"
                      size="small"
                      value={formik1.values.address}
                      onChange={(e) => {
                        formik1.handleChange(e);
                      }}
                      error={
                        formik1.touched.address &&
                        Boolean(formik1.errors.address)
                      }
                      helperText={
                        formik1.touched.address &&
                        Boolean(formik1.errors.address)
                      }
                    />
                  </div>
                  <div className="col-md-3 mt-2">
                    <TextField
                      required
                      multiline
                      className="w-100"
                      disabled={vendorId != -1 || disIndex != 0}
                      label="Email"
                      name="email"
                      type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Email"
                      size="small"
                      value={formik1.values.email}
                      onChange={(e) => {
                        formik1.handleChange(e);
                      }}
                      error={
                        formik1.touched.email && Boolean(formik1.errors.email)
                      }
                      helperText={
                        formik1.touched.email && Boolean(formik1.errors.email)
                      }
                    />
                  </div>
                  <div className="col-md-3 mt-2">
                    <TextField
                      required
                      multiline
                      className="w-100"
                      disabled={vendorId != -1 || disIndex != 0}
                      label="Phone number"
                      pattern="/^[0-9]+$/"
                      name="msisdn"
                      // type="email"
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Enter Phone"
                      size="small"
                      value={formik1.values.msisdn}
                      onChange={(e) => {
                        if (
                          !pattern.test(e.target.value) ||
                          e.target.value?.length > 10
                        ) {
                        } else {
                          formik1.handleChange(e);
                        }
                      }}
                      error={
                        formik1.touched.msisdn && Boolean(formik1.errors.msisdn)
                      }
                      helperText={
                        formik1.touched.msisdn && Boolean(formik1.errors.msisdn)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label>MSME</label>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="isMsme"
                        disabled={vendorId != -1 || disIndex != 0}
                        value={formik1.values.isMsme}
                        onChange={(e) => {
                          formik1.handleChange(e);
                        }}
                      >
                        <div className="row justify-content-between">
                          <div className="col-md-4">
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              label="Yes"
                              disabled={vendorId != -1 || disIndex != 0}
                            />
                          </div>
                          <div className="col-md-6">
                            <FormControlLabel
                              value="0"
                              disabled={vendorId != -1 || disIndex != 0}
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
                    {formik1.values.isMsme == "1" && (
                      <>
                        {" "}
                        {formik1.values.msmeCheck == "" ||
                        (!formik1.values.msmeCer &&
                          !vendorSubmitted &&
                          !hideSubmit) ? (
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
                            {formik1?.values?.msmeCheck == "" ? (
                              <p>N/A</p>
                            ) : (
                              <>
                                <a
                                  className="text text-primary  newStyle"
                                  href={formik1?.values?.msmeCheck}
                                  target="_blank"
                                >
                                  {formik1?.values?.msmeCheck?.slice(
                                    formik1?.values?.msmeCheck?.lastIndexOf(
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
                    {formik1.values.gstfileCheck == "" ||
                    (!formik1.values.gstFile && !vendorSubmitted) ? (
                      <div className="col-md-3">
                        {!hideSubmit && (
                          <TextField
                            type="file"
                            label="GST File"
                            id="gstId"
                            required={formik1.values.gstNo != ""}
                            accept
                            name="gstFile"
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
                                  formik1.setFieldValue(
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
                                formik1.setFieldValue("gstFile", null);
                                formik1.setFieldValue("gstfileCheck", "");
                              }}
                            >
                              Remove File
                            </span>
                          )}
                        </label>
                        {formik1?.values?.gstfileCheck == "" ? (
                          <p>N/A</p>
                        ) : (
                          <>
                            <a
                              className="text text-primary  newStyle"
                              href={formik1?.values?.gstfileCheck}
                              target="_blank"
                            >
                              {formik1?.values?.gstfileCheck?.slice(
                                formik1?.values?.gstfileCheck?.lastIndexOf(
                                  "/"
                                ) + 1
                              )}{" "}
                            </a>{" "}
                            &nbsp;
                          </>
                        )}
                      </div>
                    )}
                    {formik1.values.panFileCheck == "" ||
                    (!formik1.values.panFile &&
                      !vendorSubmitted &&
                      !hideSubmit) ? (
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
                                  formik1.setFieldValue(
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
                                formik1.setFieldValue("panFile", null);
                                formik1.setFieldValue("panFileCheck", "");
                              }}
                            >
                              Remove File
                            </span>
                          )}
                        </label>
                        {formik1.values.panFileCheck == "" ? (
                          <p>N/A</p>
                        ) : (
                          <a
                            className="text text-primary"
                            href={formik1.values.panFileCheck}
                            target="_blank"
                          >
                            {formik1?.values?.panFileCheck?.slice(
                              formik1.values.panFileCheck?.lastIndexOf("/") + 1
                            )}{" "}
                          </a>
                        )}
                      </div>
                    )}
                    {formik1.values.chequeFileCheck == "" ||
                    (!formik1.values.cheque && !vendorSubmitted) ? (
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
                                  formik1.setFieldValue(
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
                        {formik1.values.chequeFileCheck == "" ? (
                          <p>N/A</p>
                        ) : (
                          <a
                            className="text text-primary"
                            href={formik1.values.chequeFileCheck}
                            target="_blank"
                          >
                            {formik1.values.chequeFileCheck?.slice(
                              formik1.values.chequeFileCheck?.lastIndexOf("/") +
                                1
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
                        value={formik1.values.address}
                        onChange={(e) => {
                          formik1.handleChange(e);
                        }}
                        error={
                          formik1.touched.address &&
                          Boolean(formik1.errors.address)
                        }
                        helperText={
                          formik1.touched.address && formik1.errors.address
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              {hideSubmit || disIndex != 0 ? (
                <></>
              ) : (
                <div className="modal-footer">
                  {termsSub != 0 && (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={async (e) => {
                        await setpIndex(termsSub);
                        await saveAsPrevious(termsSub);
                        setCopyPreviousS(true);
                      }}
                    >
                      Copy Previous
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={(e) => {
                      formik1.handleReset();
                    }}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
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
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Terms & Conditions{" "}
              </h1>
              <button
                type="button"
                className="btn-close"
                id="paymentClose"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {}}
                // ref={modalPaymentClose}
              ></button>
            </div>
            <form
              onSubmit={formik2.handleSubmit}
              className="row mt- my-0 g-3 needs-validation"
            >
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    <TextField
                      required
                      className="w-100"
                      label="Any other conditions"
                      name="payment"
                      // type="email"
                      variant="outlined"
                      disabled={disIndex != 0}
                      autoComplete="off"
                      placeholder="Enter other conditions"
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
                  <div className="col-md-4">
                    <TextField
                      className="w-100"
                      required
                      label="Warranty"
                      name="warranty"
                      disabled={disIndex != 0}
                      // type="email"
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
                  <div className="col-md-4">
                    <TextField
                      className="w-100"
                      required
                      label="Delivery Timeline"
                      disabled={disIndex != 0}
                      name="delivery"
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
              </div>
              {disIndex == 0 && (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <button
        type="button"
        id="amountExtendModal"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#amountExtend"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="amountExtend"
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
                onClick={(e) => {}}
              ></button>
            </div>
            <form
              onSubmit={formik4.handleSubmit}
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
                      value={formik4.values.unitPrice}
                      onChange={(e) => {
                        if (
                          e?.target?.value?.match(/^(\d*\.{0,1}\d{0,2}$)/) &&
                          e?.target?.value?.length < 8
                        ) {
                          formik4.handleChange(e);
                        }
                      }}
                      onBlur={(e) => {
                        calculateTotal();
                      }}
                      error={
                        formik4.touched.unitPrice &&
                        Boolean(formik4.errors.unitPrice)
                      }
                      helperText={
                        formik4.touched.unitPrice && formik4.errors.unitPrice
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
                      value={formik4.values.quantity}
                      onChange={(e) => {
                        if (
                          e?.target?.value?.match(/^(\d*\.{0,1}\d{0,2}$)/) &&
                          e?.target?.value?.length < 6
                        ) {
                          formik4.handleChange(e);
                        }
                      }}
                      onBlur={(e) => {
                        calculateTotal();
                      }}
                      error={
                        formik4.touched.quantity &&
                        Boolean(formik4.errors.quantity)
                      }
                      helperText={
                        formik4.touched.quantity && formik4.errors.quantity
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
                      value={formik4.values.basicAmount}
                      onChange={(e) => {
                        formik4.handleChange(e);
                      }}
                      error={
                        formik4.touched.basicAmount &&
                        Boolean(formik4.errors.basicAmount)
                      }
                      helperText={
                        formik4.touched.basicAmount &&
                        formik4.errors.basicAmount
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
                        !formik4.values.quantity && !formik4.values.unitPrice
                      }
                      autoComplete="off"
                      placeholder="Enter GST Rate"
                      size="small"
                      value={formik4.values.gstAmount}
                      onChange={(e) => {
                        if (
                          e?.target?.value?.match(/^(\d*\.{0,1}\d{0,2}$)/) &&
                          e?.target?.value?.length < 8
                        ) {
                          formik4.handleChange(e);
                        }
                      }}
                      onBlur={(e) => {
                        calculateTotal();
                      }}
                      error={
                        formik4.touched.gstAmount &&
                        Boolean(formik4.errors.gstAmount)
                      }
                      helperText={
                        formik4.touched.gstAmount && formik4.errors.gstAmount
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
                      value={formik4.values.freightAmount}
                      onChange={(e) => {
                        if (
                          e?.target?.value?.match(/^(\d*\.{0,1}\d{0,2}$)/) &&
                          e?.target?.value?.length < 8
                        ) {
                          formik4.handleChange(e);
                        }
                      }}
                      onBlur={() => {
                        calculateTotal();
                      }}
                      error={
                        formik4.touched.freightAmount &&
                        Boolean(formik4.errors.freightAmount)
                      }
                      helperText={
                        formik4.touched.freightAmount &&
                        formik4.errors.freightAmount
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
                      value={formik4.values.remarks}
                      onChange={(e) => {
                        if (e?.target?.value?.length < 100) {
                          formik4.handleChange(e);
                        }
                      }}
                      onBlur={() => {
                        calculateTotal();
                      }}
                      error={
                        formik4.touched.remarks &&
                        Boolean(formik4.errors.remarks)
                      }
                      helperText={
                        formik4.touched.remarks && formik4.errors.remarks
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
                      value={formik4.values.totalAmount}
                      onChange={(e) => {
                        formik4.handleChange(e);
                      }}
                      error={
                        formik4.touched.totalAmount &&
                        Boolean(formik4.errors.totalAmount)
                      }
                      helperText={
                        formik4.touched.totalAmount &&
                        formik4.errors.totalAmount
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
                    formik4.handleReset(e);
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
      <button
        type="button"
        id="milestone"
        className="btn btn-primary d-none"
        // data-bs-toggle="modal"
        // data-bs-target="#create-milestone"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="create-milestone"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel1">
                Create Payment Milestone for Amount{" "}
                <span>
                  {" "}
                  {currencyId}
                  &nbsp;
                  {sum}
                </span>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="btn-amount-close"
                aria-label="Close"
                onClick={(e) => {}}
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="row  mb-4">
                  <div className="col-md-4">
                    <TextField
                      required
                      className="w-100"
                      label="No. of milestones"
                      name="unitPrice"
                      type="number"
                      // type="email"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      autoComplete="off"
                      placeholder="Any number 1-10"
                      size="small"
                      value={mCount}
                      onChange={(e) => {
                        if (Number(e.target.value) <= 10) {
                          setMCount(e.target.value);
                        }
                      }}
                    />
                  </div>
                  {/* {mCreate && (
                    <div className="col-md-3 offset-md- radio_label_col lave">
                      <FormControl>
                        <FormLabel
                          id="demo-row-radio-buttons-group-label"
                          style={{ fontSize: "13px" }}
                        >
                          Payment Type
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="1"
                            control={
                              <Radio
                                checked={checked1 == "1"}
                                onChange={async (e) => {
                                  handleRadio1(1);
                                  await clearAmount();
                                }}
                                value="1"
                                name="radio-buttons"
                              />
                            }
                            label="Percent"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )} */}
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
                                checked1 == 0 ? "Amount" : "Percentage( in %)"
                              } `}
                              name="value"
                              // type="email"
                              variant="outlined"
                              // disabled={
                              //   !formik4.values.quantity && !formik4.values.unitPrice
                              // }
                              autoComplete="off"
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
                              onBlur={(e) => {
                                mileStoneSubmit();
                              }}
                            />
                          </div>
                          <div className="col-md-3">
                            <TextField
                              className="w-100"
                              required
                              label="Final Amount"
                              name="finalAmount"
                              variant="outlined"
                              disabled={true}
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
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => {
                    setMCreate(false);
                    setMCount(0);
                    setMilestones([]);
                    setCorrect(true);
                    setMileBool(3); // Reset Milestones
                  }}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  id="btn-amt-close"
                  data-bs-dismiss="modal"
                  onClick={(e) => {
                    setMCreate(false);
                    setMCount(0);
                    // console.log(mileBool);
                    // setMilestones([]);
                    if (mileBool == 3) {
                      setMileBool(1);
                      setMilestones([]);
                    }
                  }}
                >
                  Close
                </button>
                {mCreate ? (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      SaveMilestones();
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => {
                      milestonesCreate(mCount);
                    }}
                  >
                    Create
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
