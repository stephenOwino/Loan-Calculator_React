import React from "react";
import { FaAdjust } from "react-icons/fa";

const ContrastToggle = ({ contrast, handleContrastChange }) => {
	return (
		<div className='fixed top-1/2 left-4 transform -translate-y-1/2 z-50'>
			<button
				onClick={handleContrastChange}
				className='p-2 bg-gray-300 rounded-full shadow-lg hover:bg-gray-400'
			>
				<FaAdjust size={24} />
			</button>
		</div>
	);
};

export default ContrastToggle;
