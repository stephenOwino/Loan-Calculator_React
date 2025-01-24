import React from "react";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/register' element={<SignupPage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
			<ToastContainer />
		</Router>
	);
};

export default App;
