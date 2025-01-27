import axios from "axios";

const API_URL = "https://your-api-url.com/api/loans/";

const applyForLoan = async (loanData) => {
	const response = await axios.post(API_URL, loanData, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return response.data;
};

const LoanService = {
	applyForLoan,
};

export default LoanService;
