import { MagnifyingGlassIcon } from '../icons'
import './SearchBar.css'
import { Dispatch, SetStateAction } from 'react'


type Props = {
    onBarClick?: () => void,
    setSearchQuery?: Dispatch<SetStateAction<string | undefined>>
}

export default function SearchBar({ onBarClick, setSearchQuery }: Props): JSX.Element {

    return <>
        <div className='searchBar-container'>
            <input type='text' className='searchBar-input' onChange={(e) => setSearchQuery!(e.target.value)}></input>
            <MagnifyingGlassIcon className='icon-s grey-400 searchBar-icon' />
        </div>
    </>
}