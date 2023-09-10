import { context } from "./context"

type Params = {
    images: Array<string | undefined>
    title: string,
    description: string,
    ingredients: Array<string>,
    categories: Array<string>,
    bestBefore: string,
    price: string,
    mealId: string
}

export default function updateMeal({ mealId, images, title, description, ingredients, bestBefore, price, categories }: Params) {
    const meal = { images, title, description, ingredients, bestBefore, price, categories }

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/meals/update/${mealId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify(meal)
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