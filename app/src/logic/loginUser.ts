import { context } from "./context"
import errors from './helpers/errors'


export const loginUser = (email: string, password: string) => {
    const user = { email, password }
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/users/auth`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })

        if (res.status === 200) {
            const token = await res.json()
            context.token = token

            return
        } else {
            //@ts-ignore
            const { message, type } = await res.json()

            //@ts-ignore
            const clazz = errors[type]

            //@ts-ignore
            throw new clazz(message)
        }
    })()
}

/* Old-promises 
    return fetch('${import.meta.env.VITE_API_KEY}/users/auth', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            if (res.status !== 200) return res.json().then(({ error }) => { throw new Error(error) })

            return res.json()
        })
        .then(token => {
            context.token = token
        })
*/

