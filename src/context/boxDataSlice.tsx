import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boxViewData: [],
  networkStats: [],
  isLoading: true,
  isLoadingNet: true,
  locationCountData: [],
  boxPayoutList: [],
  pendingUnstake: [],
  userData: [],
  validatorPayoutdata: [],
};

const boxDataSlice = createSlice({
  name: "boxData",
  initialState,
  reducers: {
    setBoxViewData(state, action) {
      state.boxViewData = action.payload;
    },
    setNetworkStats(state, action) {
      state.networkStats = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsLoadingNet(state, action) {
      state.isLoadingNet = action.payload;
    },
    setLocationCountData(state, action) {
      state.locationCountData = action.payload;
    },
    setBoxPayoutList(state, action) {
      state.boxPayoutList = action.payload;
    },
    setPendingUnstake(state, action) {
      state.pendingUnstake = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setValidatorPayoutdata(state, action) {
      state.validatorPayoutdata = action.payload;
    },
  },
});

export const {
  setBoxViewData,
  setNetworkStats,
  setIsLoading,
  setIsLoadingNet,
  setLocationCountData,
  setBoxPayoutList,
  setPendingUnstake,
  setUserData,
  setValidatorPayoutdata,
} = boxDataSlice.actions;

export default boxDataSlice.reducer;
