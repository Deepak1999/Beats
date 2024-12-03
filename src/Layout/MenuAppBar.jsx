import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  setMenuButton,
  setSidebarOpen,
  setUserData,
  setisLoginUser,
} from "../redux/features/authSliceandSidebar";
import { common_axios } from "../App";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { setTabIndex } from "../redux/features/expenseIdSlice";
export default function MenuAppBar() {
  const dispatch = useDispatch();
  const [auth, setAuth] = React.useState(true);
  const [data, setData] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLogin, setisLogin] = React.useState(false);
  const [modalOpen, setmodalOpen] = React.useState(false);
  const modalContact = React.useRef(null);
  const [user, setUser] = useState({});
  const modalContactClose = React.useRef(null);
  // const [user, setUser] = React.useState({})
  const history = useHistory();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [showFull, setshowFull] = React.useState(false);
  const handleSidebar = () => {
    dispatch(setSidebarOpen(true));
    dispatch(setMenuButton(true));
  };
  var y = useSelector((state) => state.authSliceandSidebar.sideBarOpen);
  useEffect(() => {
    // toggleDrawer("left", y)
    if (y) {
      setshowFull(true);
    } else {
      setshowFull(false);
    }
  }, [y]);
  const logoutModalOpen = async () => {
    handleClose();
    await modalContact.current.click();
  };
  const profileRoute = () => {
    handleClose();
    history.push("/profile");
  };
  const closeModal = async () => {
    await modalContactClose?.current?.click();
  };
  const logoutConfirm = async () => {
    var res = await common_axios.post(`/authenc/logout`);
    if (res?.data?.statusDescription?.statusCode == 200) {
      localStorage.clear();
      closeModal();
      await dispatch(setisLoginUser(false));
      setisLogin(false);
      history.push("/");
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
  };
  React.useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setisLogin(true);
      reduxUpdate();
    }
  }, [isLogin]);
  const reduxUpdate = () => {
    let user = localStorage.getItem("user");
    if (user != null || user != "") {
      dispatch(setUserData(JSON.parse(user)));
      setUser(JSON.parse(user));
      // setUser(JSON.parse(user))
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {true && (
          <AppBar position="static">
            <Toolbar>
              {
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Altruist BEATS
                  {/* {user.name} */}
                </Typography>
              }
              {auth && (
                <>
                  <div className="d-flex align-items-left">
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1, marginTop: "12px", fontSize: "15px" }}
                    >
                      Welcome {user?.name}
                    </Typography>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      title="Search Expenses"
                      onClick={() => {
                        history.push("/search");
                        dispatch(setTabIndex(0));
                      }}
                      color="inherit"
                    >
                      <SearchIcon />
                    </IconButton>
                    <IconButton
                      className="ms-"
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      title="profile"
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={(e) => {
                          profileRoute();
                          dispatch(setTabIndex(0));
                        }}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          logoutModalOpen();
                          dispatch(setTabIndex(0));
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                    <button
                      type="button"
                      ref={modalContact}
                      className="btn btn-primary d-none "
                      style={{ zIndex: "revert-layer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Launch demo modal
                    </button>
                  </div>
                </>
              )}
            </Toolbar>
          </AppBar>
        )}
      </Box>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Logout Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={modalContactClose}
                onClick={(e) => {
                  closeModal();
                }}
              ></button>
            </div>
            <div className="modal-body">Are you sure you want to logout?</div>
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
                  logoutConfirm();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
