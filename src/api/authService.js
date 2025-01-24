import axios from "axios";

// Replace with your actual API base URL
const API_BASE_URL =
	"https://loan-calculator-4wyx.onrender.com/api/customers/register"; // Placeholder, replace with your API URL

const register = async (userData) => {
	const response = await axios.post(`${API_BASE_URL}/users/register`, userData);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
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
