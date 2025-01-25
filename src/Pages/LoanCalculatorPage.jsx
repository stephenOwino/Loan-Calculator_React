import React, { useState, useEffect } from "react";
// import { NumberFormat } from "react-number-format";

function LoanCalculator() {
	const [loanType, setLoanType] = useState("");
	const [amount, setAmount] = useState("");
	const [interestRate, setInterestRate] = useState("");
	const [monthsToPay, setMonthsToPay] = useState("");
	const [monthlyPayment, setMonthlyPayment] = useState("");
	const [showForm, setShowForm] = useState(false); // State to control form visibility
	const [errorMessage, setErrorMessage] = useState("");

	const calculatePayment = () => {
		setErrorMessage(""); // Clear any previous error messages

		// Basic calculation logic (you might want to use a more accurate formula)
		const parsedAmount = parseFloat(amount.replace(/,/g, "")); // Remove commas before parsing
		if (isNaN(parsedAmount)) {
			setErrorMessage("Please enter a valid amount.");
			return;
		}

		const monthlyInterestRate = interestRate / 100 / 12;
		const numerator =
			parsedAmount *
			monthlyInterestRate *
			Math.pow(1 + monthlyInterestRate, monthsToPay);
		const denominator = Math.pow(1 + monthlyInterestRate, monthsToPay) - 1;
		const calculatedPayment = numerator / denominator;
		setMonthlyPayment(calculatedPayment.toFixed(2));
	};

	const handleWhatsAppClick = () => {
		const phoneNumber = "+254114825652";
		const message = encodeURIComponent(
			"Hello, I have a question about a loan."
		); // Customize your message
		window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
	};

	const handleClearForm = () => {
		setLoanType("");
		setAmount("");
		setInterestRate("");
		setMonthsToPay("");
		setMonthlyPayment("");
		setErrorMessage("");
	};

	useEffect(() => {
		// Simulate a smooth animation on form display (replace with a library like React Spring for better animation)
		if (loanType) {
			setShowForm(true);
		} else {
			setShowForm(false);
		}
	}, [loanType]);

	const interestRateOptions = [
		{ value: "", label: "Select Interest Rate" },
		{ value: 5, label: "5%" },
		{ value: 10, label: "10%" },
		{ value: 15, label: "15%" },
	];

	const monthsToPayOptions = [
		{ value: "", label: "Select Months" },
		{ value: 2, label: "2 Months" },
		{ value: 3, label: "3 Months" },
		{ value: 6, label: "6 Months" },
		{ value: 12, label: "12 Months" },
	];

	return (
		<div className='min-h-screen flex flex-col items-center justify-center mt-24'>
			<div className='w-full md:w-3/4 px-5'>
				{" "}
				{/* Added padding for image */}
				<img
					src='https://cdn6.aptoide.com/imgs/d/c/d/dcd69f87e06d1f801607d2f099e9cfb5_fgraphic.png'
					alt='Loan calculator'
					className='w-full mb-4 animate__animated animate__fadeIn' // Added animation class
				/>
				<div className='bg-white p-6 rounded shadow-md text-center'>
					<h1 className='text-2xl font-bold mb-4'>Loan Calculator</h1>
					<select
						value={loanType}
						onChange={(e) => setLoanType(e.target.value)}
						className='w-full mb-4 border rounded-md px-2 py-1'
					>
						<option value=''>Select Loan Type</option>
						<option value='personal'>Personal Loan</option>
						<option value='mortgage'>Mortgage Loan</option>
						<option value='car'>Car Loan</option>
						<option value='home'>Home Loan</option>
						<option value='business'>Business Loan</option>
					</select>
					{showForm && ( // Conditionally render the form based on loanType selection
						<div className='flex flex-col space-y-4'>
							<div className='flex flex-col'>
								<label
									htmlFor='amount'
									className='block text-sm font-medium text-gray-700'
								>
									Amount in KES
								</label>
								<NumberFormat
									thousandSeparator={true}
									prefix={"KES "}
									value={amount}
									onValueChange={(values) => {
										const { formattedValue, value } = values;
										setAmount(value);
									}}
									className='mt-1 p-2 w-full border rounded-md'
								/>
							</div>

							<div className='flex flex-col'>
								<label
									htmlFor='interestRate'
									className='block text-sm font-medium text-gray-700'
								>
									Interest Rate (%)
								</label>
								<select
									value={interestRate}
									onChange={(e) => setInterestRate(e.target.value)}
									className='mt-1 p-2 w-full border rounded-md'
								>
									{interestRateOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>

							<div className='flex flex-col'>
								<label
									htmlFor='monthsToPay'
									className='block text-sm font-medium text-gray-700'
								>
									Months to Pay
								</label>
								<select
									value={monthsToPay}
									onChange={(e) => setMonthsToPay(e.target.value)}
									className='mt-1 p-2 w-full border rounded-md'
								>
									{monthsToPayOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
									))}
								</select>
							</div>

							<div className='flex flex-col'>
								<label
									htmlFor='monthlyPayment'
									className='block text-sm font-medium text-gray-700'
								>
									Your Monthly Payment:
								</label>
								<NumberFormat
									thousandSeparator={true}
									prefix={"KES "}
									value={monthlyPayment}
									displayType='text'
									readOnly
									className='mt-1 p-2 w-full border rounded-md'
								/>
							</div>

							<button
								className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full'
								onClick={calculatePayment}
							>
								Calculate
							</button>
						</div>
					)}

					{errorMessage && (
						<div className='text-red-500 mt-2'>{errorMessage}</div>
					)}
				</div>
			</div>

			<p className='text-xs mt-2 text-center'>
				*The rates above are indicative, visit a branch near you for more
				details.
			</p>

			<div className='flex justify-between items-center mt-4'>
				<button className='text-blue-500 hover:underline'>
					Terms and Conditions
				</button>
				<button
					className='text-blue-500 hover:underline'
					onClick={handleWhatsAppClick}
				>
					How can I help you?
				</button>
				<button
					className='text-gray-500 hover:underline'
					onClick={handleClearForm}
				>
					Clear
				</button>
			</div>
		</div>
	);
}

export default LoanCalculator;
