import React, { useState } from "react";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage";
import Navbar from "./Pages/NavBar";

import LoanApplicationForm from "./Pages/LoanApplicationForm";
import ReportPage from "./Pages/ReportPage";
import Footer from "./Pages/Footer";
import ContrastToggle from "../src/Pages/ContrastToggle";
import PrivateRoute from "./Pages/PrivateRoutes";

const App = () => {
	const [contrast, setContrast] = useState("normal");

	const handleContrastChange = () => {
		if (contrast === "normal") {
			setContrast("white");
		} else if (contrast === "white") {
			setContrast("black");
		} else {
			setContrast("normal");
		}
	};

	return (
		<Router>
			<div
				className={
					contrast === "black"
						? "bg-black text-white"
						: contrast === "white"
						? "bg-white text-black"
						: "bg-gray-100 text-black"
				}
			>
				<ContrastToggle
					contrast={contrast}
					handleContrastChange={handleContrastChange}
				/>
				<Navbar contrast={contrast} />
				<Routes>
					<Route path='/' element={<HomePage contrast={contrast} />} />
					<Route
						path='/register'
						element={<SignupPage contrast={contrast} />}
					/>
					<Route path='/login' element={<LoginPage contrast={contrast} />} />

					<Route
						path='/loan'
						element={
							<PrivateRoute>
								<LoanApplicationForm contrast={contrast} />
							</PrivateRoute>
						}
					/>
					<Route
						path='/report'
						element={
							<PrivateRoute>
								<ReportPage contrast={contrast} />
							</PrivateRoute>
						}
					/>
				</Routes>
				<ToastContainer />
				<Footer contrast={contrast} />
			</div>
		</Router>
	);
};

export default App;
