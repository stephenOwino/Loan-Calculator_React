import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetLoan, updateLoanData, applyForLoan } from "../slices/LoanSlice";
import { toast } from "react-toastify";

const LoanApplicationForm = () => {
	const dispatch = useDispatch();
	const loanData = useSelector((state) => state.loan.loanData);
	const loading = useSelector((state) => state.loan.loading);
	const error = useSelector((state) => state.loan.error);

	const [formData, setFormData] = useState({
		amount: "",
		interestRate: "",
		loanTerm: "",
	});

	useEffect(() => {
		// Reset loan state on component mount or error
		if (!error) {
			dispatch(resetLoan());
		}
	}, [dispatch, error]);

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			dispatch(updateLoanData(formData)); // Update loan data in state
			await dispatch(applyForLoan(formData)); // Dispatch applyForLoan async action

			// Handle success scenario
			toast.success("Loan application submitted successfully!");
			// Optionally, clear the form or redirect to a success page
			setFormData({ amount: "", interestRate: "", loanTerm: "" });
		} catch (error) {
			console.error("Loan application error:", error);
			// Ensure error message is displayed correctly
			toast.error(
				error?.message || "An error occurred while applying for the loan."
			);
		}
	};

	return (
		<div className='flex items-center justify-center mt-20 min-h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400'>
			<div className='w-full max-w-md p-8 bg-white rounded-xl shadow-2xl'>
				<h2 className='text-3xl font-semibold text-center text-gray-800 mb-6'>
					Apply for a Loan
				</h2>
				<form onSubmit={handleSubmit}>
					<div className='mb-6'>
						<label
							htmlFor='amount'
							className='block text-sm font-medium text-gray-700'
						>
							Loan Amount
						</label>
						<input
							type='number'
							className='mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600'
							id='amount'
							name='amount'
							value={formData.amount}
							onChange={handleChange}
							placeholder='Enter loan amount'
						/>
					</div>

					<div className='mb-6'>
						<label
							htmlFor='interestRate'
							className='block text-sm font-medium text-gray-700'
						>
							Interest Rate
						</label>
						<input
							type='number'
							className='mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600'
							id='interestRate'
							name='interestRate'
							value={formData.interestRate}
							onChange={handleChange}
							placeholder='Enter interest rate'
						/>
					</div>

					<div className='mb-6'>
						<label
							htmlFor='loanTerm'
							className='block text-sm font-medium text-gray-700'
						>
							Loan Term (Years)
						</label>
						<input
							type='number'
							className='mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600'
							id='loanTerm'
							name='loanTerm'
							value={formData.loanTerm}
							onChange={handleChange}
							placeholder='Enter loan term in years'
						/>
					</div>

					<button
						type='submit'
						className='w-full py-3 mt-4 text-white bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-400'
						disabled={loading}
					>
						{loading ? "Applying..." : "Apply for Loan"}
					</button>

					{error && (
						<div className='mt-4 p-3 bg-red-100 text-red-700 rounded-lg'>
							{error}
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default LoanApplicationForm;
