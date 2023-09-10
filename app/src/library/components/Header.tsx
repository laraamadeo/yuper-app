import './Header.css'
type Props = {
    text: String
}

export default function Header({ text }: Props): JSX.Element {

    return <>
        <div className='header-container'>
            <p className='title header-label grey-700'>{text}</p>
        </div>

    </>
}