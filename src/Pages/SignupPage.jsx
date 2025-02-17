import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../slices/authSlice";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import SignupForm from "../Components/SignupForm";

const SignupPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Load stored form data from localStorage or set initial values
	const storedFormData = JSON.parse(localStorage.getItem("formData")) || {
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const [formData, setFormData] = useState(storedFormData);
	const [redirecting, setRedirecting] = useState(false);

	const { firstName, lastName, username, email, password, confirmPassword } =
		formData;

	// Getting the state from the Redux store
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	// Toast configuration
	const toastErrorId = "toast-error-id";
	const toastSuccessId = "toast-success-id";

	useEffect(() => {
		if (isError && message && !toast.isActive(toastErrorId)) {
			toast.error(message || "An error occurred, please try again.", {
				toastId: toastErrorId,
			});
		}

		if (isSuccess && !toast.isActive(toastSuccessId)) {
			toast.success("Registration successful!", { toastId: toastSuccessId });
			setFormData({
				firstName: "",
				lastName: "",
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
			localStorage.removeItem("formData");

			setRedirecting(true);
			setTimeout(() => {
				navigate("/login"); // Redirect to login page after registration
			}, 2000);
		}

		dispatch(reset()); // Reset auth state after action is complete
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	// Handle form data changes
	const onChange = (e) => {
		const updatedFormData = {
			...formData,
			[e.target.name]: e.target.value,
		};
		setFormData(updatedFormData);
		localStorage.setItem("formData", JSON.stringify(updatedFormData)); // Store updated form data in localStorage
	};

	// Handle form submission
	const onSubmit = (e) => {
		e.preventDefault();

		// Check if all fields are filled
		if (
			!firstName ||
			!lastName ||
			!username ||
			!email ||
			!password ||
			!confirmPassword
		) {
			if (!toast.isActive(toastErrorId)) {
				toast.error("Please fill in all fields.", { toastId: toastErrorId });
			}
			return;
		}

		// Check if passwords match
		if (password !== confirmPassword) {
			if (!toast.isActive(toastErrorId)) {
				toast.error("Passwords do not match!", { toastId: toastErrorId });
			}
			return;
		}

		// Dispatch register action to Redux store
		const userData = { firstName, lastName, username, email, password };
		dispatch(register(userData));
	};

	// Loading or redirecting state
	if (isLoading || redirecting) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<LoadingSpinner />
				{redirecting && (
					<p className='text-center text-lg font-semibold mt-4'>
						Now you can log in...
					</p>
				)}
			</div>
		);
	}

	return (
		<div className='flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-40'>
			<section className='flex flex-col items-center space-y-4 text-center p-6 bg-white shadow-xl rounded-2xl w-full max-w-md sm:max-w-lg'>
				<div className='flex items-center space-x-2'>
					<FaUser className='text-2xl text-blue-500' />
					<span className='text-lg font-semibold'>Register</span>
				</div>
				<SignupForm
					formData={formData}
					onChange={onChange}
					onSubmit={onSubmit} // Pass the onSubmit handler to SignupForm
					isLoading={isLoading}
					error={message}
				/>
			</section>
		</div>
	);
};

export default SignupPage;
