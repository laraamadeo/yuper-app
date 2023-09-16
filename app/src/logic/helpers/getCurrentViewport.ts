type ReturnedObj = {
    width: number
    height: number
}

export default function getCurrentViewport(): ReturnedObj {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}