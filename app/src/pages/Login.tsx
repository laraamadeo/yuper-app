import './Login.css'
import Button from '../library/components/Button.js'
import Logo from "../library/components/Logo.js"
import TextField from '../library/components/TextField.js'
import Link from '../library/components/Link.js'
import { loginUser } from "../logic/loginUser.js"
import useAppContext from "../logic/hooks/useAppContext.js"
import useHandleError from '../logic/hooks/useHandleError'
import { useLocation } from 'react-router-dom'


export default function Login(): JSX.Element {
    const { loaderOn, loaderOff, navigate } = useAppContext()
    const handleErrors = useHandleError()

    const location = useLocation()
    const from = location.state


    const onLoginClick = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const target = event.target as typeof event.target & {
            email: { value: string };
            password: { value: string };
        }

        const email = target.email.value
        const password = target.password.value;

        (async () => {
            try {
                loaderOn()
                await loginUser(email, password)
                setTimeout(() => {
                    loaderOff()

                    if (from && from.includes("/meal/")) {
                        navigate(from, { state: "/login" })
                    } else navigate('/')
                }, 1000)
            } catch (error: any) {
                loaderOff()
                handleErrors(error)
            }
        })()
    }

    const goToRegister = () => {
        loaderOn()
        setTimeout(() => {
            navigate('/register')
            loaderOff()
        }, 1000)
    }
    console.log(`${import.meta.env.VITE_API_KEY}/users/auth`)

    return <>
        <div className="page-no-token">
            <div className='login-container'>

                <div className="login-logo-container"><Logo /></div>

                <form className='login-form' onSubmit={onLoginClick}>
                    <TextField type={'text'} label={'Email'} name={'email'} />
                    <TextField type={'password'} label={'Password'} name={'password'} />

                    <div className='login-actions'>
                        <div className='link-container'><Button type={'primary'} size={'small'} label={'Login'} /></div>
                        <Link label={'Sign up'} state={'default'} onClick={goToRegister} />
                    </div>
                </form>

            </div>
        </div>
    </>
}