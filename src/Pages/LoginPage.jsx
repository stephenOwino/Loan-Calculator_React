import { useState } from "react";
import LoginForm from "../Components/Login";

const LoginPage = () => {
	const [message, setMessage] = useState("");

	// Callback to handle meaningful login feedback
	const handleLoginFeedback = (success, username) => {
		if (success) {
			setMessage(`Welcome back, ${username}! Ready to calculate your loans?`);
		} else {
			setMessage("Login failed. Please check your credentials and try again.");
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8'>
			<section className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md sm:max-w-lg'>
				{/* Header */}
				<div className='flex items-center justify-center space-x-2 mb-6'>
					<h1 className='text-2xl font-semibold text-gray-700'>Login</h1>
				</div>

				<p className='text-center text-gray-600 text-sm mb-8'>Welcome back!</p>

				{/* Login Form Component */}
				<LoginForm onLoginFeedback={handleLoginFeedback} />

				{/* Feedback Message */}
				{message && (
					<div className='mt-6 p-4 text-center text-sm text-white bg-blue-500 rounded-md'>
						{message}
					</div>
				)}
			</section>
		</div>
	);
};

export default LoginPage;
