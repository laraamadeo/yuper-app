import './Splash.css'

export default function Splash() {
    return <>
        <div className={`splash-container show`}>
            <div className="svg-container">
                <svg width="150" height="150" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="160.199" y="25.1163" width="148.733" height="148.733" rx="8.5" transform="rotate(48.9456 160.199 25.1163)" fill="#A782F9" stroke="white" stroke-width="3" style={{ animation: 'rotateAnimation 5s linear forwards' }} />
                        <rect x="74.8675" y="37.1955" width="148.733" height="148.733" rx="8.5" transform="rotate(24.6529 74.8675 37.1955)" fill="#E75955" stroke="white" stroke-width="3" style={{ animation: 'rotateAnimation 5s linear forwards reverse' }} />
                        <rect x="1.49206" y="1.5079" width="148.733" height="148.733" rx="8.5" transform="matrix(-0.005278 0.999986 0.999986 0.005278 0.792843 82.2644)" fill="#FFC938" stroke="white" stroke-width="3" style={{ animation: 'rotateAnimation 5s linear forwards' }} />
                    </svg>
                </svg>
            </div>
        </div>
    </>

}