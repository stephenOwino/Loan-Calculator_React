import React, { useState } from "react";
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
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth); // Accessing user from the Redux state
	const navigate = useNavigate();

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/"); // Redirecting to home page after logout
	};

	return (
		<div>
			{/* Navbar */}
			<header className='w-full bg-blue-500 text-white flex flex-col lg:flex-row items-center justify-between px-6 py-4 lg:py-6 fixed top-0 left-0 right-0 z-50 mb-80'>
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
					<Link
						to='/loan-calculator'
						className='flex items-center hover:underline'
					>
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

					{/* Conditionally render buttons based on user authentication */}
					{!user ? (
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
					) : (
						<Link
							to='#logout'
							className='flex items-center hover:underline'
							onClick={handleLogout}
						>
							<FaSignOutAlt className='mr-2' /> Logout
						</Link>
					)}
				</div>

				{/* Small Screen Sidebar Toggle */}
				<Bars3Icon
					className='h-8 w-8 cursor-pointer lg:hidden'
					onClick={toggleSidebar}
				/>
			</header>

			{/* Sidebar for Small Screens */}
			<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
		</div>
	);
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
	const { user } = useSelector((state) => state.auth); // Accessing user from the Redux state

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
					<Link
						to='#loan-calculator'
						className='flex items-center hover:underline'
					>
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
					{/* Conditionally render login/register/logout in sidebar */}
					{!user ? (
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
					) : (
						<Link
							to='#logout'
							className='flex items-center hover:underline'
							onClick={handleLogout}
						>
							<FaSignOutAlt className='mr-2' /> Logout
						</Link>
					)}
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
