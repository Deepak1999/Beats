import { useEffect, useRef, useState } from "react";
import { common_axios } from "../../../App";
import  "../../../assets/css/style2.css";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
// Register the components
Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const DashboardCopy = () => {
  const [category, setCategory] = useState({
    currency: "INR",
    company: "All",
    startDate: null,
    endDate: null,
  });
  const [project, setProject] = useState({
    currency: "INR",
    company: "All",
    startDate: null,
    endDate: null,
    type: null,
  });
  const [bardata, setBarData] = useState({
    currency: "INR",
    company: "All",
    startDate: null,
    endDate: null,
    type: null,
  });
  const [resetdata, setresetData] = useState({
    currency: "INR",
    company: "All",
    startDate: null,
    endDate: null,
    type: null,
  });
  const chartRef = useRef(null);
  const chartRef1 = useRef(null);
  const [datab, setDatab] = useState(null);
  const [chartProjects, setChartProjects] = useState(null);
  const [chartValues, setChartValues] = useState(null);
  const [barInstance, setBarInstance] = useState(null);
  const [categorylabel, setCategoryLabel] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [data, setData] = useState(null);
  const [business, setBusiness] = useState([]);
  const [blist, setblist] = useState([]);
  const [currencyId, setCurrencyId] = useState("INR");
  const [currencyList, setCurrencyList] = useState([]);
  const [companyId, setCompanyId] = useState("All");
  const getCategories = async () => {
    setCategoryData(null);
    let formdata = { ...category };
    formdata["currency"] = currencyId;
    formdata["company"] = companyId;
    const res = await common_axios.post("/dashboard/by/categories", formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
      let arr = [];
      let arr2 = [];
      let datasets = [];
      let arrD = [];
      res.data.dashboardCategory.forEach((data, i) => {
        if (i < 5) {
          arr.push(data.catTitle);
          arr2.push(data.amount);
        }
      });
      let formdata = {
        label: "sfbsdfsd",
        data: arr2,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      };
      datasets.push(formdata);
      let formdata1 = {
        labels: arr,
        datasets,
      };
      setCategoryData(formdata1);
    }
  };
  const getCurrencies = async () => {
    const res = await common_axios.post(`project/currencies`, {});
    if (res) {
      if (res?.data?.statusDescription?.statusCode === 200) {
        setCurrencyList(res.data.list);
      } else {
        setCurrencyList([]);
      }
    }
  };
  const getByProjectsRoutine = async () => {
    // setProjectData(null);
    let formdata = project;
    formdata["type"] = "routine";
    formdata["currency"] = currencyId;
    formdata["company"] = companyId;
    const res = await common_axios.post("/dashboard/by/projects", formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
      let arr = [];
      let arr2 = [];
      let datasets = [];
      let arrD = [];
      res.data.dashboardProject.forEach((data, i) => {
        if (i < 5) {
          arr.push(data.projectName);
          arr2.push(data.amount);
          arrD.push(data.amount);
        }
      });
      let formdata = {
        label: "Amount",
        data: arrD,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      };
      datasets.push(formdata);
      let formdata1 = {
        labels: arr,
        datasets,
      };
      setCategoryLabel(formdata1);
    } else {
    }
  };
  const getBusinessCompanies = async () => {
    const res = await common_axios.post(`project/companies`);
    if (res) {
      if (res?.data?.statusDescription?.statusCode == 200) {
        setBusiness(res.data.list);
        let arr = [];
        res.data.list.forEach((x) => {
          arr.push(x.name);
        });
        getInitiator(arr);
      } else {
        setBusiness([]);
      }
    }
  };
  const getByProjectAdvance = async () => {
    // setProjectData(null);
    let formdata = project;
    formdata["type"] = "advance";
    formdata["currency"] = currencyId;
    formdata["company"] = companyId;
    const res = await common_axios.post("/dashboard/by/projects", formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
      let arr = [];
      let arr2 = [];
      let datasets = [];
      let arrD = [];
      res.data.dashboardProject.forEach((data, i) => {
        if (i < 5) {
          arr.push(data.projectName);
          arr2.push(data.amount);
          arrD.push(data.amount);
        }
      });
      let formdata = {
        label: "Amount",
        data: arrD,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      };
      datasets.push(formdata);
      let formdata1 = {
        labels: arr,
        datasets,
      };
      setChartProjects(formdata1);
    } else {
    }
  };
  const getByProjects = async () => {
    // setProjectData(null);
    let formdata = project;
    formdata["currency"] = currencyId;
    formdata["company"] = companyId;
    const res = await common_axios.post("/dashboard/by/projects", formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
      let arr = [];
      let arr2 = [];
      let datasets = [];
      let arrD = [];
      res.data.dashboardProject.forEach((data, i) => {
        if (i < 5) {
          arr.push(data.projectName);
          arr2.push(data.amount);
          arrD.push(data.amount);
        }
      });
      let formdata = {
        label: "Amount",
        data: arrD,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      };
      datasets.push(formdata);
      let formdata1 = {
        labels: arr,
        datasets,
      };
      setProjectData(formdata1);
    } else {
    }
  };
  const getInitiator = async (list) => {
    let formdata = {
      currency: "INR",
      companyList: list,
    };
    const res = await common_axios.post(`/dashboard/by/initiator`, formdata);
  };
  const getByProjectsUtility = async () => {
    let formdata = project;
    formdata["name"] = "utility";
    formdata["type"] = "utility";
    formdata["currency"] = currencyId;
    formdata["company"] = companyId;
    const res = await common_axios.post("/dashboard/by/projects", formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
      let arr = [];
      let arr2 = [];
      let datasets = [];
      let arrD = [];
      res.data.dashboardProject.forEach((data, i) => {
        if (i < 5) {
          arr.push(data.projectName);
          arr2.push(data.amount);
          arrD.push(data.amount);
        }
      });
      let formdata = {
        label: "Amount",
        data: arrD,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      };
      datasets.push(formdata);
      let formdata1 = {
        labels: arr,
        datasets,
      };
      setChartValues(formdata1);
    } else {
    }
  };
  const getDashData = async () => {
    let formdata = bardata;
    formdata["currency"] = currencyId;
    formdata["company"] = companyId;
    const res = await common_axios.post("/dashboard/by/dashdata", formdata);
    if (res?.data?.statusDescription?.statusCode == 200) {
      setDatab(res.data.data);
    }
  };
  useEffect(() => {
    let ismounted = true;
    if (ismounted) {
      callALl();
    }
    return () => {
      setCategory(resetdata);
      setProject(resetdata);
      setBarData(resetdata);
      setDatab(null);
      ismounted = false;
    };
  }, [companyId, currencyId]);
  const callALl = () => {
    getCategories();
    getByProjects();
    getDashData();
    getByProjectsUtility();
    getByProjectsRoutine();
    getByProjectAdvance();
    getCurrencies();
  };
  useEffect(() => {
    if (barInstance) {
      barInstance.destroy();
      setBarInstance(null); // Reset the chart instance
    }
    getBusinessCompanies();
    return () => {
      if (barInstance) {
        barInstance.destroy();
        setBarInstance(null); // Reset the chart instance
      }
    };
  }, []);
  const companyChange = async (compa) => {
    await setBarData({ ...bardata, company: compa });
    await setCategory({ ...category, company: compa });
    await setProject({ ...project, company: compa });
    setCompanyId(compa);
  };
  return (
    <>
      <section className="main dashboard" id="main">
        <section className="filter_sec filter_sec_3 o_aut">
          <div className="row">
            <div className="col-md-4">
              <FormControl sx={{ padding: "2px" }} fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Currency Id <span className="text text-danger">* </span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currencyId}
                  required
                  size="small"
                  name="currencyId"
                  label="Projects"
                  onChange={(e) => {
                    setCurrencyId(e.target.value);
                  }}
                >
                  <MenuItem value={0} style={{ fontSize: "12px" }}>
                    {" "}
                    Select CurrencyId
                  </MenuItem>
                  {currencyList.length > 0 &&
                    currencyList.map((data) => {
                      return (
                        <MenuItem
                          key={data.code}
                          value={data.code}
                          style={{ fontSize: "11px" }}
                        >
                          {" "}
                          {data.code}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="d-flex fit_content mx-auto">
            <div className="fit_content_3 o_auto">
              <div
                className="nav nav-pills flex-nowrap mx-aut mb-"
                id="pills-tab"
                role="tablist"
              >
                <div className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    onClick={(e) => {
                      companyChange("All");
                    }}
                  >
                    All
                  </button>
                </div>
                {business &&
                  business.map((x) => {
                    return (
                      <>
                        {" "}
                        <div className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="false"
                            onClick={(e) => {
                              companyChange(x.name);
                            }}
                          >
                            {x.name}
                          </button>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
            <div
              className="nav nav-pills nav-item dropdown filter_tab ms-3"
              role="presentation"
            >
              <a
                className="nav-link dropdown-toggle d-flex active"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                href="#"
                role="button"
                data-bs-auto-close="outside"
              >
                <FilterAltIcon />
                {/* <i className="fas fa-filter d-block m-auto"></i> */}
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a
                    className="dropdown-item active"
                    data-bs-toggle="pill"
                    data-bs-target="#dropdown-item-1"
                    role="tab"
                    aria-controls="dropdown-item-1"
                    aria-selected="true"
                  >
                    All Spends
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    data-bs-toggle="pill"
                    data-bs-target="#dropdown-item-2"
                    role="tab"
                    aria-controls="dropdown-item-2"
                    aria-selected="false"
                  >
                    Utility Spends
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    data-bs-toggle="pill"
                    data-bs-target="#dropdown-item-3"
                    role="tab"
                    aria-controls="dropdown-item-3"
                    aria-selected="false"
                  >
                    Routine Spends
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    data-bs-toggle="pill"
                    data-bs-target="#dropdown-item-4"
                    role="tab"
                    aria-controls="dropdown-item-4"
                    aria-selected="false"
                  >
                    Advance Spends
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="tab-content tab_content" id="pills-tabContent">
          <section
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabIndex="0"
          >
            <section className="expense_analysis inside_tab filter_sec">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className="m-0">Expense Analysis</h3>
                <ul
                  className="nav nav-pills mx-aut mb-"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home1-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home1"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Today
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-profile1-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile1"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Yesterday
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-contact1-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact1"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      1W
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-cmr1-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-cmr1"
                      type="button"
                      role="tab"
                      aria-controls="pills-cmr"
                      aria-selected="false"
                    >
                      1M
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-dependo1-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-dependo1"
                      type="button"
                      role="tab"
                      aria-controls="pills-dependo"
                      aria-selected="false"
                    >
                      3M
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home1"
                  role="tabpanel"
                  aria-labelledby="pills-home1-tab"
                  tabIndex="0"
                >
                  <div className="row expense_cards">
                    <div className="col-4 new_col">
                      <div className="card first_card">
                        <div className="div_18">
                          <span className="d-block">{datab?.totalCount}</span>
                        </div>
                        <div className="">
                          <span className="contnt">Total Raised</span>
                          <span className="amnt">Rs. {datab?.sumExpense}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <div className="card second_card">
                        <div className="div_18">
                          <span className="d-block">{datab?.approved}</span>
                        </div>
                        <div className="">
                          <span className="contnt">Approved</span>
                          <span className="amnt">Rs. {datab?.approvedSum}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <div className="card third_card">
                        <div className="div_18">
                          <span className="d-block">{datab?.rejected}</span>
                        </div>
                        <div className="">
                          <span className="contnt">Rejected</span>
                          <span className="amnt">Rs. {datab?.rejectedSum}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <div className="card fourth_card">
                        <div className="div_18">
                          <span className="d-block">{datab?.pending}</span>
                        </div>
                        <div className="">
                          <span className="contnt">Pending</span>
                          <span className="amnt">Rs. {datab?.pendingSum}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <div className="card fifth_card">
                        <div className="div_18">
                          <span className="d-block">57%</span>
                        </div>
                        <div className="">
                          <span className="contnt">Approval Rate</span>
                          {/* <span className="amnt">Rs. 12,00,000</span> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <div className="card sixth_card">
                        <div className="div_18">
                          <span className="d-block">20%</span>
                        </div>
                        <div className="">
                          <span className="contnt">Partial Rejection Rate</span>
                          {/* <span className="amnt">Rs. 12,00,000</span> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <div className="card seventh_card">
                        <div className="div_18">
                          <span className="d-block">46%</span>
                        </div>
                        <div className="">
                          <span className="contnt">Query Rate</span>
                          <span className="amnt">Rs. 12,00,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="spending_analysis inside_tab filter_sec my-5">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className="m-0">Spending Analysis</h3>
                <ul
                  className="nav nav-pills mx-aut mb-"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home2-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home2"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Today
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-profile2-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-profile2"
                      type="button"
                      role="tab"
                      aria-controls="pills-profile"
                      aria-selected="false"
                    >
                      Yesterday
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-contact2-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-contact2"
                      type="button"
                      role="tab"
                      aria-controls="pills-contact"
                      aria-selected="false"
                    >
                      1W
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-cmr2-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-cmr2"
                      type="button"
                      role="tab"
                      aria-controls="pills-cmr"
                      aria-selected="false"
                    >
                      1M
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-dependo2-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-dependo2"
                      type="button"
                      role="tab"
                      aria-controls="pills-dependo"
                      aria-selected="false"
                    >
                      3M
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home2"
                  role="tabpanel"
                  aria-labelledby="pills-home2-tab"
                  tabIndex="0"
                >
                  <div className="row ">
                    <div
                      className="col-4 new_col"
                      style={{
                        width: "500px !important",
                        height: "500px !important",
                      }}
                    >
                      <h6 className="m-0">Top 5 spending Projects</h6>
                      <div
                        className="card first_card"
                        style={{
                          width: "500px !important",
                          height: "500px !important",
                        }}
                      >
                        {projectData && (
                          // <> {JSON.stringify(projectData)}</>
                          <Bar
                            data={projectData}
                            layout="horizontal"
                            options={{
                              scales: {
                                x: {
                                  type: "category",
                                  title: {
                                    display: false,
                                    text: "Month",
                                  },
                                  categoryPercentage: 2,
                                },
                                y: {
                                  type: "linear",
                                  title: {
                                    display: false,
                                    text: "Sales",
                                  },
                                  categoryPercentage: 2,
                                },
                              },
                              maintainAspectRatio: false,
                              plugins: {
                                tooltip: {
                                  enabled: true,
                                  usePointStyle: true,
                                  titleAlign: "center",
                                  callbacks: {
                                    // title: () => null, // Remove the title from the tooltip
                                  },
                                },
                                legend: {
                                  display: false, // Hide the legend
                                },
                              },
                            }}
                          ></Bar>
                        )}
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending categories</h6>
                      <div className="card second_card">
                        {categoryData &&
                          ((<></>),
                          (
                            <Bar
                              data={categoryData}
                              options={{
                                scales: {
                                  x: {
                                    type: "category",
                                    title: {
                                      display: false,
                                      text: "Month",
                                    },
                                    categoryPercentage: 2,
                                  },
                                  y: {
                                    type: "linear",
                                    title: {
                                      display: false,
                                      text: "Sales",
                                    },
                                    categoryPercentage: 2,
                                  },
                                },
                                maintainAspectRatio: false,
                                plugins: {
                                  tooltip: {
                                    enabled: true,
                                    usePointStyle: true,
                                    titleAlign: "center",
                                    callbacks: {
                                      title: () => null, // Remove the title from the tooltip
                                    },
                                  },
                                  legend: {
                                    display: false, // Hide the legend
                                  },
                                },
                              }}
                            ></Bar>
                          ))}
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Utility Projects</h6>
                      <div className="card third_card">
                        {chartValues && (
                          <Pie
                            data={chartValues}
                            options={{
                              scales: {
                                x: {
                                  type: "category",
                                  title: {
                                    display: false,
                                    text: "Month",
                                  },
                                  categoryPercentage: 2,
                                },
                                y: {
                                  type: "linear",
                                  title: {
                                    display: false,
                                    text: "Sales",
                                  },
                                  categoryPercentage: 2,
                                },
                              },
                              maintainAspectRatio: false,
                              plugins: {
                                tooltip: {
                                  enabled: true,
                                  usePointStyle: true,
                                  titleAlign: "center",
                                },
                                legend: {
                                  display: false, // Hide the legend
                                },
                              },
                            }}
                          >
                            {" "}
                          </Pie>
                        )}
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Routine Projects</h6>
                      <div className="card fifth_card">
                        {categorylabel &&
                          ((<></>),
                          (
                            <Bar
                              data={categorylabel}
                              options={{
                                scales: {
                                  x: {
                                    type: "category",
                                    title: {
                                      display: false,
                                      text: "Month",
                                    },
                                    categoryPercentage: 2,
                                  },
                                  y: {
                                    type: "linear",
                                    title: {
                                      display: false,
                                      text: "Sales",
                                    },
                                    categoryPercentage: 2,
                                  },
                                },
                                maintainAspectRatio: false,
                                plugins: {
                                  tooltip: {
                                    enabled: true,
                                    usePointStyle: true,
                                    titleAlign: "center",
                                    callbacks: {
                                      title: () => null, // Remove the title from the tooltip
                                    },
                                  },
                                  legend: {
                                    display: false, // Hide the legend
                                  },
                                },
                              }}
                            ></Bar>
                          ))}
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Advance Projects</h6>
                      <div className="card seventh_card">
                        {chartProjects &&
                          ((<></>),
                          (
                            <Bar
                              data={chartProjects}
                              options={{
                                scales: {
                                  x: {
                                    type: "category",
                                    title: {
                                      display: false,
                                      text: "Month",
                                    },
                                    categoryPercentage: 2,
                                  },
                                  y: {
                                    type: "linear",
                                    title: {
                                      display: false,
                                      text: "Sales",
                                    },
                                    categoryPercentage: 2,
                                  },
                                },
                                maintainAspectRatio: false,
                                plugins: {
                                  tooltip: {
                                    enabled: true,
                                    usePointStyle: true,
                                    titleAlign: "center",
                                    callbacks: {
                                      title: () => null, // Remove the title from the tooltip
                                    },
                                  },
                                  legend: {
                                    display: false, // Hide the legend
                                  },
                                },
                              }}
                            ></Bar>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile2"
                  role="tabpanel"
                  aria-labelledby="pills-profile2-tab"
                  tabIndex="0"
                >
                  <div className="row expense_cards">
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending categories</h6>
                      <div className="card first_card">
                        <img
                          src="/images/Group 23.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending projects</h6>
                      <div className="card second_card">
                        <img
                          src="/images/Group 22.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Utility Projects</h6>
                      <div className="card third_card">
                        <img
                          src="/images/Group 24.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Routine Projects</h6>
                      <div className="card fifth_card">
                        <img
                          src="/images/Group 25.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Advance Projects</h6>
                      <div className="card seventh_card">
                        <img
                          src="/images/Rectangle 188.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-contact2"
                  role="tabpanel"
                  aria-labelledby="pills-contact2-tab"
                  tabIndex="0"
                >
                  <div className="row expense_cards">
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending categories</h6>
                      <div className="card first_card">
                        <img
                          src="/images/Group 23.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending projects</h6>
                      <div className="card second_card">
                        <img
                          src="/images/Group 22.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Utility Projects</h6>
                      <div className="card third_card">
                        <img
                          src="/images/Group 24.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Routine Projects</h6>
                      <div className="card fifth_card">
                        <img
                          src="/images/Group 25.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Advance Projects</h6>
                      <div className="card seventh_card">
                        <img
                          src="/images/Rectangle 188.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-cmr2"
                  role="tabpanel"
                  aria-labelledby="pills-cmr2-tab"
                  tabIndex="0"
                >
                  <div className="row expense_cards">
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending categories</h6>
                      <div className="card first_card">
                        <img
                          src="/images/Group 23.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending projects</h6>
                      <div className="card second_card">
                        <img
                          src="/images/Group 22.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Utility Projects</h6>
                      <div className="card third_card">
                        <img
                          src="/images/Group 24.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Routine Projects</h6>
                      <div className="card fifth_card">
                        <img
                          src="/images/Group 25.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Advance Projects</h6>
                      <div className="card seventh_card">
                        <img
                          src="/images/Rectangle 188.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-dependo2"
                  role="tabpanel"
                  aria-labelledby="pills-dependo2-tab"
                  tabIndex="0"
                >
                  <div className="row expense_cards">
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending categories</h6>
                      <div className="card first_card">
                        <img
                          src="/images/Group 23.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending projects</h6>
                      <div className="card second_card">
                        <img
                          src="/images/Group 22.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Utility Projects</h6>
                      <div className="card third_card">
                        <img
                          src="/images/Group 24.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Routine Projects</h6>
                      <div className="card fifth_card">
                        <img
                          src="/images/Group 25.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                    <div className="col-4 new_col">
                      <h6 className="m-0">Top 5 spending Advance Projects</h6>
                      <div className="card seventh_card">
                        <img
                          src="/images/Rectangle 188.png"
                          className="img-fluid d-block w-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="approve_initiator inside_tab filter_sec">
              <div className="row">
                <div className="col-md-6 approve_sec">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h3 className="m-0">Top 5 Approver’s Analysis</h3>
                    <ul
                      className="nav nav-pills mx-aut mb-"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-home3-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home3"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Today
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link "
                          id="pills-home3-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home3"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Yesterday
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link "
                          id="pills-home3-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home3"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          1W
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link "
                          id="pills-home3-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home3"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          1M
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link "
                          id="pills-home3-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home3"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          3M
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home3"
                      role="tabpanel"
                      aria-labelledby="pills-home3-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Querying Rate</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody></tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-profile3"
                      role="tabpanel"
                      aria-labelledby="pills-profile3-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Harish Upadhyay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Manmohan Singh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vikrant Bhagwan</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Sachin Jain</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Hari Singla</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-contact3"
                      role="tabpanel"
                      aria-labelledby="pills-contact3-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Harish Upadhyay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Manmohan Singh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vikrant Bhagwan</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Sachin Jain</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Hari Singla</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-cmr3"
                      role="tabpanel"
                      aria-labelledby="pills-cmr3-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Harish Upadhyay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Manmohan Singh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vikrant Bhagwan</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Sachin Jain</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Hari Singla</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-dependo3"
                      role="tabpanel"
                      aria-labelledby="pills-dependo3-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Harish Upadhyay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Manmohan Singh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vikrant Bhagwan</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Sachin Jain</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Hari Singla</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 initiator_sec">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h3 className="m-0">Top 5 Initiator’s Analysis</h3>
                    <ul
                      className="nav nav-pills mx-aut mb-"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-home4-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home4"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Today
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-profile4-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-profile4"
                          type="button"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                        >
                          Yesterday
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-contact4-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-contact4"
                          type="button"
                          role="tab"
                          aria-controls="pills-contact"
                          aria-selected="false"
                        >
                          1W
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-cmr4-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-cmr4"
                          type="button"
                          role="tab"
                          aria-controls="pills-cmr"
                          aria-selected="false"
                        >
                          1M
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-dependo4-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-dependo4"
                          type="button"
                          role="tab"
                          aria-controls="pills-dependo"
                          aria-selected="false"
                        >
                          3M
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home4"
                      role="tabpanel"
                      aria-labelledby="pills-home4-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vinay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rakesh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-profile4"
                      role="tabpanel"
                      aria-labelledby="pills-profile4-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vinay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rakesh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-contact4"
                      role="tabpanel"
                      aria-labelledby="pills-contact4-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vinay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rakesh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-cmr4"
                      role="tabpanel"
                      aria-labelledby="pills-cmr4-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vinay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rakesh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-dependo4"
                      role="tabpanel"
                      aria-labelledby="pills-dependo4-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vinay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rakesh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="tat_analysis inside_tab filter_sec my-5">
              <h3 className="m-0 mb-3">Tat Analysis</h3>
              <div className="row">
                <div className="col-md-6 companywise_sec">
                  <div className="expense_cards">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h3 className="m-0 mb-">Top 5 Approver’s Analysis</h3>
                      <ul
                        className="nav nav-pills mx-aut mb- op_0"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="pills-home51-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home51"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                          >
                            Today
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="pills-profile51-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-profile51"
                            type="button"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected="false"
                          >
                            Yesterday
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="pills-contact51-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-contact51"
                            type="button"
                            role="tab"
                            aria-controls="pills-contact"
                            aria-selected="false"
                          >
                            1W
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="pills-cmr51-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-cmr51"
                            type="button"
                            role="tab"
                            aria-controls="pills-cmr"
                            aria-selected="false"
                          >
                            1M
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="pills-dependo51-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-dependo51"
                            type="button"
                            role="tab"
                            aria-controls="pills-dependo"
                            aria-selected="false"
                          >
                            3M
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="card d-block h-auto">
                      <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="div_18">
                          <div className="m-auto">
                            <span className="d-block amnt">875</span>
                            <span className="contnt">Total Expense</span>
                          </div>
                        </div>
                        <div className="div_18 mx-2">
                          <div className="m-auto">
                            <span className="d-block amnt">600</span>
                            <span className="contnt">Approved</span>
                          </div>
                        </div>
                        <div className="div_18">
                          <div className="m-auto">
                            <span className="d-block amnt">3.5</span>
                            <span className="contnt">Avg TAT (Days)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 approver_sec">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h3 className="m-0">Top 5 Approvers</h3>
                    <ul
                      className="nav nav-pills mx-aut mb-"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-home7-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home7"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Today
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-profile7-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-profile7"
                          type="button"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                        >
                          Yesterday
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-contact7-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-contact7"
                          type="button"
                          role="tab"
                          aria-controls="pills-contact"
                          aria-selected="false"
                        >
                          1W
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-cmr7-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-cmr7"
                          type="button"
                          role="tab"
                          aria-controls="pills-cmr"
                          aria-selected="false"
                        >
                          1M
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-dependo7-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-dependo7"
                          type="button"
                          role="tab"
                          aria-controls="pills-dependo"
                          aria-selected="false"
                        >
                          3M
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home7"
                      role="tabpanel"
                      aria-labelledby="pills-home7-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <tbody>
                                <tr>
                                  <th>Approvers</th>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <th>Approved</th>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <th>Avg. TAT (hour)</th>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-profile7"
                      role="tabpanel"
                      aria-labelledby="pills-profile7-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <tbody>
                                <tr>
                                  <th>Approvers</th>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <th>Approved</th>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <th>Avg. TAT (hour)</th>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-contact7"
                      role="tabpanel"
                      aria-labelledby="pills-contact7-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <tbody>
                                <tr>
                                  <th>Approvers</th>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <th>Approved</th>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <th>Avg. TAT (hour)</th>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-cmr7"
                      role="tabpanel"
                      aria-labelledby="pills-cmr7-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <tbody>
                                <tr>
                                  <th>Approvers</th>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <th>Approved</th>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <th>Avg. TAT (hour)</th>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-dependo7"
                      role="tabpanel"
                      aria-labelledby="pills-dependo7-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <tbody>
                                <tr>
                                  <th>Approvers</th>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <th>Approved</th>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <th>Avg. TAT (hour)</th>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="queries_analysis inside_tab filter_sec">
              <h3 className="m-0 mb-3">Queries Analysis</h3>
              <div className="row">
                <div className="col-md-6 query_raisers_sec">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h3 className="m-0">Top 5 Query Raisers</h3>
                    <ul
                      className="nav nav-pills mx-aut mb-"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-home5-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home5"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Today
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-home5-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home5"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Yesterday
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-home5-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home5"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          1W
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-home5-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home5"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          1M
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-home5-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home5"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          3M
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home5"
                      role="tabpanel"
                      aria-labelledby="pills-home5-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Raisers</th>
                                  <th>Total Expense</th>
                                  <th>Queries Raised</th>
                                  <th>Querying Rate</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Harish Upadhyay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Manmohan Singh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vikrant Bhagwan</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Sachin Jain</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Hari Singla</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 query_recievers_sec">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h3 className="m-0">Top 5 Query Recievers</h3>
                    <ul
                      className="nav nav-pills mx-aut mb-"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="pills-home6-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home6"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Today
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-profile6-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-profile6"
                          type="button"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                        >
                          Yesterday
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-contact6-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-contact6"
                          type="button"
                          role="tab"
                          aria-controls="pills-contact"
                          aria-selected="false"
                        >
                          1W
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-cmr6-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-cmr6"
                          type="button"
                          role="tab"
                          aria-controls="pills-cmr"
                          aria-selected="false"
                        >
                          1M
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="pills-dependo6-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-dependo6"
                          type="button"
                          role="tab"
                          aria-controls="pills-dependo"
                          aria-selected="false"
                        >
                          3M
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home6"
                      role="tabpanel"
                      aria-labelledby="pills-home6-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Recievers</th>
                                  <th>Total Expense</th>
                                  <th>Queries Received</th>
                                  <th>Query Receiving Rate</th>
                                  <th>Response TAT (Hours)</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vinay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rakesh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-profile6"
                      role="tabpanel"
                      aria-labelledby="pills-profile6-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vinay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rakesh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-contact6"
                      role="tabpanel"
                      aria-labelledby="pills-contact6-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vinay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rakesh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-cmr6"
                      role="tabpanel"
                      aria-labelledby="pills-cmr6-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vinay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rakesh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-dependo6"
                      role="tabpanel"
                      aria-labelledby="pills-dependo6-tab"
                      tabIndex="0"
                    >
                      <div className="expense_cards d-flex flex-column">
                        <div className="card mb_6 p-0 d-block">
                          <div className="d-block table-responsive">
                            <table
                              role="table"
                              id="example"
                              className="table table-striped table-bordered dataTable table-sm m-0"
                            >
                              <thead>
                                <tr>
                                  <th>Approvers</th>
                                  <th>Approved</th>
                                  <th>Pending</th>
                                  <th>Queried Expense</th>
                                  <th>Clearance Rate</th>
                                  <th>Querying Rate</th>
                                  <th>isActive</th>
                                  <th>isEnabled</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-en">Deepak</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rajeev</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Amit</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Vinay</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                                <tr>
                                  <td className="text-en">Rakesh</td>
                                  <td>80</td>
                                  <td>80</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                  <td>80%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="see_all"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          See All
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};
export default DashboardCopy;
