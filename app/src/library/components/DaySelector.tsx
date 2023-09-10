import "./DaySelector.css"

type Props = {
    label: string,
    state: String,
    onClick: () => void
}

export default function DaySelector({ label, state, onClick, ...props }: Props): JSX.Element {

    return <>
        <div className={`day-selector-container ${state === 'default' ? 'day-selector-default' : 'day-selector-selected'}`} onClick={onClick} {...props}>
            <p className={`tiny-text-bold ${state === 'default' ? 'day-selector-label-default' : 'day-selector-label-selected'}`}>{label}</p>
        </div>
    </>
}