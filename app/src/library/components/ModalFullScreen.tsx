
import { Children } from 'react'
import Topbar from '../modules/Topbar'
import './ModalFullScreen.css'
import { XMarkIcon } from '../icons'

type Props = {
    onClose?: () => void,
    onBack?: () => void,
    topBarLabel: string,
    children: JSX.Element
}

export default function ModalFullScreen({ onClose, onBack, topBarLabel, children }: Props): JSX.Element {
    return <>
        <div className='modal-full-screen-container'>
            <Topbar level='second' secondLevel={{ label: `${topBarLabel}`, right: <XMarkIcon className='icon-s grey-700' />, onRightClick: onClose }} />
            <div className='modal-full-screen-content'>
                {children}
            </div>
        </div>
    </>
}