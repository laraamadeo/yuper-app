import { context } from "./context"

export default function searchMeals(title: string | undefined, categories: string[]) {
    if (title === "") title = undefined
    const data = { title, categories }

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/meals/search`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify(data)
        })

        if (res.status === 200) {
            const meals = await res.json()
            return meals
        }

        //@ts-ignore
        const { message, type } = await res.json()

        //@ts-ignore
        const clazz = errors[type]

        //@ts-ignore
        throw new clazz(message)
    })()
}