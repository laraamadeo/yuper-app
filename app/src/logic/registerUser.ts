// import { validateEmail, validatePassword } from '../../../com/validators'
import { context } from './context'
import { validateEmail, validatePassword } from './helpers/validators'
import errors from './helpers/errors'


/**
 * Registers a user in the database
 * @param {string} username user's username
 * @param {string} email user's email
 * @param {string} password user's password
 * @param {string} repPassword user's password repetition
 */

type Params = {
    name: string,
    username: string,
    email: string,
    password: string
}

export const registerUser = ({ name, username, email, password }: Params) => {
    validateEmail(email)
    validatePassword(password)

    const user = { name, username, email, password }

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/users`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (res.status === 201) {
            const token = await res.json()
            context.token = token

            return
        }

        //@ts-ignore
        const { message, type } = await res.json()

        //@ts-ignore
        const clazz = errors[type]

        //@ts-ignore
        throw new clazz(message)
    })()
}


/*    const user = { name, username, email, password }

    return fetch('${import.meta.env.VITE_API_KEY}/users', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            if (res.status !== 201) return res.json().then(({ error }) => { throw new Error(error) })

            return res.json()
        })
        .then(token => {
            context.token = token
        })
        */