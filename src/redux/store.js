import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, compose } from "redux";
import authSliceandSidebar from "./features/authSliceandSidebar";
import expenseIdSlice from "./features/expenseIdSlice";
import thunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = configureStore(
    {
        reducer: {
            authSliceandSidebar,
            expenseIdSlice

        },
    },
    composeEnhancers(applyMiddleware(thunk))
);
