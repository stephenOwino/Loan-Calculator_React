import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanStatement } from "../slices/LoanSlice";
import LoadingSpinner from "../spinner/LoadingSpinner";

const ReportPage = () => {
	const dispatch = useDispatch();
	const { loanStatement, loading, error } = useSelector((state) => state.loan);

	useEffect(() => {
		dispatch(fetchLoanStatement());
	}, [dispatch]);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <div className='text-red-500'>{error}</div>;
	}

	return (
		<div className='container mx-auto mt-40'>
			<h1 className='text-2xl font-semibold text-center mb-6'>
				Loan Statement
			</h1>
			<pre className='bg-gray-100 p-6 rounded-lg shadow-lg'>
				{loanStatement}
			</pre>
		</div>
	);
};

export default ReportPage;
