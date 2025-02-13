import axios from "axios";

const API_URL = "https://loan-calculator-springboot.onrender.com/api/loans/";

const getAuthHeaders = () => {
	const token = localStorage.getItem("token");
	if (!token) {
		console.error("No token found");
		// Redirect to login if token is missing
		window.location.href = "/login"; // Redirect to login page
		return {};
	}
	console.log("Token:", token); // Log token to ensure it's being retrieved
	return {
		Authorization: `Bearer ${token}`,
	};
};

// Apply for loan
const applyForLoan = async (loanData) => {
	try {
		const headers = getAuthHeaders();
		if (!headers.Authorization) {
			return { message: "Token is missing or invalid" };
		}
		const response = await axios.post(API_URL, loanData, { headers });
		return response.data;
	} catch (error) {
		console.error("Error applying for loan:", error);
		if (error.response && error.response.status === 401) {
			console.error("Unauthorized: Token might be expired or invalid");
			localStorage.removeItem("token");
			window.location.href = "/login"; // Redirect to login
		}
		return error.response
			? error.response.data
			: { message: "An error occurred" };
	}
};

// Get loan statement
const getLoanStatement = async () => {
	try {
		const headers = getAuthHeaders();
		if (!headers.Authorization) {
			return { message: "Token is missing or invalid" };
		}
		const response = await axios.get(`${API_URL}statement`, { headers });
		return response.data;
	} catch (error) {
		console.error("Error fetching loan statement:", error);
		if (error.response && error.response.status === 401) {
			console.error("Unauthorized: Token might be expired or invalid");
			localStorage.removeItem("token");
			window.location.href = "/login"; // Redirect to login
		}
		return error.response
			? error.response.data
			: { message: "An error occurred" };
	}
};

// Download loan statement
const downloadLoanStatement = async () => {
	try {
		const headers = getAuthHeaders();
		if (!headers.Authorization) {
			return { message: "Token is missing or invalid" };
		}
		const response = await axios.get(`${API_URL}statement/download`, {
			headers,
			responseType: "blob",
		});
		const file = new Blob([response.data], { type: "text/plain" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(file);
		link.download = "loan_statement.txt";
		link.click();
		return { message: "Download started" };
	} catch (error) {
		console.error("Error downloading loan statement:", error);
		if (error.response && error.response.status === 401) {
			console.error("Unauthorized: Token might be expired or invalid");
			localStorage.removeItem("token");
			window.location.href = "/login"; // Redirect to login
		}
		return error.response
			? error.response.data
			: { message: "An error occurred" };
	}
};

const LoanService = {
	applyForLoan,
	getLoanStatement,
	downloadLoanStatement,
};

export default LoanService;
