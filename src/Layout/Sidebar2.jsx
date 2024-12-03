import "./Sidebar2.css";
import "../pages/loggedInUser/main.css";
import React from "react";
import IconButton from "@mui/material/IconButton";
import {
  setMenuButton,
  setSidebarOpen,
} from "../redux/features/authSliceandSidebar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import logo1 from "../assets/images/logo-white.png";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { setTabIndex } from "../redux/features/expenseIdSlice";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
export default function Sidebar2() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [menuButton, setMenuButton1] = React.useState(false);

  const [roleId, setRoleId] = React.useState(0);

  const [menuArray, setMenuArray] = React.useState([
    { id: 1, name: "Dashboard", route: "dashboard", icon: "fa fa-home" },
    { id: 2, name: "Request Center", route: "expense", icon: "fa fa-money" },
    {
      id: 3,
      name: "Create Request",
      route: "navigation",
      icon: "fa fa-plus",
    },
    {
      id: 11,
      name: "Payment Release Request",
      route: "paymentRelease",
      icon: "fa fa-file-text",
    },
    { id: 4, name: "Search", route: "search", icon: "fa fa-search" },
    ,
    {
      id: 7,
      name: "Feedback & Support",
      route: "feedback",
      icon: "fa fa-comments",
    },
  ]);
  const [myRoute, setmyRoute] = React.useState("");
  const location = useLocation();
  React.useEffect(() => {
    setmyRoute(location.pathname.slice(1));
  }, [location]);

  React.useEffect(() => {
    if (localStorage.getItem("roleId") != null) {
      setRoleId(localStorage.getItem("roleId"));
      sideBarHandle();
    }
  }, []);

  const sideBarHandle = () => {
    if (localStorage.getItem("roleId") == 4) {
      let values = menuArray;
      values.push({
        id: 10,
        name: "Demand invoice",
        route: "demand",
        icon: "fa fa-file",
      });

      values.push({
        id: 5,
        name: "Bulk Upload",
        route: "utr",
        icon: "fa fa-upload",
      });
      // console.log(values);
      values = values.filter((x) => {
        return x != undefined;
      });
      setMenuArray(values);
    }
  };
  const [state, setState] = React.useState({
    top: false,
    left: true,
    bottom: false,
    right: false,
  });
  const [showfull, setshowFull] = React.useState(false);
  var y = useSelector((state) => state.authSliceandSidebar.sideBarOpen);
  const isLogin = useSelector((state) => state.authSliceandSidebar.isLogin);
  const menuButtonS = useSelector(
    (state) => state.authSliceandSidebar.menuButton
  );
  React.useEffect(() => {
    if (menuButtonS) {
      setMenuButton1(true);
    } else {
      setMenuButton1(false);
    }
  }, [menuButtonS]);
  React.useEffect(() => {
    if (isLogin) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  }, [isLogin]);
  var dispatch = useDispatch();
  const history = useHistory();
  const [mouseEnterOff, setMouseEnterOff] = React.useState(false);
  // const history = useHistor
  React.useEffect(() => {
    // toggleDrawer("left", y)
    if (y) {
      setshowFull(true);
    }
  }, [y]);
  const onMouseEnter = () => {};
  const onMouseLeave = () => {
    if (!menuButton) {
      closedrawer();
    }
  };
  const closedrawer = () => {
    dispatch(setMenuButton(false));
    setMenuButton1(false);
    setMouseEnterOff(true);
    setshowFull(false);
    dispatch(setSidebarOpen(false));
  };
  const historyPush = (event, route) => {
    if (localStorage.getItem("password") == 0) {
      return;
    }
    if (route == "Create Expense") {
      let myRoute = "create";
      history.push(`/${myRoute}`);
    } else {
      history.push(`/${route}`);
    }
    closedrawer();
  };
  return (
    <>
      <div className={showSidebar ? "area" : "d-none"}></div>
      {showSidebar && (
        <nav
          className={[
            showSidebar ? "main-menu    " : "d-none",
            showfull ? "fsdfgsdfsd myClas2s" : "closed",
          ]}
          id="myId"
          onMouseEnter={(e) => {
            onMouseEnter();
          }}
          onMouseLeave={(e) => {
            onMouseLeave();
          }}
        >
          <div
            className={
              showfull
                ? "d-flex justify-content-between align-items-center P_35"
                : "d-flex justify-content-between align-items-center"
            }
          >
            <IconButton
              size="large"
              edge="start"
              color="white"
              aria-label="menu"
              className={showfull ? "d-none" : "d-none"}
              sx={{ mr: 2 }}
              onClick={closedrawer}
            ></IconButton>
            <img src={logo1} className={showfull ? "imgClass" : "img_small"} />
            <button
              className={showfull ? "btn " : "btn d-none"}
              onClick={closedrawer}
            >
              <MenuOpenIcon />{" "}
            </button>
          </div>
          <ul className="menu_8 beats_menu_design">
            {menuArray.map((text, index) => (
              <li className="dropdown" key={index}>
                <Tooltip
                  title={<h6 style={{ color: "lightblue" }}>{text?.name}</h6>}
                  sx={{ cursor: "pointer" }}
                  arrow
                  placement="right-start"
                >
                  <a
                    className="btn"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(e) => {
                      historyPush(e, text?.route);
                      dispatch(setTabIndex(0));
                    }}
                    key={index}
                  >
                    <i
                      className={[
                        text?.icon + " ",
                        myRoute && text?.route == myRoute
                          ? " active_class w-auto h-auto"
                          : "",
                      ]}
                      style={{ color: "white", cursor: "pointer" }}
                    ></i>
                    <span
                      className={[
                        showfull ? "nav-text " : "d-none ",
                        myRoute && text?.route == myRoute
                          ? " active_class"
                          : "",
                      ]}
                      style={{ color: "white", cursor: "pointer" }}
                    >
                      {text?.name}
                    </span>
                  </a>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
