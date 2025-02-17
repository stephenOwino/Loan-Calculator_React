import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../slices/authSlice";
import { toast } from "react-toastify";
import SignupForm from "../Components/SignupForm";
import { FaUser } from "react-icons/fa";
import LoadingSpinner from "../spinner/LoadingSpinner";

const SignupPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Retrieve stored form data from localStorage or initialize as empty fields
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

	// Redux state to manage registration state
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const toastErrorId = "toast-error-id";
	const toastSuccessId = "toast-success-id";

	// Effect to handle success or error messages from the redux state
	useEffect(() => {
		if (isError && message && !toast.isActive(toastErrorId)) {
			toast.error(message || "An error occurred, please try again.", {
				toastId: toastErrorId,
			});
		}

		if (isSuccess && !toast.isActive(toastSuccessId)) {
			toast.success("Registration successful!", { toastId: toastSuccessId });

			// Clear form data and remove it from localStorage
			setFormData({
				firstName: "",
				lastName: "",
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
			localStorage.removeItem("formData");

			// Set redirect flag to true to show redirect spinner
			setRedirecting(true);

			// Redirect after 2 seconds
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		}

		// Reset the auth state on page load
		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	// Handle form field change
	const onChange = (e) => {
		const updatedFormData = {
			...formData,
			[e.target.name]: e.target.value,
		};
		setFormData(updatedFormData);
		localStorage.setItem("formData", JSON.stringify(updatedFormData));
	};

	// Handle form submission
	const onSubmit = (e) => {
		e.preventDefault();

		// Basic validation for required fields
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

		// Password match validation
		if (password !== confirmPassword) {
			if (!toast.isActive(toastErrorId)) {
				toast.error("Passwords do not match!", { toastId: toastErrorId });
			}
			return;
		}

		// Dispatch registration action
		const userData = { firstName, lastName, username, email, password };
		dispatch(register(userData));
	};

	// If loading or redirecting, show spinner
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

	// Normal Signup Page View
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
					onSubmit={onSubmit}
					isLoading={isLoading}
				/>
			</section>
		</div>
	);
};

export default SignupPage;
