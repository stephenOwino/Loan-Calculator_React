import axios from "axios";

const API_BASE_URL =
	"https://loan-calculator-springboot.onrender.com/api/loans";

// Apply for a Loan
const applyForLoan = async (loanData, customerId) => {
	const token = localStorage.getItem("token");
	if (!token) {
		throw new Error("Authentication token is missing.");
	}

	try {
		const response = await axios.post(
			`${API_BASE_URL}/${customerId}`,
			loanData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		const message = error?.response?.data?.message || "Loan application failed";
		throw new Error(message);
	}
};

export default { applyForLoan };
