import "./Divider.css"
type Props = {
    width: string,
    className?: string
}

export default function Divider({ width, className }: Props): JSX.Element {

    return <>
        <div style={{ width: `${width}` }} className={`divider-container ${className}`}></div>
    </>
}