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

	// Retrieve form data from localStorage or set defaults
	const storedFormData = JSON.parse(localStorage.getItem("formData")) || {
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	const [formData, setFormData] = useState(storedFormData);

	const { firstName, lastName, username, email, password, confirmPassword } =
		formData;

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	// Define toast IDs to prevent duplicate toasts
	const toastErrorId = "toast-error-id";
	const toastSuccessId = "toast-success-id";

	useEffect(() => {
		if (isError && !toast.isActive(toastErrorId)) {
			toast.error(message, { toastId: toastErrorId });
		}
		if (isSuccess && !toast.isActive(toastSuccessId)) {
			toast.success("Registration successful!", { toastId: toastSuccessId });
			navigate("/");
		}
		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	// Update formData and save to localStorage
	const onChange = (e) => {
		const updatedFormData = {
			...formData,
			[e.target.name]: e.target.value,
		};
		setFormData(updatedFormData);
		localStorage.setItem("formData", JSON.stringify(updatedFormData)); // Save to localStorage
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			if (!toast.isActive(toastErrorId)) {
				toast.error("Passwords do not match!", { toastId: toastErrorId });
			}
		} else {
			const userData = { firstName, lastName, username, email, password };
			dispatch(register(userData));
		}
	};

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='flex items-center justify-center mt-10 px-4 sm:px-6 lg:px-8'>
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
