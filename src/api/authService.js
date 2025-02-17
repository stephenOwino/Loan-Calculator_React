import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate for redirection

const API_BASE_URL = "https://loan-calculator-springboot.onrender.com/api";

// REGISTER
const register = async (customerData) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/customers/register`,
			customerData
		);
		if (response.data) {
			const { token, customerId } = response.data;
			localStorage.setItem("token", token);
			localStorage.setItem("customerId", customerId);
			return { token, customerId };
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
			const { token, customerId } = response.data;
			localStorage.setItem("token", token);
			localStorage.setItem("customerId", customerId);
			return { token, customerId };
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

// Response Interceptor to handle expired tokens
axios.interceptors.response.use(
	(response) => response, // Return response if no error
	(error) => {
		if (error.response && error.response.status === 401) {
			// Token expired or invalid
			localStorage.removeItem("token");
			localStorage.removeItem("customerId");

			// You can use a navigate hook here to redirect to the homepage
			const navigate = useNavigate(); // You need this hook to redirect the user
			navigate("/"); // Redirect to the homepage after token expiration

			// Optionally, show a notification (e.g., with a toast)
			toast.error("Session expired. Please log in again.");
		}
		return Promise.reject(error);
	}
);

const authService = {
	register,
	login,
	logout,
};

export default authService;
