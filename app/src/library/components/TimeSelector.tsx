import "./TimeSelector.css"

type Props = {
    dayLabel: string,
    firstLabel: string,
    secondLabel: string,
    firstName: string,
    secondName: string
}

export default function TimeSelector({ dayLabel, firstLabel, secondLabel, firstName, secondName, ...props }: Props): JSX.Element {

    return <>
        <div className='time-selector-day-container'>
            <p className='body-text-bold grey-700'>{dayLabel}</p>
            <div className='time-selector-range'>

                <div className='time-selector-container'>
                    <label className="body-text grey-700" htmlFor="mondayFrom">{firstLabel}</label>
                    <input type='time' className='time-selector' name={`${firstName}`}></input>
                </div>

                <div className='time-selector-container'>
                    <label className="body-text grey-700" htmlFor="mondayTo">{secondLabel}</label>
                    <input type='time' className='time-selector' name={`${secondName}`}></input>
                </div>

            </div>
        </div>
    </>
}