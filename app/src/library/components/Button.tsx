import "./Button.css"

type Props = {
    type: String,
    size: String,
    icon?: JSX.Element,
    label: String,
    hugContent?: boolean
    onClick?: undefined | (() => void)
}

export default function Button({ type, size, icon, label, onClick, hugContent }: Props): JSX.Element {

    return <>
        <button type="submit" className={`
            ${size === "small" && "button-container-small"}
            ${size === "extrasmall" && "button-container-extrasmall"}
            ${size === "medium" && "button-container-medium"}
            ${type === "primary" && "primary"}
            ${type === "secondary" && "secondary"}
            ${type === "critical" && "critical"}`} style={{ width: hugContent ? 'fit-content' : '100%' }} onClick={onClick}>
            {icon && <p className="body-text-bold">i</p>}
            <p className={`body-text-bold ${type === "critical" ? "label-critical" : "label"}`}>{label}</p>
        </button>
    </>
}