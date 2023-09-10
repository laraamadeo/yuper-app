import './Toast.css'

type Params = {
    message: string,
    type: string,
    endAnimation: () => void
}
export default function Toast({ message, type, endAnimation }: Params) {

    const handleRemoveToast = () => {
        endAnimation()
    }

    return <div className="toast-container">
        <p className={`toast body-text ${type === 'error' && 'error-toast'} ${type === 'success' && 'success-toast'} `} onAnimationEnd={handleRemoveToast}>{message}</p>
    </div>
}