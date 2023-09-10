
import './ContextualModalMenu.css'

type Props = {
    children: JSX.Element,
}

export default function ContextualModalMenu({ children }: Props): JSX.Element {
    return <>
        <div className='contextualModal-container'>
            {children}
        </div>
    </>
}