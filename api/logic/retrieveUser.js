const { errors: { ExistanceError } } = require('../../com')
const { User } = require('../data/models')

/**
 * Returns a user's information
 * @param {string} user user's id
 * @returns {object} the founded user
 */
module.exports = async function retrieveUser(userId) {
    const foundUser = await User.findById(userId)
    if (!foundUser) throw new ExistanceError(`User with id ${userId} not found`)

    const { username, name, email, avatar, description, tags, location, likedChefs, reviews, availability, cart } = foundUser

    const user = { username, name, email, avatar, description, tags, location, likedChefs, reviews, availability, cart }

    return user
}
