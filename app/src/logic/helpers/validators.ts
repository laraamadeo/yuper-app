import errors from '../helpers/errors'


const { DuplicityError, ExistanceError, AuthError, ContentError } = errors


export const validateEmail = (email: string) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!email.trim().length) throw new ContentError('Email is empty')
    if (!emailRegex.test(email)) throw new Error('Invalid email format')
}

export const validatePassword = (password: string, explain = 'password') => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if (!password.trim().length) throw new TypeError(`${explain} is empty`)

    if (!passwordRegex.test(password)) throw new RangeError(`${explain} format incorrect`)
}

export const validateToken = (token: string, explain = 'password') => {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)
    if (token.split('.').length !== 3) throw new Error(`${explain} is not valid`)
}