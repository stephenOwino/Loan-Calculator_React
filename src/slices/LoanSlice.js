import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LoanService from "../api/LoanService";
import { toast } from "react-toastify";

const initialState = {
	loanData: {
		fullName: "",
		email: "",
		phoneNumber: "",
		amount: "",
		loanTerm: "",
		repaymentFrequency: "",
		purpose: "",
	},
	loading: false,
	error: null,
	appliedLoan: null,
};

// Async Thunk: Apply for a Loan
export const applyForLoan = createAsyncThunk(
	"loan/apply",
	async ({ loanData, customerId }, thunkAPI) => {
		try {
			const response = await LoanService.applyForLoan(loanData, customerId);
			return response; // Returning response data
		} catch (error) {
			const errorMessage =
				error?.response?.data?.message || error.message || "Unexpected error";
			return thunkAPI.rejectWithValue(errorMessage); // Standardized error response
		}
	}
);

const loanSlice = createSlice({
	name: "loan",
	initialState,
	reducers: {
		updateLoanData(state, action) {
			state.loanData = { ...state.loanData, ...action.payload };
		},
		resetLoan(state) {
			Object.assign(state, initialState);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(applyForLoan.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(applyForLoan.fulfilled, (state, action) => {
				state.loading = false;
				state.appliedLoan = action.payload;
				toast.success("Loan application submitted successfully!");
			})
			.addCase(applyForLoan.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				toast.error(action.payload || "Loan application failed.");
			});
	},
});

export const { updateLoanData, resetLoan } = loanSlice.actions;
export default loanSlice.reducer;
