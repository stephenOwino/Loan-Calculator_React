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

const Navbar = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	return (
		<div>
			{/* Navbar */}
			<header className='w-full bg-blue-500 text-white flex flex-col lg:flex-row items-center justify-between px-6 py-4 lg:py-6'>
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
					<a href='#home' className='flex items-center hover:underline'>
						<FaHome className='mr-2' /> Home
					</a>
					<a
						href='#loan-calculator'
						className='flex items-center hover:underline'
					>
						<FaCalculator className='mr-2' /> Loan Calculator
					</a>
					<a
						href='#loan-application'
						className='flex items-center hover:underline'
					>
						<FaFileAlt className='mr-2' /> Loan Application
					</a>
					<a href='#my-account' className='flex items-center hover:underline'>
						<FaUserAlt className='mr-2' /> My Account
					</a>
					<a href='#about-us' className='flex items-center hover:underline'>
						<FaInfoCircle className='mr-2' /> About Us
					</a>
					<a href='#faqs' className='flex items-center hover:underline'>
						<FaQuestionCircle className='mr-2' /> FAQs
					</a>
					<a href='#contact-us' className='flex items-center hover:underline'>
						<FaPhone className='mr-2' /> Contact Us
					</a>
					<a href='#register' className='flex items-center hover:underline'>
						<FaSignInAlt className='mr-2' /> Register
					</a>
					<a href='#login' className='flex items-center hover:underline'>
						<FaSignInAlt className='mr-2' /> Login
					</a>
					<a href='#logout' className='flex items-center hover:underline'>
						<FaSignOutAlt className='mr-2' /> Logout
					</a>
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
					<a href='#home' className='flex items-center  hover:underline'>
						<FaHome className='mr-2' /> Home
					</a>
					<a
						href='#loan-calculator'
						className='flex items-center hover:underline'
					>
						<FaCalculator className='mr-2' /> Loan Calculator
					</a>
					<a
						href='#loan-application'
						className='flex items-center hover:underline'
					>
						<FaFileAlt className='mr-2' /> Loan Application
					</a>
					<a href='#my-account' className='flex items-center hover:underline'>
						<FaUserAlt className='mr-2' /> My Account
					</a>
					<a href='#about-us' className='flex items-center hover:underline'>
						<FaInfoCircle className='mr-2' /> About Us
					</a>
					<a href='#faqs' className='flex items-center hover:underline'>
						<FaQuestionCircle className='mr-2' /> FAQs
					</a>
					<a href='#contact-us' className='flex items-center hover:underline'>
						<FaPhone className='mr-2' /> Contact Us
					</a>
					<a href='#register' className='flex items-center hover:underline'>
						<FaSignInAlt className='mr-2' /> Register
					</a>
					<a href='#login' className='flex items-center hover:underline'>
						<FaSignInAlt className='mr-2' /> Login
					</a>
					<a href='#logout' className='flex items-center hover:underline'>
						<FaSignOutAlt className='mr-2' /> Logout
					</a>
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
