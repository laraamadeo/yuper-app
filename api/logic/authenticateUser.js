const { errors: { ExistanceError, AuthError } } = require('../../com')
const { validateEmail, validatePassword } = require('../../com/validators')
const { User } = require('../data/models')

/**
 * Authenticates a user
 * @param {string} email user's id
 * @param {string} password post's id
 * @returns {string} user's id
 */

module.exports = function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        const user = await User.findOne({ email })

        if (!user) throw new ExistanceError(`User with email ${email} not found`)

        if (user.password !== password) throw new AuthError(`Email or password incorrect`)

        return user.id
    })()
}