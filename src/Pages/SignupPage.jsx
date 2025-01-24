import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../slices/authSlice";
import { toast } from "react-toastify";
import SignupForm from "../Components/SignupForm";

const SignupPage = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { firstName, lastName, email, password, confirmPassword, role, bio } =
		formData;

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess || user) {
			toast.success("Registration successful!");
			navigate("/");
		}
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
			toast.error("Passwords do not match!");
		} else {
			const userData = { firstName, lastName, email, password, role, bio };
			dispatch(register(userData));
		}
	};

	return (
		<div className='flex items-center justify-center mt-10 px-4 sm:px-6 lg:px-8'>
			<section className='flex flex-col items-center space-y-4 text-center p-6 bg-white shadow-xl rounded-2xl w-full max-w-md sm:max-w-lg'>
				<h2 className='text-2xl font-bold'>Please create an account</h2>
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
