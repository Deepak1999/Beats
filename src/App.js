import { Backdrop } from '@mui/material';
import axios from 'axios';
import "material-icons/iconfont/material-icons.css";
import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2';
import './App.css';
import Loader from './Components/Loader';
import { setLoader, setUserData, setisLoginUser } from './redux/features/authSliceandSidebar';
import Loading from './Components/Loading';
import { StylesProvider } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import './index.css';
import '../src/pages/loggedInUser/main.css'
import 'react-toastify/dist/ReactToastify.css';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Sidebar2 from './Layout/Sidebar2.jsx';
import { ToastContainer } from 'react-toastify';
import ChangePasswordModal from './Components/ChangePasswordModal.jsx';
import FakeSideBar from './Layout/FakeSidebar.jsx';
const LazyRoutes = React.lazy(
  () => import('./pages/loginFolder')
)
const LazySidebar = React.lazy(
  () => import('./Layout/HeaderAndSideBar')
)
const LazySideBar2 = React.lazy(
  () => import('./Layout/HeaderAndSideBar')
)


export var common_axios = axios.create({
  // // baseURL: "http://192.168.167.66:5001/",
  // baseURL: `${process.env.REACT_APP_COMMON_API_LIVE}/`
  // baseURL: `${process.env.REACT_APP_COMMON_API_live_local}/`,
  // baseURL: `http://localhost:8089/`,
  baseURL: `http://localhost:8085/`,

  // baseURL: `${process.env.REACT_APP_COMMON_API_STAGING_LIVE}/`
});

/**
 * Main application component that manages authentication, routing, and layout.
 * @example
 * App()
 * JSX.Element
 * @returns {JSX.Element} The rendered component of the application with routing and state management.
 * @description
 *   - Sets authorization headers for axios requests using data stored in localStorage.
 *   - Uses Redux to manage global authentication state and updates.
 *   - Handles global error events and response interceptors for API calls.
 *   - Manages a loading state with a backdrop overlay when needed.
 */
function App() {
  const token1 = localStorage.getItem("token");
  const uid = localStorage.getItem("userId");
  // const [open, setOpen] = useState(false);
  common_axios.defaults.headers.common["Authorization"] = `Bearer ${token1}`;
  common_axios.defaults.headers.common["source"] = "web";
  common_axios.defaults.headers.common["userId"] = uid;
  common_axios.defaults.headers.common["jwtToken"] = token1;
  common_axios.defaults.headers["source"] = '1'
  common_axios.defaults.headers["appVersion"] = '0'
  var y = useSelector(
    (state) => state.authSliceandSidebar.isLogin
  );
  const loader = useSelector((state) => state.authSliceandSidebar.loader);
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true)
  var y = useSelector(
    (state) => state.authSliceandSidebar.sideBarOpen
  );
  const [showFull, setshowFull] = useState(false);
  useEffect(() => {
    if (loader) {
      setOpen(loader)
    }
    else {
      setOpen(loader)
    }
  }, [loader])
  useEffect(() => {
    if (y) {
      common_axios.defaults.headers.common["Authorization"] = `Bearer ${token1}`;
      common_axios.defaults.headers.common["userId"] = uid;
      common_axios.defaults.headers.common["jwtToken"] = token1;
      common_axios.defaults.headers["source"] = '1'
      common_axios.defaults.headers["appVersion"] = '0'
    }
    // setOpen(false)
  }, [y])

  useEffect(() => {
    // clearCacheData()

    /**
        * Handles the 'ResizeObserver loop limit exceeded' error by hiding related overlay elements.
        * @example
        * errorHandler(new Error('ResizeObserver loop limit exceeded'))
        * undefined
        * @param {Error} e - Error object that is to be handled.
        * @returns {void} Does not return anything.
        * @description
        *   - The function specifically targets the 'ResizeObserver loop limit exceeded' error.
        *   - It manipulates the DOM to hide specific overlay elements caused by this error.
        *   - The function checks if the elements exist before attempting to hide them.
        */
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        );
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    });
  }, []);
  axios.interceptors.response.use(
    async (res) => {
      if (
        res.request.responseURL ==
        `${process.env.REACT_APP_COMMON_API}/auth/login` ||
        res.request.responseURL ==
        `${process.env.REACT_APP_COMMON_API}/auth/v1/pin/verify`
      ) {
        if (res?.data?.statusDescription?.statusCode == 200) {
          localStorage.setItem(
            "token",
            res?.data?.user?.userTokenDetails?.jwtToken
          );
          localStorage.setItem("userData", JSON.stringify(res.data.user))
          localStorage.setItem("userId", res.data.user.id);
          const token1 = localStorage.getItem("token");
          const uid = localStorage.getItem("userId");
          common_axios.defaults.headers.common["Authorization"] =
            `Bearer ${token1}`;
          common_axios.defaults.headers.common["userId"] = uid;
          common_axios.defaults.headers.common["jwtToken"] = token1;
          common_axios.defaults.headers["source"] = '1'
          common_axios.defaults.headers["appVersion"] = '0'
        }
      }
      if (
        res?.data?.statusDescription?.statusCode == 102 ||
        res?.data?.statusDescription?.statusCode == 303 ||
        res?.data?.statusDescription?.statusCode == 404
      ) {
        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res?.data?.statusDescription?.statusMessage
          });
        }, 200);
      }
      if (res.request.responseURL !=
        `${process.env.REACT_APP_COMMON_API_STAGING_LIVE}/auth/login` && res?.data?.statusDescription?.statusCode == 401) {
        localStorage.clear();
        dispatch(setisLoginUser(false))
        dispatch(setUserData({}))
        history.push('/');
      }
      return res;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  common_axios.interceptors.response.use(
    async (config) => {
      if (!config) {
        localStorage.clear();
        dispatch(setisLoginUser(false));
        dispatch(setLoader(false))
        dispatch(setUserData({}));
        Swal.fire({
          icon: "error",
          title: "Session Expired",
          text: "Session Expired"
        }).then((data) => {
          Swal.close()
          history.push('/');

        })



        setTimeout(() => {
          localStorage.clear();
          dispatch(setisLoginUser(false));
          dispatch(setLoader(false))
          dispatch(setUserData({}));
        }, 1000)
      }
      if (config?.data) {
        if (config?.data?.statusDescription?.statusCode == 401) {
          localStorage.clear();
          dispatch(setisLoginUser(false));
          dispatch(setUserData({}));
          Swal.fire({
            icon: "error",
            title: "Session Expired",
            text: config.data.statusDescription.statusMessage
          }).then((data) => {
            history.push('/');
          })
          // setTimeout(() => {
          //   history.push('/');
          // }, 1000)
        }
      }

      return config
    },
    error => {
      Promise.reject(error)
    }
  )
  useEffect(() => {
    if (y) {
      setshowFull(true)
    }
    else {
      setshowFull(false)
    }
  }, [y]);
  const Routes = LazyRoutes;
  return (
    <>
      <StylesProvider injectFirst>
        <Backdrop
          sx={{
            transform: "translateZ(0)",
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1
          }}
          open={open}
        >
          <Loader />
        </Backdrop>
        <div className={
          showFull ? "margin_left transition_dinbe" : "no_margin transition_dinbe"
        } >
          <React.Suspense fallback={<></>}>
            <LazySidebar />
          </React.Suspense>
          <React.Suspense fallback={<Loading />}>
            <Routes />
          </React.Suspense>


        </div >
        {
          < div className={
            showFull ? "no_margin transition_dinbe" : "no_margin transition_dinbe"
          }>
            <Sidebar2 />
          </div >
        }

        {/* {
          localStorage.getItem('password') != null && <ChangePasswordModal />
        } */}

        <ToastContainer />
      </StylesProvider >
    </>
  );
}
export default App;
