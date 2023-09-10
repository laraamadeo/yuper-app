import { context } from "./context"
import errors from "./helpers/errors"

export default function markAsReady(serial: string) {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/meals/ready`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ serial })
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