import axios from "axios";

// Replace with your actual API base URL
const API_BASE_URL = "https://loan-calculator-springboot.onrender.com/api"; // Placeholder, replace with your API URL

const register = async (userData) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/customers/register`,
			userData
		);
		if (response.data) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response.data;
	} catch (error) {
		// Check for a response error and return the error message
		if (error.response && error.response.data) {
			throw new Error(error.response.data); // Pass the error message
		} else {
			throw new Error("An unknown error occurred.");
		}
	}
};

const login = async (userData) => {
	const response = await axios.post(`${API_BASE_URL}/users/login`, userData);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
};

const logout = () => {
	localStorage.removeItem("user");
};

const authService = {
	register,
	login,
	logout,
};

export default authService;
