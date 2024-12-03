import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setisLoginUser } from "../redux/features/authSliceandSidebar";
import MenuAppBar from "./MenuAppBar";
const HeaderAndSideBar = () => {
  const [open, setOpen] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const dispatch = useDispatch();
  var y = useSelector((state) => state.authSliceandSidebar.isLogin);
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      dispatch(setisLoginUser(true));
      setisLogin(true);
    }
  }, []);
  useEffect(() => {
    if (y) {
      setisLogin(true);
    } else if (!y) {
      setisLogin(false);
    }
  }, [y]);
  return (
    <>
      {isLogin && (
        <div style={{ top: "0", position: "sticky", zIndex: "9" }}>
          <MenuAppBar />
        </div>
      )}
    </>
  );
};
export default HeaderAndSideBar;
