import "./Container.css"

type Props = {
    children: JSX.Element
    width: String,
    height: String,
    type: String,
    elevation?: String,
    className?: string
    onClick?: () => void
}

export default function Container({ children, width, height, type, elevation, className, onClick, ...props }: Props): JSX.Element {

    return <>
        <div style={{ maxWidth: `${width}`, height: `${height}` }} className={`container-comp ${type === 'border' && 'container-border'} ${type === 'shadow' && 'container-shadow'} ${elevation === '1' && 'elevation-1'} ${elevation === '2' && 'elevation-2'} ${elevation === '3' && 'elevation-3'} ${elevation === '4' && 'elevation-4'} ${className}`} onClick={onClick} {...props}>
            {children}
        </div>
    </>
}