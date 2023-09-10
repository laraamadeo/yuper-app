import "./Link.css"
type Props = {
    label: string,
    state: string,
    onClick?: (event: React.SyntheticEvent) => void,
    icon?: JSX.Element
}

export default function Link({ label, state, icon, onClick, ...props }: Props): JSX.Element {

    return <>
        <div className="link-compo-container">
            {icon && icon}
            <p className={`body-text-bold pointer ${state === 'default' ? 'link-default' : 'link-critical'}`}{...props} onClick={onClick}>{label}</p>
        </div>
    </>
}