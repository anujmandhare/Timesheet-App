import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { POST } from "../extras/api";
import { setUser, setLoadingTrue, setLoadingFalse } from "../redux/user";
import CONSTANTS from "../extras/constants.json";
import FloatInputField from "../components/FloatInputField";
import LinkButton from "../components/LinkButton";
import CustomButton from "../components/CustomButton";
import validator from "../extras/validation";
import CustomImageTag from "../components/CustomImageTag";

export default function Login() {
	const [username, setUsername] = useState("");
	const [Password, setPassword] = useState("");

	const user = useSelector((_: any) => _.user);

	const dispatch = useDispatch();

	const handleSubmit = async (e: any) => {
		if (!validator({ type: CONSTANTS.EMAIL, stringToTest: username })) {
			return;
		}

		if (!Password) {
			alert("Please enter a valid password!");
			return;
		}

		dispatch(setLoadingTrue());
		const data = await POST(CONSTANTS.LOGIN, { Email: username, Password });

		if (data && data.UserId) {
			dispatch(setUser({ ...data }));
		}
		dispatch(setLoadingFalse());
	};

	if (user?.UserId) {
		return <Navigate to="/timesheet" replace={true} />;
	}

	return (
		<div className="horizontalCenter margintop5p">
			<div>
				<div>
					<CustomImageTag
						src={process.env.PUBLIC_URL + "logo.jpg"}
						alt="Logo"
						className="getCenter"
					/>
					<FloatInputField
						id="username"
						label="Email"
						value={username}
						setter={setUsername}
						className="input getCenter"
						required
					/>
					<FloatInputField
						id="password"
						type="password"
						label="Password"
						value={Password}
						setter={setPassword}
						className="input getCenter"
						required
					/>
					<CustomButton
						label="Login"
						onClick={handleSubmit}
						loading={user.loading}
						className="getCenter"
					/>
				</div>
				<div className="getCenter"></div>
				{/* <div className="getCenter">
					<LinkButton label="Register" link="register" />
				</div> */}
			</div>
		</div>
	);
}
