import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import stockReducer from "../features/stocks/stockSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stock: stockReducer,
  },
});
