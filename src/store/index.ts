import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./wallet";
import boxDataReducer from "../context/boxDataSlice";

const store = configureStore({
  reducer: {
    wallet: walletReducer,
    boxData: boxDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
