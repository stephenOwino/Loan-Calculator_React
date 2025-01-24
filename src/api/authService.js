import axios from "axios";

// YOUR SPRING BOOT BASE URL
const API_BASE_URL = "https://loan-calculator-springboot.onrender.com/api";

// REGISTER
const register = async (userData) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/customers/register`,
			userData
		);
		if (response.data) {
			// Save user data to localStorage
			localStorage.setItem("user", JSON.stringify(response.data));
			localStorage.setItem("token", response.data.token); // Save JWT token separately
		}
		return response.data;
	} catch (error) {
		// Handle errors
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message || "Registration failed");
		} else {
			throw new Error("An unknown error occurred.");
		}
	}
};

// LOGIN
const login = async (userData) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/customers/authenticate`,
			userData
		);
		if (response.data) {
			// Save the token and user data
			localStorage.setItem("user", JSON.stringify(response.data));
			localStorage.setItem("token", response.data); // Save JWT token separately
		}
		return response.data;
	} catch (error) {
		// Handle errors
		if (error.response && error.response.data) {
			throw new Error(error.response.data || "Login failed");
		} else {
			throw new Error("An unknown error occurred.");
		}
	}
};

// LOGOUT
const logout = () => {
	localStorage.removeItem("user");
	localStorage.removeItem("token"); // Clear the token
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
