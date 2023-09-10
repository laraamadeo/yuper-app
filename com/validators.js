const { ContentError } = require("./errors")

function validateEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!email.trim().length) throw new ContentError('Email is empty')
    if (!emailRegex.test(email)) throw new ContentError('Invalid email format')
}

function validatePassword(password, explain = 'password') {
    if (typeof password !== 'string') throw new TypeError(`${explain} is not a string`)
    if (password.trim().length < 8) throw new RangeError(`${explain} length lower than 8 characters`)
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    // if (!password.trim().length) throw new Error(`${explain} is empty`)  
    // if (!passwordRegex.test(password)) throw new Error(`${explain} format incorrect`)
}

function validateText(text, explain = 'text') {
    if (typeof text !== 'string') throw new TypeError(`${explain} is not a string`)
    if (!text.trim().length) throw new ContentError(`${explain} is empty`)
}

function validateCallback(callback, explain = 'callback') {
    if (typeof callback !== 'function') throw new TypeError(`${explain} is not a function`)
}

module.exports = {
    validateEmail,
    validatePassword,
    validateText,
    validateCallback
}