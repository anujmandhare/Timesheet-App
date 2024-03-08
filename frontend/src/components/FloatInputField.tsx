import { InputText } from "primereact/inputtext";

export default function FloatInputField({
	id,
	label,
	disabled = false,
	readOnly = false,
	value,
	setter,
	tooltip,
	customElement,
	className = "",
	labelType = "float",
	type = "text",
	required,
	fieldClassName,
	...rest
}: any) {
	const tooltipOptions = { ...rest.tooltipOptions };

	return (
		<div className={className}>
			<span className={"p-float-label "} {...rest}>
				<InputText
					id={id}
					type={type}
					disabled={disabled}
					readOnly={readOnly}
					value={value}
					onChange={(e) => setter(e.target.value)}
					required={required}
					tooltip={tooltip}
					className={fieldClassName}
					tooltipOptions={{ showOnDisabled: true, ...tooltipOptions }}
					{...rest}
				/>
				<label htmlFor={id}>{label}</label>
			</span>
		</div>
	);
}
