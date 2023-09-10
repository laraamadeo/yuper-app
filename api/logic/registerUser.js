const { validators: { validateText, validateEmail, validatePassword }, errors: { DuplicityError } } = require('../../com')
const { User } = require('../data/models')

/**
 * Registers a user in db
 * @param {string} username user's username
 * @param {string} name user's name
 * @param {string} email user's email
 * @param {string} password user's password
 */
module.exports = function registerUser(username, name, email, password) {

    validateText(username)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        try {
            const user = await User.create({ username, name, email, password })
            return user.id
        } catch (error) {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw error
        }
    })()
}