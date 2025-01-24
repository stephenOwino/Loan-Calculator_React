// src/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();

	const handleGetStarted = () => {
		navigate("/register");
	};

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
			<h1 className='text-4xl font-bold text-blue-600 mb-4'>
				Welcome to the Loan Calculator
			</h1>
			<p className='text-lg text-gray-700 mb-6'>
				Get personalized loan estimates with ease. Start your journey today!
			</p>
			<button
				onClick={handleGetStarted}
				className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'
			>
				Get Started
			</button>
		</div>
	);
};

export default HomePage;
