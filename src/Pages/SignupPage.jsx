import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../slices/authSlice";
import { toast } from "react-toastify";
import SignupForm from "../Components/SignupForm";
import { FaUser } from "react-icons/fa";
import LoadingSpinner from "../spinner/LoadingSpinner";

const SignupPage = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { firstName, lastName, username, email, password, confirmPassword } =
		formData;

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	// Toast IDs to prevent duplicate messages
	const toastErrorId = "toastError";
	const toastSuccessId = "toastSuccess";

	useEffect(() => {
		if (isError && !toast.isActive(toastErrorId)) {
			toast.error(message, { toastId: toastErrorId });
		}
		if (isSuccess && !toast.isActive(toastSuccessId)) {
			toast.success("Registration successful!", { toastId: toastSuccessId });
			navigate("/");
		}
		// Reset the auth state to avoid triggering this logic repeatedly
		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			// Prevent multiple password mismatch toasts
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
