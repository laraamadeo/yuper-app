import './AdditionalInfo.css'
import { useState, useRef, useEffect } from "react"
import DaySelector from '../library/components/DaySelector'
import Topbar from '../library/modules/Topbar'
import { registerAdditionalInfo } from '../logic/registerAdditionalInfo'
import { handleAdditionalInfoHelper } from '../logic/helpers/utils'
import Header from '../library/components/Header'
import TextArea from '../library/components/TextArea'
import TextField from '../library/components/TextField'
import TimeSelector from '../library/components/TimeSelector'
import ButtonBar from '../library/modules/ButtonBar'
import { XMarkIcon } from '../library/icons'
import useAppContext from '../logic/hooks/useAppContext'
import useHandleError from '../logic/hooks/useHandleError'
import retrieveUser from '../logic/retrieveUser'
import FeedbackNotification from '../library/components/FeedbackNotification'
import EmptyPhoto from '../library/components/EmptyPhoto'

import { IKImage, IKContext, IKUpload } from "imagekitio-react"
import ChooseFile from '../library/components/ChooseFile'

const urlEndpoint = 'https://ik.imagekit.io/6zeyr5rgu/yuperApp/'
const publicKey = 'public_9DujXADbFrwoOkNd+rUmvTbT/+U='
const authenticationEndpoint = `${import.meta.env.VITE_API_KEY}/IKAuth`

type User = {
    name: string,
    availability: Array<object>,
    avatar: string,
    username: string,
    description: string,
    tags: string[],
}

export default function AdditionalInfo() {
    const { loaderOn, loaderOff, navigate, toast } = useAppContext()
    const handleErrors = useHandleError()

    const [availabilityDays, setAvailabilityDays] = useState<string[]>([])
    const formRef = useRef<HTMLFormElement>(null)

    const [user, setUser] = useState<User>()

    const days = ['1', '2', '3', '4', '5', '6', '7']

    const inputRefTest = useRef(null)
    const ikUploadRefTest = useRef(null)
    const [avatarImage, setAvatarImage] = useState<string>()


    useEffect(() => {
        (async () => {
            try {
                const user = await retrieveUser()
                setUser(user)
            } catch (error: any) {
                handleErrors(error)
            }
        })
    }, [])

    const onDayClick = (day: string) => {
        if (availabilityDays && availabilityDays.includes(day)) {
            const updatedArray = availabilityDays.filter(item => item !== day)
            setAvailabilityDays(updatedArray)
        } else setAvailabilityDays(availabilityDays.concat(day))
    }

    const handleAdditionalInfo = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const { description, tags, location, availability } = handleAdditionalInfoHelper(formRef.current!, availabilityDays);


        (async () => {
            try {
                if (avatarImage === undefined || description === "" || tags.length === 1 && tags.includes("") || location === "" || availability.length === 0) {
                    toast('Complete all fields', 'error')
                    return
                }
                loaderOn()

                await registerAdditionalInfo(avatarImage!, description, tags, location, availability)

                setTimeout(() => {
                    loaderOff()
                    navigate('/')
                }, 1000)

            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }


    const handleSkipInfo = (event: React.SyntheticEvent) => {
        event.preventDefault()
        try {
            loaderOn()

            setTimeout(() => {
                loaderOff()
                navigate('/')
            }, 1000)

        } catch (error: any) {
            handleErrors(error)
        }
    }

    const onClose = () => {
        navigate('/')
    }

    const onImageUploadError = (error: object) => {
        alert('There has been an error uploading your file. Please try again.')
    }
    //@ts-ignore
    const onValidateFile = (res) => {
        if (res.type === 'image/png' || res.type === 'image/jpeg' || res.type === 'image/webp' || res.type === 'image/heic' || res.type === 'image/heif' && res.size < 500000) return true

        else { alert('File format or size not permitted') }
    }
    //@ts-ignore
    const onImageUploadSuccess = (res) => {
        loaderOff()
        setAvatarImage(res.url)
    }
    //@ts-ignore
    const onUploadStart = evt => {
        loaderOn()
    }

    return <>
        <div className="page-first-level">
            <div className='additional-container'>
                <Topbar className={'topbar-modals'} level='second' secondLevel={{
                    label: "Complete profile",
                    right: <XMarkIcon className='icon-s grey-700' />,
                    onRightClick: onClose
                }} />
                <Header text={'Profile details'} />
                <FeedbackNotification title='Complete your profile' content='Please fullfill additional info for creating your meals.' state='warning' style={{ marginBottom: '24px' }} />

                <form className='additional-form' ref={formRef}>

                    {/* AVATAR */}
                    <div className='additional-form-avatar'>

                        <p className='body-text grey-700'>Avatar</p>
                        {/*//@ts-ignore*/}
                        {inputRefTest && <ChooseFile url={avatarImage} onAddClick={() => inputRefTest.current!.click()} />}
                        {/*//@ts-ignore*/}
                        <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticationEndpoint={authenticationEndpoint}>
                            {/*//@ts-ignore*/}
                            <IKUpload style={{ display: 'none' }} inputRef={inputRefTest} ref={ikUploadRefTest} className="ik-upload-button" fileName={'meal_'} accept=".jpg, .jpeg, .png, .heic, .webp" validateFile={onValidateFile} onError={onImageUploadError} onUploadStart={onUploadStart} onSuccess={onImageUploadSuccess} />
                        </IKContext>
                    </div>

                    <TextArea name={'description'} label={'Description'} placeholder={'Start by writing a bit about yourself, this helps other users to get to know you.'} />
                    <TextField type={'text'} label={'Tags'} name={'tags'} placeholder={'Write some tags about your lifestyle. p.e. Healthy, Sporty, Diet...'} />
                    <TextField type={'text'} label={'Pick-up location'} name={'location'} />

                    {/*Availability options*/}
                    <div className='availability-container'>
                        <p className='body-text grey-700'>Availability</p>
                        <div className='availability-dots-container'>
                            {days.map(day => {
                                const dayText = `
                                ${day === '1' ? 'M' : ''}
                                ${day === '2' ? 'T' : ''}
                                ${day === '3' ? 'W' : ''}
                                ${day === '4' ? 'T' : ''}
                                ${day === '5' ? 'F' : ''}
                                ${day === '6' ? 'S' : ''}
                                ${day === '7' ? 'S' : ''}`
                                const state = `${availabilityDays && availabilityDays.includes(day) ? 'selected' : 'default'}`
                                return <DaySelector key={day} label={dayText} state={`${availabilityDays && availabilityDays.includes(day) ? 'selected' : 'default'}`} onClick={() => onDayClick(day)} />
                            })}
                        </div>
                    </div>
                    {availabilityDays.map(day => {
                        const daylabel = `
                        ${day === '1' ? 'Monday' : ''}
                        ${day === '2' ? 'Tuesday' : ''}
                        ${day === '3' ? 'Wednesday' : ''}
                        ${day === '4' ? 'Thursday' : ''}
                        ${day === '5' ? 'Friday' : ''}
                        ${day === '6' ? 'Saturday' : ''}
                        ${day === '7' ? 'Sunday' : ''}`
                        return <TimeSelector dayLabel={daylabel} firstLabel={'From'} secondLabel={'To'} firstName={`${daylabel.toLowerCase().trim()}From`} secondName={`${daylabel.toLowerCase().trim()}To`} />
                    })}
                </form>

                {/* buttonbar */}
                <ButtonBar firstButton={{
                    label: 'Finish',
                    onClick: handleAdditionalInfo
                }} link={{
                    label: 'Do it later',
                    onClick: handleSkipInfo
                }} />
            </div>
        </div>
    </>
}