import './Register.css'
import Button from '../library/components/Button'
import Logo from "../library/components/Logo"
import TextField from '../library/components/TextField'
import Link from '../library/components/Link'
import { registerUser } from '../logic/registerUser'
import useAppContext from '../logic/hooks/useAppContext'
import useHandleError from '../logic/hooks/useHandleError'
import { InformationCircleIcon } from '../library/icons'


export default function Register() {
    const { loaderOn, loaderOff, navigate } = useAppContext()
    const handleErrors = useHandleError()

    const passwordRules = ['Password must contain numbers, uppercase letters and one special symbol. Length must be greater than 8 characters.']

    const handleRegister = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const target = event.target as typeof event.target & {
            name: { value: string }
            username: { value: string }
            email: { value: string }
            password: { value: string }
        }

        const name = target.username.value
        const username = target.username.value
        const email = target.email.value
        const password = target.password.value;

        (async () => {
            loaderOn()
            try {
                await registerUser({ name, username, email, password })
                setTimeout(() => {
                    loaderOff()
                    navigate('/additionalInfo')
                }, 1000);

            } catch (error: any) {
                loaderOff()
                handleErrors(error)
            }
        })()
    }

    const loginHandler = () => {
        navigate('/login')
    }

    return <>
        <div className="page-no-token">
            <div className='register-container'>

                <div className="register-logo-container"><Logo /></div>

                <form className='register-form' onSubmit={handleRegister}>
                    <TextField type={'text'} label={'Name'} name={'name'} maxlength={25} />
                    <TextField type={'text'} label={'Username'} name={'username'} maxlength={15} />
                    <TextField type={'text'} label={'Email'} name={'email'} maxlength={40} />
                    <TextField type={'password'} label={'Password'} name={'password'} maxlength={35} />

                    <div className='register-bullet-list'>
                        {passwordRules.map(rule => {
                            return <div className='register-bullet-list-row'>
                                <InformationCircleIcon className='icon-xs grey-500 icon-bulletList' />
                                <p className='small-text grey-500'>{rule}</p>
                            </div>
                        })}

                    </div>

                    <div className='register-actions'>
                        <div className='link-container'><Button type={'primary'} size={'small'} label={'Register'} /></div>
                        <Link label={'Sign on'} state={'default'} onClick={loginHandler} />
                    </div>
                </form>

            </div>
        </div>
    </>
}