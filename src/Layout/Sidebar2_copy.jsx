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
  const [menuArray, setMenuArray] = React.useState([
    { id: 1, name: "Dashboard", route: "dashboard", icon: "fa fa-home" },
    {
      id: 2,
      name: "Expense",
      route: "expense",
      icon: "fa fa-money",
      list: [{ id: 1, name: "Expense", route: "expense" }],
    },
    {
      id: 3,
      name: "Create Expense",
      route: "create",
      icon: "fa fa-plus",
      list: [
        { id: 1, name: "Create Expense", route: "create" },
        { id: 2, name: "Create Purchase", route: "purchase " },
      ],
    },
    {
      id: 10,
      name: "Demand invoice",
      route: "demand",
      icon: "fa fa-file-invoice",
      list: [{ id: 1, name: "Demand Invoice", route: "demand" }],
    },
    {
      id: 4,
      name: "Search",
      route: "search",
      icon: "fa fa-search",
    },
    {
      id: 5,
      name: "Bulk Upload",
      route: "utr",
      icon: "fa fa-upload",
    },
    {
      id: 6,
      name: "Approvals Report",
      route: "approvals",
      icon: "fa fa-file",
    },
    // {
    //   id: 9,
    //   name: "Purchase Request",
    //   route: "purchase",
    //   icon: "fa fa-plus",
    //   list: [{ id: 1, name: "Purchase Request", route: "purchase" }],
    // },
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
  const onMouseEnter = () => {
    // if (!menuButton) {
    //     openDrawer()
    // }
  };
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
    if (false) {
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
                <a
                  className="btn"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={(e) => {
                    // historyPush(e, text.route);
                    dispatch(setTabIndex(0));
                  }}
                  key={index}
                >
                  <i
                    className={[
                      text.icon + " ",
                      myRoute && text.route == myRoute
                        ? " active_class w-auto h-auto"
                        : "",
                    ]}
                    style={{ color: "white", cursor: "pointer" }}
                  ></i>
                  <span
                    className={[
                      showfull ? "nav-text " : "d-none ",
                      myRoute && text.route == myRoute ? " active_class" : "",
                    ]}
                    style={{ color: "white", cursor: "pointer" }}
                  >
                    {text.name}
                  </span>
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {text?.list?.map((x) => {
                    return (
                      <li>
                        <a
                          className="dropdown-item  newClass d-flex align-items-cente py-2"
                          // href="#"
                          onClick={(e) => {
                            historyPush(e, x.route);
                          }}
                        >
                          <i
                            className={[
                              // text.icon + " ",
                              myRoute && x.route == myRoute
                                ? " active_class w-auto h-auto bg-transparent me-2"
                                : "w-auto h-auto me-2",
                            ]}
                            style={{ color: "white", cursor: "pointer" }}
                          ></i>
                          <span
                            className={[
                              showfull ? "nav-text w-100" : "w-100",
                              myRoute && x.route == myRoute
                                ? "bg-transparent  active_class"
                                : "bg-transparent",
                            ]}
                            style={{ color: "white", cursor: "pointer" }}
                          >
                            {x.name}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
