
import { RadioButton } from "primereact/radiobutton";

export default function CustomRadioButton({ labels, value, setter, tooltip, ...rest }) {

    return (
        <div className="card flex justify-content-center input">
            <div className="flex flex-wrap gap-3">
                {labels.map((_, i) => {
                    return <div key={'d' + _ + i} className="flex align-items-center">
                        <RadioButton key={'b' + _ + i} inputId={_} name={_} value={_} onChange={(e) => setter(e.value)} 
                        checked={value === _} tooltip={tooltip}
                            {...rest} 
                            />
                        <label key={'l' + _ + i} htmlFor={_} className="ml-2">{_}</label>
                    </div>
                })
                }
            </div>
        </div>
    );
}
