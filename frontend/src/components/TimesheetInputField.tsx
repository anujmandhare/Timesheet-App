import { InputText } from "primereact/inputtext";

export default function CustomInputField({
	id,
	label,
	disabled = false,
	readOnly = false,
	value,
	setter,
	tooltip,
	customElement,
	className = "",
	type = "text",
	required,
	...rest
}: any) {
	const tooltipOptions = { ...rest.tooltipOptions };

	return (
		<InputText
			id={id}
			type={type}
			disabled={disabled}
			readOnly={readOnly}
			value={value}
			onChange={setter}
			required={required}
			tooltip={tooltip}
            className={className}
			tooltipOptions={{ showOnDisabled: true, ...tooltipOptions }}
			{...rest}
		/>
	);
}
