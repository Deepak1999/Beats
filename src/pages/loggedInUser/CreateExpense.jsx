import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import attachment from "../../assets/images/attachment.png";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import ElectricMeterIcon from "@mui/icons-material/ElectricMeter";
import enIn from "date-fns/locale/en-IN";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./modal.css";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  RadioGroup,
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
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import XLSX from "sheetjs-style";
import { utils, writeFile } from "xlsx";
import Swal from "sweetalert2";
import * as yup from "yup";
import { common_axios } from "../../App";
import ColumnFilter from "../../Components/ColumnFilter";
import { PaymentTerm } from "../../Components/PaymentTerm";
import { setLoader } from "../../redux/features/authSliceandSidebar";
import { setRedirection } from "../../redux/features/expenseIdSlice";
import { decryptBody, encryptBody } from "../../utils/EncDecUtil";
import { DateRange } from "react-date-range";

export default function CreatedExpense() {
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
  const [viewUploadFiles, setviewUploadFiles] = useState([]);
  const modalContact = useRef(null);
  const modalContact1 = useRef(null);
  const modalContactClose = useRef(null);
  const [projectState, setProjectState] = useState([]);
  const [expenseId, setExpenseId] = useState(0);
  const [projects, setprojects] = useState([]);
  const [fileNames, setfileNames] = useState("");
  const [hideP, setHideP] = useState(false);
  const [revenue, setRevenue] = useState("");
  const [terms, setTerms] = useState("");
  const [detailView, setDetailView] = useState(false);
  const [state, setState] = useState({});
  const [subIdList, setsubIdList] = useState([]);
  const [requestType, setRequestType] = useState(0);
  const [user, setUser] = useState({});
  const [viewFiles, setviewFiles] = useState([]);
  const [sum, setSum] = useState(0);
  const [isImportant, setisImportant] = useState(false);
  const [update, setUpdate] = useState(false);
  const [currencyId, setCurrencyId] = useState("");
  const modalContact2 = useRef(null);
  const [approver1, setapprover1] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesF, setCategoriesF] = useState([]);
  const [siteIdA, setsiteIdA] = useState(false);
  const [siteIdList, setSiteIdList] = useState([]);
  const [fileVal, setFileVal] = useState(null);
  const [siteIdE, setSiteIdE] = useState([]);
  const [bulkB, setBulkB] = useState(false);
  const [bulkFile, setbulkFile] = useState(null);
  const [siteId, setsiteId] = useState("");
  const [vendorList, setVendorList] = useState([]);
  const [showmonth, setShowMonth] = useState(false);
  const [readIndex, setReadIndex] = useState(null);
  const [monthly, setMonthly] = useState(0);
  const [isRent, setisRent] = useState(false);
  const [payCode, setPayCode] = useState("");
  const [filterDate, setFilterDate] = useState([]);
  const [calAmount, setCalAmount] = useState(0);
  const [forMonth, setForMonth] = useState(0);
  const [disable, setDiasable] = useState(false);
  const [monthShow, setMonthShow] = useState("");
  const [states, setStates] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [vendorCode, setVendorCodes] = useState(false);
  const [states1, setStates1] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  var expenseIdSelector = useSelector(
    (state) => state.expenseIdSlice.expenseId
  );
  const addVendorRef = useRef(null);
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
  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const projectDropDownSet = (newValue) => {
    setDiasable(false);
    resetScheduleList(1, null);
    getHierarchy(newValue.id);
    setProjectState(newValue);
    getVendors(newValue.id);
    if (newValue.currency) {
      setCurrencyId(newValue.currency);
    }
    if (newValue.isRent == 1) {
      setisRent(true);
    } else {
      setisRent(false);
    }
    if (bulkB) {
      setBulkB(false);
      setbulkFile(null);
      setinputfields([
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
          categoryState: [],
          subCatState: [],
        },
      ]);
    }
    setprojectId(newValue.id);
    if (projectId == "1133" || projectId == "1134" || projectId == "1135") {
      setHideP(true);
    } else {
      setHideP(false);
    }
  };
  const setDateS = async (index, month) => {
    const values = [...inputfields];
    if (month) {
      if (month == 0) {
      } else {
        if (values[index].startDate && values[index].endDate && false) {
          let states1 = [...states];
          states1[0]["startDate"] = new Date(values[index].startDate);
          states1[0]["endDate"] = new Date(values[index].endDate);
          setStates(states1);
        } else {
          let date = new Date();
          let firstDay = new Date(date.getFullYear(), month - 1, 1);
          let lastDay = new Date(
            date.getFullYear(),
            month - 1,
            daysInMonth(month, date.getFullYear())
          );
          let valu = [...states];
          valu[0].startDate = new Date(firstDay);
          valu[0].endDate = new Date(lastDay);
          await setStates(valu);
          await setStates1(valu);
        }
        await setReadIndex(index);
      }
    } else {
      if (values[index].month == 0) {
      } else {
        if (values[index].startDate && values[index].endDate && false) {
          let states1 = [...states];
          states1[0]["startDate"] = new Date(values[index].startDate);
          states1[0]["endDate"] = new Date(values[index].endDate);
          setStates(states1);
        } else {
          let date = new Date();
          let firstDay = new Date(
            date.getFullYear(),
            values[index].month - 1,
            1
          );
          let lastDay = new Date(
            date.getFullYear(),
            values[index].month - 1,
            daysInMonth(values[index].month, date.getFullYear())
          );
          let valu = [...states];
          valu[0].startDate = new Date(firstDay);
          valu[0].endDate = new Date(lastDay);
          await setStates(valu);
          await setStates1(valu);
        }
        await setReadIndex(index);
      }
    }
  };
  const pickFromData = (data) => {
    formik3.handleReset();
    formik3.setValues({
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
          setsiteId(projectName1.substr(0, projectName1.lastIndexOf("_")));
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
  const getVendors = async (id) => {
    const res = await common_axios.post(`/vendor/get/${id}`);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setVendorList(res.data.vendorList);
    } else {
      let vendorList = [];
      setVendorList(vendorList);
    }
  };
  const getFolios = async (siteId, type, index, monthly) => {
    let formdata = {
      siteId: siteId,
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      type: monthly,
    };
    if (monthly == 1) {
      formdata["month"] = new Date().getMonth() + 1;
    }
    setVendorCodes(false);
    const res = await common_axios.post("/vendor/get/folios", formdata);
    if (res.data) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        if (type == 0) {
          const values = [...inputfields];
          let newValues = values.map((x) => {
            return { ...x, scheduleList: res.data.vendorFolioList };
          });
          setinputfields(newValues);
        }
        if (type == 1) {
          const values = [...inputfields];
          values[index].scheduleList = res.data.vendorFolioList;
          setinputfields(values);
        }
        setVendorCodes(true);
      } else if (res?.data?.statusDescription?.statusCode == 450) {
        setVendorCodes(false);
      }
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
  const getCategoriesForExcel = () => {
    let categorie = [...categories];
    let arr = [];
    categorie.forEach((data) => {
      let formdata = {
        id: data.id,
        name: data.catTitle,
      };
      arr.push(formdata);
    });
    setCategoriesF(arr);
  };
  const getSiteIdsForExcel = () => {
    if (siteIdA) {
      const values = [...siteIdList];
      let siteIdLs = values.map((x) => {
        return { id: x.id, siteName: x.siteId };
      });
      setSiteIdE(siteIdLs);
    }
  };
  const getAllSubCat = async () => {
    const res = await common_axios.post(`/project/sub/categories/0`);
    if (res?.data?.statusDescription?.statusCode == 200) {
      let arr = [];
      res.data.subCategoriesList.forEach((el) => {
        let formdata = {
          id: el.id,
          name: el.name,
        };
        arr.push(formdata);
      });
      setsubIdList(arr);
    }
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    let arr = [];
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      arr.push(json);
    };
    reader.readAsArrayBuffer(file);
  };
  const resetScheduleList = (type, index) => {
    let values = [...inputfields];
    if (type == 0) {
      values = values.map((x) => {
        return { ...x, scheduleList: [], monthly: 0, schedule: null };
      });
    }
    if (index) {
      if (type == 1) {
        values[index].scheduleList = [];
        values[index].schedule = null;
        values[index].monthly = 0;
      }
      setDiasable(false);
      values[index].categoryState = [];
      values[index].categoryId = 0;
      values[index].expensetitle = "";
      values[index].amount = "";
      values[index].subCatState = [];
      values[index].subCategoryId = 0;
      values[index].vendorDetails = null;
      values[index].monthly = 0;
    } else {
      values = values.map((x) => {
        return {
          ...x,
          categoryState: [],
          categoryId: 0,
          expensetitle: "",
          amount: "",
          subCatState: [],
          subCategoryId: 0,
          scheduleList: [],
          schedule: null,
          monthly: 0,
          vendorDetails: null,
        };
      });
    }
    setinputfields(values);
  };
  const getSubIds = async (value, idnex) => {
    const values = [...inputfields];
    if (value) {
      values[idnex].subIdList = [];
      values[idnex].subCatState = null;
      const res = await common_axios.post(`/project/sub/categories/${value}`);
      if (res?.data?.statusDescription?.statusCode == 200) {
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
  const getSubIds1 = async (value, idnex) => {
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
  const BulkUpload = () => {
    if (!bulkFile) {
      Swal.fire({
        title: "Please Add file",
        icon: "warning",
        text: "File is required to be imported",
      });
    }
    // e.preventDefault();
    if (
      bulkFile &&
      (bulkFile.name.split(".")[1] == "xlsx" ||
        bulkFile.name.split(".")[1] == "xls")
    ) {
      const file = bulkFile;
      const reader = new FileReader();
      let values = [...inputfields];
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        json.forEach(async (data, i) => {
          if (i != 0) {
            const parts = data[0]?.split("-");
            const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            let formdata = {
              expenseDate: date,
              expensetitle: data[4],
              subCategoryId: data[3],
              amount: data[5],
              expenseAttachments: [],
              expenseFiles: [],
              currencyId: currencyId,
              siteId: null,
              subIdList: [],
            };
            if (data[1] != 0) {
              let siteIdObj = siteIdList.find((x) => {
                return x.id == data[1];
              });
              if (siteIdObj) {
                formdata["siteId"] = siteIdObj.siteId;
              } else {
                if (siteIdA) {
                  Swal.fire({
                    icon: "warning",
                    title: "site id error",
                    text: "Site Id not matching",
                  });
                }
              }
            }
            if (categories.length > 0) {
              formdata["categoryState"] = categories?.find(
                (x) => x.id == data[2]
              );
              formdata["categoryId"] = data[2];
            } else {
              Swal.fire({
                icon: "warning",
                title: "Warning",
                text: "Please upload correct category id from category id  excel ",
              });
            }
            let sublistPr = getSubIds1(data[2], null);
            await sublistPr.then((el) => {
              if (el.length > 0) {
                formdata["subIdList"] = el;
                formdata["subCatState"] = el.find((x) => x.id == data[3]);
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Warning",
                  text: "Please upload correct sub category id from sub-category excel ",
                });
              }
            });
            values.pop();
            values.push(formdata);
            await setinputfields(values);
          }
        });
      };
      reader.readAsArrayBuffer(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "File Not Found",
        text: "Please upload an excel file",
      });
    }
    document.getElementById("close_bulk").click();
    setBulkB(true);
    setbulkFile(null);
  };
  const addCategoryState = (index, id, state) => {
    const values = [...inputfields];
    values[index]["categoryId"] = id;
    values[index]["categoryState"] = state;
    setinputfields(values);
  };
  const exportExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    moment(new Date()).format("DD MM YYYY");
    let name = `${fileName}`;
    dispatch(setLoader(false));
    writeFile(wb, `${name}.xlsx`);
  };
  const addSubCatState = (index, id, state) => {
    const values = [...inputfields];
    values[index]["subCategoryId"] = id;
    values[index]["subCatState"] = state;
    setinputfields(values);
  };
  const getCategories = async (projectId) => {
    const res = await common_axios.post(`/projectenc/categories/0`);
    let { statusDescription } = res.data;
    let projectName = "";

    projects.forEach((data) => {
      if (data.id == projectId) {
        setprojectName(data.name);
        console.log(data.name);
        projectName = data.name;
      }
    });
    if (statusDescription.statusCode == 200) {
      res.data.categories = res.data.categories.sort(function (a, b) {
        if (a.catTitle < b.catTitle) {
          return -1;
        }
        if (a.catTitle > b.catTitle) {
          return 1;
        }
        return 0;
      });
      if (projectName.includes("Tawseel") || projectName.includes("TAWSEEL")) {
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
    console.log(values);
    let arr = values[apiindex].expenseFiles.filter((X) => {
      return X.id != id;
    });
    let expenseAttachments = values[apiindex].expenseAttachments.filter((X) => {
      return X != id;
    });

    values[apiindex].expenseAttachments = expenseAttachments;
    values[apiindex].expenseFiles = arr;

    console.log(values[apiindex]);
    setinputfields(values);
    setviewFiles(arr);
  };
  const removeAttachments2 = async (name) => {
    console.log(name);

    let arr = [...files.arr];

    await console.log(arr);
    // arr.splice(name, 1);
    await console.log(arr);
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
      categoryState: [],
      subCatState: [],
      invoiceNo: "",
      vendorCode: "",
      schedule: "",
      scheduleList: [],
      monthly: 0,
      electricityData: null,
      payCode: "",
      month: 0,
      vendorDetails: null,
      startDate: null,
      endDate: null,
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
    const formdata = new FormData();
    files.arr.forEach((data) => {
      formdata.append("files", data);
    });
    var res = await common_axios.post(`/expense/upload/v2/file`, formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
      console.log(res.data);

      res.data.attachList.forEach((x) => {
        let obj = {
          id: x.id,
          name: x.saveFileName,
          url: x.url,
        };
        arr.push(x?.id);
        fileArry.push(obj);
      });
      setting(arr, fileArry);
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
    setfileNames("");
    setFiles({
      arr: [],
    });
  };

  // const uploadApi = async () => {
  //   let arr = [];
  //   let fileArry = [];
  //   dispatch(setLoader(true));
  //   files.arr.forEach((data) => {
  //     const formdata = new FormData();
  //     formdata.append("file", data);
  //     setTimeout(async () => {
  //       var res = await common_axios.post(`/expenseenc/upload/file`, formdata);
  //       if (res?.data?.statusDescription?.statusCode == 200) {
  //         let obj = {
  //           id: res?.data?.expenseAttachments?.id,
  //           name: data.name,
  //         };
  //         await arr.push(res?.data?.expenseAttachments?.id);
  //         await fileArry.push(obj);
  //       } else if (res?.data?.statusDescription?.statusCode == 401) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Session Expired",
  //           text: res?.data?.statusDescription?.statusMessage,
  //         });
  //       } else if (res?.data?.statusDescription?.statusCode == 500) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Internal server error",
  //           text: res?.data?.statusDescription?.statusMessage,
  //         });
  //       } else {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Something went wrong",
  //           text: res?.data?.statusDescription?.statusMessage,
  //         });
  //       }
  //     }, 1000);
  //   });
  //   setfileNames("");
  //   setFiles({
  //     arr: [],
  //   });
  //   setTimeout(() => {
  //     setting(arr, fileArry);
  //   }, 3000);
  // };
  const uploadFile = async (formdata) => {};
  const setting = async (arr, fileArry) => {
    console.log(fileArry);
    let values = [...inputfields];
    if (values[apiindex]["expenseFiles"]?.length > 0) {
      let myarr = [];
      myarr = values[apiindex]["expenseFiles"];
      fileArry.forEach((data) => {
        myarr.push(data);
      });
      setTimeout(() => {
        values[apiindex]["expenseFiles"] = myarr;
      }, 500);
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
      }, 200);
    } else {
      values[apiindex]["expenseAttachments"] = arr;
    }
    await setinputfields(values);
    dispatch(setLoader(false));
    await modalContactClose?.current?.click();
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
        type: 0,
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
          // console.log(res.data.projects);
        } else {
        }
      } catch (error) {}
    }
  };
  const history = useHistory();
  const dispatch = useDispatch();
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
      if (currencyId == "") {
        Swal.fire({
          icon: "warning",
          title: "Currency required",
          text: "Please select a currency",
        });
        return;
      }
      let showPayCodeErr = false;
      let values1 = [...inputfields];
      let ob1 = values1.find((obj) => {
        return (
          obj.categoryState == null ||
          obj.subCatState == null ||
          obj.categoryId == 0 ||
          obj.subCategoryId == 0
        );
      });
      // // console.log(ob1);
      // return;
      if (ob1) {
        Swal.fire({
          icon: "error",
          title: "Category required",
          text: "Category/SubCategory can't be empty",
        });
        return;
      }

      let formdata = {
        projectId: projectId,
        projectName: projectName,
        details: [],
        title: values.expenseTitle,
        description: values.expenseTitle,
        currencyId: currencyId,
        dateValue: moment(data.expenseDate).format("YYYY-MM-DD"),
        type: 0,
        isImportant: isImportant,
      };
      projects.forEach((data) => {
        if (data.id == projectId) {
          setprojectName(data.name);
          formdata["projectName"] = data.name;
          if (data.isRent == 0) {
            showPayCodeErr = false;
          } else {
            showPayCodeErr = true;
          }
        }
      });
      let arr = [];
      let duplicates = [];
      values1.forEach((data) => {
        if (
          (data.monthly == 1 && showPayCodeErr) ||
          (data.monthly == 2 && showPayCodeErr)
        ) {
          arr.push(data.schedule);
        }
      });
      let noattach = false;
      values1.forEach((data) => {
        if (data.monthly == 1 && data.expenseAttachments.length == 0) {
          noattach = true;
        }
      });
      if (noattach && vendorCode) {
        // Swal.fire({
        //   icon: "warning",
        //   title: "Attachment Required",
        //   text: "Invoice is mandatory in rent payments ",
        // });
        // return;
      }
      let obj = values1.filter((x) => {
        return x.monthly == 2;
      });
      let value = false;
      obj.forEach((data) => {
        if (!data.electricityData) {
          value = true;
        }
      });
      if (value && isRent) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Meter reading is required ",
        });
        return;
      }
      if (arr.length > 0 && vendorCode) {
        let duplicateValue = false;
        arr.forEach(function (value, index, array) {
          if (
            array.indexOf(value, index + 1) !== -1 &&
            duplicates.indexOf(value) === -1
          ) {
            duplicateValue = true;
          }
        });
        if (duplicateValue && vendorCode) {
          Swal.fire({
            icon: "warning",
            title: "Duplicate paycodes selected",
            text: "Duplicate paycodes selected in multiple sub expenses. Pls select one paycode only once.",
          });
          return;
        }
      }
      let sum = 0;
      inputfields.forEach((data) => {
        let obj = {
          expenseDate: moment(new Date()).format("YYYY-MM-DD"),
          expenseTitle: data.expensetitle,
          totalIncVat: data.amount,
          attachmentIdList: data.expenseAttachments,
          categoryId: data.categoryId,
          currencyId: currencyId,
          subCategoryId: data.subCategoryId,
          vendorId: data.vendorId,
          invoiceNo: data?.invoiceNo,
          scheduleId: data?.schedule,
        };
        if (data.monthly == 1 && vendorCode) {
          obj["startDate"] = data.startDate;
          obj["endDate"] = data.endDate;
        }
        if (data?.electricityData) {
          obj["electricityData"] = data?.electricityData;
        }
        if (siteIdA) {
          obj["siteId"] = data.siteId;
        } else {
          obj["siteId"] = projectName.substr(0, projectName.lastIndexOf("_"));
        }
        if (data.month != 0 && !data.startDate && !data.endDate && vendorCode) {
          let date = new Date();
          obj.endDate = moment(
            new Date(
              date.getFullYear(),
              data.month - 1,
              daysInMonth(data.month, date.getFullYear())
            )
          ).format("YYYY-MM-DD");
          obj.startDate = moment(
            new Date(date.getFullYear(), data.month - 1, 1)
          ).format("YYYY-MM-DD");
        }
        sum = sum + Number(data.amount);
        formdata.details.push(obj);
      });
      const userId = localStorage.getItem("userId");
      formdata["userId"] = userId;
      formdata["expenseAppliedAmount"] = sum;
      dispatch(setLoader(true));
      encryptBody(formdata, localStorage.getItem("aesKey"), 1);
      // let res = await expenseService.addExpense(formdata);

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
          text: `Expense Request Raised with Id : ${
            res.data.expenseId
          }  with description  ${values.expenseTitle}  on Date :${moment(
            new Date()
          ).format("DD-MM-YYYY")}`,
        }).then(() => {
          history.push("/expense");
        });
      } else {
        dispatch(setLoader(false));
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.data.statusDescription.statusMessage,
        });
      }
    },
  });
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
    onSubmit: async (values) => {},
  });
  const addRevenueData = async (expenseId) => {
    let formdata = {
      userId: user.id,
      expenseId: expenseId,
      revenue: revenue,
      terms: terms,
    };
    const res = await common_axios.post("/expense/add/revenue", formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
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
    setDiasable(false);
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
        subCategoryId: null,
        siteId: "",
        subIdList: [],
        categoryState: [],
        subCatState: [],
        invoiceNo: "",
        vendorCode: "",
        schedule: "",
        scheduleList: [],
        monthly: 0,
        electricityData: null,
        payCode: "",
        month: 0,
        vendorDetails: null,
        startDate: null,
        endDate: null,
      },
    ]);
    setfileNames("");
    setFiles({
      arr: [],
    });
    await setProjectState([]);
    setprojectId(0);
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
  const formik2 = useFormik({
    initialValues: {
      openRead: "",
      closeRead: "",
      dueDate: "",
      created: moment(new Date()).format("YYYY-MM-DD"),
      billAmount: null,
      totalAmount: null,
      lateFee: null,
    },
    onReset: (initialValues) => ({
      values: { initialValues },
    }),
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let values1 = [...inputfields];
      values1[readIndex].electricityData = values;
      if (!values.lateFee) {
        values1[readIndex].electricityData.lateFee = "0";
      }
      values1[readIndex].electricityData["created"] = moment(new Date()).format(
        "YYYY-MM-DD"
      );
      values1[readIndex].amount = values.totalAmount;
      setSum(values.totalAmount);
      await setinputfields(values1);
      resetData();
      document.getElementById("meter-close").click();
    },
  });
  const resetData = () => {
    formik2.setFieldValue("openRead", "");
    formik2.setFieldValue("closeRead", "");
    formik2.setFieldValue("dueDate", "");
  };
  const textareaRef = useRef();
  const { globalFilter } = state;
  const [globalSearchValue, setGlobalSearchValue] = useState(globalFilter);
  const handleChangeInput = (index, event) => {
    const values = [...inputfields];
    values[index][event.target?.name] = event.target?.value;
    if (event.target.name == "amount") {
    }
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
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          className="less"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            alignContent: "center",
            margin: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className=" card-body  m-0" style={{ marginRight: "-19px" }}>
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
                    Expense Detail
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
                    Create Expense
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
                        <div className="row main_info">
                          <div
                            className="col-md-auto d-fle flex-wrap align-items-center px-"
                            style={{ justifyContent: "space-aroun" }}
                          >
                            <span style={{ fontSize: "13px" }}>
                              {" "}
                              Raised By : <b>{user && user.name}</b>
                            </span>
                          </div>
                          <div className="col-md-auto d-fle flex-wrap align-items-center px-">
                            <span style={{ fontSize: "13px" }}>
                              {" "}
                              Total Sum : <b>{sum.toLocaleString()}</b>{" "}
                              <b className="ml-1 text-success">{currencyId}</b>
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
                            {approver1 && (
                              <span
                                style={{ fontSize: "13px" }}
                                className="d-flex"
                              >
                                {" "}
                                <b>Approver(Level 1) :</b>{" "}
                                {approver1 && <span>{approver1}</span>}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {
                        <div className=" lavel col-md-2">
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
                                  onChange={(e, newValue, reason) => {
                                    resetScheduleList(1, null);
                                    setisRent(false);
                                    setVendorCodes(false);
                                    if (reason == "clear") {
                                      setProjectState([]);
                                      resetScheduleList(1, null);
                                      setCurrencyId("");
                                      resetForm();
                                      setDiasable(false);
                                      return;
                                    }
                                    projectDropDownSet(newValue);
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
                      <div className="col-md-1">
                        <FormControl fullWidth>
                          <InputLabel
                            style={{ fontSize: "11px" }}
                            id="demo-simple-select-label"
                          >
                            Currency
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            InputProps={{
                              style: {
                                fontSize: "11px",
                                padding: "10px !important",
                              },
                            }}
                            value={currencyId}
                            name="currencyId"
                            label="Currency"
                            onChange={(event) => {
                              setCurrencyId(event.target.value);
                            }}
                            required
                          >
                            <MenuItem value={""}>Select</MenuItem>
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
                      <div className=" lavel col-md-5">
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
                          disabled={disable}
                          value={formik.values.expenseTitle}
                          onChange={(e) => {
                            if (disable) {
                            } else {
                              formik.handleChange(e);
                            }
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
                      <div className="hny">
                        <div className=" more_padding card p-3">
                          <div
                            className="rocket d-flex align-items-center"
                            style={{ justifyContent: "space-between" }}
                          >
                            <div>
                              <h5
                                className="mb-0"
                                style={{
                                  fontSize: "14px",
                                  color: "rgb(133, 133, 133)",
                                }}
                              >
                                Sub Expense Details
                              </h5>
                            </div>
                            <div
                              className="d-flex align-items-center "
                              style={{}}
                            >
                              {projectId != 0 && (
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modal_popup"
                                  onClick={(e) => {
                                    getAllSubCat();
                                    getCategoriesForExcel();
                                    getSiteIdsForExcel();
                                  }}
                                >
                                  Import Excel
                                </button>
                              )}
                              &nbsp;
                              <IconButton
                                className="bg-success "
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
                                  style={{ fontSize: "14px", color: "white" }}
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
                                onClick={async () => {
                                  await setSum(0);
                                  handleRemoveFields1();
                                }}
                                disabled={inputfields.length == 1}
                              >
                                <RemoveIcon
                                  style={{ fontSize: "14px", color: "white" }}
                                />
                              </IconButton>
                            </div>
                          </div>
                          {inputfields?.map((data, index) => {
                            return (
                              <div
                                id="create_expense"
                                className="row expense_div mt-3"
                                key={index}
                              >
                                <div
                                  className="col-md-12"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
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
                                          style={{ fontSize: "11px" }}
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
                                            setsiteId(event.target.value);
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
                                        // size="small"
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
                                          // getFolios(event.target.value, 0);
                                        }}
                                      />
                                    </div>
                                  )}
                                  <div className="col-md-1">
                                    <>
                                      <FormControl fullWidth>
                                        <Autocomplete
                                          id="controlled-dem22o1"
                                          value={data.categoryState}
                                          size="small"
                                          inputProps={{
                                            style: { padding: "0px" },
                                          }}
                                          required
                                          // style={{ padding: "0px" }}
                                          onChange={(e, newValue, reason) => {
                                            setVendorCodes(false);
                                            if (reason == "clear") {
                                              resetScheduleList(1, index);
                                            }
                                            resetScheduleList(1, index);
                                            if (newValue) {
                                              // handleChangeInput(index, event
                                              getSubIds(newValue.id, index);
                                              addCategoryState(
                                                index,
                                                newValue.id,
                                                newValue
                                              );
                                              setShowMonth(false);
                                              if (
                                                newValue.monthly == 1 ||
                                                newValue.monthly == 2
                                              ) {
                                                setMonthly(newValue.monthly);
                                                const values = [...inputfields];
                                                values[index].monthly =
                                                  newValue.monthly;
                                                if (siteIdA && isRent) {
                                                  resetScheduleList(1, index);
                                                  getFolios(
                                                    projectName.substr(
                                                      0,
                                                      projectName.lastIndexOf(
                                                        "_"
                                                      )
                                                    ),
                                                    1,
                                                    index,
                                                    newValue.monthly
                                                  );
                                                  values[index].expensetitle =
                                                    "";
                                                } else {
                                                  values[index].expensetitle =
                                                    "";
                                                  resetScheduleList(0, index);
                                                  getFolios(
                                                    projectName.substr(
                                                      0,
                                                      projectName.lastIndexOf(
                                                        "_"
                                                      )
                                                    ),
                                                    0,
                                                    index,
                                                    newValue.monthly
                                                  );
                                                }
                                                setinputfields(values);
                                              }
                                            }
                                          }}
                                          options={categories.sort(function (
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
                                  <div className=" custom-select-font col-md-1">
                                    <>
                                      <FormControl fullWidth>
                                        <Autocomplete
                                          id="controlled-demo11"
                                          value={data.subCatState}
                                          size="small"
                                          inputProps={{
                                            style: {
                                              padding: "0px !important",
                                            },
                                          }}
                                          onChange={(e, newValue) => {
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
                                              if (a.catTitle < b.catTitle) {
                                                return -1;
                                              }
                                              if (a.catTitle > b.catTitle) {
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
                                  {data?.scheduleList?.length > 0 &&
                                    (data?.monthly == 1 || data.monthly == 2) &&
                                    isRent && (
                                      <div className="col-md-1">
                                        <FormControl fullWidth required="true">
                                          <InputLabel id="demo-simple-select-label">
                                            Pay code
                                          </InputLabel>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={data.schedule}
                                            size="small"
                                            name="schedule"
                                            required
                                            inputProps={{
                                              style: { lineHeight: "0.4375" },
                                            }}
                                            onBlur={(e) => {
                                              calculateSum();
                                            }}
                                            label="Vendor"
                                            onChange={async (event) => {
                                              setDiasable(true);
                                              handleChangeInput(index, event);
                                              let obj = data.scheduleList.find(
                                                (x) => {
                                                  return (
                                                    x.id == event.target.value
                                                  );
                                                }
                                              );
                                              formik.setFieldValue(
                                                "expenseTitle",
                                                `Rent For Month ${
                                                  obj?.paycode?.split("-")[1]
                                                } - ${
                                                  obj?.paycode?.split("-")[2]
                                                }`
                                              );
                                              if (
                                                data.monthly == 1 ||
                                                data.monthly == 2
                                              ) {
                                                let values = null;
                                                setForMonth(data.month);
                                                if (true) {
                                                  let date = new Date();
                                                  values = [...inputfields];
                                                  (values[index].expensetitle =
                                                    obj.vendorDetails.vendorName),
                                                    (values[index].payCode =
                                                      obj.paycode);

                                                  if (data.monthly == 1) {
                                                    values[index].amount =
                                                      obj.amount;
                                                    values[index].month =
                                                      obj.forMonth;

                                                    values[index].vendorId =
                                                      obj.vendorDetails.id;
                                                    values[index].startDate =
                                                      new Date(
                                                        date.getFullYear(),
                                                        obj.forMonth - 1,
                                                        1
                                                      );
                                                    values[index].endDate =
                                                      new Date(
                                                        date.getFullYear(),
                                                        obj.forMonth - 1,
                                                        daysInMonth(
                                                          obj.forMonth,
                                                          date.getFullYear()
                                                        )
                                                      );
                                                    let valu = [...states];
                                                    valu[0].startDate =
                                                      new Date(
                                                        date.getFullYear(),
                                                        obj.forMonth - 1,
                                                        1
                                                      );
                                                    valu[0].endDate = new Date(
                                                      date.getFullYear(),
                                                      obj.forMonth - 1,
                                                      daysInMonth(
                                                        obj.forMonth,
                                                        date.getFullYear()
                                                      )
                                                    );
                                                    await setStates(valu);
                                                    await setStates1(valu);
                                                    // setDateS(
                                                    //   index,
                                                    //   obj.forMonth
                                                    // );
                                                    values[
                                                      index
                                                    ].vendorDetails =
                                                      obj.vendorDetails;
                                                    setCalAmount(obj.amount);
                                                  }
                                                }
                                                await setinputfields(values);
                                              }
                                            }}
                                          >
                                            {data.scheduleList?.map((d) => {
                                              return (
                                                <MenuItem
                                                  value={d.id}
                                                  key={d.id}
                                                >
                                                  {d.paycode}
                                                </MenuItem>
                                              );
                                            })}
                                          </Select>
                                        </FormControl>
                                      </div>
                                    )}
                                  {data?.scheduleList?.length > 0 &&
                                    data.monthly == 1 &&
                                    isRent &&
                                    vendorCode && (
                                      <div className="col-md-auto">
                                        <IconButton
                                          onClick={async (e) => {
                                            document
                                              .getElementById("rent-click")
                                              .click();
                                            if (data.month == 0) {
                                            } else {
                                              if (
                                                data.startDate &&
                                                data.endDate
                                              ) {
                                                let states1 = [...states];
                                                states1[0]["startDate"] =
                                                  new Date(data.startDate);
                                                states1[0]["endDate"] =
                                                  new Date(data.endDate);
                                                setStates(states1);
                                              } else {
                                                let date = new Date();
                                                let firstDay = new Date(
                                                  date.getFullYear(),
                                                  data.month - 1,
                                                  1
                                                );
                                                let lastDay = new Date(
                                                  date.getFullYear(),
                                                  data.month - 1,
                                                  daysInMonth(
                                                    data.month,
                                                    date.getFullYear()
                                                  )
                                                );
                                                let valu = [...states];
                                                valu[0].startDate = new Date(
                                                  firstDay
                                                );
                                                valu[0].endDate = new Date(
                                                  lastDay
                                                );
                                                await setStates(valu);
                                                await setStates1(valu);
                                              }
                                              await setReadIndex(index);
                                            }
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
                                  <div className="col-md-1">
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
                                        InputProps={{
                                          style: { fontSize: "11px" },
                                        }}
                                        size="small"
                                        type="text"
                                        disabled={
                                          ((data.monthly == 1 && isRent) ||
                                            (data.monthly == 2 && isRent)) &&
                                          vendorCode
                                        }
                                        className="w-100 "
                                        required
                                        value={data.expensetitle}
                                        onChange={(event) =>
                                          handleChangeInput(index, event)
                                        }
                                      />
                                    </Tooltip>
                                  </div>
                                  {data.vendorDetails && (
                                    <div
                                      className="col-md-auto"
                                      style={{ width: "fit-content" }}
                                    >
                                      <button
                                        className="btn bg-success "
                                        type="button"
                                        ref={addVendorRef}
                                        data-bs-toggle="modal"
                                        data-bs-target="#showVendor"
                                        onClick={(e) => {
                                          if (data.vendorDetails) {
                                            pickFromData(data.vendorDetails);
                                          }
                                        }}
                                      >
                                        <i
                                          className="fa fa-eye"
                                          style={{
                                            height: "auto",
                                            width: "auto",
                                          }}
                                        />
                                      </button>
                                    </div>
                                  )}
                                  {data.monthly == 2 && (
                                    <div className="col-md-auto">
                                      <IconButton
                                        onClick={async (e) => {
                                          document
                                            .getElementById("meter-click")
                                            .click();
                                          await setPayCode(data.expensetitle);
                                          setReadIndex(index);
                                          let values = [...inputfields];
                                          if (values[index].electricityData) {
                                            let values1 =
                                              values[index].electricityData;
                                            formik2.setFieldValue(
                                              "openRead",
                                              values1?.openRead
                                            );
                                            formik2.setFieldValue(
                                              "closeRead",
                                              values1?.closeRead
                                            );
                                            formik2.setFieldValue(
                                              "dueDate",
                                              values1?.dueDate
                                            );
                                          } else {
                                            resetData();
                                          }
                                        }}
                                        title="Fill Meter Reading"
                                      >
                                        <ElectricMeterIcon
                                          sx={{
                                            color: "blue",
                                            fontSize: "xx-large",
                                            marginTop: "-10px",
                                          }}
                                        />
                                      </IconButton>
                                    </div>
                                  )}
                                  <div className="col-md-1">
                                    <Tooltip
                                      title={
                                        data.invoiceNo && (
                                          <h6 style={{ color: "lightblue" }}>
                                            {data.invoiceNo}
                                          </h6>
                                        )
                                      }
                                      sx={{ cursor: "pointer" }}
                                      arrow
                                    >
                                      <TextField
                                        name="invoiceNo"
                                        label="Invoice No."
                                        variant="outlined"
                                        InputProps={{
                                          style: { fontSize: "11px" },
                                        }}
                                        required
                                        size="small"
                                        type="text"
                                        className="w-100 "
                                        value={data.invoiceNo}
                                        onChange={(event) => {
                                          if (
                                            event.target.value?.length < 120
                                          ) {
                                            handleChangeInput(index, event);
                                          }
                                        }}
                                      />
                                    </Tooltip>
                                  </div>
                                  <div className="col-md-2">
                                    <TextField
                                      name="amount"
                                      label="Expense Amount"
                                      variant="outlined"
                                      InputProps={{
                                        style: { fontSize: "11px" },
                                        shrink: true,
                                        // (data.monthly == 1 ||
                                        //   data.monthly == 2) &&
                                        // isRent
                                        //   ? true
                                        //   : false,
                                      }}
                                      pattern="[0-9]*"
                                      size="small"
                                      disabled={
                                        (data.monthly == 1 &&
                                          isRent &&
                                          vendorCode) ||
                                        (data.monthly == 2 && isRent)
                                      }
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
                                      inputProps={{
                                        style: { textAlign: "right" },
                                      }}
                                      autoComplete="off"
                                      required
                                      readOnly={detailView}
                                      // disabled={detailView}
                                      value={data.amount}
                                      onChange={(event) => {
                                        handleChangeInput(index, event);
                                        calculateSum();
                                      }}
                                    />
                                  </div>
                                  <div
                                    className="col-md-2"
                                    id="choose_file_label"
                                  >
                                    {/* -------------------------New file----------- */}
                                    <div
                                      className="container d-flex align-items-center justify-content-start px-0"
                                      style={{ marginTop: "-5%" }}
                                    >
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
                                            <img
                                              className="img-small"
                                              src={attachment}
                                              style={{
                                                width: "24px",
                                                marginTop: "-21% ",
                                              }}
                                            />
                                            {/* <AttachFileIcon /> */}
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
                                              <img
                                                className="img-small"
                                                src={attachment}
                                                style={{
                                                  width: "24px",
                                                  marginTop: "-21% ",
                                                }}
                                              />
                                              {/* <AttachFileIcon /> */}
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
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {!vendorCode && (
                        <div className="" style={{ marginTop: "1%" }}>
                          {
                            <PaymentTerm
                              type={0}
                              show={false}
                              notool={false}
                              openDialog={() => {}}
                              clicked={update}
                              closeDialog={() => {
                                history.push("/expense");
                              }}
                              id={expenseId}
                            />
                          }
                        </div>
                      )}
                      {detailView == false ? (
                        <>
                          <div className=" blue_grey text-center">
                            <button
                              type="submit"
                              className="btn btn-primary bg-gradient-primary m-0"
                              style={{ fontSize: "13px" }}
                            >
                              Submit
                              {/* <i className="material-icons opacity-10">
                                                        arrow_right_alt
                                                    </i> */}
                            </button>
                            <button
                              style={{ marginLeft: "6px", fontSize: "13px" }}
                              type="button"
                              onClick={(e) => {
                                formik.handleReset();
                                resetForm();
                              }}
                              className="btn bg-danger m-0 ms-2 text-white"
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
      <div
        className="modal fade"
        // id="bulkUpload"
        // tabIndex="-1"
        // aria-labelledby="exampleModalLabel"
        // aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Bulk Upload SubExpenses
              </h5>
              <button
                type="button"
                className="btn-close"
                id="close_bulk"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <a href="./expense_data_2.xlsx" className="mb-3">
                  Sample Excel
                </a>
                <div className="col-md-12">
                  <input
                    type="file"
                    id="shfsdfsdfsd"
                    onChange={(e) => {
                      handleFileUpload(e);
                      setbulkFile(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <div className="row   mt-4">
                <div className="col-md-4">
                  <a
                    onClick={(e) => {
                      exportExcel(categoriesF, "Categories Id List");
                    }}
                    style={{ cursor: "pointer", color: "blue" }}
                    title="categories ids added in the sample excel for  uploading"
                  >
                    Categories List
                  </a>
                </div>
                {siteIdA && (
                  <div className="col-md-4">
                    <a
                      onClick={(e) => {
                        exportExcel(siteIdE, "Site Id List " + projectName);
                      }}
                      style={{ cursor: "pointer", color: "blue" }}
                      title="Site  ids added in the sample excel for  uploading"
                    >
                      Sites List
                    </a>
                  </div>
                )}
                <div
                  className="col-md-4"
                  onClick={(e) => {
                    exportExcel(subIdList, "Sub Categories Id List");
                  }}
                  style={{ cursor: "pointer", color: "blue" }}
                  title="Sub-categories ids added in the sample excel for  uploading"
                >
                  <a>SubCategories List</a>
                </div>
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  BulkUpload();
                }}
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modal_popup"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog body_1 m-auto mt-3">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Bulk Upload Subexpenses & Download Sample Files
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="o_auto o_auto_div mb-3">
                <ul
                  className="nav nav-pills flex-nowrap mb-"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Upload File
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="true"
                    >
                      Download
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div
                    className="d-block text-right"
                    style={{ textAlign: "right" }}
                  >
                    <a
                      className="text-blue cursor-pointer"
                      onClick={() => {
                        setbulkFile(null);
                      }}
                    >
                      remove file
                    </a>
                  </div>
                  <div className="file-upload-container mt-3 border-0 p-0">
                    <label for="fileInput" className="p-0 d-flex">
                      <div className="d-flex align-items-center p-3 m-auto">
                        {!bulkFile && <UploadIcon />}
                        {!bulkFile && (
                          <div className="ms-2 file_text">
                            Click for uploading a file{" "}
                          </div>
                        )}
                        {bulkFile && (
                          <div className="ms-2 file_text ml-5">
                            {bulkFile?.name}
                          </div>
                        )}
                      </div>
                    </label>
                    <input
                      className="file-input"
                      type="file"
                      id="shfsdfsdfsd"
                      onChange={(e) => {
                        handleFileUpload(e);
                        setbulkFile(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="mt-1 mb-3 file">
                    Sample File:{" "}
                    <a href="./expense_data_2.xlsx" className="mb-3">
                      Excel
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      BulkUpload();
                    }}
                    className="btn btn-primary d-block mx-auto mt-3"
                  >
                    Upload File
                  </button>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div className="d-flex flex-wrap align-items-center anchor_files">
                    <button type="button" className="btn btn-success">
                      <DownloadIcon />
                      <span
                        className="d-block"
                        onClick={(e) => {
                          exportExcel(categoriesF, "Categories Id List");
                        }}
                        style={{ cursor: "pointer" }}
                        title="categories ids added in the sample excel for  uploading"
                      >
                        Categories List
                      </span>
                    </button>
                    {siteIdA && (
                      <button type="button" className="btn btn-success">
                        <DownloadIcon />
                        <span
                          className="d-block"
                          onClick={(e) => {
                            exportExcel(siteIdE, "Site Id List " + projectName);
                          }}
                          style={{ cursor: "pointer" }}
                          title="Site  ids added in the sample excel for  uploading"
                        >
                          Sites List
                        </span>
                      </button>
                    )}
                    <button type="button" className="btn btn-success">
                      <DownloadIcon />
                      <span
                        className="d-block"
                        onClick={(e) => {
                          exportExcel(subIdList, "Sub Categories Id List");
                        }}
                        style={{ cursor: "pointer" }}
                        title="Sub-categories ids added in the sample excel for  uploading"
                      >
                        SubCategories List
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <div className="modal-header" style={{ border: "none" }}>
              <h5
                className="modal-title"
                id="exampleModalLabel"
                style={{ marginLeft: "25%" }}
              >
                Upload Attachments
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={modalContactClose}
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
                              fontSize: "11px",
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
                onClick={(e) => {
                  uploadApi();
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
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{ border: "none" }}>
              <h5
                className="modal-title"
                id="exampleModalLabel"
                style={{ marginLeft: "33%" }}
              >
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
                      {viewFiles?.length == 0 && (
                        <p style={{ textAlign: "center" }}> No files Found</p>
                      )}
                      <ul>
                        {viewFiles &&
                          viewFiles?.map((data) => {
                            return (
                              <>
                                <div className="row">
                                  <div className="col-md-auto">
                                    <a href={data?.url} target="_blank">
                                      {" "}
                                      <li> {data?.name}</li>{" "}
                                    </a>

                                    {/* <li> {data?.url}</li> */}
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
                {/* {payCode && <span className="text-bold">{payCode}</span>} -{" "} */}
                <span style={{ fontWeight: "lighter" }}>
                  {" "}
                  Fill Electricity Reading
                </span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="meter-close"
              ></button>
            </div>
            <form onSubmit={formik2.handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    <TextField
                      id="outlined-controlled"
                      label="Opening Reading"
                      size="small"
                      type="number"
                      maxLength="12"
                      name="openRead"
                      value={formik2.values.openRead}
                      onChange={(e) => {
                        formik2.handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      id="outlined-controlled"
                      label="Closing Reading"
                      name="closeRead"
                      size="small"
                      maxLength="12"
                      type="number"
                      style={{ fontSize: "11px" }}
                      value={formik2.values.closeRead}
                      onChange={(e) => {
                        formik2.handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      id="outlined-controlled"
                      size="small"
                      label="Due Date"
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      placeholder="Enter dd-MM-yyyy"
                      name="dueDate"
                      maxLength="20"
                      value={formik2.values.dueDate}
                      onChange={(e) => {
                        formik2.handleChange(e);
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
                      required={true}
                      maxLength="12"
                      type="number"
                      style={{ fontSize: "11px" }}
                      value={formik2.values.billAmount}
                      onChange={(e) => {
                        formik2.handleChange(e);
                      }}
                      onBlur={(e) => {
                        if (formik2.values.lateFee) {
                          formik2.setFieldValue("totalAmount", 0);
                          let total =
                            formik2.values.lateFee + formik2.values.billAmount;
                          formik2.setFieldValue("totalAmount", total);
                        } else {
                          formik2.setFieldValue("totalAmount", 0);
                          let total = formik2.values.billAmount;
                          formik2.setFieldValue("totalAmount", total);
                        }
                      }}
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
                      value={formik2.values.lateFee}
                      onChange={(e) => {
                        formik2.handleChange(e);
                      }}
                      onBlur={(e) => {
                        if (formik2.values.billAmount) {
                          formik2.setFieldValue("totalAmount", 0);
                          let total =
                            formik2.values.lateFee + formik2.values.billAmount;
                          formik2.setFieldValue("totalAmount", total);
                        } else {
                          formik2.setFieldValue("totalAmount", 0);
                          let total = formik2.values.lateFee;
                          formik2.setFieldValue("totalAmount", total);
                        }
                      }}
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
                      disabled={true}
                      style={{ fontSize: "11px" }}
                      value={formik2.values.totalAmount}
                      onChange={(e) => {
                        formik2.handleChange(e);
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
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <button
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
                {payCode && <span className="text-bold">{payCode}</span>} -{" "}
                <span style={{ fontWeight: "lighter" }}>
                  {" "}
                  Fill meter reading
                </span>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="meter-close"
              ></button>
            </div>
            <form onSubmit={formik2.handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    <TextField
                      id="outlined-controlled"
                      label="Opening Reading"
                      size="small"
                      type="number"
                      maxLength="12"
                      name="openRead"
                      value={formik2.values.openRead}
                      onChange={(e) => {
                        formik2.handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      id="outlined-controlled"
                      label="Closing Reading"
                      name="closeRead"
                      size="small"
                      maxLength="12"
                      type="number"
                      style={{ fontSize: "11px" }}
                      value={formik2.values.closeRead}
                      onChange={(e) => {
                        formik2.handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      id="outlined-controlled"
                      size="small"
                      label="Due Date"
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      placeholder="Enter dd-MM-yyyy"
                      name="dueDate"
                      maxLength="20"
                      value={formik2.values.dueDate}
                      onChange={(e) => {
                        formik2.handleChange(e);
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
                      required={true}
                      maxLength="12"
                      type="number"
                      style={{ fontSize: "11px" }}
                      value={formik2.values.billAmount}
                      onChange={(e) => {
                        formik2.handleChange(e);
                      }}
                      onBlur={(e) => {
                        if (formik2.values.lateFee) {
                          formik2.setFieldValue("totalAmount", 0);
                          let total =
                            formik2.values.lateFee + formik2.values.billAmount;
                          formik2.setFieldValue("totalAmount", total);
                        } else {
                          formik2.setFieldValue("totalAmount", 0);
                          let total = formik2.values.billAmount;
                          formik2.setFieldValue("totalAmount", total);
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
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
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
                <span style={{ fontWeight: "lighter" }}> Fill rent dates</span>
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
                        locale={enIn}
                        editableDateInputs={true}
                        onChange={(item) => {
                          setStates([item.selection]);
                        }}
                        moveRangeOnFirstSelection={false}
                        ranges={states}
                        minDate={states1[0].startDate}
                        maxDate={states1[0].endDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {/* <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => {}}
                >
                  Reset
                </button> */}
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
                  onClick={(e) => {
                    let startDate = null;
                    let endDate = null;
                    if (states[0].startDate && states[0].endDate) {
                      let Difference_In_Days = Math.round(
                        (new Date(states[0].endDate).getTime() -
                          new Date(states[0].startDate).getTime()) /
                          (1000 * 3600 * 24)
                      );
                      Difference_In_Days = Difference_In_Days + 1;
                      let values = [...inputfields];
                      let singleAmount = calAmount / 30;
                      let newAmount = Difference_In_Days * singleAmount;
                      values[readIndex]["amount"] = newAmount?.toFixed(2);
                      values[readIndex]["endDate"] = moment(
                        new Date(states[0].endDate)
                      ).format("YYYY-MM-DD");
                      values[readIndex]["startDate"] = moment(
                        new Date(states[0].startDate)
                      ).format("YYYY-MM-DD");
                      startDate = moment(new Date(states[0].startDate)).format(
                        "DD-MM-YYYY"
                      );
                      endDate = moment(new Date(states[0].endDate)).format(
                        "DD-MM-YYYY"
                      );
                      setinputfields(values);
                      document.getElementById("rent-close").click();
                    }
                    let Difference_In_Days1 = Math.round(
                      (new Date(states[0].endDate).getTime() -
                        new Date(states[0].startDate).getTime()) /
                        (1000 * 3600 * 24)
                    );
                    Difference_In_Days1 = Difference_In_Days1 + 1;
                    Swal.fire({
                      icon: "info",
                      title: `Rent period selected -  ${Difference_In_Days1} days`,
                      text: `Start date ${startDate} and end date is ${endDate}  with difference ${Difference_In_Days1} days.Are you sure you want to proceed ?`,
                      showDenyButton: true,
                      // showCancelButton: true,
                      denyButtonText: "Change date",
                      denyButtonColor: "grey",
                      cancelButtonText: "Change date",
                      confirmButtonText: `Ok`,
                    }).then((res) => {
                      if (res.isDenied) {
                        document.getElementById("rent-click").click();
                      }
                      if (res.isDismissed) {
                        document.getElementById("rent-click").click();
                      }
                    });
                  }}
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
        id="showVendor"
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
                Vendor Details{" "}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={addVendorRef}
                // onClick={(e) => {
                //   setHideSubmit(false);
                // }}
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
                        formik3.values.gstNo ? formik3.values.gstNo : "N/A"
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
                      value={
                        formik3.values.pinCode ? formik3.values.pinCode : "N/A"
                      }
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
                  </div> */}
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
