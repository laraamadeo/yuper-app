import { PlusIcon } from '../icons'
import './ChooseFile.css'

type Props = {
    onAddClick?: undefined | (() => void),
    url: string
}

export default function ChooseFile({ onAddClick, url }: Props): JSX.Element {

    return <>
        <div className={`chooseFile-container ${!url && 'empty'}`} onClick={onAddClick}>
            {!url &&
                <>
                    <PlusIcon className='icon-m grey-400' />
                    <p className='body-text-bold grey-400' >Choose avatar image</p>
                </>
            }
            {url &&
                <>
                    <img src={url} className='chooseFile-img'></img>
                </>
            }
        </div>
    </>
}