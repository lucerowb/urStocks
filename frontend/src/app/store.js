import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import stockReducer from "../features/stocks/stockSlice";
import companyReducer from "../features/companies/companySlice";
// import companyDetailReducer from "../features/companies/companyDetailSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stock: stockReducer,
    company: companyReducer,
    // companyDetail: companyDetailReducer,
  },
});
