import { createSlice } from "@reduxjs/toolkit";

export const initialState = {

    expenseId: 0,
    detailType: 0,
    redirection: false,

    projectList: [],
    queryId: 0,
    tabIndex: 0,
    filterData: {},
    milestoneId: 0,
    releaseId: 0,
    refreshQueries: false
}


const expenseIdSlice = createSlice({
    name: "expenseIdSlice",
    initialState,
    reducers: {
        setexpenseId: (state, { payload }) => {
            state.expenseId = payload;

        },
        setDetailType: (state, { payload }) => {
            state.detailType = payload;

        },
        setRedirection: (state, { payload }) => {
            state.redirection = payload;

        },
        setProjectList1: (state, { payload }) => {
            state.projectList = payload
        },
        setQueryId: (state, { payload }) => {
            state.queryId = payload
        },
        setTabIndex: (state, { payload }) => {
            state.tabIndex = payload;
        },
        setFilterData: (state, { payload }) => {
            state.filterData = payload;
        },

        setReleaseId: (state, { payload }) => {
            state.releaseId = payload
        },
        setMilestoneId: (state, { payload }) => {
            state.milestoneId = payload
        },


        setRefreshqueries: (state, { payload }) => {
            state.refreshQueries = payload
        }

    }
})


export const {
    setexpenseId,
    setDetailType,
    setRedirection,
    setProjectList1,
    setQueryId,
    setTabIndex,
    setFilterData,
    setMilestoneId,
    setReleaseId,
    setRefreshqueries
} = expenseIdSlice.actions;


export default expenseIdSlice.reducer;
