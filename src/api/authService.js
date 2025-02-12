import axios from "axios";

// YOUR SPRING BOOT BASE URL
const API_BASE_URL = "https://loan-calculator-springboot.onrender.com/api";

// REGISTER
const register = async (customerData) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/customers/register`,
			customerData
		);
		if (response.data) {
			console.log("Register Response:", response.data); // Log response
			localStorage.setItem("customer", JSON.stringify(response.data));
			localStorage.setItem("token", response.data.token); // Save JWT token separately
			localStorage.setItem("customerId", response.data.id); // Save customer ID separately
		}
		return response.data;
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message || "Registration failed");
		} else {
			throw new Error("An unknown error occurred.");
		}
	}
};

// LOGIN
const login = async (customerData) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/customers/authenticate`,
			customerData
		);
		if (response.data) {
			console.log("Login Response:", response.data); // Log response
			localStorage.setItem("customer", JSON.stringify(response.data));
			localStorage.setItem("token", response.data.token); // Save JWT token separately
			localStorage.setItem("customerId", response.data.id); // Save customer ID separately
		}
		return response.data;
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message || "Login failed");
		} else {
			throw new Error("An unknown error occurred.");
		}
	}
};

// LOGOUT
const logout = () => {
	localStorage.removeItem("customer");
	localStorage.removeItem("token"); // Clear the token
	localStorage.removeItem("customerId"); // Clear the customer ID
};

// Automatically attach JWT token to axios requests
axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		console.log("Interceptor Token:", token); // Log token in interceptor
		if (token) {
			config.headers.Authorization = `Bearer ${token}`; // Attach the token to every request
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

const authService = {
	register,
	login,
	logout,
};

export default authService;
