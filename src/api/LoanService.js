import axios from "axios";

// SPRING BOOT BASE URL
const API_BASE_URL =
	"https://loan-calculator-springboot.onrender.com/api/loans";

// Apply for a loan
const applyForLoan = async (loanData, customerId) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/${customerId}`,
			loanData
		);
		return response.data;
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message || "Loan application failed");
		} else {
			throw new Error("An unknown error occurred.");
		}
	}
};

const LoanService = {
	applyForLoan,
};

export default LoanService;
