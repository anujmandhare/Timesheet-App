import { Link } from "react-router-dom";

export default function LinkButton({ id, label, link, className = "" }: any) {
	return (
		<div className={className}>
			<Link id={id} to={"/" + link}>
				{label}
			</Link>
		</div>
	);
}
