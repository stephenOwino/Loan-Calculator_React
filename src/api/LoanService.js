import axios from "axios";

const API_URL = "https://loan-calculator-springboot.onrender.com/api/loans/";

const applyForLoan = async (loanData) => {
	const token = localStorage.getItem("token");
	console.log("Token:", token); // Log token to ensure it's being retrieved
	const response = await axios.post(API_URL, loanData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

const getLoanStatement = async () => {
	const token = localStorage.getItem("token");
	console.log("Token:", token); // Log token to ensure it's being retrieved
	const response = await axios.get(`${API_URL}statement`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

const LoanService = {
	applyForLoan,
	getLoanStatement,
};

export default LoanService;
