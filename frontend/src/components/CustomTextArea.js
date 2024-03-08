
import { InputTextarea } from "primereact/inputtextarea";

export default function CustomTextArea({ id, label, disabled = false, readOnly = false, value, setter, rows, cols,
    tooltip, customElement, required, ...rest }) {

    return (
        <div className="card flex justify-content-center input">
            <span className="p-float-label">
                <InputTextarea id={id} value={value} onChange={(e) => setter(e.target.value)} rows={rows} cols={cols}
                    tooltip={tooltip} required={required}
                />
                <label htmlFor={id} required={required}>{label}{required ? <span className="required">*</span> : ''}</label>
            </span>
        </div>
    )
}
