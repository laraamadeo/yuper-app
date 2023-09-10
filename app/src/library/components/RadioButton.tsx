import "./RadioButton.css"

type Props = {
    checked?: boolean,
    name: string,
    text: string,
    value: string,
    onChange: (value: string) => void
}

export default function RadioButton({ name, value, onChange, checked, text }: Props): JSX.Element {

    return <>
        <div className="radio-button-container appareance-none">
            <input
                className="radio-button"
                type="radio"
                name={name}
                value={value}
                onChange={() => onChange(value)}
                checked={checked}
            />
            <span className="body-text grey-700">{text}</span>

        </div>
    </>
}