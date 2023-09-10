import { context } from "./context"

export default function retrieveMeal(mealId: string) {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/meal/${mealId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        if (res.status === 200) {
            const meal = await res.json()

            return meal
        }

        //@ts-ignore
        const { message, type } = await res.json()

        //@ts-ignore
        const clazz = errors[type]

        //@ts-ignore
        throw new clazz(message)

    })()
}

