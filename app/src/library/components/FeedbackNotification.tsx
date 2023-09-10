import { CSSProperties } from "react"
import { ExclamationTriangleIcon } from "../icons"
import "./FeedbackNotification.css"

type Props = {
    state: string,
    title: string,
    content: string,
    style?: CSSProperties
}

export default function FeedbackNotification({ title, content, state, style }: Props) {
    return <>
        <div className={`feedbackNotif-container feedbackNotif-${state}`} style={style}>
            <ExclamationTriangleIcon className="icon-xs yellow-200" />
            <div className="feedbackNotif-text-container">
                {title && <p className="body-text-bold grey-700">{title}</p>}
                <p className="body-text grey-700">{content}</p>
            </div>
        </div>
    </>
}