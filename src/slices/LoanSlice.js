import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	loanData: {
		amount: "",
		interestRate: "",
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
			// Replace with your backend API call to apply for a loan
			const response = await axios.post("/api/loans", loanData);
			return response.data;
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
				state.appliedLoan = action.payload; // Storing the applied loan data from response
			})
			.addCase(applyForLoan.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload; // Storing error message
			});
	},
});

export const { updateLoanData, resetLoan } = loanSlice.actions;
export default loanSlice.reducer;
