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
	const [isModalOpen, setIsModalOpen] = useState(false);
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
			setIsModalOpen(true);
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

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div
			className={`relative flex items-center justify-center min-h-screen ${
				contrast === "white"
					? "bg-white"
					: contrast === "black"
					? "bg-black text-white"
					: "bg-gradient-to-r from-gray-100 via-blue-100 to-gray-100"
			}`}
		>
			<ContrastToggle
				contrast={contrast}
				handleContrastChange={handleContrastChange}
			/>
			<WhatsAppHelp />
			<div
				className={`relative z-10 w-full max-w-lg p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 max-h-screen overflow-y-auto ${
					contrast === "black" ? "bg-gray-800 text-white" : "bg-white"
				}`}
			>
				<h1 className='text-4xl font-bold text-center mb-6 animate-bounce'>
					Loan Calculator
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
				<button
					onClick={() => navigate("/login")}
					className='w-full py-3 mt-4 text-white bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 transform transition-all duration-300 hover:scale-105'
				>
					Proceed to Apply for a Loan
				</button>
			</div>

			{/* Background Images */}
			<div className='absolute top-0 left-0 w-full h-full overflow-hidden z-0'>
				<img
					src='https://www.financialmentor.com/wp-content/uploads/personal-loan-calculator-1024x683.jpg'
					alt='Loan Calculator Background'
					className='w-full h-full object-cover opacity-20'
				/>
			</div>
			<div className='absolute bottom-0 right-0 w-1/3 h-1/3 overflow-hidden z-0'>
				<img
					src='https://cdn6.aptoide.com/imgs/d/c/d/dcd69f87e06d1f801607d2f099e9cfb5_fgraphic.png'
					alt='Loan Graphic'
					className='w-full h-full object-cover opacity-70'
				/>
			</div>

			{/* Calculation Modal */}
			{isModalOpen && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
					<div
						className={`bg-white p-8 rounded-xl shadow-lg max-w-sm w-full ${
							contrast === "black" ? "bg-gray-800 text-white" : "bg-white"
						} transition transform ease-in-out duration-300`}
						style={{ animation: "fade-in 0.3s" }}
					>
						<h2 className='text-2xl font-bold mb-4'>Calculation Result</h2>
						<p className='text-lg'>
							<strong>Monthly Payment:</strong> KES {monthlyPayment}
						</p>
						<p>
							<strong>Amount:</strong> KES {formData.amount}
						</p>
						<p>
							<strong>Total Interest:</strong> KES {totalInterest}
						</p>
						<p>
							<strong>Total Repayment:</strong> KES {totalRepayment}
						</p>
						<button
							onClick={closeModal}
							className='mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default LoanCalculatorLandingPage;
