import Avatar from '../components/Avatar'
import Button from '../components/Button'
import Container from '../components/Container'
import IconButton from '../components/IconButton'
import { HeartIcon, SolidHeartIcon } from '../icons'
import './ChefModule.css'

type Props = {
    avatar: string,
    name: string,
    liked: boolean,
    onSendMessage: (event: React.SyntheticEvent) => void
    onLikeChef: () => void
}

export default function ChefModule({ avatar, name, liked, onSendMessage, onLikeChef }: Props): JSX.Element {
    return <>
        <div className='chef-module-container'>
            <Avatar image={avatar} width={'32px'} />
            <div className='chef-module-info'>
                <p className="body-text-bold grey-700 chef-module-name">{name}</p>
            </div>
            {/* @ts-ignore */}
            <Button type={'secondary'} size={'small'} label={'Send message'} hugContent={true} onClick={onSendMessage} />
            {liked ? <IconButton icon={<SolidHeartIcon className='icon-s red-200' />} type={'secondary'} onClick={onLikeChef} /> : <IconButton onClick={onLikeChef} icon={<HeartIcon className='icon-s grey-700' />} type={'secondary'} />}
        </div>
    </>
}