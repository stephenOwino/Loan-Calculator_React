import React from "react";

const LoadingSpinner = () => {
	return (
		<div className='flex items-center justify-center h-full'>
			<div className='w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin'></div>
		</div>
	);
};

export default LoadingSpinner;
