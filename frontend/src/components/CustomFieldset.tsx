import React from "react";
import { Fieldset } from "primereact/fieldset";

export default function CustomFieldset({ children, legend, className }: any) {

	return (
		<Fieldset legend={legend} className={className}>
			{children}
		</Fieldset>
	);
}
