import { Button } from "primereact/button";

export default function CustomButton({
	id,
	label,
	onClick,
	loading,
	className = "",
	outlined,
	icon,
	tooltip,
	...rest
}: any) {
	const tooltipOptions = { ...rest.tooltipOptions };

	return (
		<div className={className}>
			<Button
				id={id}
				label={label}
				loading={loading}
				onClick={onClick}
				type="button"
				tooltip={tooltip}
				outlined={outlined}
				icon={icon}
				tooltipOptions={{ ...tooltipOptions }}
				{...rest}
			/>
		</div>
	);
}
