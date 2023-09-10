import { MagnifyingGlassIcon } from '../icons'
import './FakeSearchBar.css'

type Props = {
    onBarClick: () => void
}

export default function FakeSearchBar({ onBarClick }: Props): JSX.Element {

    return <>
        <div className="searchBar-fake-container" onClick={onBarClick}>
            <MagnifyingGlassIcon className='icon-s grey-400' />
        </div>
    </>
}