import "./DataItem.css"

type Props = {
    label: string
    content: String
}

export default function DataItem({ label, content, ...props }: Props): JSX.Element {

    return <>
        <div className="data-item-container"{...props}>
            <p className="body-text data-item-label">{label}</p>
            <p className="body-text-bold data-item-content">{content}</p>
        </div>
    </>
}