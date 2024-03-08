import React from "react";
import { Dropdown } from "primereact/dropdown";

export default function CustomSingleSelect({
	id,
	label,
	options,
	value,
	setter,
	className = "",
	tooltip,
	filter,
	...rest
}: any) {
	return (
		<Dropdown
			value={value}
			onChange={(e) => setter(e.value)}
			options={options}
			optionLabel="name"
			placeholder={label}
			id={id}
			className={className}
			style={{ color: "white" }}
			tooltip={tooltip}
			filter={filter}
			{...rest}
		/>
	);
}
