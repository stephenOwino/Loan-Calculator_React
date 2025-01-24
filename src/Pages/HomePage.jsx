// src/HomePage.js
import React from "react";

const HomePage = () => {
	return (
		<div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
			<h1 className='text-4xl font-bold text-blue-600 mb-4'>
				Welcome to Our Website
			</h1>
			<p className='text-lg text-gray-700 mb-6'>
				Your journey to excellence starts here.
			</p>
			<button className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'>
				Get Started
			</button>
		</div>
	);
};

export default HomePage;
