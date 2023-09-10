const { User, Meal } = require('../data/models')
const { errors: { ExistanceError, AuthError } } = require('../../com')

/**
 * Returns an array with the meals that match the searching criteria
 * @param {string} userId user's id
 * @param {string} title meal's title
 * @param {string[]} categories meal's categories

 * @returns {object} the founded meals
 */
module.exports = function searchMeals(userId, title, categories) {
    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistanceError(`User with id ${userId} not found`)

        if (title === undefined && categories.length === 0) return null
        else {
            let query = {}

            if (title) {
                query.title = { $regex: title, $options: 'i' }
            }

            if (categories && categories.length > 0) {
                query.categories = { $in: categories }
            }

            const meals = await Meal.find(query)

            return meals
        }
    })()
}