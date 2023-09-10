import { context } from "./context"
import errors from './helpers/errors'


export default function updateMeal(mealId: string) {

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/meals/delete/${mealId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            },
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