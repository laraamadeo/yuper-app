import errors from '../helpers/errors'
import useAppContext from './useAppContext'

const { DuplicityError, ExistanceError, AuthError, ContentError } = errors

export default () => {

    const { toast } = useAppContext()

    return (error: object) => manageError(error, toast)
}
//@ts-ignore
function manageError(error, toast) {
    if (error instanceof DuplicityError)
        toast(error.message, 'error')
    else if (error instanceof ExistanceError)
        toast(error.message, 'error')
    else if (error instanceof AuthError)
        toast(error.message, 'error')
    else if (error instanceof TypeError)
        toast(error.message, 'error')
    else if (error instanceof ContentError)
        toast(error.message, 'error')
    else if (error instanceof RangeError)
        toast(error.message, 'error')
    else
        console.log(error.message)
}
