import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContrastToggle from "../Pages/ContrastToggle";
import WhatsAppHelp from "../Pages/WhatsAppHelp";

const LoanCalculatorLandingPage = () => {
	const [formData, setFormData] = useState({
		amount: "",
		loanTerm: "",
		interestRate: "",
	});

	const [monthlyPayment, setMonthlyPayment] = useState(null);
	const [totalInterest, setTotalInterest] = useState(null);
	const [totalRepayment, setTotalRepayment] = useState(null);
	const [contrast, setContrast] = useState("normal");

	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const calculateLoan = () => {
		const { amount, loanTerm, interestRate } = formData;
		if (amount && loanTerm && interestRate) {
			const principal = parseFloat(amount);
			const rate = parseFloat(interestRate) / 100 / 12;
			const term = parseInt(loanTerm) * 12;

			const monthlyPayment =
				(principal * rate) / (1 - Math.pow(1 + rate, -term));
			const totalAmount = monthlyPayment * term;
			const totalInterest = totalAmount - principal;

			setMonthlyPayment(monthlyPayment.toFixed(2));
			setTotalInterest(totalInterest.toFixed(2));
			setTotalRepayment(totalAmount.toFixed(2));
		}
	};

	const handleContrastChange = () => {
		if (contrast === "normal") {
			setContrast("white");
		} else if (contrast === "white") {
			setContrast("black");
		} else {
			setContrast("normal");
		}
	};

	return (
		<div
			className={`flex items-center justify-center min-h-screen ${
				contrast === "white"
					? "bg-white"
					: contrast === "black"
					? "bg-black text-white"
					: "bg-gray-100"
			}`}
		>
			<ContrastToggle
				contrast={contrast}
				handleContrastChange={handleContrastChange}
			/>
			<WhatsAppHelp />
			<div
				className={`w-full max-w-lg p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 max-h-screen overflow-y-auto ${
					contrast === "black" ? "bg-gray-800 text-white" : "bg-white"
				}`}
			>
				<h1 className='text-4xl font-bold text-center mb-6 animate-bounce'>
					Welcome to Loan Calculator
				</h1>
				<p className='text-center mb-6'>
					Calculate your monthly loan payments easily and quickly.
				</p>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						calculateLoan();
					}}
					className='space-y-6'
				>
					<div className='mb-4'>
						<label htmlFor='amount' className='block text-sm font-medium'>
							Loan Amount
						</label>
						<input
							type='number'
							id='amount'
							name='amount'
							value={formData.amount}
							onChange={handleChange}
							placeholder='Enter loan amount'
							className={`mt-2 p-4 w-full border rounded-lg focus:ring-2 ${
								contrast === "black"
									? "bg-gray-700 border-gray-600 text-white focus:ring-gray-500"
									: "border-gray-300 focus:ring-blue-600"
							}`}
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='loanTerm' className='block text-sm font-medium'>
							Loan Term (Years)
						</label>
						<input
							type='number'
							id='loanTerm'
							name='loanTerm'
							value={formData.loanTerm}
							onChange={handleChange}
							placeholder='Enter loan term in years'
							className={`mt-2 p-4 w-full border rounded-lg focus:ring-2 ${
								contrast === "black"
									? "bg-gray-700 border-gray-600 text-white focus:ring-gray-500"
									: "border-gray-300 focus:ring-blue-600"
							}`}
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='interestRate' className='block text-sm font-medium'>
							Interest Rate (%)
						</label>
						<input
							type='number'
							id='interestRate'
							name='interestRate'
							value={formData.interestRate}
							onChange={handleChange}
							placeholder='Enter interest rate'
							className={`mt-2 p-4 w-full border rounded-lg focus:ring-2 ${
								contrast === "black"
									? "bg-gray-700 border-gray-600 text-white focus:ring-gray-500"
									: "border-gray-300 focus:ring-blue-600"
							}`}
						/>
					</div>
					<button
						type='submit'
						className='w-full py-3 mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-105'
					>
						Calculate
					</button>
				</form>
				{monthlyPayment && (
					<div className='mt-6 p-4 bg-green-100 text-green-700 rounded-lg'>
						<p className='text-lg font-semibold'>
							Your Monthly Payment: KES {monthlyPayment}
						</p>
						<p>Amount: KES {formData.amount}</p>
						<p>Total Interest: KES {totalInterest}</p>
						<p>Total Repayment: KES {totalRepayment}</p>
					</div>
				)}
				<button
					onClick={() => navigate("/loan")}
					className='w-full py-3 mt-4 text-white bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 transform transition-all duration-300 hover:scale-105'
				>
					Proceed to Apply for a Loan
				</button>
			</div>
		</div>
	);
};

export default LoanCalculatorLandingPage;
