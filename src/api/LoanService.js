import axios from "axios";

// SPRING BOOT BASE URL
const API_BASE_URL =
	"https://loan-calculator-springboot.onrender.com/api/loans";

// Apply for a loan
const applyForLoan = async (loanData) => {
	try {
		const response = await axios.post(API_BASE_URL, loanData);
		return response.data; // Return the response data to be handled in the slice
	} catch (error) {
		// Handle errors and return the error message for Redux
		if (error.response && error.response.data) {
			return error.response.data.message || "Loan application failed";
		} else {
			return "An unknown error occurred.";
		}
	}
};

const LoanService = {
	applyForLoan,
};

export default LoanService;
