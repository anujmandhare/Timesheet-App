import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import { useState } from "react";

export default function Main() {
	const user = useSelector((_: any) => _.user);

	if (!user?.UserId) {
		return <Navigate to="/login" replace={true} />;
	}

	return <>This is Main Screen</>;
}
