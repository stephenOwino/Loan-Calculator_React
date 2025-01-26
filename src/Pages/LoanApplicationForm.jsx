import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetLoan, updateLoanData, applyForLoan } from "../slices/LoanSlice";
import { toast } from "react-toastify";
import LoanSpinner from "../spinner/LoanSpinner";
import { useNavigate } from "react-router-dom";

const InputField = ({ id, label, type, value, onChange, placeholder }) => (
	<div className='mb-6'>
		<label htmlFor={id} className='block text-sm font-medium text-gray-700'>
			{label}
		</label>
		<input
			type={type}
			className='mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600'
			id={id}
			name={id}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	</div>
);

const SelectField = ({ id, label, value, onChange, options }) => (
	<div className='mb-6'>
		<label htmlFor={id} className='block text-sm font-medium text-gray-700'>
			{label}
		</label>
		<select
			id={id}
			name={id}
			value={value}
			onChange={onChange}
			className='mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600'
		>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	</div>
);

const LoanApplicationForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector((state) => state.loan.loading);
	const error = useSelector((state) => state.loan.error);
	const appliedLoan = useSelector((state) => state.loan.appliedLoan);
	const { user } = useSelector((state) => state.auth); // Assuming user info is stored in auth slice

	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		amount: "",
		loanTerm: "",
		totalInterest: "",
		totalRepayment: "",
		repaymentFrequency: "",
	});

	const [totalAmount, setTotalAmount] = useState(null);
	const [monthlyPayment, setMonthlyPayment] = useState(null);
	const [interestRate, setInterestRate] = useState(null);
	const [remainingTime, setRemainingTime] = useState(null);

	useEffect(() => {
		if (!error) {
			dispatch(resetLoan());
		}
	}, [dispatch, error]);

	useEffect(() => {
		if (!user) {
			navigate("/login"); // Redirect to login if user is not authenticated
		}
	}, [user, navigate]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === "amount" || name === "loanTerm") {
			if (value < 0) {
				toast.error("Please enter a positive value.");
				return;
			}
		}
		setFormData({ ...formData, [name]: value });
	};

	const calculateInterestRate = (amount) => {
		if (amount >= 10000 && amount <= 100000) {
			return 7;
		} else if (amount > 100000 && amount <= 500000) {
			return 5;
		} else if (amount > 500000 && amount <= 1000000) {
			return 3;
		} else {
			return null;
		}
	};

	const calculatePayments = () => {
		const { amount, loanTerm } = formData;
		if (amount && loanTerm) {
			const principal = parseFloat(amount);
			const interestRate = calculateInterestRate(principal) / 100;
			if (interestRate === null) {
				setTotalAmount(null);
				setMonthlyPayment(null);
				setInterestRate(null);
				return;
			}
			const numberOfPayments = parseInt(loanTerm) * 12;
			const monthlyInterestRate = interestRate / 12;

			const monthlyPayment =
				(principal * monthlyInterestRate) /
				(1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
			const totalAmount = monthlyPayment * numberOfPayments;
			const totalInterest = totalAmount - principal;

			setMonthlyPayment(monthlyPayment.toFixed(2));
			setTotalAmount(totalAmount.toFixed(2));
			setInterestRate((interestRate * 100).toFixed(2));
			setFormData({
				...formData,
				totalInterest: totalInterest.toFixed(2),
				totalRepayment: totalAmount.toFixed(2),
			});
		}
	};

	const calculateRemainingTime = (dueDate) => {
		const now = new Date();
		const due = new Date(dueDate);
		const remainingTimeInSeconds = (due - now) / 1000;

		const days = Math.floor(remainingTimeInSeconds / (24 * 3600));
		const hours = Math.floor((remainingTimeInSeconds % (24 * 3600)) / 3600);
		const minutes = Math.floor((remainingTimeInSeconds % 3600) / 60);
		const seconds = Math.floor(remainingTimeInSeconds % 60);

		return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const {
			fullName,
			email,
			phoneNumber,
			amount,
			loanTerm,
			totalInterest,
			totalRepayment,
			repaymentFrequency,
		} = formData;
		if (
			!fullName ||
			!email ||
			!phoneNumber ||
			!amount ||
			!loanTerm ||
			!totalInterest ||
			!totalRepayment ||
			!repaymentFrequency
		) {
			toast.error("Please fill out all fields.");
			return;
		}

		if (isNaN(amount) || isNaN(loanTerm)) {
			toast.error("Please enter valid numbers for amount and loan term.");
			return;
		}

		if (
			Number(amount) < 10000 ||
			Number(amount) > 1000000 ||
			Number(loanTerm) <= 0
		) {
			toast.error(
				"Please enter a loan amount between 10,000 KES and 1,000,000 KES and a positive loan term."
			);
			return;
		}

		try {
			const customerId = localStorage.getItem("customerId"); // Retrieve customer ID from localStorage
			if (!customerId) {
				throw new Error("Customer ID is not available");
			}
			dispatch(updateLoanData(formData));
			await dispatch(
				applyForLoan({ loanData: formData, customerId: parseInt(customerId) })
			);

			toast.success("Loan application submitted successfully!");
			setFormData({
				fullName: "",
				email: "",
				phoneNumber: "",
				amount: "",
				loanTerm: "",
				totalInterest: "",
				totalRepayment: "",
				repaymentFrequency: "",
			});
			setTotalAmount(null);
			setMonthlyPayment(null);
			setInterestRate(null);
		} catch (error) {
			console.error("Loan application error:", error);
			toast.error(
				error?.message || "An error occurred while applying for the loan."
			);
		}
	};

	useEffect(() => {
		calculatePayments();
	}, [formData.amount, formData.loanTerm]);

	useEffect(() => {
		if (appliedLoan && appliedLoan.dueDate) {
			const interval = setInterval(() => {
				setRemainingTime(calculateRemainingTime(appliedLoan.dueDate));
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [appliedLoan]);

	return (
		<div className='flex items-center justify-center mt-20 min-h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400'>
			<div className='w-full max-w-md p-8 bg-white rounded-xl shadow-2xl lg:max-w-2xl lg:p-12'>
				<h2 className='text-3xl font-semibold text-center text-gray-800 mb-6'>
					Apply for a Loan
				</h2>
				{loading ? (
					<LoanSpinner message='Applying for loan...' />
				) : (
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
							<InputField
								id='fullName'
								label='Full Name'
								type='text'
								value={formData.fullName}
								onChange={handleChange}
								placeholder='Enter your full name'
							/>
							<InputField
								id='email'
								label='Email'
								type='email'
								value={formData.email}
								onChange={handleChange}
								placeholder='Enter your email'
							/>
							<InputField
								id='phoneNumber'
								label='Phone Number'
								type='tel'
								value={formData.phoneNumber}
								onChange={handleChange}
								placeholder='Enter your phone number'
							/>
							<InputField
								id='amount'
								label='Loan Amount'
								type='number'
								value={formData.amount}
								onChange={handleChange}
								placeholder='Enter loan amount'
							/>
							<InputField
								id='loanTerm'
								label='Loan Term (Years)'
								type='number'
								value={formData.loanTerm}
								onChange={handleChange}
								placeholder='Enter loan term in years'
							/>
							<SelectField
								id='repaymentFrequency'
								label='Repayment Frequency'
								value={formData.repaymentFrequency}
								onChange={handleChange}
								options={["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]}
							/>
						</div>

						{totalAmount && monthlyPayment && (
							<div className='mt-4 p-4 bg-green-100 text-green-700 rounded-lg'>
								<p>Interest Rate: {interestRate}%</p>
								<p>
									Total Amount to be Paid Back (including interest): $
									{totalAmount}
								</p>
								<p>Monthly Payment: ${monthlyPayment}</p>
							</div>
						)}

						{remainingTime && (
							<div className='mt-4 p-4 bg-blue-100 text-blue-700 rounded-lg'>
								<p>Remaining Time: {remainingTime}</p>
							</div>
						)}

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
				)}
			</div>
		</div>
	);
};

export default LoanApplicationForm;
