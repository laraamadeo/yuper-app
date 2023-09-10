import "./IconButton.css"
type Props = {
    icon: JSX.Element,
    type: String,
    onClick?: () => void,
    className?: string
}

export default function IconButton({ icon, type, onClick, className }: Props): JSX.Element {

    return <>
        <div className={`icon-button-container pointer ${type === 'primary' && 'icn-button-primary'} ${type === 'secondary' && 'icn-button-secondary'} ${type === 'critical' && 'icn-button-critical'} ${className}`} onClick={onClick}>
            <div className={`icn-button-icon`}>{icon}</div>
        </div>
    </>
}