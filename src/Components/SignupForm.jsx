import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = ({ formData, onChange, onSubmit, isLoading, error }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
	const navigate = useNavigate();

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	// Toggle confirm password visibility
	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	// Check if passwords match (for confirm password validation)
	useEffect(() => {
		if (formData.password !== formData.confirmPassword) {
			setIsConfirmPasswordValid(false);
		} else {
			setIsConfirmPasswordValid(true);
		}
	}, [formData.password, formData.confirmPassword]);

	// Check if password is strong enough
	useEffect(() => {
		const isValid = formData.password.length >= 6;
		setIsPasswordValid(isValid);
	}, [formData.password]);

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault(); // Prevent default form submission

		// Perform form validation and submission
		if (isPasswordValid && isConfirmPasswordValid) {
			onSubmit(); // Proceed with form submission
		}
	};

	return (
		<form onSubmit={handleSubmit} className='w-full space-y-6'>
			{/* First Name */}
			<div className='flex flex-col w-full'>
				<label htmlFor='firstName' className='text-left mb-2 font-medium'>
					First Name
				</label>
				<input
					type='text'
					name='firstName'
					id='firstName'
					placeholder='Enter your first name'
					value={formData.firstName}
					onChange={onChange}
					className='border rounded-md p-3 w-full focus:border-blue-500 focus:ring-blue-500'
				/>
			</div>

			{/* Last Name */}
			<div className='flex flex-col w-full'>
				<label htmlFor='lastName' className='text-left mb-2 font-medium'>
					Last Name
				</label>
				<input
					type='text'
					name='lastName'
					id='lastName'
					placeholder='Enter your last name'
					value={formData.lastName}
					onChange={onChange}
					className='border rounded-md p-3 w-full focus:border-blue-500 focus:ring-blue-500'
				/>
			</div>

			{/* Username */}
			<div className='flex flex-col w-full'>
				<label htmlFor='username' className='text-left mb-2 font-medium'>
					Username
				</label>
				<input
					type='text'
					name='username'
					id='username'
					placeholder='Enter a username'
					value={formData.username}
					onChange={onChange}
					className='border rounded-md p-3 w-full focus:border-blue-500 focus:ring-blue-500'
				/>
			</div>

			{/* Email */}
			<div className='flex flex-col w-full'>
				<label htmlFor='email' className='text-left mb-2 font-medium'>
					Email Address
				</label>
				<input
					type='email'
					name='email'
					id='email'
					placeholder='Enter your email address'
					value={formData.email}
					onChange={onChange}
					className='border rounded-md p-3 w-full focus:border-blue-500 focus:ring-blue-500'
				/>
			</div>

			{/* Password */}
			<div className='flex flex-col w-full'>
				<label htmlFor='password' className='text-left mb-2 font-medium'>
					Password
				</label>
				<div className='relative'>
					<input
						type={showPassword ? "text" : "password"}
						name='password'
						id='password'
						placeholder='Enter your password'
						value={formData.password}
						onChange={onChange}
						className={`border rounded-md p-3 w-full focus:border-blue-500 focus:ring-blue-500 ${
							!isPasswordValid ? "border-red-500" : ""
						}`}
					/>
					<div
						className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
						onClick={togglePasswordVisibility}
					>
						{showPassword ? (
							<FaEyeSlash className='text-gray-500 hover:text-blue-500' />
						) : (
							<FaEye className='text-gray-500 hover:text-blue-500' />
						)}
					</div>
				</div>
				{!isPasswordValid && (
					<p className='text-red-500 text-sm'>
						Password must be at least 6 characters long.
					</p>
				)}
			</div>

			{/* Confirm Password */}
			<div className='flex flex-col w-full'>
				<label htmlFor='confirmPassword' className='text-left mb-2 font-medium'>
					Confirm Password
				</label>
				<div className='relative'>
					<input
						type={showConfirmPassword ? "text" : "password"}
						name='confirmPassword'
						id='confirmPassword'
						placeholder='Confirm your password'
						value={formData.confirmPassword}
						onChange={onChange}
						className={`border rounded-md p-3 w-full focus:border-blue-500 focus:ring-blue-500 ${
							!isConfirmPasswordValid ? "border-red-500" : ""
						}`}
					/>
					<div
						className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
						onClick={toggleConfirmPasswordVisibility}
					>
						{showConfirmPassword ? (
							<FaEyeSlash className='text-gray-500 hover:text-blue-500' />
						) : (
							<FaEye className='text-gray-500 hover:text-blue-500' />
						)}
					</div>
				</div>
				{!isConfirmPasswordValid && (
					<p className='text-red-500 text-sm'>Passwords do not match.</p>
				)}
			</div>

			{/* Submit Button */}
			<div className='w-full'>
				<button
					type='submit'
					className={`bg-blue-600 text-white w-full py-3 rounded-md hover:bg-blue-700 ${
						isLoading ? "cursor-not-allowed opacity-50" : ""
					}`}
					disabled={isLoading || !isPasswordValid || !isConfirmPasswordValid}
				>
					{isLoading ? "Loading..." : "Sign Up"}
				</button>
			</div>

			{/* Error message */}
			{error && <div className='text-red-500 mt-4 text-center'>{error}</div>}

			{/* Login Link */}
			<div className='flex justify-end mt-6'>
				<p className='text-sm text-gray-600'>
					Already have an account?{" "}
					<Link to='/login' className='text-blue-600 hover:underline'>
						Login
					</Link>
				</p>
			</div>
		</form>
	);
};

export default SignupForm;
