import { createSlice } from "@reduxjs/toolkit";

export const initialState = {

    loginData: {
        user: {

        },
        token: "",
        userId: 0,

    },
    aesKey: "",
    isJwtToken: false,
    user: {},
    sideBarOpen: false,
    isLogin: false,
    loader: false,
    menuButton: false
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSidebarOpen: (state, { payload }) => {
            state.sideBarOpen = payload;

        },
        setUserData: (state, { payload }) => {
            state.user = payload
        },
        setisLoginUser: (state, { payload }) => {
            state.isLogin = payload;
        },
        setLoader: (state, { payload }) => {
            state.loader = payload
        },
        setMenuButton: (state, { payload }) => {
            state.menuButton = payload;
        },

        setIsJwtToken: (state, { payload }) => {
            state.isJwtToken = payload;
        },


        setToken: (state, { payload }) => {
            state.loginData.token = payload
        },
        setUserId: (state, { payload }) => {
            state.loginData.userId = payload
        },
        setAesKey: (state, { payload }) => {
            state.aesKey = payload;
        },

    }
})


export const {
    setSidebarOpen,
    setUserData,
    setisLoginUser,
    setLoader,
    setMenuButton,
    setUserId,
    setToken,
    setIsJwtToken,
    setAesKey
} = authSlice.actions;


export default authSlice.reducer;
