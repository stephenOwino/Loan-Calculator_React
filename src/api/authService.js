import axios from "axios";

const API_BASE_URL = "https://loan-calculator-springboot.onrender.com/api";

// REGISTER
const register = async (customerData) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/customers/register`,
			customerData
		);
		if (response.data) {
			const { token, customerId } = response.data; // Update to customerId
			localStorage.setItem("token", token);
			localStorage.setItem("customerId", customerId); // Store customerId
			return { token, customerId }; // Only return token and customerId
		}
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
			const { token, customerId } = response.data; // Update to customerId
			localStorage.setItem("token", token);
			localStorage.setItem("customerId", customerId); // Store customerId
			return { token, customerId }; // Only return token and customerId
		}
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
	localStorage.removeItem("token");
	localStorage.removeItem("customerId");
};

// Automatically attach JWT token to axios requests
axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
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
