import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../slices/authSlice";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

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

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

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
				navigate("/login");
			}, 2000);
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		const updatedFormData = {
			...formData,
			[e.target.name]: e.target.value,
		};
		setFormData(updatedFormData);
		localStorage.setItem("formData", JSON.stringify(updatedFormData));
	};

	const onSubmit = (e) => {
		e.preventDefault();

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

		if (password !== confirmPassword) {
			if (!toast.isActive(toastErrorId)) {
				toast.error("Passwords do not match!", { toastId: toastErrorId });
			}
			return;
		}

		const userData = { firstName, lastName, username, email, password };
		dispatch(register(userData));
	};

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
					onSubmit={onSubmit} // Pass onSubmit as a function
					isLoading={isLoading}
				/>
			</section>
		</div>
	);
};

export default SignupPage;
