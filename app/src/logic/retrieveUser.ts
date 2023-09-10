import { context } from "./context"

export default function retrieveUser() {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/users`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            }
        })

        if (res.status === 200) {
            const user = await res.json()

            return user
        }
        //@ts-ignore
        const { message, type } = await res.json()

        //@ts-ignore
        const clazz = errors[type]

        //@ts-ignore
        throw new clazz(message)
    })()
}

/*
    return fetch('${import.meta.env.VITE_API_KEY}/users', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status !== 200) res.json().then(({ error }) => { throw new Error(error.message) })

            return res.json()
        })
*/