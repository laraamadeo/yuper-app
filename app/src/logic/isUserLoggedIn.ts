import { context } from "./context"
import { isTokenValid, isTokenAlive } from './helpers/utils'

export default function isUserLoggedIn() {
    if (isTokenValid(context.token) && isTokenAlive(context.token)) return true
    else return false
}