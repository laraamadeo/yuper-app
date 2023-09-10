import { validateToken } from './validators'

function extractPayloadFromToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
}

export function isTokenAlive(token: string) {
    const { iat, exp } = extractPayloadFromToken(token)
    const now = Date.now() / 1000

    return exp - iat > now - iat
}

export function isTokenValid(token: string) {
    try {
        validateToken(token)

        return true
    } catch (_) {
        return false
    }
}

export function extractSubFromToken(token: string) {
    if (token !== undefined) {
        const { sub } = JSON.parse(atob(token.split('.')[1]))

        return sub
    }
    return
}

type ReturnValues = {

    description: string
    tags: Array<string>
    location: string
    availability: Array<object>

}


export function handleAdditionalInfoHelper(formRef: HTMLFormElement, availabilityDays: Array<string>): ReturnValues {

    const form = formRef as typeof formRef & {
        description: { value: string }
        tags: { value: string }
        location: { value: string }
        mondayFrom: { value: string }
        mondayTo: { value: string }
        tuesdayFrom: { value: string }
        tuesdayTo: { value: string }
        wednesdayFrom: { value: string }
        wednesdayTo: { value: string }
        thursdayFrom: { value: string }
        thursdayTo: { value: string }
        fridayFrom: { value: string }
        fridayTo: { value: string }
        saturdayFrom: { value: string }
        saturdayTo: { value: string }
        sundayFrom: { value: string }
        sundayTo: { value: string }
    }


    const description = form.description.value
    const fullTags = form.tags.value
    const tags = fullTags.split(",").map(item => item.trim())
    const location = form.location.value

    const availability: Array<object> = []

    if (availabilityDays.includes('1')) {
        const from = form.mondayFrom.value
        const to = form.mondayTo.value
        const a = { day: 'monday', time: `${from}-${to}` }
        availability.push(a)
    }
    if (availabilityDays.includes('2')) {
        const from = form.tuesdayFrom.value
        const to = form.tuesdayTo.value
        const a = { day: 'tuesday', time: `${from}-${to}` }
        availability.push(a)
    }
    if (availabilityDays.includes('3')) {
        const from = form.wednesdayFrom.value
        const to = form.wednesdayTo.value
        const a = { day: 'wednesday', time: `${from}-${to}` }
        availability.push(a)
    }
    if (availabilityDays.includes('4')) {
        const from = form.thursdayFrom.value
        const to = form.thursdayTo.value
        const a = { day: 'thursday', time: `${from}-${to}` }
        availability.push(a)
    }
    if (availabilityDays.includes('5')) {
        const from = form.fridayFrom.value
        const to = form.fridayTo.value
        const a = { day: 'friday', time: `${from}-${to}` }
        availability.push(a)
    }
    if (availabilityDays.includes('6')) {
        const from = form.saturdayFrom.value
        const to = form.saturdayTo.value
        const a = { day: 'saturday', time: `${from}-${to}` }
        availability.push(a)
    }
    if (availabilityDays.includes('7')) {
        const from = form.sundayFrom.value
        const to = form.sundayTo.value
        const a = { day: 'sunday', time: `${from}-${to}` }
        availability.push(a)
    }

    return { description, tags, location, availability }
}