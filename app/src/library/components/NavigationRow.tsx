import Container from "./Container"
import "./NavigationRow.css"

type Props = {
    suffixIcon?: JSX.Element,
    label: string,
    trailingIcon?: JSX.Element,
    container: string,
    className?: string
    onClick: () => void
}

export default function NavigationRow({ suffixIcon, label, trailingIcon, container, className, onClick }: Props): JSX.Element {

    return <>
        <Container width={'100%'} height={'fit-content'} type={container} className={className} onClick={onClick}>
            <div className="nav-row-container">
                {suffixIcon && suffixIcon}
                <p className="body-text-bold grey-700">{label}</p>
                {trailingIcon && trailingIcon}
            </div>
        </Container>
    </>
}