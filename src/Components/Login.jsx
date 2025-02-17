// LoginForm.js
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../slices/authSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { customer, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const { username, password } = formData;

	useEffect(() => {
		if (isError && message) {
			toast.error(
				message.includes("not found") ? `${message}. Please register.` : message
			);
			dispatch(reset());
		}

		if (isSuccess || customer) {
			toast.success("Login successful!");
			navigate("/"); // Redirect to homepage or dashboard
		}
	}, [customer, isError, isSuccess, message, navigate, dispatch]);

	const onSubmit = (e) => {
		e.preventDefault();
		if (!username || !password) {
			toast.error("Please fill in all fields.");
			return;
		}
		dispatch(login({ username, password }));
	};

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<form onSubmit={onSubmit} className='space-y-6'>
			{/* Username Field */}
			<div>
				<input
					type='text'
					name='username'
					id='username'
					value={username}
					onChange={onChange}
					className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
					placeholder='Username'
					required
				/>
			</div>

			{/* Password Field */}
			<div className='relative'>
				<input
					type={showPassword ? "text" : "password"}
					name='password'
					id='password'
					value={password}
					onChange={onChange}
					className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
					placeholder='Password'
					required
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

			{/* Submit Button */}
			<div>
				<button
					type='submit'
					className='w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition'
				>
					Login
				</button>
			</div>

			{/* Register Link */}
			<div className='flex justify-end mt-6'>
				<p className='text-sm text-gray-600'>
					Don't have an account?{" "}
					<Link to='/register' className='text-blue-600 hover:underline'>
						Register
					</Link>
				</p>
			</div>
		</form>
	);
};

export default LoginForm;
