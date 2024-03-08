import { Calendar } from "primereact/calendar";

export default function CustomCalendar({
	value,
	setter,
	callback,
	className,
}: any) {
	return (
		<Calendar
			id="calendar"
			value={value}
			onChange={(e) => {
				setter(e.value);
				callback(e.value);
			}}
			dateFormat="dd/mm/yy"
			showIcon
			className={className}
			placeholder="Select Date"
		/>
	);
}
