import Avatar from '../components/Avatar'
import Divider from '../components/Divider'
import IconButton from '../components/IconButton'
import { PaperAirplaneIcon } from '../icons'
import './FavouriteChefModule.css'

type Props = {
    avatar: string,
    name: string,
    description: string,
    divider: boolean,
}

export default function FavouriteChefModule({ avatar, name, description, divider }: Props): JSX.Element {
    return <>
        <div className='favouriteChefModule-container'>
            <div className='favouriteChefModule-content'>
                <div className='favouriteChefModule-avatar-info'>
                    <Avatar image={avatar} width={'40px'} />
                    <div className='favouriteChefModule-name-description'>
                        <p className='body-text-bold grey-700'>{name}</p>
                        <p className='small-text grey-400'>{description}</p>
                    </div>
                </div>
                <IconButton icon={<PaperAirplaneIcon className='icon-xs grey-700' />} type={'secondary'} onClick={() => alert('🛠️ Feature coming soon! Please, be patient')} />
            </div>
            {divider && <Divider width='100%' className='favouriteChefModule-divider' />}
        </div>
    </>
}