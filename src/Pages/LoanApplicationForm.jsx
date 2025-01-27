import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetLoan, updateLoanData, applyForLoan } from "../slices/LoanSlice";
import { toast } from "react-toastify";
import LoanSpinner from "../spinner/LoanSpinner";
import { useNavigate } from "react-router-dom";

// Reusable Input Field Component
const InputField = ({ id, label, type, value, onChange, placeholder }) => (
	<div className='mb-6'>
		<label htmlFor={id} className='block text-sm font-medium text-gray-700'>
			{label}
		</label>
		<input
			type={type}
			id={id}
			name={id}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className='mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600'
		/>
	</div>
);

// Main Component
const LoanApplicationForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth); // Auth State
	const { loading, error } = useSelector((state) => state.loan);

	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		amount: "",
		loanTerm: "",
		repaymentFrequency: "",
		purpose: "",
	});

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
		return () => dispatch(resetLoan());
	}, [user, dispatch, navigate]);

	// Form Input Changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Validation Helper
	const validateForm = () => {
		for (const key in formData) {
			if (!formData[key]) {
				toast.error("All fields are required.");
				return false;
			}
		}
		if (formData.amount <= 0 || formData.loanTerm <= 0) {
			toast.error("Amount and Loan Term must be positive.");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		try {
			await dispatch(applyForLoan(formData));
			toast.success("Loan application submitted!");
			navigate("/report");
		} catch (err) {
			toast.error(err.message || "An error occurred.");
		}
	};

	return (
		<div className='container mx-auto mt-40'>
			<h1 className='text-2xl font-semibold text-center mb-6'>
				Apply for a Loan
			</h1>
			<form
				onSubmit={handleSubmit}
				className='bg-white p-6 rounded-lg shadow-lg'
			>
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
					placeholder='Enter the loan amount'
				/>
				<InputField
					id='loanTerm'
					label='Loan Term (in months)'
					type='number'
					value={formData.loanTerm}
					onChange={handleChange}
					placeholder='Enter the loan term'
				/>
				<InputField
					id='repaymentFrequency'
					label='Repayment Frequency'
					type='text'
					value={formData.repaymentFrequency}
					onChange={handleChange}
					placeholder='e.g., Monthly'
				/>
				<InputField
					id='purpose'
					label='Purpose of Loan'
					type='text'
					value={formData.purpose}
					onChange={handleChange}
					placeholder='State the purpose of the loan'
				/>
				<button
					type='submit'
					disabled={loading}
					className='w-full p-4 text-white bg-purple-600 rounded-lg hover:bg-purple-700'
				>
					{loading ? <LoanSpinner /> : "Submit Application"}
				</button>
				{error && (
					<div className='mt-4 p-3 bg-red-100 text-red-700 rounded-lg'>
						{error}
					</div>
				)}
			</form>
		</div>
	);
};

export default LoanApplicationForm;
