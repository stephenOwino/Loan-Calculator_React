import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import loanReducer from "../slices/LoanSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		loan: loanReducer,
	},
});
