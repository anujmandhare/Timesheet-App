import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";

import CustomButton from "./CustomButton";

export default function CustomPopup({
	visible,
	singleButton,
	header,
	message,
	callback,
	toggle,
}: any) {
	const toggleShow = () => {
		toggle(!visible);
	};

	const handleClick = () => {
		toggleShow();
		callback();
	};

	useEffect(() => {
		toggle(visible);
	}, [visible]);

	const footerContent = (
		<div className="flex flex-row-reverse">
			{singleButton ? (
				<>
					<CustomButton onClick={toggleShow}>Ok</CustomButton>
				</>
			) : (
				<>
					<CustomButton severity="danger" onClick={toggleShow}>
						No
					</CustomButton>
					<CustomButton onClick={handleClick}>Yes</CustomButton>
				</>
			)}
		</div>
	);

	return (
		<div className="card flex justify-content-center">
			<Dialog
				visible={visible}
				style={{ width: "50vw" }}
				onHide={() => toggleShow()}
				footer={footerContent}
				header={header}
			>
				{message}
			</Dialog>
		</div>
	);
}
