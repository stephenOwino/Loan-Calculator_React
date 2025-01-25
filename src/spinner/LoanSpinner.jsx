import React from "react";

const LoanSpinner = ({ message }) => (
	<div className='flex flex-col items-center justify-center'>
		<div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4'></div>
		<h2 className='text-center text-gray-700 text-xl font-semibold'>
			{message}
		</h2>
	</div>
);

export default LoanSpinner;
