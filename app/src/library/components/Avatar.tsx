import './Avatar.css'

type Props = {
    image: String,
    width: String,
    className?: string
}

export default function Avatar({ image, width, className }: Props): JSX.Element {
    return <>
        <div className={`avatar-container`}>
            <img className={`avatar-img ${className}`} style={{ maxWidth: `${width}`, height: `${width}` }} src={`${image}`}></img>
        </div>
    </>
}
