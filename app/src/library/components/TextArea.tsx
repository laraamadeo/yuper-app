import "./TextArea.css"

type Props = {
    label: string,
    name: string,
    description?: string,
    disabled?: Boolean,
    placeholder?: string,
    value?: string
}

export default function TextArea({ label, name, description, disabled, placeholder, value, ...props }: Props): JSX.Element {

    return <>
        <div className={`text-field-container ${disabled && "disabled"}`} {...props}>
            <div className="label-clarification">
                <p className='body-text grey-700'>{label}</p>
                {description && <p className='small-text grey-500'>{description}</p>}
            </div>
            <textarea name={`${name}`} placeholder={placeholder && placeholder} defaultValue={value} className="input-field-text-area"></textarea>
        </div>
    </>
}