import "./Spinner.css"

type Props = {
    size: string
}

const Spinner = ({ size, ...props }: Props): JSX.Element => <div className={`${size === 'small' && 'custom-loader-small'} ${size === 'medium' && 'custom-loader-medium'}`}></div>


export default Spinner