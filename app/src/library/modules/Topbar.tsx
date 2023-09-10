import IconButton from '../components/IconButton'
import { Bars3Icon, ChatBubbleLeftRightIcon, ArrowLeftIcon, XMarkIcon } from '../icons'
import './Topbar.css'

type Props = {
    level: string,
    secondLevel?: { label?: string, right?: false | JSX.Element, left?: JSX.Element, onRightClick?: () => void, onLeftClick?: () => void },
    firstLevel?: { label?: string, menu?: boolean, chat?: boolean, onMenuClick?: () => void, onChatClick?: () => void },
    className?: string
}

export default function Topbar({ level, secondLevel, firstLevel, className }: Props): JSX.Element {

    return <>
        <div className={`topbar-container ${className}`}>
            {level === 'first' && <>
                <div className='topbar-logo'></div>
                <div className={`${firstLevel?.menu && !firstLevel.chat ? 'topbar-label-icon-left' : ''} ${!firstLevel?.menu && firstLevel?.chat ? 'topbarFirst-label-icon-right' : ''} ${!firstLevel?.menu && !firstLevel?.chat ? 'topbar-label' : ''}`}><p className='small-text-bold grey-500'>{firstLevel?.label}</p>
                </div>
                {/* <IconButton icon={<Bars3Icon className='icon-xs grey-700' />} type={'secondary'} onClick={firstLevel?.onMenuClick} /> */}
                <IconButton icon={<ChatBubbleLeftRightIcon className='icon-xs grey-700' />} type={'secondary'} onClick={firstLevel?.onChatClick} />
            </>}
            {level === 'second' && <>
                {secondLevel?.left && <IconButton icon={secondLevel.left} type={'secondary'} onClick={secondLevel.onLeftClick} />}

                <div className={`${secondLevel?.left && !secondLevel.right ? 'topbar-label-icon-left' : ''} ${!secondLevel?.left && secondLevel?.right ? 'topbar-label-icon-right' : ''} ${!secondLevel?.left && !secondLevel?.right ? 'topbar-label' : ''}`}><p className='small-text-bold grey-700'>{secondLevel?.label}</p>
                </div>
                {secondLevel?.right && <IconButton icon={secondLevel.right} type={'secondary'} onClick={secondLevel.onRightClick} />}
            </>}
        </div>

    </>
}