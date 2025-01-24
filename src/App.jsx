import React from "react";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/register' element={<SignupPage />} />
				<Route path='/' element={<Navigate to='/signup' replace />} />
			</Routes>
			<ToastContainer />
		</Router>
	);
};

export default App;
