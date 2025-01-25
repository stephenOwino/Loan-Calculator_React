import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import {
	FaHome,
	FaCalculator,
	FaFileAlt,
	FaUserAlt,
	FaInfoCircle,
	FaQuestionCircle,
	FaPhone,
	FaSignInAlt,
	FaSignOutAlt,
	FaSearch,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { reset, logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoggingOut, setIsLoggingOut] = useState(false); // New state for loading
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const onLogout = () => {
		setIsLoggingOut(true);
		dispatch(logout());
		dispatch(reset());
		navigate("/");
		setIsLoggingOut(false);
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setSidebarOpen(false); // Close the sidebar when screen width is large enough
			}
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	return (
		<div>
			{/* Navbar */}
			<header className='w-full bg-blue-500 text-white flex flex-col lg:flex-row items-center justify-between px-6 py-4 lg:py-6 fixed top-0 left-0 right-0 z-50'>
				<h1 className='text-lg font-bold mb-4 lg:mb-0'>Loan Calculator</h1>

				{/* Search Bar */}
				<div className='relative flex items-center w-full lg:w-auto mt-4 lg:mt-0'>
					<input
						type='text'
						className='flex flex-row w-full lg:w-96 p-2 rounded-l-md text-black'
						placeholder='Search pages...'
						value={searchQuery}
						onChange={handleSearchChange}
					/>
					<button className='absolute right-0 p-2 bg-gray-300 rounded-r-md'>
						<FaSearch />
					</button>
				</div>

				{/* Large Screen Links */}
				<div className='hidden lg:flex flex-wrap space-x-6 items-center ml-6 mt-4 lg:mt-0'>
					<Link to='/' className='flex items-center hover:underline'>
						<FaHome className='mr-2' /> Home
					</Link>
					<Link to='/calculator' className='flex items-center hover:underline'>
						<FaCalculator className='mr-2' /> Loan Calculator
					</Link>
					<Link to='/form' className='flex items-center hover:underline'>
						<FaFileAlt className='mr-2' /> Loan Application
					</Link>
					<Link to='#my-account' className='flex items-center hover:underline'>
						<FaUserAlt className='mr-2' /> My Account
					</Link>
					<Link to='#about-us' className='flex items-center hover:underline'>
						<FaInfoCircle className='mr-2' /> About Us
					</Link>
					<Link to='#faqs' className='flex items-center hover:underline'>
						<FaQuestionCircle className='mr-2' /> FAQs
					</Link>
					<Link to='#contact-us' className='flex items-center hover:underline'>
						<FaPhone className='mr-2' /> Contact Us
					</Link>

					{/* Conditionally render buttons based on user authentication */}
					{user ? (
						<Link
							to='/logout'
							className='flex items-center hover:underline'
							onClick={onLogout}
						>
							<FaSignOutAlt className='mr-2' /> Logout
						</Link>
					) : (
						<>
							<Link
								to='/register'
								className='flex items-center hover:underline'
							>
								<FaSignInAlt className='mr-2' /> Register
							</Link>
							<Link to='/login' className='flex items-center hover:underline'>
								<FaSignInAlt className='mr-2' /> Login
							</Link>
						</>
					)}
				</div>

				{/* Small Screen Sidebar Toggle */}
				<Bars3Icon
					className='h-8 w-8 cursor-pointer lg:hidden'
					onClick={toggleSidebar}
				/>
			</header>

			{/* Loading Spinner */}
			{isLoggingOut && (
				<div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
					<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid'></div>
				</div>
			)}

			{/* Sidebar for Small Screens */}
			<Sidebar
				isOpen={isSidebarOpen}
				toggleSidebar={toggleSidebar}
				onLogout={onLogout}
			/>
		</div>
	);
};

const Sidebar = ({ isOpen, toggleSidebar, onLogout }) => {
	const { user } = useSelector((state) => state.auth);

	return (
		<div
			className={`fixed top-0 right-0 h-full bg-blue-500 w-64 transform ${
				isOpen ? "translate-x-0" : "translate-x-full"
			} transition-transform duration-[2000ms] ease-in-out z-50`}
		>
			<div className='p-4 text-white'>
				<XMarkIcon
					className={`h-8 w-8 cursor-pointer mb-4 ${
						isOpen ? "delay-[4000ms]" : ""
					}`}
					onClick={toggleSidebar}
				/>
				<nav className='space-y-4'>
					<Link to='/' className='flex items-center hover:underline'>
						<FaHome className='mr-2' /> Home
					</Link>
					<Link to='/calculator' className='flex items-center hover:underline'>
						<FaCalculator className='mr-2' /> Loan Calculator
					</Link>
					<Link
						to='#loan-application'
						className='flex items-center hover:underline'
					>
						<FaFileAlt className='mr-2' /> Loan Application
					</Link>
					<Link to='#my-account' className='flex items-center hover:underline'>
						<FaUserAlt className='mr-2' /> My Account
					</Link>
					<Link to='#about-us' className='flex items-center hover:underline'>
						<FaInfoCircle className='mr-2' /> About Us
					</Link>
					<Link to='#faqs' className='flex items-center hover:underline'>
						<FaQuestionCircle className='mr-2' /> FAQs
					</Link>
					<Link to='#contact-us' className='flex items-center hover:underline'>
						<FaPhone className='mr-2' /> Contact Us
					</Link>
					{user ? (
						<Link
							to='/logout'
							className='flex items-center hover:underline'
							onClick={onLogout}
						>
							<FaSignOutAlt className='mr-2' /> Logout
						</Link>
					) : (
						<>
							<Link
								to='/register'
								className='flex items-center hover:underline'
							>
								<FaSignInAlt className='mr-2' /> Register
							</Link>
							<Link to='/login' className='flex items-center hover:underline'>
								<FaSignInAlt className='mr-2' /> Login
							</Link>
						</>
					)}
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
