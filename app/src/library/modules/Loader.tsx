import Spinner from "../components/Spinner"
import "./Loader.css"

export default function Loader() {

    return <>
        <div className="loader-container">
            <Spinner size={'medium'} />
        </div>
    </>
}