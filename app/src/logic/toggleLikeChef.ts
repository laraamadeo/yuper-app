import { context } from "./context"
import errors from "./helpers/errors"

export default function toggleLikeChef(chefId: string) {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_KEY}/users/like/${chefId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${context.token}`
            },
        })

        if (res.status === 200) return

        //@ts-ignore
        const { message, type } = await res.json()
        //@ts-ignore
        const clazz = errors[type]

        //@ts-ignore
        throw new clazz(message)

    })()
}