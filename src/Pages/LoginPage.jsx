// LoginPage.js
import LoginForm from "../Components/Login";
import { FaUserAlt } from "react-icons/fa";

const LoginPage = () => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8'>
			<section className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md sm:max-w-lg'>
				{/* Header */}
				<div className='flex items-center justify-center space-x-2 mb-6'>
					<FaUserAlt className='text-blue-500 mr-2' />
					<h1 className='text-2xl font-semibold text-gray-700'>Login</h1>
				</div>

				<p className='text-center text-gray-600 text-sm mb-8'>Welcome back!</p>

				{/* Login Form Component */}
				<LoginForm />
			</section>
		</div>
	);
};

export default LoginPage;
