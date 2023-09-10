import "./Chip.css"

type Props = {
    label: String,
    state: String
}

export default function Chip({ label, state, ...props }: Props): JSX.Element {

    return <>
        <div className={`chip-container 
                ${state === "warning" && "chip-warning"}
                ${state === "success" && "chip-success"}
                ${state === "info" && "chip-info"}
                ${state === "critical" && "chip-critical"}
                ${state === "neutral" && "chip-neutral"}`}{...props}>
            <p className="tiny-text-bold chip-label">{label}</p>
        </div>
    </>
}