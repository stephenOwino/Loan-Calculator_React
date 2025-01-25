import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LoanService from "../api/LoanService";

const initialState = {
	loanData: {
		fullName: "",
		email: "",
		phoneNumber: "",
		amount: "",
		loanTerm: "",
	},
	loading: false,
	error: null,
	appliedLoan: null,
};

// Apply for a loan
export const applyForLoan = createAsyncThunk(
	"loan/apply",
	async (loanData, thunkAPI) => {
		try {
			const response = await LoanService.applyForLoan(loanData);
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
			})
			.addCase(applyForLoan.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { updateLoanData, resetLoan } = loanSlice.actions;
export default loanSlice.reducer;
