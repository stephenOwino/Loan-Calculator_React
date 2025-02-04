import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import {
	FaHome,
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

const Navbar = ({ contrast }) => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const pages = [
		{ name: "Home", path: "/" },
		{ name: "Loan Application", path: "/loan" },
		{ name: "My Account", path: "#my-account" },
		{ name: "About Us", path: "#about-us" },
		{ name: "FAQs", path: "#faqs" },
		{ name: "Contact Us", path: "#contact-us" },
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
			<header
				className={`w-full ${
					contrast === "black"
						? "bg-gray-900 text-white"
						: "bg-indigo-600 text-white"
				} flex flex-col lg:flex-row items-center justify-between px-4 py-3 lg:py-4 fixed top-0 left-0 right-0 z-50`}
			>
				<div className='flex items-center justify-between w-full lg:w-auto'>
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

				<nav className='hidden lg:flex flex-wrap space-x-4 items-center mt-4 lg:mt-0'>
					{pages.map((page) => (
						<Link
							key={page.name}
							to={page.path}
							className='flex items-center text-sm hover:underline'
							onClick={page.path === "/logout" ? onLogout : null}
						>
							{getIcon(page.name)}
							{page.name}
						</Link>
					))}
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
			</header>

			{isLoggingOut && (
				<div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
					<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 border-solid'></div>
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
			className={`fixed top-0 right-0 h-full bg-indigo-600 w-64 transform ${
				isOpen ? "translate-x-0" : "translate-x-full"
			} transition-transform duration-200 ease-in-out z-50`}
		>
			<div className='p-4 text-white'>
				<XMarkIcon
					className='h-8 w-8 cursor-pointer mb-4'
					onClick={toggleSidebar}
				/>
				<nav className='space-y-4'>
					{[
						{ name: "Home", path: "/" },
						{ name: "Loan Application", path: "/loan" },
						{ name: "My Account", path: "#my-account" },
						{ name: "About Us", path: "#about-us" },
						{ name: "FAQs", path: "#faqs" },
						{ name: "Contact Us", path: "#contact-us" },
					].map((page) => (
						<Link
							key={page.name}
							to={page.path}
							className='flex items-center hover:underline'
							onClick={page.path === "/logout" ? onLogout : null}
						>
							{getIcon(page.name)}
							{page.name}
						</Link>
					))}
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
							to='/logout'
							className='flex items-center hover:underline'
							onClick={onLogout}
						>
							<FaSignOutAlt className='mr-2' /> Logout
						</Link>
					)}
				</nav>
			</div>
		</div>
	);
};

const getIcon = (name) => {
	switch (name) {
		case "Home":
			return <FaHome className='mr-1' />;
		case "Loan Application":
			return <FaFileAlt className='mr-1' />;
		case "My Account":
			return <FaUserAlt className='mr-1' />;
		case "About Us":
			return <FaInfoCircle className='mr-1' />;
		case "FAQs":
			return <FaQuestionCircle className='mr-1' />;
		case "Contact Us":
			return <FaPhone className='mr-1' />;
		case "Register":
		case "Login":
			return <FaSignInAlt className='mr-1' />;
		case "Logout":
			return <FaSignOutAlt className='mr-1' />;
		default:
			return null;
	}
};

export default Navbar;
