import React from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportPage = () => {
	const appliedLoan = useSelector((state) => state.loan.appliedLoan);

	const generatePDF = () => {
		const doc = new jsPDF();
		doc.text("Loan Application Report", 20, 10);

		const loanDetails = [
			["Field", "Value"],
			["Full Name", appliedLoan.fullName],
			["Email", appliedLoan.email],
			["Phone Number", appliedLoan.phoneNumber],
			["Amount", appliedLoan.amount],
			["Total Interest", appliedLoan.totalInterest],
			["Total Repayment", appliedLoan.totalRepayment],
			["Repayment Frequency", appliedLoan.repaymentFrequency],
			["Loan Term", appliedLoan.loanTerm],
			["Purpose", appliedLoan.purpose],
			["Created At", appliedLoan.createdAt],
			["Start Date", appliedLoan.startDate],
			["End Date", appliedLoan.endDate],
			["Due Date", appliedLoan.dueDate],
		];

		doc.autoTable({
			head: loanDetails.slice(0, 1),
			body: loanDetails.slice(1),
		});

		doc.save("loan-application-report.pdf");
	};

	return (
		<div className='container mx-auto mt-10'>
			<h1 className='text-3xl font-semibold text-center mb-6'>
				Loan Application Report
			</h1>
			{appliedLoan ? (
				<div className='bg-white p-6 rounded-lg shadow-lg'>
					<h2 className='text-2xl font-semibold mb-4'>Loan Details</h2>
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<strong>Full Name:</strong> {appliedLoan.fullName}
						</div>
						<div>
							<strong>Email:</strong> {appliedLoan.email}
						</div>
						<div>
							<strong>Phone Number:</strong> {appliedLoan.phoneNumber}
						</div>
						<div>
							<strong>Amount:</strong> {appliedLoan.amount}
						</div>
						<div>
							<strong>Total Interest:</strong> {appliedLoan.totalInterest}
						</div>
						<div>
							<strong>Total Repayment:</strong> {appliedLoan.totalRepayment}
						</div>
						<div>
							<strong>Repayment Frequency:</strong>{" "}
							{appliedLoan.repaymentFrequency}
						</div>
						<div>
							<strong>Loan Term:</strong> {appliedLoan.loanTerm}
						</div>
						<div>
							<strong>Purpose:</strong> {appliedLoan.purpose}
						</div>
						<div>
							<strong>Created At:</strong> {appliedLoan.createdAt}
						</div>
						<div>
							<strong>Start Date:</strong> {appliedLoan.startDate}
						</div>
						<div>
							<strong>End Date:</strong> {appliedLoan.endDate}
						</div>
						<div>
							<strong>Due Date:</strong> {appliedLoan.dueDate}
						</div>
					</div>
					<button
						onClick={generatePDF}
						className='mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
					>
						Download PDF
					</button>
				</div>
			) : (
				<p className='text-center text-red-500'>
					No loan application details available.
				</p>
			)}
		</div>
	);
};

export default ReportPage;
