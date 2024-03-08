import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { deleteUser } from "../redux/user";
import CustomButton from "./CustomButton";
import { Menubar } from "primereact/menubar";

export default function NavBar() {
	const dispatch = useDispatch();
	const user = useSelector((_: any) => _.user);

	const handleLogout = () => {
		dispatch(deleteUser());
	};

	const start = (
		<div
			style={{
				fontSize: 36,
				fontStyle: "italic",
				fontWeight: "bold",
				color: "white",
			}}
		>
			TimeSheet
		</div>
	);

	const end = user.UserId ? (
		<CustomButton
			onClick={handleLogout}
			label="logout"
			id="logout"
			icon="pi pi-sign-in"
			tooltipOptions={{ position: "left" }}
			iconPos="right"
		/>
	) : (
		<></>
	);

	return (
			<Menubar start={start} end={end} id="NavBar" className="sticky-top" />
	);
}
