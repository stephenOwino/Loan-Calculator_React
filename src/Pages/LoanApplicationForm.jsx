import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetLoan, updateLoanData, applyForLoan } from "../slices/LoanSlice";
import { toast } from "react-toastify";
import LoanSpinner from "../spinner/LoanSpinner";
import { useNavigate } from "react-router-dom";

// Input Field Component
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

// Select Field Component
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
		repaymentFrequency: "",
		purpose: "",
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
			repaymentFrequency,
			purpose,
		} = formData;

		if (
			!fullName ||
			!email ||
			!phoneNumber ||
			!amount ||
			!loanTerm ||
			!repaymentFrequency ||
			!purpose
		) {
			toast.error("Please fill out all fields.");
			return;
		}

		if (amount <= 0) {
			toast.error("Please enter a valid loan amount.");
			return;
		}

		if (loanTerm <= 0) {
			toast.error("Please enter a valid loan term.");
			return;
		}

		try {
			const customerId = user.customerId; // Assuming customerId is part of the user info
			await dispatch(applyForLoan({ loanData: formData, customerId }));
			toast.success("Loan application submitted successfully!");
			navigate("/report");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className='container mx-auto'>
			<h1 className='text-2xl font-semibold text-center mb-6'>
				Apply for a Loan
			</h1>
			<form onSubmit={handleSubmit}>
				{/* Form Fields */}
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
					type='text'
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
				<SelectField
					id='loanTerm'
					label='Loan Term (Years)'
					value={formData.loanTerm}
					onChange={handleChange}
					options={[1, 2, 3, 4, 5]}
				/>
				<SelectField
					id='repaymentFrequency'
					label='Repayment Frequency'
					value={formData.repaymentFrequency}
					onChange={handleChange}
					options={["Monthly", "Quarterly", "Annually"]}
				/>
				<InputField
					id='purpose'
					label='Purpose of Loan'
					type='text'
					value={formData.purpose}
					onChange={handleChange}
					placeholder='Enter loan purpose'
				/>

				{/* Display Calculated Information */}
				<div className='mt-6'>
					{totalAmount && (
						<div>
							<h2>Total Loan Repayment</h2>
							<p>Total Loan Amount: ${totalAmount}</p>
							<p>Monthly Payment: ${monthlyPayment}</p>
							<p>Interest Rate: {interestRate}%</p>
						</div>
					)}
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					className='mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg'
					disabled={loading}
				>
					{loading ? <LoanSpinner /> : "Submit Loan Application"}
				</button>
			</form>
		</div>
	);
};

export default LoanApplicationForm;
