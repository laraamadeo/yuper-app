import { context } from "./context"
import errors from './helpers/errors'

type Params = {
    images: Array<string | undefined>
    title: string,
    description: string,
    ingredients: Array<string>,
    categories: Array<string>,
    quantity: string | number
    bestBefore: string | number,
    price: string | number
}

export default function createMeal({ images, title, description, ingredients, categories, bestBefore, quantity, price }: Params) {
    bestBefore = Number(bestBefore)
    quantity = Number(quantity)

    //@ts-ignore
    price = Number(price.replace(',', '.'))

    const meal = { images, title, description, ingredients, categories, bestBefore, quantity, price }

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/meals`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify(meal)
        })

        if (res.status === 201) {
            const id = await res.json()

            return id
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
    return fetch('${import.meta.env.VITE_API_KEY}/meals', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${context.token}`
        },
        body: JSON.stringify(meal)
    })
        .then(res => {
            if (res.status !== 200) res.json().then(({ error }) => { throw new Error(error.message) })
        })
*/