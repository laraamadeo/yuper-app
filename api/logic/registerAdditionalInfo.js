const { validators: { validateText }, errors: { DuplicityError, ExistanceError } } = require('../../com')
const { User } = require('../data/models')

/**
 * Returns a post searched by id
 * @param {string} userId user's id
 * @param {string} avatar user's avatar
 * @param {string} description user's description
 * @param {string[]} tags user's tags
 * @param {string} location user's location
 * @param {object[]} availability user's availability
 */
module.exports = function registerAdditionalInfo(userId, avatar, description, tags, location, availability) {

    validateText(description)
    validateText(location)

    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        await User.updateOne({ _id: userId }, { avatar, description, tags, location, availability })
    })()
}
