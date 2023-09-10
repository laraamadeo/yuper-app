import "./TextField.css"

type Props = {
    label?: string,
    type: string,
    name: string,
    description?: string,
    disabled?: boolean,
    placeholder?: string,
    value?: string,
    suffix?: string,
    maxlength?: number,
    iconSuffix?: JSX.Element
}
export default function TextField({ label, type, name, description, disabled, placeholder, value, suffix, maxlength, iconSuffix, ...props }: Props): JSX.Element {

    return <>
        <div className={`text-field-container ${disabled && "disabled"}`}{...props}>
            <div className="label-clarification">
                <p className='body-text grey-700'>{label}</p>
                {description && <p className='small-text grey-500'>{description}</p>}
            </div>
            <p className="small-text grey-500 text-field-suffix">{suffix}</p>
            {iconSuffix && <div className="text-field-suffix">{iconSuffix}</div>}
            <input maxLength={maxlength} type={`${type}`} name={`${name}`} placeholder={placeholder && placeholder} defaultValue={value} className="input-field"></input>
        </div>
    </>
}