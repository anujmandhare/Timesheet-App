import { Image } from "primereact/image";

export default function CustomImageTag({
	src,
	alt,
	width = "250px",
	height,
	className,
}: any) {
	return (
		<div className={className}>
			<Image src={src} alt={alt} width={width} />
		</div>
	);
}
