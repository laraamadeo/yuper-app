import { context } from "./context"
import errors from "./helpers/errors"

export default function payMealsInCart() {
    const nth = "a"
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/meals/pay`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ nth })
        })

        if (res.status === 201) return

        //@ts-ignore
        const { message, type } = await res.json()
        //@ts-ignore
        const clazz = errors[type]

        //@ts-ignore
        throw new clazz(message)

    })()
}