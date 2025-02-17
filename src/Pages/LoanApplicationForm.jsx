import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetLoan, applyForLoan } from "../slices/LoanSlice";
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
			id={id}
			name={id}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className='mt-2 p-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600'
		/>
	</div>
);

const LoanApplicationForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { customer } = useSelector((state) => state.auth);
	const { loading, error } = useSelector((state) => state.loan);

	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		amount: "",
		loanTerm: "",
		repaymentFrequency: "",
		purpose: "",
		location: "", // Added location field
	});

	useEffect(() => {
		if (!customer) {
			// If there's no customer, navigate to the login page
			navigate("/login");
		}
		return () => dispatch(resetLoan()); // Reset loan state when component unmounts
	}, [customer, dispatch, navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

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

		// Additional validation can be added for email or phone number if needed
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if (!emailPattern.test(formData.email)) {
			toast.error("Please enter a valid email address.");
			return false;
		}

		const phonePattern = /^[0-9]{10}$/; // Assuming phone number should be 10 digits
		if (!phonePattern.test(formData.phoneNumber)) {
			toast.error("Please enter a valid phone number.");
			return false;
		}

		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		const token = localStorage.getItem("token");
		if (!token) {
			toast.error("You need to be logged in to apply for a loan.");
			navigate("/login");
			return;
		}

		try {
			// Apply for loan by dispatching the action with formData
			await dispatch(applyForLoan(formData));
			toast.success("Loan application submitted!");
		} catch (err) {
			toast.error(err.message || "An error occurred.");
		}
	};

	return (
		<div className='container mx-auto p-4 sm:p-6 lg:p-8'>
			<h1 className='text-3xl font-semibold text-center mb-6'>
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
				<InputField
					id='location'
					label='Location'
					type='text'
					value={formData.location}
					onChange={handleChange}
					placeholder='Enter your location'
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
