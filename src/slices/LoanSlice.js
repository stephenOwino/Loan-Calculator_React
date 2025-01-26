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
		totalInterest: "",
		totalRepayment: "",
		repaymentFrequency: "",
	},
	loading: false,
	error: null,
	appliedLoan: null,
};

// Apply for a loan
export const applyForLoan = createAsyncThunk(
	"loan/apply",
	async ({ loanData, customerId }, thunkAPI) => {
		try {
			const response = await LoanService.applyForLoan(loanData, customerId);
			return response;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
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
			state.loanData = initialState.loanData;
			state.loading = false;
			state.error = null;
			state.appliedLoan = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(applyForLoan.pending, (state) => {
				state.loading = true;
			})
			.addCase(applyForLoan.fulfilled, (state, action) => {
				state.loading = false;
				state.appliedLoan = action.payload;
				toast.success("Loan application submitted successfully!");
			})
			.addCase(applyForLoan.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				toast.error(
					action.payload || "An error occurred while applying for the loan."
				);
			});
	},
});

export const { updateLoanData, resetLoan } = loanSlice.actions;
export default loanSlice.reducer;
