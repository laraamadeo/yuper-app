import { context } from "./context"

export default function retrieveLikedChefs() {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/users/like`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            }
        })
        if (res.status === 200) {
            const chefs = await res.json()

            return chefs
        }

        //@ts-ignore
        const { message, type } = await res.json()

        //@ts-ignore
        const clazz = errors[type]

        //@ts-ignore
        throw new clazz(message)

    })()
}