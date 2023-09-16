import { useState } from 'react'
import './InstallationDesktopPage.css'
import ReactCardFlip from 'react-card-flip';


export default function InstallationDesktopPage(): JSX.Element {
    const motto = 'Sharing meals, saving time.Where food creates community!'
    const clickMe = 'Click me to scan QR Start enjoying!'

    const [flipped, setFlipped] = useState(false)

    return <>
        <main className='installationPage-container'>

            <section className='insP-left'>

                <div className='insP-logo'>
                    <p className='big-text-bold grey-700 insP-name'>Yuper</p>
                    <p className='medium-text-bold grey-700 insP-motto'>{motto}</p>
                </div>

                <div className='insP-left-lower'>
                    <div className='insP-app-icon-container'>
                        <ReactCardFlip isFlipped={flipped}>
                            <div onClick={() => setFlipped(!flipped)}>
                                <img src='/other/logo-flip.svg' className='insP-icon'></img>
                            </div>

                            <div onClick={() => setFlipped(!flipped)}>
                                <img src='/other/qr-flip.svg' className='insP-icon'></img>
                            </div>
                        </ReactCardFlip>
                    </div>

                    <p className='body.text grey-700 insP-motto'>Click me to scan QR <strong>Start enjoying!</strong></p>

                </div>

            </section>

            <section className='insP-right'>
                <div className='insP-screenshots-container'>
                    <img src='/other/screenshots.png'></img>
                </div>
            </section>
        </main>
    </>
}