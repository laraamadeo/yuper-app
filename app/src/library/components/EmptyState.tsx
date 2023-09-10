import { CSSProperties } from "react"
import "./EmptyState.css"

type Props = {
    src: string,
    title: string,
    description: string,
    width?: string,
    marginBottom?: string
}

export default function EmptyState({ src, title, description, width, marginBottom }: Props) {

    return <>
        <div className="empty-state-container">
            <div className="empty-state-img-container" style={{ width: width, height: width }}>
                <img className='illustration-gif' src={src} style={{ width: width, height: width, marginBottom }} />
            </div>
            <p className='heading-s' style={{ textAlign: 'center' }}>{title}</p>
            <p className='body-text grey-700' style={{ marginBottom: '16px', marginTop: '8px', textAlign: 'center', width: '100%' }}>{description}</p>
        </div>
    </>
}
