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
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const pages = [
		{ name: "Home", path: "/" },
		{ name: "Loan Calculator", path: "/calculator" },
		{ name: "Loan Application", path: "/loan" },
		{ name: "My Account", path: "#my-account" },
		{ name: "About Us", path: "#about-us" },
		{ name: "FAQs", path: "#faqs" },
		{ name: "Contact Us", path: "#contact-us" },
		{ name: "Register", path: "/register" },
		{ name: "Login", path: "/login" },
		{ name: "Logout", path: "/logout" },
	];

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
				setSidebarOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	const handleSearchChange = (event) => {
		const query = event.target.value;
		setSearchQuery(query);
		if (query.trim() !== "") {
			const filteredSuggestions = pages.filter((page) =>
				page.name.toLowerCase().includes(query.toLowerCase())
			);
			setSuggestions(filteredSuggestions);
		} else {
			setSuggestions([]);
		}
	};

	const handleSuggestionClick = (path) => {
		setSearchQuery("");
		setSuggestions([]);
		if (path === "/logout") {
			onLogout();
		} else {
			navigate(path);
		}
	};

	return (
		<div>
			<header className='w-full bg-blue-500 text-white flex flex-col lg:flex-row items-center justify-between px-4 py-3 lg:py-4 fixed top-0 left-0 right-0 z-50'>
				<div className='flex items-center justify-between w-full lg:w-auto'>
					<h1 className='text-lg font-bold'>Loan Calculator</h1>
					<Bars3Icon
						className='h-6 w-6 cursor-pointer lg:hidden'
						onClick={toggleSidebar}
					/>
				</div>

				<div className='relative flex items-center w-full lg:w-auto mt-4 lg:mt-0 lg:ml-4'>
					<input
						type='text'
						className='flex flex-row w-full lg:w-64 p-2 rounded-l-md text-black text-sm'
						placeholder='Search pages...'
						value={searchQuery}
						onChange={handleSearchChange}
					/>
					<button className='absolute right-0 p-2 bg-gray-300 rounded-r-md'>
						<FaSearch />
					</button>
					{suggestions.length > 0 && (
						<div className='absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 text-black'>
							{suggestions.map((suggestion) => (
								<div
									key={suggestion.path}
									className='p-2 cursor-pointer hover:bg-gray-200 text-sm'
									onClick={() => handleSuggestionClick(suggestion.path)}
								>
									{suggestion.name}
								</div>
							))}
						</div>
					)}
				</div>

				<div className='hidden lg:flex flex-wrap space-x-4 items-center mt-4 lg:mt-0'>
					<Link to='/' className='flex items-center text-sm hover:underline'>
						<FaHome className='mr-1' /> Home
					</Link>
					<Link
						to='/calculator'
						className='flex items-center text-sm hover:underline'
					>
						<FaCalculator className='mr-1' /> Loan Calculator
					</Link>
					<Link
						to='/loan'
						className='flex items-center text-sm hover:underline'
					>
						<FaFileAlt className='mr-1' /> Loan Application
					</Link>
					<Link
						to='#my-account'
						className='flex items-center text-sm hover:underline'
					>
						<FaUserAlt className='mr-1' /> My Account
					</Link>
					<Link
						to='#about-us'
						className='flex items-center text-sm hover:underline'
					>
						<FaInfoCircle className='mr-1' /> About Us
					</Link>
					<Link
						to='#faqs'
						className='flex items-center text-sm hover:underline'
					>
						<FaQuestionCircle className='mr-1' /> FAQs
					</Link>
					<Link
						to='#contact-us'
						className='flex items-center text-sm hover:underline'
					>
						<FaPhone className='mr-1' /> Contact Us
					</Link>

					{user ? (
						<Link
							to='/logout'
							className='flex items-center text-sm hover:underline'
							onClick={onLogout}
						>
							<FaSignOutAlt className='mr-1' /> Logout
						</Link>
					) : (
						<>
							<Link
								to='/register'
								className='flex items-center text-sm hover:underline'
							>
								<FaSignInAlt className='mr-1' /> Register
							</Link>
							<Link
								to='/login'
								className='flex items-center text-sm hover:underline'
							>
								<FaSignInAlt className='mr-1' /> Login
							</Link>
						</>
					)}
				</div>
			</header>

			{isLoggingOut && (
				<div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
					<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid'></div>
				</div>
			)}

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
			} transition-transform duration-200 ease-in-out z-50`}
		>
			<div className='p-4 text-white'>
				<XMarkIcon
					className='h-6 w-6 cursor-pointer mb-4'
					onClick={toggleSidebar}
				/>
				<nav className='space-y-4'>
					<Link to='/' className='flex items-center text-sm hover:underline'>
						<FaHome className='mr-1' /> Home
					</Link>
					<Link
						to='/calculator'
						className='flex items-center text-sm hover:underline'
					>
						<FaCalculator className='mr-1' /> Loan Calculator
					</Link>
					<Link
						to='/loan'
						className='flex items-center text-sm hover:underline'
					>
						<FaFileAlt className='mr-1' /> Loan Application
					</Link>
					<Link
						to='#my-account'
						className='flex items-center text-sm hover:underline'
					>
						<FaUserAlt className='mr-1' /> My Account
					</Link>
					<Link
						to='#about-us'
						className='flex items-center text-sm hover:underline'
					>
						<FaInfoCircle className='mr-1' /> About Us
					</Link>
					<Link
						to='#faqs'
						className='flex items-center text-sm hover:underline'
					>
						<FaQuestionCircle className='mr-1' /> FAQs
					</Link>
					<Link
						to='#contact-us'
						className='flex items-center text-sm hover:underline'
					>
						<FaPhone className='mr-1' /> Contact Us
					</Link>
					{user ? (
						<Link
							to='/logout'
							className='flex items-center text-sm hover:underline'
							onClick={onLogout}
						>
							<FaSignOutAlt className='mr-1' /> Logout
						</Link>
					) : (
						<>
							<Link
								to='/register'
								className='flex items-center text-sm hover:underline'
							>
								<FaSignInAlt className='mr-1' /> Register
							</Link>
							<Link
								to='/login'
								className='flex items-center text-sm hover:underline'
							>
								<FaSignInAlt className='mr-1' /> Login
							</Link>
						</>
					)}
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
