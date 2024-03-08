import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "../components/NavBar";
import Login from "./Login";
// import Register from './Register';
// import Main from "./Main";
import Timesheet from "./Timesheet";

export default function MainRouter() {
	return (
		<Router>
			<NavBar />
			<Routes>
				<Route path="/login" element={<Login />} />
				{/* <Route path="/register" element={<Register />} /> */}
				{/* <Route path="/home" element={<Main />} /> */}
				<Route path="/timesheet" element={<Timesheet />} />
				<Route path="*" element={<Timesheet />} />
			</Routes>
		</Router>
	);
}
