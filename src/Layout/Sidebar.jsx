import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "../redux/features/authSliceandSidebar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CloseIcon from "@mui/icons-material/Close";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import "../assets/css1/sidebar.css";
import logo1 from "../assets/images/logo-white.png";
export default function TemporaryDrawer(props) {
  const [state, setState] = React.useState({
    top: false,
    left: true,
    bottom: false,
    right: false,
  });
  const [showfull, setshowFull] = React.useState(false);
  var y = useSelector((state) => state.authSliceandSidebar.sideBarOpen);
  var dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    if (y) {
      setshowFull(true);
    }
  }, [y]);
  const onMouseEnter = () => {
    openDrawer();
  };
  const onMouseLeave = () => {
    closedrawer();
  };
  const openDrawer = () => {
    setshowFull(true);
    dispatch(setSidebarOpen(true));
  };
  const closedrawer = () => {
    setshowFull(false);
    dispatch(setSidebarOpen(false));
  };
  const historyPush = (event, route) => {
    if (route == "Create Expense") {
      let myRoute = "create";
      history.push(`/${myRoute}`);
    } else {
      history.push(`/${route}`);
    }
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <div className="d-flex justify-content-start"></div>
      <div className="  d-flex justify-content-between align-items-center">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          className={showfull ? "d-none" : ""}
          sx={{ mr: 2 }}
          onClick={closedrawer}
        ></IconButton>
        <img src={logo1} className={showfull ? "img_small" : "imgClass"} />
        <button
          className={showfull ? "btn " : "btn d-none"}
          onClick={closedrawer}
        >
          <MenuOpenIcon />{" "}
        </button>
      </div>
      <List>
        {["Dashboard", "Expense", "Create Expense"].map((text, index) => (
          <ListItem
            className="dropdown"
            key={text}
            disablePadding
            onClick={(e) => {
              historyPush(e, text);
            }}
          >
            <ListItemButton
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
            <List
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton1"
            >
              <ListItem
                key={text}
                disablePadding
                onClick={(e) => {
                  historyPush(e, text);
                }}
              >
                <ListItemButton
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
  return (
    <div id="sidebar_class">
      {["left", "right", "top", "bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer("left", true)}>{anchor}</Button> */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            className={
              showfull
                ? "fsdfgsdfsd transition_dinbe"
                : "closed transition_dinbe"
            }
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
