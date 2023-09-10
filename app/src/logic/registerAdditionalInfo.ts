// import { validateEmail, validatePassword } from '../../../com/validators'
import errors from './helpers/errors'

/**
 * Registers a user in the database
 * @param {string} username user's username
 * @param {string} email user's email
 * @param {string} password user's password
 * @param {string} repPassword user's password repetition
 */

import { context } from "./context"

export const registerAdditionalInfo = (avatar: string, description: string, tags: Array<string>, location: string, availability: Array<object>) => {

    // validateEmail(email)
    // validatePassword(password)

    const info = { avatar, description, tags, location, availability }

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/users/info`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify(info)
        })
        if (res.status === 204) return

        //@ts-ignore
        const { message, type } = await res.json()

        //@ts-ignore
        const clazz = errors[type]

        //@ts-ignore
        throw new clazz(message)
    })()
}

/* Old-promises
    return fetch('${import.meta.env.VITE_API_KEY}/users/info', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${context.token}`
        },
        body: JSON.stringify(info)
    })
        .then(res => {
            if (res.status !== 204) return res.json().then(({ error }) => { throw new Error(error) })
        })

*/ 