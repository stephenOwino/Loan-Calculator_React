import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../api/authService";

// Get customer from localStorage
const customer = localStorage.getItem("customer");
// Add a check to parse the customer object only if it exists
const parsedCustomer = customer ? JSON.parse(customer) : null;

const initialState = {
	customer: parsedCustomer, // Use parsedCustomer here
	token: localStorage.getItem("token"),
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
			localStorage.setItem("customer", JSON.stringify(response.customer)); // Store customer object
			localStorage.setItem("token", response.token); // Store token
			return { customer: response.customer, token: response.token }; // Return customer and token
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
			localStorage.setItem("customer", JSON.stringify(response.customer)); // Store full customer object
			localStorage.setItem("token", response.token); // Store token
			return { customer: response.customer, token: response.token }; // Return customer and token
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
		localStorage.removeItem("customer"); // Remove customer from localStorage
		localStorage.removeItem("token"); // Remove token from localStorage
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
			// Register cases
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.customer = action.payload.customer; // Store customer object
				state.token = action.payload.token; // Store token from login response
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.customer = null;
				state.token = null; // Clear the customer and token on failure
			})

			// Login cases
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.customer = action.payload.customer; // Store customer object
				state.token = action.payload.token; // Store token from login response
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.customer = null;
				state.token = null; // Clear customer and token on failure
			})

			// Logout cases
			.addCase(logout.fulfilled, (state) => {
				state.customer = null;
				state.token = null; // Clear customer and token on logout
				state.isSuccess = false;
				state.isError = false;
				state.message = "";
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
