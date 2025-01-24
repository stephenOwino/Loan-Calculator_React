import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupForm = ({ formData, onChange, onSubmit, isLoading }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return (
		<form onSubmit={onSubmit} className='w-full space-y-4'>
			{/* First Name */}
			<div className='flex flex-col w-full'>
				<label htmlFor='first name' className='text-left mb-2'>
					First Name
				</label>
				<input
					type='text'
					name='firstName'
					placeholder='Enter your first name...'
					value={formData.firstName}
					onChange={onChange}
					className='border rounded-md p-2 w-full'
				/>
			</div>

			{/* Last Name */}
			<div className='flex flex-col w-full'>
				<label htmlFor='last name' className='text-left mb-2'>
					Last Name
				</label>
				<input
					type='text'
					name='lastName'
					placeholder='Enter your last name...'
					value={formData.lastName}
					onChange={onChange}
					className='border rounded-md p-2 w-full'
				/>
			</div>

			<div className='flex flex-col w-full'>
				<label htmlFor='username' className='text-left mb-2'>
					Username
				</label>
				<input
					type='text'
					name='username'
					placeholder='Enter a username...'
					value={formData.username}
					onChange={onChange}
					className='border rounded-md p-2 w-full'
				/>
			</div>
			{/* Email */}
			<div className='flex flex-col w-full'>
				<label htmlFor='email' className='text-left mb-2'>
					Email address
				</label>
				<input
					type='email'
					name='email'
					placeholder='Enter your email address...'
					value={formData.email}
					onChange={onChange}
					className='border rounded-md p-2 w-full'
				/>
			</div>

			{/* Password */}
			<div className='flex flex-col w-full'>
				<label htmlFor='password' className='text-left mb-2'>
					Password
				</label>
				<div className='relative'>
					<input
						type={showPassword ? "text" : "password"}
						name='password'
						placeholder='Enter your password...'
						value={formData.password}
						onChange={onChange}
						className='border rounded-md p-2 w-full'
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
			</div>
			{/* Confirm Password */}
			<div className='flex flex-col w-full'>
				<label htmlFor='confirmPassword' className='text-left mb-2'>
					Confirm Password
				</label>
				<div className='relative'>
					<input
						type={showConfirmPassword ? "text" : "password"}
						name='confirmPassword'
						id='confirmPassword' // Adding the id to the input for better accessibility
						placeholder='Enter your password again...'
						value={formData.confirmPassword}
						onChange={onChange}
						className='border rounded-md p-2 w-full'
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
			</div>

			{/* Submit Button */}
			<div className='w-full'>
				<button
					type='submit'
					className='bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700'
				>
					{isLoading ? "Loading..." : "Submit"}
				</button>
			</div>
		</form>
	);
};

export default SignupForm;
