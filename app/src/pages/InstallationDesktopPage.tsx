import { useState } from 'react'
import './InstallationDesktopPage.css'
import ReactCardFlip from 'react-card-flip';


export default function InstallationDesktopPage(): JSX.Element {
    const motto = 'Sharing meals, saving time.Where food creates community!'
    const clickMe = 'Click me to scan QR and start enjoying'

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
                                <img src='/apple-touch-icon-180x180.png' className='insP-icon'></img>
                            </div>

                            <div onClick={() => setFlipped(!flipped)}>
                                <img src='/maskable-icon-512x512.png' className='insP-icon'></img>
                            </div>
                        </ReactCardFlip>
                    </div>

                    <div className='insP-arrow'>
                        <img src='/other/arrow.png' className='insP-arrow'></img>
                    </div>

                    <p className='body.text grey-700 insP-motto'>{clickMe}</p>

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