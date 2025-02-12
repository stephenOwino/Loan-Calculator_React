import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../api/authService";

// Get customer info from localStorage
const customer = JSON.parse(localStorage.getItem("customer"));

const initialState = {
	customer: customer ? customer : null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

// REGISTER CUSTOMER
export const register = createAsyncThunk(
	"auth/register",
	async (customer, thunkAPI) => {
		try {
			const response = await authService.register(customer);
			localStorage.setItem("customer", JSON.stringify(response));
			localStorage.setItem("token", response.token); // Store token
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

// LOGIN CUSTOMER
export const login = createAsyncThunk(
	"auth/login",
	async (customer, thunkAPI) => {
		try {
			const response = await authService.login(customer);
			localStorage.setItem("token", response.token); // Store token
			localStorage.setItem("customerId", response.id); // Store customer ID
			return { token: response.token, id: response.id }; // Only store token and id
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

// LOGOUT CUSTOMER
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		await authService.logout();
		localStorage.removeItem("customer");
		localStorage.removeItem("token"); // Remove token
		localStorage.removeItem("customerId"); // Remove customer ID
		return true;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Slice
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.customer = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.customer = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.customer = { id: action.payload.id }; // Only store customer ID
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.customer = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.customer = null;
				state.isSuccess = false;
				state.isError = false;
				state.message = "";
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
