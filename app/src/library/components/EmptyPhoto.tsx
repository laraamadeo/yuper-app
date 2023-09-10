import "./EmptyPhoto.css"
import React from "react"

type EmptyPhotoRef = React.Ref<HTMLImageElement>;

interface EmptyPhotoProps {
    src: string,
    onClick: () => void
}

export default function EmptyPhoto({ src, onClick }: EmptyPhotoProps) {

    return <>
        <div className="empty-photo-container" onClick={onClick}>
            <img className="photo-container" src={src ? src : '/empty-photo.svg'}></img>
        </div>
    </>
}

