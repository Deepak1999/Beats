import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { setIsJwtToken, setisLoginUser, setSidebarOpen, setUserData } from "./redux/features/authSliceandSidebar";

export default function logoutFunction() {

    const history = useHistory();
    const dispatch = useDispatch();


    localStorage.clear();
    dispatch(setisLoginUser(false));
    dispatch(setUserData({}));
    history.push('/')
    dispatch(setIsJwtToken(false));
    dispatch(setSidebarOpen(false))
    // window.location.href = ""

}