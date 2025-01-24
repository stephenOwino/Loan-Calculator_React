import React from "react";

const LoadingSpinner = () => {
	return (
		<div className='flex items-start justify-center h-full mt-24'>
			<div className='flex items-center'>
				<div className='w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin'></div>
				<span className='ml-4 text-lg text-blue-500'>Please wait...</span>
			</div>
		</div>
	);
};

export default LoadingSpinner;
