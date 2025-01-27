import React from "react";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage";
import Navbar from "./Pages/NavBar";
import LoanCalculator from "./Pages/LoanCalculatorPage";
import LoanApplicationForm from "./Pages/LoanApplicationForm";
import ReportPage from "./Pages/ReportPage";
import Footer from "./Pages/Footer";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/register' element={<SignupPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/calculator' element={<LoanCalculator />} />
				<Route path='/loan' element={<LoanApplicationForm />} />
				<Route path='/reports' element={<ReportPage />} />
			</Routes>
			<ToastContainer />
			<Footer />
		</Router>
	);
};

export default App;
